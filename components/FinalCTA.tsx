import React from "react";
import motion from "./LandingMotion.module.css";
import type { Dict } from "@/lib/i18n/types";
import ChromeInstallButton from "./ChromeInstallButton";
import heroStyles from "./Hero.module.css";

interface FinalCTAProps {
    dict: Pick<Dict, "finalCta">;
}

export default function FinalCTA({ dict }: FinalCTAProps) {
    const { finalCta } = dict;
    return (
        <section className="pb-24 sm:pb-36 lg:pb-44 relative z-10" id="download">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${motion.finalCard} relative rounded-3xl p-10 sm:p-20 text-center overflow-hidden border border-indigo-500/30 bg-gradient-to-b from-[#12162e]/90 via-[#0d1024]/90 to-[#070913]/90 backdrop-blur-2xl shadow-2xl shadow-indigo-950/70`}>
                    <div className={motion.frameBorder} aria-hidden="true">
                        <span className={heroStyles.borderSweep} />
                    </div>
                    {/* Subtle ambient lighting behind text */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 blur-3xl"
                    />

                    <div className="relative z-10">

                        {/* Title */}
                        <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white mb-6 tracking-tight leading-tight text-balance">
                            {finalCta.title1}{" "}
                            <span className="text-gradient">
                                {finalCta.title2}
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className="text-slate-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-normal text-balance">
                            {finalCta.subtitle}
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <ChromeInstallButton label={finalCta.cta} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
