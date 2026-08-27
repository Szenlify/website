"use client";

import { useState } from "react";
import Link from "next/link";

interface ComparisonRow {
  category: string;
  feature: string;
  description: string;
  lectoro: {
    title: string;
    detail: string;
    isPositive: boolean;
  };
  languageReactor: {
    title: string;
    detail: string;
    isPositive: boolean;
  };
  lingopie: {
    title: string;
    detail: string;
    isPositive: boolean;
  };
  duolingo: {
    title: string;
    detail: string;
    isPositive: boolean;
  };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    category: "AI & Intelligence",
    feature: "Contextual AI Tutor (Slang & Idioms)",
    description: "Explains nuanced cultural references, jokes, and phrasal verbs in real time.",
    lectoro: {
      title: "AI Tutor",
      detail: "Explains slang, cultural humor & grammar in 1 sharp sentence.",
      isPositive: true,
    },
    languageReactor: {
      title: "Static Dictionary Only",
      detail: "Literal dictionary lookups. Cannot explain idioms or context.",
      isPositive: false,
    },
    lingopie: {
      title: "Basic Translation",
      detail: "Word-by-word translations without deep contextual reasoning.",
      isPositive: false,
    },
    duolingo: {
      title: "None (Rigid Script)",
      detail: "Preset robotic answers. Zero real-world slang or nuance.",
      isPositive: false,
    },
  },
  {
    category: "Content Freedom",
    feature: "Supported Platforms & Web Reading",
    description: "Where you can actually learn without paying extra or switching apps.",
    lectoro: {
      title: "YouTube, Netflix & Entire Web",
      detail: "Works on videos AND any webpage, news, Reddit or X (Twitter).",
      isPositive: true,
    },
    languageReactor: {
      title: "Video Only (Clunky Web)",
      detail: "Primarily Netflix/YouTube. Web reading is separate and outdated.",
      isPositive: false,
    },
    lingopie: {
      title: "Locked Catalog Only",
      detail: "Must watch only their internal proprietary video catalog.",
      isPositive: false,
    },
    duolingo: {
      title: "Isolated Sandbox",
      detail: "Zero real-world media. Isolated artificial sentences.",
      isPositive: false,
    },
  },
  {
    category: "Ergonomics & UX",
    feature: "Zero-Mouse Keyboard Flow",
    description: "Hands-free video playback and subtitle navigation from your couch.",
    lectoro: {
      title: "100% WASD & Arrow Controls",
      detail: "Skip/rewind subtitles, play/pause & trigger AI without touching mouse.",
      isPositive: true,
    },
    languageReactor: {
      title: "Limited Keybindings",
      detail: "Frequent focus loss bugs; heavy reliance on mouse clicks.",
      isPositive: false,
    },
    lingopie: {
      title: "Mouse-Centric",
      detail: "Cumbersome point-and-click UI that interrupts movie immersion.",
      isPositive: false,
    },
    duolingo: {
      title: "Tapping Minigames",
      detail: "Rote multiple-choice clicking on phone or desktop.",
      isPositive: false,
    },
  },
  {
    category: "Memory Retention",
    feature: "Automated Scene Snapshots for Anki",
    description: "Captures visual frames so your memory links words directly to scenes.",
    lectoro: {
      title: "Auto WebP Scene Snapshots",
      detail: "Saves high-res video frame + original audio + sentence in 1 click.",
      isPositive: true,
    },
    languageReactor: {
      title: "Plain Text Only",
      detail: "No video snapshots. Saves dry sentences without visual memory cues.",
      isPositive: false,
    },
    lingopie: {
      title: "Platform Lock-in",
      detail: "Thumbnails stored only inside their locked proprietary app.",
      isPositive: false,
    },
    duolingo: {
      title: "Cartoon Illustrations",
      detail: "Generic cartoon avatars with zero authentic memory association.",
      isPositive: false,
    },
  },
  {
    category: "Export & Ownership",
    feature: "1-Click Anki & Excel Export",
    description: "Own your vocabulary database forever without platform lock-in.",
    lectoro: {
      title: "1-Click .apkg / Excel / CSV",
      detail: "Instant export of ready-to-use Anki decks with audio and images.",
      isPositive: true,
    },
    languageReactor: {
      title: "Complex & Fragile Export",
      detail: "Requires third-party scripts or manual CSV formatting that often breaks.",
      isPositive: false,
    },
    lingopie: {
      title: "No Anki (.apkg) Export",
      detail: "Forces you to stay subscribed to review your own saved words.",
      isPositive: false,
    },
    duolingo: {
      title: "Zero Export",
      detail: "100% locked ecosystem. You leave, all progress is lost.",
      isPositive: false,
    },
  },
  {
    category: "Study System",
    feature: "Spaced Repetition System (SRS)",
    description: "Scientifically proven memory algorithm that schedules optimal review intervals.",
    lectoro: {
      title: "Built-in SuperMemo SM-2",
      detail: "5-min daily micro-reviews right in Chrome popup. Zero setup.",
      isPositive: true,
    },
    languageReactor: {
      title: "Flat Word List",
      detail: "Simple highlighted list. No intelligent spaced repetition scheduling.",
      isPositive: false,
    },
    lingopie: {
      title: "Basic Flashcards",
      detail: "Basic flashcards, but locked behind expensive monthly subscription.",
      isPositive: false,
    },
    duolingo: {
      title: "Linear Repetition",
      detail: "Forces you to repeat beginner sentences you already mastered.",
      isPositive: false,
    },
  },
  {
    category: "Design & Performance",
    feature: "Modern Video Overlay & Speed",
    description: "Aesthetic non-intrusive UI that keeps the movie front and center.",
    lectoro: {
      title: "Sleek Dark Glassmorphism",
      detail: "Ultra-fast, lightweight dock that never covers or blocks the video.",
      isPositive: true,
    },
    languageReactor: {
      title: "Clunky 2019 Sidebar UI",
      detail: "Heavy sidebar that covers half the screen and causes video stutters.",
      isPositive: false,
    },
    lingopie: {
      title: "Heavy Web Player",
      detail: "Proprietary player with high latency and occasional streaming bugs.",
      isPositive: false,
    },
    duolingo: {
      title: "Ad-Heavy / Gamified",
      detail: "Aggressive streaks, hearts, ads and distractions every few minutes.",
      isPositive: false,
    },
  },
  {
    category: "Cost & Value",
    feature: "Pricing & Fair Access",
    description: "Honest pricing without subscription traps or forced long-term lock-in.",
    lectoro: {
      title: "Free Tier + Affordable Access",
      detail: "Generous free immersion. No credit card required to start.",
      isPositive: true,
    },
    languageReactor: {
      title: "$6 – $10 / month",
      detail: "Pro subscription required for basic features like machine translation.",
      isPositive: false,
    },
    lingopie: {
      title: "$144 / year ($12/mo)",
      detail: "Extremely expensive annual lock-in required to watch their library.",
      isPositive: false,
    },
    duolingo: {
      title: "$84 – $120 / year",
      detail: "Costly Super subscription just to remove ads and unlock infinite hearts.",
      isPositive: false,
    },
  },
];

