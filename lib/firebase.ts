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
    updateDoc,
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
    } catch (error: any) {
        console.warn("signInWithPopup error, testing fallback:", error);
        // If popup is blocked by browser or on mobile, fallback to redirect
        if (
            error.code === "auth/popup-blocked" ||
            error.code === "auth/cancelled-popup-request"
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
    } catch (error) {
        console.error("checkRedirectAuth error:", error);
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

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const word: ReviewWord = {
                id: data.id || docSnap.id,
                original: String(data.original || ""),
                translated: String(data.translated || ""),
                sentence: String(data.sentence || ""),
                sentenceTranslated: String(data.sentenceTranslated || ""),
                srcLang: String(data.srcLang || "en"),
                tgtLang: String(data.tgtLang || "pl"),
                screenshot: String(data.screenshot || ""),
                timestamp: Number(data.timestamp || 0),
                updatedAt: Number(data.updatedAt || 0),
            };

            if (data.sr_reps !== undefined || data.sr_step !== undefined || data.sr_nextReview !== undefined) {
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
        return [];
    }
}

export async function saveWordReviewRating(
    uid: string,
    word: ReviewWord,
    grade: 1 | 2
): Promise<SRState> {
    const updatedSr = SRS.update(word.sr, grade, Date.now());
    word.sr = updatedSr;
    word.updatedAt = Date.now();

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
            updatedAt: word.updatedAt,
        });
    } catch (error) {
        console.error("Error updating word review in Firestore:", error);
    }

    return updatedSr;
}
