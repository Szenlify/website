import React from "react";
import type { Dict } from "@/lib/i18n/types";

interface FinalCTAProps {
    dict: Pick<Dict, "finalCta">;
}

export default function FinalCTA({ dict }: FinalCTAProps) {
    const { finalCta } = dict;
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden border border-indigo-500/40 bg-linear-to-r from-indigo-900/40 via-purple-900/30 to-cyan-900/40 shadow-2xl shadow-indigo-950/60">
                    <div className="relative z-10">
                        <h2 className="font-display font-black text-3xl sm:text-5xl text-white mb-4">
                            {finalCta.title1}
                            <br />
                            <span className="text-gradient">
                                {finalCta.title2}
                            </span>
                        </h2>
                        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
                            {finalCta.subtitle}
                        </p>
                        <a
                            href="https://chromewebstore.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                        >
                            <svg
                                height={32}
                                width={32}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="ionicon shrink-0"
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
        </section>
    );
}
