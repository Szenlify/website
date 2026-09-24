import React from "react";
import type { Dict } from "@/lib/i18n/types";
import { CHROME_STORE_URL } from "@/lib/config";
import { Sparkles } from "lucide-react";

interface FinalCTAProps {
    dict: Pick<Dict, "finalCta">;
}

export default function FinalCTA({ dict }: FinalCTAProps) {
    const { finalCta } = dict;
    return (
        <section className="py-24 sm:py-36 lg:py-44 relative z-10" id="download">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl p-10 sm:p-20 text-center overflow-hidden border border-indigo-500/30 bg-gradient-to-b from-[#12162e]/90 via-[#0d1024]/90 to-[#070913]/90 backdrop-blur-2xl shadow-2xl shadow-indigo-950/70">
                    {/* Subtle ambient lighting behind text */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 blur-3xl"
                    />

                    <div className="relative z-10">
                        {/* Pill Tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-bold text-indigo-300 mb-8 uppercase tracking-wider">
                            <Sparkles className="size-3.5" />
                            <span>Instant Access • No Credit Card</span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight text-balance">
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
                            <a
                                href={CHROME_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto min-h-[58px] inline-flex items-center justify-center gap-3.5 px-10 py-4.5 rounded-2xl text-lg font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                            >
                                <svg
                                    height={28}
                                    width={28}
                                    fill="white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="shrink-0"
                                >
                                    <path d="M188.8 255.93a67.2 67.2 0 1 0 67.2-67.18 67.38 67.38 0 0 0-67.2 67.18" />
                                    <path d="M476.75 217.79v.05a207 207 0 0 0-7-28.84h-.11a202 202 0 0 1 7.07 29 203.5 203.5 0 0 0-7.07-29h-155.4c19.05 17 31.36 40.17 31.36 67.05a86.55 86.55 0 0 1-12.31 44.73L231 478.45a2 2 0 0 1 0 .27v.28-.26a224 224 0 0 0 25 1.26c6.84 0 13.61-.39 20.3-1a223 223 0 0 0 29.78-4.74C405.68 451.52 480 362.4 480 255.94a225 225 0 0 0-3.25-38.15" />
                                    <path d="M256 345.5c-33.6 0-61.6-17.91-77.29-44.79L76 123.05l-.14-.24A224 224 0 0 0 207.4 474.55v-.05l77.69-134.6a84.1 84.1 0 0 1-29.09 5.6" />
                                    <path d="m91.29 104.57 77.35 133.25A89.19 89.19 0 0 1 256 166h205.17a246.5 246.5 0 0 0-25.78-43.94l.12.08A245.3 245.3 0 0 1 461.17 166h.17a246 246 0 0 0-25.66-44 2.6 2.6 0 0 1-.35-.26 223.93 223.93 0 0 0-344.19-17.4l.14.24Z" />
                                </svg>
                                <span>{finalCta.cta}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
