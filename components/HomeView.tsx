"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import ReviewRunner from "@/components/ReviewRunner";
import type { Dict, Locale } from "@/lib/i18n/types";
import { LayoutDashboard, Sparkles, Home } from "lucide-react";

interface HomeViewProps {
    dict: Dict;
    locale: Locale;
    children: React.ReactNode;
}

export default function HomeView({ dict, locale, children }: HomeViewProps) {
    const { user, loading, viewMode, openReviews, openLanding, rawDueCount, words } = useAuth();

    // While checking auth on initial load, show landing content without flickering
    if (loading || !user) {
        return <>{children}</>;
    }

    if (viewMode === "landing") {
        return (
            <div>
                {/* Floating quick access button to return to reviews */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        type="button"
                        onClick={openReviews}
                        className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-2xl shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-indigo-400/30"
                    >
                        <Sparkles className="size-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
                        <span>Powtórki</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-mono font-bold">
                            {rawDueCount}
                        </span>
                    </button>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-[85vh] flex flex-col pt-4 sm:pt-6 pb-16">
            {/* Top Bar inside Reviews Mode */}
            <div className="max-w-xl mx-auto w-full px-4 flex items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                    <span className="hidden xs:inline">Zalogowano:</span>
                    <strong className="text-white font-semibold truncate max-w-[160px] sm:max-w-[220px]">
                        {user.displayName || user.email}
                    </strong>
                </div>
                <button
                    type="button"
                    onClick={openLanding}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium transition cursor-pointer active:scale-95 text-xs"
                >
                    <Home className="size-3.5 text-indigo-400" />
                    <span>Strona główna</span>
                </button>
            </div>

            <ReviewRunner dict={dict} locale={locale} />
        </div>
    );
}
