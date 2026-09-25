"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
    auth,
    db,
    loginWithGoogle,
    logoutUser,
    fetchUserWords,
    commitBatchedWordReviews,
    checkRedirectAuth,
    editReviewWord,
    deleteReviewWord,
    getUserPlan,
    fetchUserSubscriptionDetails,
    type UserPlan,
    type SubscriptionDetails,
    PLAN_TTS_LIMITS,
    getCurrentMonth,
} from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { SRS, type ReviewWord, type SRState } from "@/lib/srs";
import { formatNextUsageRenewalDate } from "@/lib/review-audio";

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    isSigningIn: boolean;
    authError: string | null;
    wordsError: string | null;
    plan: UserPlan;
    isPaid: boolean;
    subscriptionInfo: SubscriptionDetails;
    refreshPlan: () => Promise<void>;
    words: ReviewWord[];
    dueWords: ReviewWord[];
    rawDueCount: number;
    loadingWords: boolean;
    viewMode: "reviews" | "landing";
    isCramMode: boolean;
    openReviews: () => void;
    openLanding: () => void;
    toggleViewMode: () => void;
    startCramMode: () => void;
    exitCramMode: () => void;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshWords: () => Promise<void>;
    editWord: (word: ReviewWord) => Promise<void>;
    removeWord: (id: string) => Promise<void>;
    recordWordRating: (word: ReviewWord, grade: 1 | 2) => Promise<void>;
    flushPendingReviews: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
    plan: "free",
    isPaid: false,
    subscriptionInfo: {
        plan: "free",
        isPaid: false,
        ttsLimit: 0,
        ttsUsed: 0,
        ttsRemaining: 0,
        month: "",
        stripeCurrentPeriodEnd: null,
        renewalDate: "",
    },
    refreshPlan: async () => {},
    isSigningIn: false,
    authError: null,
    wordsError: null,
    words: [],
    dueWords: [],
    rawDueCount: 0,
    loadingWords: false,
    viewMode: "landing",
    isCramMode: false,
    openReviews: () => {},
    openLanding: () => {},
    toggleViewMode: () => {},
    startCramMode: () => {},
    exitCramMode: () => {},
    signInWithGoogle: async () => {},
    signOut: async () => {},
    refreshWords: async () => {},
    recordWordRating: async () => {},
    flushPendingReviews: async () => {},
    editWord: async () => {},
    removeWord: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [wordsError, setWordsError] = useState<string | null>(null);
    const [words, setWords] = useState<ReviewWord[]>([]);
    const [loadingWords, setLoadingWords] = useState(false);
    const [viewMode, setViewMode] = useState<"reviews" | "landing">("landing");
    const [isCramMode, setIsCramMode] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionDetails>(() => {
        const month = getCurrentMonth();
        if (typeof window === "undefined") {
            return { plan: "free", isPaid: false, ttsLimit: 0, ttsUsed: 0, ttsRemaining: 0, month, stripeCurrentPeriodEnd: null, renewalDate: formatNextUsageRenewalDate(month, "pl") };
        }
        try {
            const savedPlan = (localStorage.getItem("lectoro_cached_user_plan") || "free") as UserPlan;
            const savedUsed = parseInt(localStorage.getItem("lectoro_cached_tts_used") || "0", 10);
            const savedMonth = localStorage.getItem("lectoro_cached_tts_month") || month;
            const validUsed = savedMonth === month && !isNaN(savedUsed) ? savedUsed : 0;
            const limit = PLAN_TTS_LIMITS[savedPlan] || 0;
            const isPaid = savedPlan === "basic" || savedPlan === "pro";
            return {
                plan: savedPlan,
                isPaid,
                ttsLimit: limit,
                ttsUsed: validUsed,
                ttsRemaining: isPaid ? Math.max(0, limit - validUsed) : 0,
                month,
                stripeCurrentPeriodEnd: null,
                renewalDate: formatNextUsageRenewalDate(month, "pl"),
            };
        } catch {
            return { plan: "free", isPaid: false, ttsLimit: 0, ttsUsed: 0, ttsRemaining: 0, month, stripeCurrentPeriodEnd: null, renewalDate: formatNextUsageRenewalDate(month, "pl") };
        }
    });

    const plan = subscriptionInfo.plan;
    const isPaid = subscriptionInfo.isPaid;

    // Słuchaj na natychmiastowe aktualizacje użycia TTS z nagłówka X-Lectoro-TTS-Used
    useEffect(() => {
        const onTtsUsed = (e: Event) => {
            const custom = e as CustomEvent<{ used: number }>;
            const used = custom.detail?.used;
            if (typeof used === "number" && !isNaN(used)) {
                setSubscriptionInfo((prev) => {
                    const limit = prev.ttsLimit;
                    const nextRemaining = prev.isPaid ? Math.max(0, limit - used) : 0;
                    try {
                        localStorage.setItem("lectoro_cached_tts_used", String(used));
                        localStorage.setItem("lectoro_cached_tts_month", prev.month);
                    } catch {}
                    return {
                        ...prev,
                        ttsUsed: used,
                        ttsRemaining: nextRemaining,
                    };
                });
            }
        };
        window.addEventListener("lectoro:tts-used", onTtsUsed);
        return () => window.removeEventListener("lectoro:tts-used", onTtsUsed);
    }, []);

    const BATCH_FLUSH_INACTIVITY_MS = 30000; // Auto-zapis po 30 sekundach bezruchu
    const BATCH_FLUSH_THRESHOLD = 10; // Auto-zapis gdy więcej niż lub równe 10 fiszek
    const getStorageKey = (uid: string) => `lectoro_pending_reviews_${uid}`;

    const pendingReviewsRef = useRef<Record<string, SRState>>({});
    const flushTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isFlushingRef = useRef<boolean>(false);

    const loadWords = useCallback(async (uid: string) => {
        setLoadingWords(true);
        setWordsError(null);
        try {
            const fetched = await fetchUserWords(uid);
            setWords(fetched);
        } catch (err: unknown) {
            console.error("Error loading user words:", err);
            const message = err instanceof Error ? err.message : "Błąd pobierania słówek z bazy.";
            setWordsError(message);
        } finally {
            setLoadingWords(false);
        }
    }, []);

    useEffect(() => {
        // Check if returning from a redirect sign-in
        void checkRedirectAuth().then((redirectUser) => {
            if (redirectUser) {
                setUser(redirectUser);
                setViewMode("reviews");
            }
        });

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser?.uid) {
                void loadWords(currentUser.uid);
            } else {
                setWords([]);
                setViewMode("landing");
                setIsCramMode(false);
            }
        });

        return () => unsubscribe();
    }, [loadWords]);

    // Realtime nasłuchiwanie dokumentu użytkownika w Firestore
    useEffect(() => {
        if (!user?.uid) {
            const m = getCurrentMonth();
            setSubscriptionInfo({
                plan: "free",
                isPaid: false,
                ttsLimit: 0,
                ttsUsed: 0,
                ttsRemaining: 0,
                month: m,
                stripeCurrentPeriodEnd: null,
                renewalDate: formatNextUsageRenewalDate(m, "pl"),
            });
            try {
                localStorage.removeItem("lectoro_cached_user_plan");
                localStorage.removeItem("lectoro_cached_tts_used");
                localStorage.removeItem("lectoro_cached_tts_month");
            } catch {}
            return;
        }

        const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
            if (!snap.exists()) return;
            const data = snap.data();
            const month = getCurrentMonth();
            const now = Date.now();
            const prepaid = data.prepaidAccess || {};
            let activePlan: UserPlan = "free";
            if (Number(prepaid.pro || 0) > now) activePlan = "pro";
            else if (Number(prepaid.basic || 0) > now) activePlan = "basic";
            else {
                const p = String(data.plan || data.subscriptionPlan || "").toLowerCase().trim();
                if (p === "pro" || p === "basic") activePlan = p as UserPlan;
                const status = String(data.subscriptionStatus || "").toLowerCase().trim();
                if (status === "active" || status === "trialing") {
                    activePlan = p === "pro" ? "pro" : "basic";
                }
            }

            const stripeEnd = Number(data.stripeCurrentPeriodEnd) || null;
            const resetDate = String(data.elevenLabsResetDate || "");
            const used = resetDate === month ? Math.max(0, Number(data.elevenLabsCharactersThisMonth) || 0) : 0;
            const paid = activePlan === "basic" || activePlan === "pro";
            const limit = PLAN_TTS_LIMITS[activePlan] || 0;
            const remaining = paid ? Math.max(0, limit - used) : 0;
            const renewalDate = formatNextUsageRenewalDate(stripeEnd || resetDate || month, "pl");

            setSubscriptionInfo({
                plan: activePlan,
                isPaid: paid,
                ttsLimit: limit,
                ttsUsed: used,
                ttsRemaining: remaining,
                month,
                stripeCurrentPeriodEnd: stripeEnd,
                renewalDate,
            });

            try {
                localStorage.setItem("lectoro_cached_user_plan", activePlan);
                localStorage.setItem("lectoro_cached_tts_used", String(used));
                localStorage.setItem("lectoro_cached_tts_month", month);
            } catch {}
        }, (err) => {
            console.warn("[AuthContext] user doc onSnapshot error:", err);
        });

        // Autorytatywne potwierdzenie z proxy w tle
        void fetchUserSubscriptionDetails(user).then((details) => {
            setSubscriptionInfo(details);
            try {
                localStorage.setItem("lectoro_cached_user_plan", details.plan);
                localStorage.setItem("lectoro_cached_tts_used", String(details.ttsUsed));
                localStorage.setItem("lectoro_cached_tts_month", details.month);
            } catch {}
        });

        return () => unsub();
    }, [user]);

    const refreshPlan = useCallback(async () => {
        if (!user) {
            setSubscriptionInfo({
                plan: "free",
                isPaid: false,
                ttsLimit: 0,
                ttsUsed: 0,
                ttsRemaining: 0,
                month: getCurrentMonth(),
            });
            try {
                localStorage.removeItem("lectoro_cached_user_plan");
                localStorage.removeItem("lectoro_cached_tts_used");
                localStorage.removeItem("lectoro_cached_tts_month");
            } catch {}
            return;
        }
        try {
            const details = await fetchUserSubscriptionDetails(user);
            setSubscriptionInfo(details);
            try {
                localStorage.setItem("lectoro_cached_user_plan", details.plan);
                localStorage.setItem("lectoro_cached_tts_used", String(details.ttsUsed));
                localStorage.setItem("lectoro_cached_tts_month", details.month);
            } catch {}
        } catch (e) {
            console.warn("[AuthContext] refreshPlan error:", e);
        }
    }, [user]);

    const refreshWords = useCallback(async () => {
        if (user?.uid) {
            await loadWords(user.uid);
        }
    }, [user, loadWords]);

    const openReviews = useCallback(() => {
        setViewMode("reviews");
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    const openLanding = useCallback(() => {
        setViewMode("landing");
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    const toggleViewMode = useCallback(() => {
        setViewMode((prev) => (prev === "reviews" ? "landing" : "reviews"));
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    const startCramMode = useCallback(() => {
        setIsCramMode(true);
        setViewMode("reviews");
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    const exitCramMode = useCallback(() => {
        setIsCramMode(false);
    }, []);

    const signInWithGoogle = useCallback(async () => {
        setAuthError(null);
        setIsSigningIn(true);
        try {
            const loggedIn = await loginWithGoogle();
            if (loggedIn) {
                setUser(loggedIn);
                setViewMode("reviews");
            }
        } catch (error: unknown) {
            console.error("Google sign in error:", error);
            const msg = error instanceof Error ? error.message : String(error);
            setAuthError(msg);
            alert(msg);
            throw error;
        } finally {
            setIsSigningIn(false);
        }
    }, []);

    const flushPendingReviews = useCallback(async () => {
        if (!user?.uid) return;
        if (flushTimerRef.current) {
            clearTimeout(flushTimerRef.current);
            flushTimerRef.current = null;
        }
        if (isFlushingRef.current) return;

        const toCommit = { ...pendingReviewsRef.current };
        const count = Object.keys(toCommit).length;
        if (count === 0) return;

        isFlushingRef.current = true;
        try {
            await commitBatchedWordReviews(user.uid, toCommit);
            for (const id of Object.keys(toCommit)) {
                delete pendingReviewsRef.current[id];
            }
            if (typeof window !== "undefined") {
                const remaining = Object.keys(pendingReviewsRef.current).length;
                if (remaining === 0) {
                    localStorage.removeItem(getStorageKey(user.uid));
                } else {
                    localStorage.setItem(getStorageKey(user.uid), JSON.stringify(pendingReviewsRef.current));
                }
            }
        } catch (error) {
            console.error("Failed to commit batched word reviews to Firestore:", error);
        } finally {
            isFlushingRef.current = false;
        }
    }, [user?.uid]);

    // Odzyskiwanie niezapisanych powtórek z localStorage po zalogowaniu / awarii
    useEffect(() => {
        if (!user?.uid) return;
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(getStorageKey(user.uid));
                if (saved) {
                    const parsed = JSON.parse(saved) as Record<string, SRState>;
                    if (parsed && Object.keys(parsed).length > 0) {
                        pendingReviewsRef.current = { ...parsed, ...pendingReviewsRef.current };
                        void flushPendingReviews();
                    }
                }
            } catch (e) {
                console.warn("Failed to restore pending reviews from localStorage", e);
            }
        }
    }, [user?.uid, flushPendingReviews]);

    // Bezpieczeństwo: zapis przy zmianie karty, zminimalizowaniu lub zamknięciu okna
    useEffect(() => {
        if (!user?.uid) return;

        const handleVisibilityOrUnload = () => {
            if (Object.keys(pendingReviewsRef.current).length > 0) {
                void flushPendingReviews();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityOrUnload);
        window.addEventListener("pagehide", handleVisibilityOrUnload);
        window.addEventListener("beforeunload", handleVisibilityOrUnload);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityOrUnload);
            window.removeEventListener("pagehide", handleVisibilityOrUnload);
            window.removeEventListener("beforeunload", handleVisibilityOrUnload);
            if (flushTimerRef.current) {
                clearTimeout(flushTimerRef.current);
                flushTimerRef.current = null;
            }
            handleVisibilityOrUnload();
        };
    }, [user?.uid, flushPendingReviews]);

    const signOut = useCallback(async () => {
        try {
            await flushPendingReviews();
            await logoutUser();
            setUser(null);
            setWords([]);
            setViewMode("landing");
            setIsCramMode(false);
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    }, [flushPendingReviews]);

    const recordWordRating = useCallback(
        async (word: ReviewWord, grade: 1 | 2) => {
            if (!user?.uid) throw new Error("Please sign in");

            // 1. Obliczamy stan algorytmu SRS synchronicznie
            const updatedSr = SRS.update(word.sr, grade, Date.now());

            // 2. Natychmiastowa aktualizacja w pamięci podręcznej UI (0ms opóźnienia animacji)
            setWords((prev) =>
                prev.map((w) => (w.id === word.id ? { ...w, sr: updatedSr, updatedAt: Date.now() } : w))
            );

            // 3. Dodanie do bufora kolejki z deduplikacją
            pendingReviewsRef.current[word.id] = updatedSr;

            // 4. Kopia zapasowa w localStorage
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem(
                        getStorageKey(user.uid),
                        JSON.stringify(pendingReviewsRef.current)
                    );
                } catch (e) {
                    console.warn("Could not write pending review to localStorage", e);
                }
            }

            // 5. Sprawdzenie warunków wysyłki buncza:
            const count = Object.keys(pendingReviewsRef.current).length;
            if (count >= BATCH_FLUSH_THRESHOLD) {
                // Warunek 1: Więcej niż / równe 10 fiszek -> natychmiastowa wysyłka paczki
                if (flushTimerRef.current) {
                    clearTimeout(flushTimerRef.current);
                    flushTimerRef.current = null;
                }
                void flushPendingReviews();
            } else {
                // Warunek 2: Mniej niż 10 fiszek -> odliczanie 30 sekund bezruchu
                if (flushTimerRef.current) {
                    clearTimeout(flushTimerRef.current);
                }
                flushTimerRef.current = setTimeout(() => {
                    void flushPendingReviews();
                }, BATCH_FLUSH_INACTIVITY_MS);
            }
        },
        [user?.uid, flushPendingReviews]
    );

    const editWord = useCallback(async (word: ReviewWord) => {
        if (!user) throw new Error("Please sign in");
        await editReviewWord(user.uid, word);
        setWords(previous => previous.map(item => item.id === word.id ? word : item));
    }, [user]);

    const removeWord = useCallback(async (id: string) => {
        if (!user) throw new Error("Please sign in");
        if (pendingReviewsRef.current[id]) {
            delete pendingReviewsRef.current[id];
            if (typeof window !== "undefined") {
                localStorage.setItem(getStorageKey(user.uid), JSON.stringify(pendingReviewsRef.current));
            }
        }
        await deleteReviewWord(user.uid, id);
        setWords(previous => previous.filter(item => item.id !== id));
    }, [user]);

    const [reviewTimestamp, setReviewTimestamp] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => setReviewTimestamp(Date.now()), 60000);
        const onFocus = () => setReviewTimestamp(Date.now());
        window.addEventListener("focus", onFocus);
        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", onFocus);
        };
    }, []);

    const rawDueWords = useMemo(
        () => words.filter((w) => SRS.isDue(w, reviewTimestamp)),
        [words, reviewTimestamp]
    );
    const rawDueCount = rawDueWords.length;
    // In cram mode, all words are presented for review; otherwise only due words
    const dueWords = isCramMode ? words : rawDueWords;

    return (
        <AuthContext.Provider
            value={{
                user,
                plan,
                isPaid,
                subscriptionInfo,
                refreshPlan,
                loading,
                isSigningIn,
                authError,
                wordsError,
                words,
                dueWords,
                rawDueCount,
                loadingWords,
                viewMode,
                isCramMode,
                openReviews,
                openLanding,
                toggleViewMode,
                startCramMode,
                exitCramMode,
                signInWithGoogle,
                signOut,
                refreshWords,
                recordWordRating,
                flushPendingReviews,
                editWord,
                removeWord,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
