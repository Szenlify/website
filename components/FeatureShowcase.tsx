"use client";

import Image from "next/image";
import "./feature-showcase.css";
import {
  Layers,
  Check,
  Sparkles,
} from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n/types";

export const FEATURE_IMAGE_SLOTS = {
  slot1_dualSubtitles: {
    src: "/showcase/11.jpg",
    alt: "Podwójne napisy Lectoro AI na filmie wideo",
    label: "ZDJĘCIE 1: Podwójne napisy na wideo (Netflix / YouTube)",
    windowTitle: "Netflix / YouTube Dual Subtitles",
  },
  slot2_dictionaryAudio: {
    src: "/showcase/22.jpg",
    alt: "Wyskakujące okienko słownika z tłumaczeniem słowa i odsłuchem audio",
    label: "ZDJĘCIE 2: Interaktywny słownik i wymowa audio każdego słówka",
    windowTitle: "Lectoro Pop-up Dictionary & Speech",
  },
  slot3_aiExplanation: {
    src: "/showcase/4.jpg",
    alt: "Wyjaśnienie skomplikowanej frazy, idiomu i gramatyki przez AI",
    label: "ZDJĘCIE 3: Wyjaśnienie trudnej frazy przez AI w kontekście sceny",
    windowTitle: "Lectoro AI Contextual Explanation",
  },
  slot4_keyboardShortcuts: {
    src: "/showcase/3.jpg",
    alt: "Skróty klawiszowe A, S, D i automatyczna pauza na dialogach",
    label: "ZDJĘCIE 4: Skróty klawiaturowe A/S/D i panel auto-pauzy",
    windowTitle: "Playback Controls & Shortcuts (A / S / D)",
  },
  slot5_flashcardsSRS: {
    src: "/showcase/5.jpg",
    alt: "Fiszka do nauki ze zrzutem sceny z filmu i oceną zapamiętania",
    label: "ZDJĘCIE 5: Fiszka z kadrem z filmu i przyciskami powtórek",
    windowTitle: "SRS Flashcard Review Runner",
  },
  slot6_webReader: {
    src: "/showcase/2.jpg",
    alt: "Tłumaczenie zaznaczonego tekstu na dowolnej stronie internetowej",
    label: "ZDJĘCIE 6: Tłumaczenie artykułów i stron w przeglądarce",
    windowTitle: "Web Reader & Instant Translation",
  },
} as const;

interface FeatureShowcaseProps {
  dict: Dict;
  locale: Locale;
}

