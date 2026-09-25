import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut as fbSignOut,
    type User,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
} from "firebase/firestore";
import { SRS, type ReviewWord, type SRState } from "./srs";

const firebaseConfig = {
    apiKey: "AIzaSyCjJRBkjpxbCVtCSaB6Clk01eIx1-3V7Po",
    authDomain: "extension-eng.firebaseapp.com",
    projectId: "extension-eng",
    storageBucket: "extension-eng.firebasestorage.app",
    messagingSenderId: "249798889726",
    appId: "1:249798889726:web:ec7665bd684a79343455af",
    measurementId: "G-ZHBR7CGGPG",
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export async function loginWithGoogle(): Promise<User | null> {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error: unknown) {
        const fbErr = error as { code?: string; message?: string };
        console.warn("signInWithPopup error, testing fallback:", error);

        if (fbErr.code === "auth/unauthorized-domain") {
            const host = typeof window !== "undefined" ? window.location.hostname : "Vercel";
            fbErr.message = `Domena "${host}" nie jest autoryzowana w Firebase! Aby logowanie działało na Vercel: przejdź do Firebase Console (projekt: extension-eng) -> Authentication -> Ustawienia (Settings) -> Autoryzowane domeny (Authorized domains) i kliknij "Dodaj domenę" wpisując: ${host}`;
            throw error;
        }

        // If popup is blocked by browser or on mobile, fallback to redirect
        if (
            fbErr.code === "auth/popup-blocked" ||
            fbErr.code === "auth/cancelled-popup-request"
        ) {
            await signInWithRedirect(auth, googleProvider);
            return null;
        }
        throw error;
    }
}

export async function checkRedirectAuth(): Promise<User | null> {
    try {
        const result = await getRedirectResult(auth);
        return result?.user ?? null;
    } catch (error: unknown) {
        const fbErr = error as { code?: string };
        console.error("checkRedirectAuth error:", error);
        if (fbErr.code === "auth/unauthorized-domain") {
            const host = typeof window !== "undefined" ? window.location.hostname : "Vercel";
            alert(`Domena "${host}" nie jest autoryzowana w Firebase! Dodaj "${host}" w Firebase Console -> Authentication -> Authorized domains.`);
        }
        return null;
    }
}

export async function logoutUser(): Promise<void> {
    await fbSignOut(auth);
}

export async function fetchUserWords(uid: string): Promise<ReviewWord[]> {
    if (!uid) return [];
    try {
        const wordsRef = collection(db, "users", uid, "words");
        const snapshot = await getDocs(wordsRef);
        const words: ReviewWord[] = [];

        console.info(`[Lectoro Firebase] Found ${snapshot.size} words in users/${uid}/words`);

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const original = String(data.original || data.word || "").trim();
            const translated = String(data.translated || data.translation || "").trim();

            const word: ReviewWord = {
                id: data.id || docSnap.id,
                original,
                translated,
                sentence: String(data.sentence || ""),
                sentenceTranslated: String(data.sentenceTranslated || ""),
                srcLang: String(data.srcLang || "en"),
                tgtLang: String(data.tgtLang || "pl"),
                screenshot: String(data.screenshot || ""),
                timestamp: Number(data.timestamp || 0),
                updatedAt: Number(data.updatedAt || 0),
                ttsCacheInvalidatedAt: Number(data.ttsCacheInvalidatedAt || 0),
            };

            if (
                data.sr_reps !== undefined ||
                data.sr_step !== undefined ||
                data.sr_nextReview !== undefined
            ) {
                const reps = Number(data.sr_reps ?? data.sr_step ?? 0);
                word.sr = {
                    reps,
                    step: reps,
                    easeFactor: Number(data.sr_easeFactor ?? 2.5),
                    interval: Number(data.sr_interval ?? 0),
                    lapses: Number(data.sr_lapses ?? 0),
                    nextReview: Number(data.sr_nextReview ?? 0),
                    lastReview: data.sr_lastReview ? Number(data.sr_lastReview) : null,
                };
            } else if (data.sr && typeof data.sr === "object") {
                const reps = Number(data.sr.reps ?? data.sr.step ?? 0);
                word.sr = {
                    reps,
                    step: reps,
                    easeFactor: Number(data.sr.easeFactor ?? 2.5),
                    interval: Number(data.sr.interval ?? 0),
                    lapses: Number(data.sr.lapses ?? 0),
                    nextReview: Number(data.sr.nextReview ?? 0),
                    lastReview: data.sr.lastReview ? Number(data.sr.lastReview) : null,
                };
            }

            SRS.ensure(word);
            if (word.original) {
                words.push(word);
            }
        });

        return words;
    } catch (error) {
        console.error("Error fetching user words from Firestore:", error);
        throw error;
    }
}

