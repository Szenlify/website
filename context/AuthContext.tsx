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
    words: ReviewWord[];
    dueWords: ReviewWord[];
    loadingWords: boolean;
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
    words: [],
    dueWords: [],
    loadingWords: false,
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
    const [words, setWords] = useState<ReviewWord[]>([]);
    const [loadingWords, setLoadingWords] = useState(false);

    const loadWords = useCallback(async (uid: string) => {
        setLoadingWords(true);
        try {
            const fetched = await fetchUserWords(uid);
            setWords(fetched);
        } finally {
            setLoadingWords(false);
        }
    }, []);

    useEffect(() => {
        // Check if returning from a redirect sign-in
        void checkRedirectAuth().then((redirectUser) => {
            if (redirectUser) {
                setUser(redirectUser);
            }
        });

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser?.uid) {
                void loadWords(currentUser.uid);
            } else {
                setWords([]);
            }
        });

        return () => unsubscribe();
    }, [loadWords]);

    const refreshWords = useCallback(async () => {
        if (user?.uid) {
            await loadWords(user.uid);
        }
    }, [user, loadWords]);

    const signInWithGoogle = useCallback(async () => {
        setAuthError(null);
        setIsSigningIn(true);
        try {
            await loginWithGoogle();
        } catch (error: any) {
            console.error("Google sign in error:", error);
            const msg = error.code
                ? `Błąd logowania (${error.code}): ${error.message}`
                : `Nie udało się zalogować: ${error.message || error}`;
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
    const dueWords = words.filter((w) => SRS.isDue(w, now));

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isSigningIn,
                authError,
                words,
                dueWords,
                loadingWords,
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