type CompetitorKey = "languageReactor" | "lingopie" | "duolingo";

const COMPETITOR_TABS: { key: CompetitorKey; label: string; badge: string }[] = [
  { key: "languageReactor", label: "vs. Language Reactor", badge: "Primary Competitor" },
  { key: "lingopie", label: "vs. Lingopie / Migaku", badge: "Expensive Platforms" },
  { key: "duolingo", label: "vs. Duolingo & Apps", badge: "Traditional Methods" },
];

export default function Comparison() {
  const [mobileCompetitor, setMobileCompetitor] = useState<CompetitorKey>("languageReactor");

  return (
    <section className="py-24 border-t border-white/10 bg-[#050711]/60 relative z-10" id="comparison">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 mb-4 tracking-wider uppercase">
            <span>Direct Feature Breakdown</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
            How Lectoro AI <span className="text-gradient">Outperforms the Rest</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Language Reactor pioneered video learning in 2019, but technology has leaped forward. See why modern learners are upgrading to Lectoro AI.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP TABLE VIEW (Visible on lg and up)                                 */}
        {/* ========================================================================= */}
        <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-[#0e1222]/85 backdrop-blur-xl shadow-2xl shadow-black/80">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-white/10 bg-[#090d1a]/95">
                <th className="p-6 w-[28%] font-display font-bold text-sm text-slate-300">
                  Feature & Capability
                </th>
                
                {/* LECTORO AI (HERO COLUMN) */}
                <th className="p-6 w-[26%] bg-indigo-600/15 border-x-2 border-indigo-500/40 relative">
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-black text-lg text-white flex items-center gap-1.5">
                      <span>✨ Lectoro AI</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                      Winner
                    </span>
                  </div>
                  <span className="text-xs text-indigo-300/80 font-normal mt-1 block">
                    Next-Gen AI Media Immersion
                  </span>
                </th>

                {/* LANGUAGE REACTOR */}
                <th className="p-6 w-[23%] border-r border-white/10">
                  <div className="font-display font-bold text-base text-slate-200">
                    Language Reactor
                  </div>
                  <span className="text-xs text-slate-400 font-normal mt-1 block">
                    Legacy extension (ex-LLN)
                  </span>
                </th>

                {/* LINGOPIE & APPS (SPLIT) */}
                <th className="p-6 w-[23%]">
                  <div className="font-display font-bold text-base text-slate-200">
                    Lingopie & Duolingo
                  </div>
                  <span className="text-xs text-slate-400 font-normal mt-1 block">
                    Closed apps ($144/yr)
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-sm">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Feature & Category */}
                  <td className="p-6 align-top space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                      {row.category}
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      {row.feature}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {row.description}
                    </p>
                  </td>

                  {/* LECTORO AI (HERO DATA) */}
                  <td className="p-6 align-top bg-indigo-500/10 border-x-2 border-indigo-500/30 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      <span className="font-bold text-white text-sm">
                        {row.lectoro.title}
                      </span>
                    </div>
                    <p className="text-indigo-200/80 text-xs leading-relaxed pl-7">
                      {row.lectoro.detail}
                    </p>
                  </td>

                  {/* LANGUAGE REACTOR */}
                  <td className="p-6 align-top border-r border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
                        ✕
                      </span>
                      <span className="font-semibold text-slate-300 text-sm">
                        {row.languageReactor.title}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed pl-7">
                      {row.languageReactor.detail}
                    </p>
                  </td>

                  {/* LINGOPIE / TRADITIONAL */}
                  <td className="p-6 align-top space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
                        ✕
                      </span>
                      <span className="font-semibold text-slate-300 text-sm">
                        {row.lingopie.title}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed pl-7">
                      {row.lingopie.detail}
                    </p>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET UX VIEW (Card Switcher - No Horizontal Scroll Chaos!)     */}
        {/* ========================================================================= */}
        <div className="block lg:hidden space-y-6">
          
          {/* Competitor Selector Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2">
            {COMPETITOR_TABS.map((tab) => {
              const isSelected = mobileCompetitor === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMobileCompetitor(tab.key)}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards Stack comparing Lectoro vs Active Competitor */}
          <div className="space-y-4">
            {COMPARISON_DATA.map((row, idx) => {
              const compData = row[mobileCompetitor];

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0e1222]/90 backdrop-blur-lg p-5 sm:p-6 space-y-4 shadow-xl"
                >
                  {/* Category & Feature Title */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                      {row.category}
                    </span>
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                      {row.feature}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      {row.description}
                    </p>
                  </div>

                  {/* Direct Head-to-Head Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    
                    {/* ✨ Lectoro AI Card (Hero) */}
                    <div className="p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/40 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white flex items-center gap-1">
                          <span>✨ Lectoro AI</span>
                        </span>
                        <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-xs font-black">
                          ✓
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        {row.lectoro.title}
                      </h4>
                      <p className="text-indigo-200/80 text-xs leading-relaxed">
                        {row.lectoro.detail}
                      </p>
                    </div>

                    {/* ❌ Competitor Card */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          {mobileCompetitor === "languageReactor" ? "Language Reactor" : mobileCompetitor === "lingopie" ? "Lingopie" : "Duolingo"}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center text-xs font-black">
                          ✕
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-300 text-xs sm:text-sm">
                        {compData.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {compData.detail}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM VERDICT & ACTION BANNER (HIGH CONVERSION)                         */}
        {/* ========================================================================= */}
        <div className="mt-14 glass-panel p-6 sm:p-10 border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-[#0e1222]/90 to-cyan-950/30 rounded-3xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>The Verdict</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                Why settle for outdated 2019 tools or $140/yr subscriptions?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Lectoro AI combines modern <strong>AI context intelligence</strong> with <strong>zero-mouse keyboard navigation</strong> and <strong>automated Anki video snapshots</strong> — completely free to start.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                href="https://chromewebstore.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-500/30 hover:scale-102 active:scale-98 transition-all duration-200"
              >
                Add to Chrome Free ➔
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
