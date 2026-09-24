import React from "react";
import type { Dict } from "@/lib/i18n/types";
import { Sparkles } from "lucide-react";

interface HowItWorksProps {
    dict: Pick<Dict, "hiw">;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
    const { hiw } = dict;

    const steps = [
        {
            num: "01",
            title: hiw.s1title,
            desc: hiw.s1desc,
            gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
            badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
        },
        {
            num: "02",
            title: hiw.s2title,
            desc: hiw.s2desc,
            gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
            badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
        },
        {
            num: "03",
            title: hiw.s3title,
            desc: hiw.s3desc,
            gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
            badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        },
    ];

    return (
        <section className="pb-24 sm:pb-36 lg:pb-44 relative z-10" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-bold text-cyan-300 mb-5 tracking-wider uppercase">
                        <Sparkles className="size-3.5" />
                        <span>{hiw.tag}</span>
                    </div>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-5 tracking-tight text-balance">
                        {hiw.title}
                    </h2>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed text-balance max-w-2xl mx-auto">
                        {hiw.subtitle}
                    </p>
                </div>

                {/* Steps Grid */}
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
                    {steps.map((step) => (
                        <li
                            key={step.num}
                            className="group relative rounded-3xl border border-white/[0.08] bg-[#0c1020]/75 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#0f152a]/90 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/40"
                        >
                            {/* Subtle ambient gradient inside card */}
                            <div
                                aria-hidden="true"
                                className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b ${step.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                            />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    {/* Step Number Badge */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={`inline-flex items-center justify-center font-mono font-extrabold text-xs px-3.5 py-1.5 rounded-full border ${step.badgeColor}`}>
                                            Step {step.num}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="font-display font-black text-4xl text-white/10 group-hover:text-white/20 transition-colors select-none"
                                        >
                                            {step.num}
                                        </span>
                                    </div>

                                    {/* Step Title */}
                                    <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-4 tracking-tight group-hover:text-indigo-100 transition-colors">
                                        {step.title}
                                    </h3>

                                    {/* Step Description */}
                                    <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
