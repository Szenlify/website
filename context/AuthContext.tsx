"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
    auth,
    loginWithGoogle,
    logoutUser,
    fetchUserWords,
    saveWordReviewRating,
    checkRedirectAuth,
} from "@/lib/firebase";
import { SRS, type ReviewWord } from "@/lib/srs";

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    isSigningIn: boolean;
    authError: string | null;
    wordsError: string | null;
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
    recordWordRating: (word: ReviewWord, grade: 1 | 2) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
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

    const loadWords = useCallback(async (uid: string) => {
        setLoadingWords(true);
        setWordsError(null);
        try {
            const fetched = await fetchUserWords(uid);
            setWords(fetched);
        } catch (err: any) {
            console.error("Error loading user words:", err);
            setWordsError(err.message || "Błąd pobierania słówek z bazy.");
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
        } catch (error: any) {
            console.error("Google sign in error:", error);
            const msg = error.message || String(error);
            setAuthError(msg);
            alert(msg);
            throw error;
        } finally {
            setIsSigningIn(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            await logoutUser();
            setUser(null);
            setWords([]);
            setViewMode("landing");
            setIsCramMode(false);
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    }, []);

    const recordWordRating = useCallback(
        async (word: ReviewWord, grade: 1 | 2) => {
            if (!user?.uid) return;
            const updatedSr = await saveWordReviewRating(user.uid, word, grade);
            setWords((prev) =>
                prev.map((w) => (w.id === word.id ? { ...w, sr: updatedSr, updatedAt: Date.now() } : w))
            );
        },
        [user]
    );

    const now = Date.now();
    const rawDueWords = words.filter((w) => SRS.isDue(w, now));
    const rawDueCount = rawDueWords.length;
    // In cram mode, all words are presented for review; otherwise only due words
    const dueWords = isCramMode ? words : rawDueWords;

    return (
        <AuthContext.Provider
            value={{
                user,
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
