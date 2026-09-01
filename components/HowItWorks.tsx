import React from "react";
import type { Dict } from "@/lib/i18n/types";

interface HowItWorksProps {
    dict: Pick<Dict, "hiw">;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
    const { hiw } = dict;
    return (
        <section className="py-24 relative z-10" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {hiw.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {hiw.title}
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        {hiw.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-panel p-8 relative">
                        <div className="font-display font-black text-5xl text-indigo-500/20 mb-4">
                            01
                        </div>
                        <h3 className="font-display font-bold text-xl text-white mb-3">
                            {hiw.s1title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {hiw.s1desc}
                        </p>
                    </div>

                    <div className="glass-panel p-8 relative">
                        <div className="font-display font-black text-5xl text-indigo-500/20 mb-4">
                            02
                        </div>
                        <h3 className="font-display font-bold text-xl text-white mb-3">
                            {hiw.s2title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {hiw.s2desc}
                        </p>
                    </div>

                    <div className="glass-panel p-8 relative">
                        <div className="font-display font-black text-5xl text-indigo-500/20 mb-4">
                            03
                        </div>
                        <h3 className="font-display font-bold text-xl text-white mb-3">
                            {hiw.s3title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {hiw.s3desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
