"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ReviewRunner from "@/components/ReviewRunner";
import type { Dict, Locale } from "@/lib/i18n/types";
import { LayoutDashboard, Globe } from "lucide-react";

interface HomeViewProps {
    dict: Dict;
    locale: Locale;
    children: React.ReactNode;
}

export default function HomeView({ dict, locale, children }: HomeViewProps) {
    const { user, loading } = useAuth();
    const [viewMode, setViewMode] = useState<"reviews" | "landing">("reviews");

    // While checking auth on initial load, show landing content without flickering
    if (loading || !user) {
        return <>{children}</>;
    }

    if (viewMode === "landing") {
        return (
            <div>
                {/* Floating button to return to reviews */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        type="button"
                        onClick={() => setViewMode("reviews")}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-2xl shadow-indigo-500/50 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                        <LayoutDashboard className="size-4" />
                        <span>Wróć do powtórek</span>
                    </button>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex flex-col pt-4 pb-16">
            <div className="max-w-md mx-auto w-full px-4 flex items-center justify-between mb-4 text-xs">
                <span className="text-slate-400 font-medium">
                    Zalogowano jako <strong className="text-white">{user.displayName || user.email}</strong>
                </span>
                <button
                    type="button"
                    onClick={() => setViewMode("landing")}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                    Strona główna
                </button>
            </div>

            <ReviewRunner dict={dict} locale={locale} />
        </div>
    );
}
