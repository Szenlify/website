"use client";

import Image from "next/image";
import React from "react";

export default function Features() {
  const handlePlayPronunciation = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-24 relative z-10" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Complete Learning Ecosystem</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
            Why Lectoro AI Works 10x Faster Than Traditional Apps
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We blend natural <strong>video immersion</strong> with cutting-edge AI models and scientifically proven memory psychology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-panel p-8 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                🎬
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">Dual Subtitles & Frame Captures</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Display original language alongside your native translation. Click any unknown word to automatically pause the video and capture high-res scene snapshots for your flashcards.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">YouTube & Netflix</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Click-to-Pause</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Snapshots</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel p-8 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">In-Page Web Translator</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Reading technical documentation, Reddit, or industry news? Highlight any text snippet to instantly reveal contextual definitions and grammatical analysis in a floating dock.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Floating Toolbar</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Multi-Tier Cache</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Phrase Detection</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel p-8 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                🧠
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3"> AI Tutor</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Forget rigid dictionary definitions. AI breaks down slang, cultural references, and phrasal verbs in 1 ultra-sharp sentence, exactly like a personal native tutor.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">AI</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">1-Sentence Nuance</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Context Examples</span>
            </div>
          </div>

          {/* Feature 4: Spotlight Flashcards & SRS (Full Width) */}
          <div className="glass-panel col-span-1 md:col-span-2 lg:col-span-3 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#141a32]/90 to-[#0e1222]/95 border-indigo-500/30">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-4">
                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></span>
                <span>SuperMemo Algorithm</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight">
                Lock Words Into Long-Term Memory Without Cramming
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Up to 90% of new words are forgotten within 7 days without spaced review. Lectoro uses the proven <strong>Spaced Repetition</strong> algorithm to automatically schedule 5-minute daily micro-reviews right before you forget.
              </p>
              <ul className="space-y-3 text-slate-300 text-sm mb-6">
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span> 5-minute daily sessions in the extension popup
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span> Real-time pending review badge in your browser bar
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold">✓</span> Visual flashcards paired with exact movie frame snapshots
                </li>
              </ul>
            </div>

            {/* Interactive Flashcard Showcase Widget */}
            <div className="w-full max-w-xs mx-auto rotate-4">
              <Image
                src="/showcase/review.png"
                alt="Review flashcard popup"
                width={600}
                height={600}
                className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-indigo-500/30"
              />
            </div>
          </div>

          {/* Feature 5 */}
          <div className="glass-panel p-8 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                🎙️
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">ElevenLabs Neural Voice TTS</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Master authentic accents and natural cadence with world-class ElevenLabs voice synthesis models (Roger, Sarah, Charlie) with ultra-fast local audio caching.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">ElevenLabs Flash v2.5</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Lifelike Accents</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Audio Cache</span>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="glass-panel p-8 flex flex-col justify-between group col-span-1 md:col-span-2">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Image src="/platforms/anki.png" alt="Anki" width={40} height={40} />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">AI Quizzes & 1-Click Anki Export</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Test yourself with 6 dynamic AI-generated quiz types. Export your entire vocabulary collection to Anki (.txt), Excel/CSV, or printable PDF study worksheets in seconds.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Anki .txt Export</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">Interactive Quizzes</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">PDF Printouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
