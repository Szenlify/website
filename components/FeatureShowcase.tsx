"use client";

import Image from "next/image";
import "./feature-showcase.css";
import {
  Layers,
  Check,
  Sparkles,
  Command,
} from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/en";

export const FEATURE_IMAGE_SLOTS = {
  slot1_dualSubtitles: {
    src: "/showcase/11.jpg",
    alt: "Lectoro AI Dual Subtitles on Netflix & YouTube",
    windowTitle: "Netflix / YouTube Dual Subtitles (Lectoro AI)",
  },
  slot2_dictionaryAudio: {
    src: "/showcase/22.jpg",
    alt: "Interactive Pop-up Dictionary with Native Audio Pronunciation",
    windowTitle: "Lectoro Pop-up Dictionary & Speech (Sulafat & Algieba)",
  },
  slot3_aiExplanation: {
    src: "/showcase/4.jpg",
    alt: "Google Gemini Contextual AI Sentence Breakdown & CEFR Level",
    windowTitle: "Gemini 2.5 AI Contextual Grammar & Idioms",
  },
  slot4_keyboardShortcuts: {
    src: "/showcase/3.jpg",
    alt: "Keyboard Navigation W / A / S / D / Q / Z Controls",
    windowTitle: "Playback Controls & Hotkeys (W / A / S / D / Q / Z)",
  },
  slot5_flashcardsSRS: {
    src: "/showcase/5.jpg",
    alt: "SuperMemo SM-2 Spaced Repetition Flashcards with Scene Stills",
    windowTitle: "SuperMemo SM-2 SRS Review Runner & Mobile Reviews",
  },
  slot6_webReader: {
    src: "/showcase/2.jpg",
    alt: "In-Page Web Article Translator and Live Text Highlighting",
    windowTitle: "Web Reader & Instant Text-to-Speech",
  },
} as const;

interface FeatureShowcaseProps {
  dict: Dict;
  locale: Locale;
}

