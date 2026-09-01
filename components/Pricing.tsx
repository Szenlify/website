import React from "react";

export default function Pricing() {
    return (
        <section
            className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="pricing"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        Transparent Pricing
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        Choose the Plan That Fits Your Goals
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        Start completely free. Upgrade whenever you&apos;re
                        ready to unlock the full power of AI tutors and
                        ElevenLabs voices.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {/* Free Plan */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between">
                        <div>
                            <div className="font-display font-extrabold text-2xl text-white mb-1">
                                FREE
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                For casual viewers and beginners
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    $0
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    / forever
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        Dual subtitles for Netflix & YouTube
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>In-page web article translation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        Up to{" "}
                                        <strong>50 saved SRS flashcards</strong>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>10 AI queries / month</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        Standard browser speech synthesis
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href="https://chromewebstore.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition"
                        >
                            Get Started Free
                        </a>
                    </div>

                    {/* Basic Plan (Most Popular) */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between relative bg-gradient-to-b from-[#1e274d]/90 to-[#0e1222]/95 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/25 md:-translate-y-2">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                            Most Popular
                        </div>

                        <div>
                            <div className="font-display font-extrabold text-2xl text-indigo-400 mb-1">
                                BASIC
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                For regular language learners
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    $7.99
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    / month
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                                <li className="flex items-start gap-3 text-indigo-300 font-bold">
                                    <span className="text-indigo-400 font-black">
                                        ✓
                                    </span>
                                    <span>3 DAYS FREE TRIAL</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>Everything in FREE plan</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        Up to{" "}
                                        <strong>3,000 SRS flashcards</strong> in
                                        cloud
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        <strong>200 2.5 AI queries</strong> /
                                        month
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        <strong>
                                            20,000 ElevenLabs characters
                                        </strong>{" "}
                                        / mo
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        1-Click export to Anki, PDF, and CSV
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href="https://chromewebstore.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transition"
                        >
                            Start 3-Day Free Trial
                        </a>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between">
                        <div>
                            <div className="font-display font-extrabold text-2xl text-white mb-1">
                                PRO
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                For exam preparation & polyglots
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    $19.99
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    / month
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                                <li className="flex items-start gap-3 text-indigo-300 font-bold">
                                    <span className="text-indigo-400 font-black">
                                        ✓
                                    </span>
                                    <span>3 DAYS FREE TRIAL</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>Everything in BASIC plan</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        Up to{" "}
                                        <strong>10,000 SRS flashcards</strong>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        <strong>1,200 AI queries</strong> /
                                        month
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>
                                        <strong>
                                            120,000 ElevenLabs characters
                                        </strong>{" "}
                                        / mo
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>Priority AI quiz generation</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href="https://chromewebstore.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition"
                        >
                            Start Pro Trial
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
