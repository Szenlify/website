"use client";

import React, { useState } from "react";

interface WordDemoState {
  word: string;
  ipa: string;
  trans: string;
  note: string;
}

export default function Hero() {
  const [selectedWord, setSelectedWord] = useState<WordDemoState>({
    word: "relentless",
    ipa: "/rɪˈlent.ləs/",
    trans: "unyielding, determined, uncompromising",
    note: "In legal context, Harvey uses this word to emphasize unwavering perseverance to win tough cases.",
  });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSelectWord = (word: string, ipa: string, trans: string, note: string) => {
    setSelectedWord({ word, ipa, trans, note });
  };

  const handleSaveFlashcard = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const handlePlayPronunciation = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative pt-20 pb-16 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300 tracking-wide uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] badge-dot"></span>
          <span>Chrome Extension Manifest V3 • Gemini 2.5 AI & ElevenLabs</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white mb-6">
          Turn Netflix & YouTube into Your <span className="text-gradient">Personal Language School</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="font-body text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-3xl mx-auto mb-10">
          Watch movies & shows with <strong>smart bilingual clickable subtitles</strong>. Instantly translate idioms in 1 second with Gemini AI, listen to native ElevenLabs voices, and lock vocabulary into long-term memory with <strong>Spaced Repetition (SRS)</strong>.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://chromewebstore.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span>Install in Chrome — 100% Free</span>
          </a>

          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Try Interactive Demo</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>★★★★★</span>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-slate-400 font-normal">(1,280+ ratings)</span>
          </div>
          <span>•</span>
          <span>No credit card required</span>
          <span>•</span>
          <span>Instant 5-second install</span>
        </div>
      </div>

      {/* Interactive Hero Showcase & Drop-In Slot for AI Video Recording */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" id="demo">
        <div className="relative group">
          {/* Glow effect behind container */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-cyan-500/30 rounded-[28px] blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

          {/* Main Player Simulator Frame */}
          <div className="relative z-10 bg-[#090d1a] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90">
            {/* Player Top Window Bar */}
            <div className="bg-[#0d1224] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>

              <div className="flex items-center gap-2 bg-white/[0.04] px-3.5 py-1 rounded-md text-xs font-mono text-slate-400 border border-white/5 max-w-[200px] sm:max-w-none truncate">
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className="truncate">https://www.netflix.com/watch/81040344 — Suits (S01E01)</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 shrink-0">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="hidden sm:inline">Lectoro Active</span>
              </div>
            </div>

            {/* 
              ================================================================================
              HERO AI VIDEO RECORDING SLOT:
              - To use your own AI video recording (MP4/WebM), replace the background scene 
                below with a <video autoPlay loop muted playsInline src="/your-ai-video.mp4" className="absolute inset-0 w-full h-full object-cover z-[1]" />
              - The interactive dual-subtitles and AI popover overlay will sit right on top!
              ================================================================================
            */}
            <div className="ai-video-slot relative bg-gradient-to-b from-[#1b2141] via-[#0d1226] to-[#080a14] p-6 sm:p-8">
              {/* Backdrop Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/85 z-[2] pointer-events-none"></div>

              {/* Decorative Center Element / Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[2] opacity-15 pointer-events-none select-none">
                <svg className="w-28 h-28 mx-auto fill-white" viewBox="0 0 24 24">
                  <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
                </svg>
              </div>

              {/* Lectoro Active Mode Watermark */}
              <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 rounded-lg text-xs font-bold text-white w-fit shadow-md">
                <svg className="w-3.5 h-3.5 text-cyan-400 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Lectoro Dual Subtitles Mode</span>
              </div>

              {/* Subtitles & Interactive Popover Area */}
              <div className="relative z-20 w-full max-w-2xl mx-auto my-auto text-center pt-8 pb-4">
                {/* Popover Tooltip for currently selected word */}
                <div className="interactive-word-tooltip" id="interactiveTooltip">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-extrabold text-lg text-white tooltip-word">{selectedWord.word}</span>
                    <span className="text-xs text-slate-400 font-mono">{selectedWord.ipa}</span>
                  </div>
                  <div className="text-sm font-semibold text-cyan-400 mb-2 tooltip-trans">{selectedWord.trans}</div>
                  <div className="bg-indigo-500/10 border-l-2 border-indigo-500 p-2 rounded text-xs text-slate-300 mb-3 text-left leading-relaxed tooltip-ai-note">
                    <strong>💡 Gemini AI Tutor:</strong> {selectedWord.note}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg text-white flex items-center justify-center gap-1.5 transition duration-200 ${
                        savedSuccess ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
                      }`}
                      onClick={handleSaveFlashcard}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                      <span>{savedSuccess ? "✓ Saved to Deck!" : "Save to SRS"}</span>
                    </button>
                    <button
                      type="button"
                      className="py-1.5 px-3 text-xs font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition duration-200"
                      onClick={() => handlePlayPronunciation(selectedWord.word)}
                    >
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                      <span>Pronounce</span>
                    </button>
                  </div>
                </div>

                {/* Dual Subtitle Box */}
                <div className="inline-block bg-[#05070f]/90 backdrop-blur-md border border-white/15 px-6 py-4 rounded-2xl shadow-2xl">
                  <div className="font-display text-lg sm:text-2xl font-bold text-white mb-1 tracking-tight">
                    You need to be{" "}
                    <span
                      className={`clickable-word ${selectedWord.word === "relentless" ? "active" : ""}`}
                      onClick={() =>
                        handleSelectWord(
                          "relentless",
                          "/rɪˈlent.ləs/",
                          "unyielding, determined, uncompromising",
                          "Harvey emphasizes unstoppable determination to win."
                        )
                      }
                    >
                      relentless
                    </span>{" "}
                    if you want to win this{" "}
                    <span
                      className={`clickable-word ${selectedWord.word === "trial" ? "active" : ""}`}
                      onClick={() =>
                        handleSelectWord(
                          "trial",
                          "/ˈtraɪ.əl/",
                          "court hearing, legal proceeding",
                          "A formal examination of evidence in court before a judge."
                        )
                      }
                    >
                      trial
                    </span>
                    .
                  </div>
                  <div className="text-sm sm:text-base font-medium text-slate-400">
                    Debes ser implacable si quieres ganar este juicio. / Musisz być nieustępliwy.
                  </div>
                </div>
              </div>

              {/* Player Bottom Control Bar */}
              <div className="relative z-10 flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <button type="button" className="text-white hover:text-indigo-400 transition" aria-label="Pause Demo">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  </button>
                  <span className="text-xs font-mono text-slate-400">14:28 / 42:15</span>
                </div>
                <div className="flex-1 mx-4 sm:mx-6 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                  <div className="w-[45%] h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">EN ⇄ ES / PL</span>
                  <svg className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