export default function FeatureShowcase({
  dict,
}: FeatureShowcaseProps) {
  const sc = dict.showcase || en.showcase!;

  return (
    <section className="py-14 sm:py-24 relative z-10 overflow-clip" id="features">
      {/* Header sekcji */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-28 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-semibold text-indigo-400 mb-4 tracking-wider uppercase">
          <Sparkles className="size-3.5" />
          <span>{sc.badge}</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5 max-w-3xl mx-auto">
          {sc.title}
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {sc.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-40">
        {/* ========================================================================= */}
        {/* BLOK 1: PODWÓJNE NAPISY (NETFLIX & YOUTUBE)                              */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-green-200 text-xs font-mono font-bold">
              <span>{sc.b1Tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {sc.b1Title}
            </h3>

            {/* Jak używać */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {sc.b1HowTo}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-green-300/15 border border-green-300/30 text-green-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>{sc.b1Step1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-green-300/15 border border-green-300/30 text-green-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>{sc.b1Step2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-green-300/15 border border-green-300/30 text-green-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span>{sc.b1Step3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ramka na zdjęcie 1 */}
          <div data-reveal-side="right" className="lg:col-span-6">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              <div className="bg-[#0D101C] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                  {FEATURE_IMAGE_SLOTS.slot1_dualSubtitles.windowTitle}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                <Image
                  src={FEATURE_IMAGE_SLOTS.slot1_dualSubtitles.src}
                  alt={FEATURE_IMAGE_SLOTS.slot1_dualSubtitles.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain group-hover:scale-[0.98] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOK 2: INTERAKTYWNY SŁOWNIK I WYMOWA AUDIO (ODWRÓCONY UKŁAD)             */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 order-2 lg:order-1">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              <div className="bg-[#0D101C] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                  {FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio.windowTitle}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                <Image
                  src={FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio.src}
                  alt={FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain group-hover:scale-[0.98] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div data-reveal-side="right" className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-cyan-200 text-xs font-mono font-bold">
              <span>{sc.b2Tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {sc.b2Title}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {sc.b2HowTo}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{sc.b2Step1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{sc.b2Step2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{sc.b2Step3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOK 3: KONTEKSTOWE WYJAŚNIENIA GEMINI AI                                 */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-purple-200 text-xs font-mono font-bold">
              <span>{sc.b3Tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {sc.b3Title}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {sc.b3HowTo}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{sc.b3Step1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{sc.b3Step2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{sc.b3Step3}</span>
                </li>
              </ul>
            </div>
          </div>

          <div data-reveal-side="right" className="lg:col-span-6">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              <div className="bg-[#0D101C] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                  {FEATURE_IMAGE_SLOTS.slot3_aiExplanation.windowTitle}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                <Image
                  src={FEATURE_IMAGE_SLOTS.slot3_aiExplanation.src}
                  alt={FEATURE_IMAGE_SLOTS.slot3_aiExplanation.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOK 4: SKRÓTY KLAWISZOWE & PRECYZYJNA NAWIGACJA                          */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 order-2 lg:order-1">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              <div className="bg-[#0D101C] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                  {FEATURE_IMAGE_SLOTS.slot4_keyboardShortcuts.windowTitle}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                <Image
                  src={FEATURE_IMAGE_SLOTS.slot4_keyboardShortcuts.src}
                  alt={FEATURE_IMAGE_SLOTS.slot4_keyboardShortcuts.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div data-reveal-side="right" className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-amber-200 text-xs font-mono font-bold">
              <Command className="size-3.5" />
              <span>{sc.b4Tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {sc.b4Title}
            </h3>

            {/* Wypisane skróty w czytelnych kafelkach kbd */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {sc.b4HowTo}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs whitespace-nowrap">
                    {sc.b4K1}
                  </kbd>
                  <span className="text-slate-300 truncate">
                    {sc.b4K1Desc}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs whitespace-nowrap">
                    {sc.b4K2}
                  </kbd>
                  <span className="text-slate-300 truncate">
                    {sc.b4K2Desc}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs whitespace-nowrap">
                    {sc.b4K3}
                  </kbd>
                  <span className="text-slate-300 truncate">
                    {sc.b4K3Desc}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs whitespace-nowrap">
                    {sc.b4K4}
                  </kbd>
                  <span className="text-slate-300 font-semibold text-white truncate">
                    {sc.b4K4Desc}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs whitespace-nowrap">
                    {sc.b4K5}
                  </kbd>
                  <span className="text-slate-300 truncate">
                    {sc.b4K5Desc}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs whitespace-nowrap">
                    {sc.b4K6}
                  </kbd>
                  <span className="text-slate-300 truncate">
                    {sc.b4K6Desc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOK 5: FISZKI WIDEO & POWTÓRKI SRS (SPACED REPETITION)                  */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-emerald-200 text-xs font-mono font-bold">
              <Layers className="size-3.5" />
              <span>{sc.b5Tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {sc.b5Title}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {sc.b5HowTo}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sc.b5Step1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sc.b5Step2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sc.b5Step3}</span>
                </li>
              </ul>
            </div>
          </div>

          <div data-reveal-side="right" className="lg:col-span-6">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              <div className="bg-[#0D101C] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                  {FEATURE_IMAGE_SLOTS.slot5_flashcardsSRS.windowTitle}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                <Image
                  src={FEATURE_IMAGE_SLOTS.slot5_flashcardsSRS.src}
                  alt={FEATURE_IMAGE_SLOTS.slot5_flashcardsSRS.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOK 6: TŁUMACZENIE STRON WWW & ARTYKUŁÓW (ODWRÓCONY UKŁAD)               */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 order-2 lg:order-1">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              <div className="bg-[#0D101C] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                  {FEATURE_IMAGE_SLOTS.slot6_webReader.windowTitle}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                <Image
                  src={FEATURE_IMAGE_SLOTS.slot6_webReader.src}
                  alt={FEATURE_IMAGE_SLOTS.slot6_webReader.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div data-reveal-side="right" className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 text-xs font-mono font-bold">
              <span>{sc.b6Tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {sc.b6Title}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {sc.b6HowTo}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{sc.b6Step1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{sc.b6Step2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{sc.b6Step3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
