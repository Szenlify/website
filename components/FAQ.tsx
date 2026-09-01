"use client";

import React, { useState } from "react";
import type { Dict } from "@/lib/i18n/types";

interface FAQProps {
    dict: Pick<Dict, "faq">;
}

export default function FAQ({ dict }: FAQProps) {
    const { faq } = dict;
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="faq"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {faq.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {faq.title}
                    </h2>
                </div>

                <div className="space-y-4">
                    {faq.items.map((item, index) => {
                        const isOpen = openFaqIndex === index;
                        return (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-[#0e1222]/90 overflow-hidden transition"
                            >
                                <button
                                    type="button"
                                    className="w-full p-6 text-left font-display font-bold text-base sm:text-lg text-white flex items-center justify-between gap-4"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{item.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-indigo-400 shrink-0 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed animate-in fade-in-50 duration-200">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