export async function saveWordReviewRating(
    uid: string,
    word: ReviewWord,
    grade: 1 | 2
): Promise<SRState> {
    const updatedSr = SRS.update(word.sr, grade, Date.now());


    try {
        const wordRef = doc(db, "users", uid, "words", word.id);
        await updateDoc(wordRef, {
            sr_reps: updatedSr.reps,
            sr_step: updatedSr.step,
            sr_interval: updatedSr.interval,
            sr_easeFactor: updatedSr.easeFactor,
            sr_lapses: updatedSr.lapses,
            sr_nextReview: updatedSr.nextReview,
            sr_lastReview: updatedSr.lastReview,
            updatedAt: Date.now(),
        });
    } catch (error) {
        console.error("Error updating word review in Firestore:", error);
        throw error;
    }

    return updatedSr;
}

export async function commitBatchedWordReviews(
    uid: string,
    updates: Record<string, SRState>
): Promise<void> {
    const entries = Object.entries(updates);
    if (!uid || entries.length === 0) return;

    // Firestore batch limit is 500 operations.
    const CHUNK_SIZE = 500;
    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
        const chunk = entries.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);
        const now = Date.now();

        for (const [wordId, sr] of chunk) {
            const wordRef = doc(db, "users", uid, "words", wordId);
            batch.update(wordRef, {
                sr_reps: sr.reps,
                sr_step: sr.step,
                sr_interval: sr.interval,
                sr_easeFactor: sr.easeFactor,
                sr_lapses: sr.lapses,
                sr_nextReview: sr.nextReview,
                sr_lastReview: sr.lastReview,
                updatedAt: now,
            });
        }

        await batch.commit();
    }
}

export async function editReviewWord(uid: string, word: ReviewWord): Promise<void> {
    await updateDoc(doc(db, "users", uid, "words", word.id), {
        original: word.original, translated: word.translated,
        sentence: word.sentence || "", sentenceTranslated: word.sentenceTranslated || "",
        updatedAt: Date.now(), ttsCacheInvalidatedAt: Date.now(),
    });
}
export async function deleteReviewWord(uid: string, id: string): Promise<void> {
    await deleteDoc(doc(db, "users", uid, "words", id));
}


export type UserPlan = "free" | "basic" | "pro";

const GEMINI_PROXY_URL = "https://europe-west1-extension-eng.cloudfunctions.net/geminiProxy";

export async function fetchUserPlan(uid: string): Promise<UserPlan> {
    if (!uid) return "free";
    try {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
            const data = userSnap.data();
            const now = Date.now();
            const prepaid = data.prepaidAccess || {};
            const proEnd = Number(prepaid.pro || 0);
            const basicEnd = Number(prepaid.basic || 0);
            if (proEnd > now) return "pro";
            if (basicEnd > now) return "basic";

            const plan = String(data.plan || data.subscriptionPlan || "").toLowerCase().trim();
            if (plan === "pro" || plan === "basic") return plan as UserPlan;

            const status = String(data.subscriptionStatus || "").toLowerCase().trim();
            if (status === "active" || status === "trialing") {
                if (plan === "pro") return "pro";
                return "basic";
            }
        }

        // Also check subscriptionPlans collection (manual admin grant in Firebase Console)
        try {
            const subPlanSnap = await getDoc(doc(db, "subscriptionPlans", uid));
            if (subPlanSnap.exists()) {
                const spPlan = String(subPlanSnap.data()?.plan || "").toLowerCase().trim();
                if (spPlan === "pro" || spPlan === "basic") return spPlan as UserPlan;
            }
        } catch {}

        return "free";
    } catch (err) {
        console.warn("[Firebase] Could not fetch user plan from Firestore:", err);
        return "free";
    }
}