export default function FeatureShowcase({
  dict,
  locale,
}: FeatureShowcaseProps) {
  const isPl = locale === "pl";

  return (
    <section className="py-14 sm:py-24 relative z-10 overflow-clip" id="features">
      {/* Header sekcji */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-28 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-semibold text-indigo-400 mb-4 tracking-wider uppercase">
          <Sparkles className="size-3.5" />
          <span>
            {isPl
              ? "Przewodnik po funkcjach i obsłudze"
              : "Features & How-To Guide"}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5 max-w-3xl mx-auto">
          {isPl
            ? "Wszystko, co musisz wiedzieć jak używać Lectoro"
            : "Everything You Need to Know How to Use Lectoro"}
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {isPl
            ? "Zaprojektowane na wzór Language Reactor, udoskonalone o kontekstową sztuczną inteligencję, wymowę i mobilne fiszki ze spaced repetition."
            : "Engineered like Language Reactor, enhanced with contextual AI, TTS and spaced-repetition mobile video flashcards."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-40">
        {/* ========================================================================= */}
        {/* BLOK 1: PODWÓJNE NAPISY (NETFLIX & YOUTUBE)                              */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1  text-green-200 text-xs font-mono font-bold">
              <span>{isPl ? "01 PODWÓJNE NAPISY" : "01 DUAL SUBTITLES"}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isPl
                ? "Oglądaj filmy z napisami w dwóch językach jednocześnie"
                : "Watch Movies with Simultaneous Dual Subtitles"}
            </h3>

            {/* Jak używać */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isPl ? "Jak tego używać krok po kroku:" : "How to use it:"}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-green-300/15 border border-green-300/30 text-green-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    {isPl
                      ? "Zainstaluj rozszerzenie i wybierz język, którego się uczysz, oraz swój język ojczysty."
                      : "Install the extension and set your target language alongside your mother tongue."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-green-300/15 border border-green-300/30 text-green-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    {isPl
                      ? "Otwórz dowolny film lub serial na Netflixie, YouTube, TED lub Plex – panel napisów pojawi się automatycznie."
                      : "Open any title on Netflix, YouTube, TED, or Plex – dual subtitles appear automatically."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-green-300/15 border border-green-300/30 text-green-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    {isPl
                      ? "Skup wzrok na oryginalnej linijce, a tłumaczenia używaj tylko wtedy, gdy ucho zgubi sens zdania."
                      : "Keep your main focus on the foreign line, using the second line as instant confirmation."}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ramka na zdjęcie 1 */}
          <div data-reveal-side="right" className="lg:col-span-6">
            <div className="group relative rounded-2xl bg-[#0A0D18] border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden">
              {/* Belka okna */}
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

              {/* Slot na zdjęcie */}
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
          {/* Ramka na zdjęcie 2 (Po lewej na desktopie) */}
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

          {/* Treść Bloku 2 */}
          <div data-reveal-side="right" className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1  text-cyan-200 text-xs font-mono font-bold">
              <span>
                {isPl
                  ? "02 KLIKALNY SŁOWNIK & AUDIO"
                  : "02 POP-UP DICTIONARY & AUDIO"}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isPl
                ? "Kliknij dowolne słowo, aby poznać znaczenie i wymowę"
                : "Click Any Word for Instant Meaning and Native Audio"}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isPl
                  ? "Jak tego używać w praktyce:"
                  : "How to use it in practice:"}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Kliknij nieznane słowo – wideo zatrzyma się automatycznie w ułamku sekundy."
                      : "Click any unknown word – the video automatically pauses in a fraction of a second."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Kliknij ikonę głośnika, aby usłyszeć poprawną intonację i wymowę."
                      : "Click the speaker icon to hear authentic pronunciation and cadence."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Kliknij przycisk 'Zapisz', aby słowo trafiło do Twojej talii codziennych powtórek."
                      : "Click 'Save' to send the phrase directly into your spaced repetition review deck."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOK 3: KONTEKSTOWE WYJAŚNIENIA AI (IDIOMY, SLANG, GRAMATYKA)            */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          <div data-reveal-side="left" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-purple-200 text-xs font-mono font-bold">
              <span>
                {isPl
                  ? "03 WYJAŚNIENIA KONTEKSTOWE AI"
                  : "03 CONTEXTUAL AI BREAKDOWN"}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isPl
                ? "Zrozum idiomy, slang i żarty słowne, których nie ma w słowniku"
                : "Understand Idioms, Slang, and Jokes Beyond Literal Dictionaries"}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isPl ? "Jak tego używać:" : "How to use it:"}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>
                    {isPl
                      ? "Gdy dosłowne tłumaczenie nie ma sensu, spójrz na sekcję '✨ AI Explanation' w dymku."
                      : "When word-for-word translation sounds odd, check the '✨ AI Explanation' section."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>
                    {isPl
                      ? "Dowiedz się, czy wyrażenie jest formalne, potoczne czy regionalne."
                      : "Learn if the phrasing is formal, colloquial, or culturally unique."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="size-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>
                    {isPl
                      ? "Wyjaśnienie AI jest zapisywane razem z fiszką, dzięki czemu przypomnisz je sobie podczas powtórki."
                      : "The AI explanation is stored directly on your flashcard for future review sessions."}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ramka na zdjęcie 3 */}
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
        {/* BLOK 4: SKRÓTY KLAWISZOWE & PRECYZYJNA NAWIGACJA (JAK W LR)               */}
        {/* ========================================================================= */}
        <div data-feature-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          {/* Ramka na zdjęcie 4 (Po lewej na desktopie) */}
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

          {/* Treść Bloku 4 */}
          <div data-reveal-side="right" className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1  text-amber-200 text-xs font-mono font-bold">
              <span>
                {isPl ? "04 STEROWANIE KLAWIATURĄ" : "04 KEYBOARD CONTROLS"}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isPl
                ? "Steruj filmem jak profesjonalista bez sięgania po myszkę"
                : "Master Playback Navigation Without Touching the Mouse"}
            </h3>

            {/* Wypisane skróty w czytelnych kafelkach kbd */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isPl ? "Skróty klawiszowe (Hotkeys):" : "Keyboard Shortcuts:"}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs">
                    A
                  </kbd>
                  <span className="text-slate-300">
                    {isPl ? "Poprzedni napis" : "Previous subtitle"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs">
                    S
                  </kbd>
                  <span className="text-slate-300 font-semibold text-white">
                    {isPl ? "Powtórz napis (Replay)" : "Repeat subtitle"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs">
                    D
                  </kbd>
                  <span className="text-slate-300">
                    {isPl ? "Następny napis" : "Next subtitle"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                  <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-amber-500/40 text-amber-300 font-mono font-bold shadow-xs">
                    Spacja
                  </kbd>
                  <span className="text-slate-300">
                    {isPl ? "Pauza / Odtwórz" : "Play / Pause"}
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
            <div className="inline-flex items-center gap-2 px-3 py-1  text-emerald-200 text-xs font-mono font-bold">
              <Layers className="size-3.5" />
              <span>
                {isPl
                  ? "05 FISZKI WIDEO & POWTÓRKI SRS"
                  : "05 VIDEO FLASHCARDS & SRS"}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isPl
                ? "Zapisuj słówka wraz z kadrem z filmu i utrwalaj je w pamięci"
                : "Save Words with Real Video Stills & Review via SRS"}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isPl
                  ? "Jak działają codzienne powtórki:"
                  : "How daily reviews work:"}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Kliknij 'Powtórki' w nawigacji lub otwórz aplikację na telefonie (100% dopasowanie mobilne)."
                      : "Click 'Reviews' in the navigation bar or open on your smartphone with full 100dvh mobile fit."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Na telefonie przesuwaj fiszki gestem: swipe w lewo (nie pamiętam) lub w prawo (pamiętam)."
                      : "On mobile, swipe left if you forgot, or swipe right if you remembered."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Trudniejsze słówka pojawiają się częściej, a znane są odsuwane w czasie – maksymalny efekt w kilka minut dziennie."
                      : "Tricky words reappear soon, while mastered words are delayed – maximizing retention in minutes a day."}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ramka na zdjęcie 5 */}
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
          {/* Ramka na zdjęcie 6 (Po lewej na desktopie) */}
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

          {/* Treść Bloku 6 */}
          <div data-reveal-side="right" className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1  text-blue-200 text-xs font-mono font-bold">
              <span>
                {isPl ? "06 CZYTNIK STRON & ARTYKUŁÓW" : "06 WEB READER MODE"}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isPl
                ? "Ucz się języka czytając artykuły, wiadomości i wpisy na X"
                : "Learn by Reading Articles, News, and Social Posts Anywhere"}
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isPl
                  ? "Jak używać na stronach www:"
                  : "How to use on web pages:"}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Zaznacz kursorem myszy interesujący Cię fragment tekstu lub pojedyncze słowo."
                      : "Select any phrase or unfamiliar word with your cursor."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Obok zaznaczenia pojawi się dyskretny pasek Lectoro z tłumaczeniem i głośnikiem."
                      : "A discreet floating tooltip appears with inline translation and speech playback."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    {isPl
                      ? "Wszystkie słowa zapisane ze stron trafiają do tej samej, zsynchronizowanej bazy fiszek."
                      : "All saved expressions merge directly into the same synchronized flashcard collection."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
