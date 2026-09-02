import React from "react";
import type { Dict } from "@/lib/i18n/types";
import { CHROME_STORE_URL } from "@/lib/config";

interface PricingProps {
    dict: Dict;
}

export default function Pricing({ dict }: PricingProps) {
    const { pricing } = dict;

    return (
        <section
            className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="pricing"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {pricing.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {pricing.title}
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        {pricing.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {/* Free Plan */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between">
                        <div>
                            <div className="font-display font-extrabold text-2xl text-white mb-1">
                                {pricing.free.name}
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                {pricing.free.desc}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    $0
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    {pricing.free.forever}
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f2}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f3}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f4}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f5}</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition"
                        >
                            {pricing.free.cta}
                        </a>
                    </div>

                    {/* Basic Plan (Most Popular) */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between relative bg-gradient-to-b from-[#1e274d]/90 to-[#0e1222]/95 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/25 md:-translate-y-2">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                            {pricing.mostPopular}
                        </div>

                        <div>
                            <div className="font-display font-extrabold text-2xl text-indigo-400 mb-1">
                                {pricing.basic.name}
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                {pricing.basic.desc}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    $7.99
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    {pricing.basic.mo}
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                                <li className="flex items-start gap-3 text-indigo-300 font-bold">
                                    <span className="text-indigo-400 font-black">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.trial}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.f2}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.f3}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.f4}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.f5}</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transition"
                        >
                            {pricing.basic.cta}
                        </a>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between">
                        <div>
                            <div className="font-display font-extrabold text-2xl text-white mb-1">
                                {pricing.pro.name}
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                {pricing.pro.desc}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    $19.99
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    {pricing.pro.mo}
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                                <li className="flex items-start gap-3 text-indigo-300 font-bold">
                                    <span className="text-indigo-400 font-black">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.trial}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.f2}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.f3}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.f4}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.f5}</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition"
                        >
                            {pricing.pro.cta}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
