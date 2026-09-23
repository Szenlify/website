"use client";

import React, { useLayoutEffect } from "react";
import { resetReviewScroll } from "@/lib/review-scroll";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ReviewRunner from "@/components/ReviewRunner";
import type { Dict, Locale } from "@/lib/i18n/types";
import { getLocalizedHref } from "@/lib/routing";
import { Home, Sparkles } from "lucide-react";

interface DashboardReviewsClientProps {
    dict: Dict;
    locale: Locale;
}

export default function DashboardReviewsClient({
    dict,
    locale,
}: DashboardReviewsClientProps) {
    const { user, loading, isSigningIn, signInWithGoogle } = useAuth();
    const r = dict.reviews;

    useLayoutEffect(() => {
        resetReviewScroll();
    }, [loading, user?.uid, locale]);

    // Loading auth state
    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <div className="size-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-200 font-semibold text-base">{r.loadingTitle}</p>
                <p className="text-slate-400 text-xs mt-1">{r.loadingSubtitle}</p>
            </div>
        );
    }

    // Unauthenticated State
    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
                <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#0d101d]/80 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col items-center text-center">
                    <div className="size-16 rounded-2xl bg-linear-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 shadow-xl shadow-indigo-500/10">
                        <Sparkles className="size-8" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
                        <span>{r.badge}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
                        {r.unauthTitle}
                    </h1>

                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                        {r.unauthDesc}
                    </p>

                    <button
                        type="button"
                        disabled={isSigningIn}
                        onClick={() => void signInWithGoogle()}
                        className="w-full h-13 rounded-2xl font-extrabold text-sm text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-98 transition cursor-pointer disabled:opacity-50"
                    >
                        {isSigningIn ? (
                            <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        ) : (
                            <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
                                />
                            </svg>
                        )}
                        <span>{isSigningIn ? r.signingIn : r.signInWithGoogle}</span>
                    </button>

                    <Link
                        href={getLocalizedHref("/", locale)}
                        className="mt-6 text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5"
                    >
                        <Home className="size-3.5" />
                        <span>{r.backToHome}</span>
                    </Link>
                </div>
            </div>
        );
    }

    // Authenticated Reviews View
    return (
        <div data-reviews-page className="w-full max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-8 min-h-screen flex flex-col">
            <div className="grow flex flex-col justify-start">
                <ReviewRunner dict={dict} locale={locale} />
            </div>
        </div>
    );
}
