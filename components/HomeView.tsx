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
    const count = Number(rawDueCount) || 0;

    return (
        <div>
            {user && (
                /* Główny kontener z animacją pojawiania się od dołu */
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-forwards">
                    <Link
                        href={getLocalizedHref("/dashboard/reviews", locale)}
                        className="group relative inline-flex items-center justify-center cursor-pointer rounded-full focus:outline-none"
                    >
                        {/* Subtelna poświata (Ambient Glow) po najechaniu */}
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-500/30 via-indigo-500/30 to-rose-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Główny korpus przycisku (Glassmorphism & Border) */}
                        <div className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1f0226] border border-white/10 text-zinc-300 text-xs sm:text-sm font-medium shadow-2xl transition-all duration-300 group-hover:border-white/25 group-hover:text-white group-active:scale-95">
                            
                            {/* Ikona Sparkles */}
                            <Sparkles className="w-4 h-4 text-violet-400/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-violet-300" />
                            
                            {/* Etykieta */}
                            <span className="tracking-wide">{dict.nav.reviews}</span>

                            {/* Minimalistyczny Badge z liczbą */}
                            {rawDueCount !== undefined && (
                                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono font-semibold rounded-full bg-white/5 border border-white/10 text-zinc-300 transition-colors duration-300 group-hover:bg-violet-500/20 group-hover:border-violet-500/30 group-hover:text-violet-200">
                                    {count}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            )}
            {children}
        </div>
    );
}