export async function getUserPlan(user: User | null): Promise<UserPlan> {
    if (!user) return "free";
    try {
        // 1. Force refresh token to get fresh custom claims from Firebase Auth server
        const tokenResult = await user.getIdTokenResult(true).catch(() => null);
        const claimPlan = String(tokenResult?.claims?.plan || "").toLowerCase().trim();
        if (claimPlan === "pro" || claimPlan === "basic") {
            return claimPlan as UserPlan;
        }

        // 2. Check Firestore users/{uid} and subscriptionPlans/{uid}
        const firestorePlan = await fetchUserPlan(user.uid);
        if (firestorePlan === "pro" || firestorePlan === "basic") {
            return firestorePlan;
        }

        // 3. Query authoritative geminiProxy backend (SSOT)
        if (tokenResult?.token) {
            try {
                const response = await fetch(GEMINI_PROXY_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenResult.token}`,
                    },
                    body: JSON.stringify({ action: "subscription" }),
                });
                if (response.ok) {
                    const data = await response.json().catch(() => ({}));
                    const authoritative = String(data?.profile?.plan || "").toLowerCase().trim();
                    if (authoritative === "pro" || authoritative === "basic") {
                        return authoritative as UserPlan;
                    }
                }
            } catch (proxyErr) {
                console.warn("[Firebase] geminiProxy subscription check error:", proxyErr);
            }
        }

        return "free";
    } catch {
        return "free";
    }
}

export interface SubscriptionDetails {
    plan: UserPlan;
    isPaid: boolean;
    ttsLimit: number;
    ttsUsed: number;
    ttsRemaining: number;
    month: string;
}

export const PLAN_TTS_LIMITS: Record<UserPlan, number> = {
    free: 0,
    basic: 10000,
    pro: 100000,
};

export function getCurrentMonth(): string {
    return new Date().toISOString().slice(0, 7);
}

export async function fetchUserSubscriptionDetails(user: User | null): Promise<SubscriptionDetails> {
    const month = getCurrentMonth();
    if (!user) {
        return {
            plan: "free",
            isPaid: false,
            ttsLimit: 0,
            ttsUsed: 0,
            ttsRemaining: 0,
            month,
        };
    }

    let plan: UserPlan = "free";
    let ttsUsed = 0;

    try {
        // 1. Force refresh token for fresh custom claims
        const tokenResult = await user.getIdTokenResult(true).catch(() => null);
        const claimPlan = String(tokenResult?.claims?.plan || "").toLowerCase().trim();
        if (claimPlan === "pro" || claimPlan === "basic") {
            plan = claimPlan as UserPlan;
        }

        // 2. Check Firestore users/{uid}
        const userSnap = await getDoc(doc(db, "users", user.uid)).catch(() => null);
        if (userSnap && userSnap.exists()) {
            const data = userSnap.data();
            const now = Date.now();
            const prepaid = data.prepaidAccess || {};
            const proEnd = Number(prepaid.pro || 0);
            const basicEnd = Number(prepaid.basic || 0);
            if (proEnd > now) plan = "pro";
            else if (basicEnd > now && plan !== "pro") plan = "basic";
            else if (plan === "free") {
                const p = String(data.plan || data.subscriptionPlan || "").toLowerCase().trim();
                if (p === "pro" || p === "basic") plan = p as UserPlan;
                const status = String(data.subscriptionStatus || "").toLowerCase().trim();
                if (status === "active" || status === "trialing") {
                    plan = p === "pro" ? "pro" : "basic";
                }
            }

            const resetDate = String(data.elevenLabsResetDate || "");
            if (resetDate === month) {
                ttsUsed = Math.max(0, Number(data.elevenLabsCharactersThisMonth) || 0);
            }
        }

        // 3. Fallback: check subscriptionPlans/{uid} if still free
        if (plan === "free") {
            const subSnap = await getDoc(doc(db, "subscriptionPlans", user.uid)).catch(() => null);
            if (subSnap && subSnap.exists()) {
                const p = String(subSnap.data()?.plan || "").toLowerCase().trim();
                if (p === "pro" || p === "basic") plan = p as UserPlan;
            }
        }

        // 4. Also sync with geminiProxy for authoritative verification
        if (tokenResult?.token) {
            try {
                const response = await fetch(GEMINI_PROXY_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenResult.token}`,
                    },
                    body: JSON.stringify({ action: "subscription" }),
                });
                if (response.ok) {
                    const data = await response.json().catch(() => ({}));
                    const authoritative = String(data?.profile?.plan || "").toLowerCase().trim();
                    if (authoritative === "pro" || authoritative === "basic") {
                        plan = authoritative as UserPlan;
                    }
                    const serverUsed = data?.profile?.usage?.elevenLabsCharacters?.used;
                    if (typeof serverUsed === "number") {
                        ttsUsed = Math.max(ttsUsed, serverUsed);
                    }
                }
            } catch (proxyErr) {
                console.warn("[Firebase] geminiProxy subscription check error:", proxyErr);
            }
        }
    } catch (err) {
        console.warn("[Firebase] fetchUserSubscriptionDetails error:", err);
    }

    const isPaid = plan === "basic" || plan === "pro";
    const ttsLimit = PLAN_TTS_LIMITS[plan] || 0;
    const ttsRemaining = isPaid ? Math.max(0, ttsLimit - ttsUsed) : 0;

    return {
        plan,
        isPaid,
        ttsLimit,
        ttsUsed,
        ttsRemaining,
        month,
    };
}
