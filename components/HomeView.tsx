"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import type { Dict, Locale } from "@/lib/i18n/types";
import { Sparkles } from "lucide-react";
import { getLocalizedHref } from "@/lib/routing";

interface HomeViewProps {
    dict: Dict;
    locale: Locale;
    children: React.ReactNode;
}

export default function HomeView({ dict, locale, children }: HomeViewProps) {
    const { user, rawDueCount } = useAuth();

    return (
        <div>
            {user && (
                <div className="fixed bottom-6 right-6 z-50">
                    <Link
                        href={getLocalizedHref("/dashboard/reviews", locale)}
                        className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-2xl shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-indigo-400/30"
                    >
                        <Sparkles className="size-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
                        <span>{dict.nav.reviews || "Powtórki"}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-mono font-bold">
                            {rawDueCount}
                        </span>
                    </Link>
                </div>
            )}
            {children}
        </div>
    );
}
