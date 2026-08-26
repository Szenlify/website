"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Lectoro AI safe for my Netflix & YouTube accounts?",
    answer:
      "Yes, 100%. Lectoro AI is an official Chrome Manifest V3 extension operating purely within your browser client. It never alters your streaming account, does not scrape DRM video streams, and utilizes standard HTML5 subtitle APIs.",
  },
  {
    question: "Does the FREE plan require a credit card?",
    answer:
      "No! The FREE plan requires no payment details whatsoever. Simply install from the Chrome Web Store and instantly enjoy dual subtitles, in-page translations, and up to 50 saved flashcards.",
  },
  {
    question: "How does the 3-day Free Trial work for Basic & Pro?",
    answer:
      "When selecting a paid plan, you receive 3 full days of unlimited access for $0. If you decide to cancel in your dashboard before the 3-day trial ends, Stripe will not charge your card.",
  },
  {
    question: "How does Anki and CSV export work?",
    answer:
      "In your extension library, simply click 'Export to Anki'. The extension generates a properly formatted text file (.txt) with mapped fields (front word, back translation, context sentence, screenshot link) ready for immediate Anki import.",
  },
  {
    question: "Do my flashcards sync across multiple computers?",
    answer:
      "Yes. When logging in with your Google account, all saved vocabulary, SRS intervals, and custom settings sync securely in real-time across all your devices.",
  },
];

export default function FAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Frequently Asked Questions</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">Have Questions? We Have Answers.</h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="rounded-2xl border border-white/10 bg-[#0e1222]/90 overflow-hidden transition">
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
