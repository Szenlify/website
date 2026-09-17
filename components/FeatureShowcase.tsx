"use client";

import React from "react";
import Image from "next/image";
import {
    Film,
    Globe,
    Brain,
    Keyboard,
    Layers,
    BookOpen,
    Volume2,
    Check,
    Sparkles,
    RotateCcw,
    Play,
    Zap,
    MousePointerClick,
    Headphones,
    SlidersHorizontal,
    Camera,
} from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n/types";

// =========================================================================
// 📸 MIEJSCA NA TWOJE ZDJĘCIA (IMAGE SLOTS)
// Tutaj możesz wstawić ścieżki do swoich własnych zrzutów z folderu /public
// (np. "/showcase/moj-zrzut.png"). Domyślnie podpięte są grafiki demonstracyjne.
// =========================================================================
export const FEATURE_IMAGE_SLOTS = {
    // 1. Podwójne napisy na Netflix i YouTube
    slot1_dualSubtitles: {
        src: "/showcase/1.jpg",
        alt: "Podwójne napisy Lectoro AI na filmie wideo",
        label: "ZDJĘCIE 1: Podwójne napisy na wideo (Netflix / YouTube)",
        windowTitle: "Netflix / YouTube • Dual Subtitles",
    },
    // 2. Interaktywny słownik i wymowa natywnym głosem
    slot2_dictionaryAudio: {
        src: "/showcase/wardog.png",
        alt: "Wyskakujące okienko słownika z tłumaczeniem słowa i odsłuchem audio",
        label: "ZDJĘCIE 2: Interaktywny słownik i wymowa audio każdego słówka",
        windowTitle: "Lectoro Pop-up Dictionary & Speech",
    },
    // 3. Kontekstowe wyjaśnienia AI
    slot3_aiExplanation: {
        src: "/showcase/4.jpg",
        alt: "Wyjaśnienie skomplikowanej frazy, idiomu i gramatyki przez AI",
        label: "ZDJĘCIE 3: Wyjaśnienie trudnej frazy przez AI w kontekście sceny",
        windowTitle: "Lectoro AI • Contextual Explanation",
    },
    // 4. Precyzyjne sterowanie klawiaturą i powtarzanie kwestii
    slot4_keyboardShortcuts: {
        src: "/showcase/3.jpg",
        alt: "Skróty klawiszowe A, S, D i automatyczna pauza na dialogach",
        label: "ZDJĘCIE 4: Skróty klawiaturowe A/S/D i panel auto-pauzy",
        windowTitle: "Playback Controls & Shortcuts (A / S / D)",
    },
    // 5. Fiszki wideo i codzienne powtórki SRS
    slot5_flashcardsSRS: {
        src: "/showcase/5.jpg",
        alt: "Fiszka do nauki ze zrzutem sceny z filmu i oceną zapamiętania",
        label: "ZDJĘCIE 5: Fiszka z kadrem z filmu i przyciskami powtórek",
        windowTitle: "SRS Flashcard Review Runner",
    },
    // 6. Czytnik artykułów i tłumaczenie stron WWW
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

export default function FeatureShowcase({ dict, locale }: FeatureShowcaseProps) {
    const isPl = locale === "pl";

    return (
        <section className="py-24 relative z-10 overflow-hidden" id="features">
            {/* Header sekcji */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-semibold text-indigo-400 mb-4 tracking-wider uppercase">
                    <Sparkles className="size-3.5" />
                    <span>{isPl ? "Przewodnik po funkcjach i obsłudze" : "Features & How-To Guide"}</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5 max-w-3xl mx-auto">
                    {isPl
                        ? "Wszystko, co musisz wiedzieć: Co to jest i jak używać Lectoro"
                        : "Everything You Need to Know: What It Is & How to Use Lectoro"}
                </h2>
                <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    {isPl
                        ? "Zaprojektowane na wzór Language Reactor, udoskonalone o kontekstową sztuczną inteligencję, wymowę Chrome Google TTS i mobilne fiszki ze spaced repetition."
                        : "Engineered like Language Reactor, enhanced with contextual AI, Chrome Google TTS audio, and spaced-repetition mobile video flashcards."}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
                {/* ========================================================================= */}
                {/* BLOK 1: PODWÓJNE NAPISY (NETFLIX & YOUTUBE)                              */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
                            <Film className="size-3.5" />
                            <span>{isPl ? "01 • PODWÓJNE NAPISY" : "01 • DUAL SUBTITLES"}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                            {isPl
                                ? "Oglądaj filmy z napisami w dwóch językach jednocześnie"
                                : "Watch Movies with Simultaneous Dual Subtitles"}
                        </h3>

                        {/* Co to jest */}
                        <div className="rounded-xl p-4.5 bg-[#0D101C]/80 border border-white/[0.08] space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                                <Zap className="size-3.5 text-indigo-400" />
                                <span>{isPl ? "Co to jest?" : "What is it?"}</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {isPl
                                    ? "Lectoro nakłada na odtwarzacz Netflixa i YouTube dwie niezależne ścieżki napisów: oryginalną w języku obcym (do nauki słuchania i czytania) oraz przetłumaczoną na Twój język ojczysty (jako natychmiastowe wsparcie)."
                                    : "Lectoro overlays two concurrent subtitle tracks onto Netflix and YouTube: the original target language (for listening & reading comprehension) and a parallel translation in your native language."}
                            </p>
                        </div>

                        {/* Jak używać */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isPl ? "Jak tego używać krok po kroku:" : "How to use it:"}
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="size-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                        1
                                    </span>
                                    <span>
                                        {isPl
                                            ? "Zainstaluj rozszerzenie i wybierz język, którego się uczysz, oraz swój język ojczysty."
                                            : "Install the extension and set your target language alongside your mother tongue."}
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="size-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                        2
                                    </span>
                                    <span>
                                        {isPl
                                            ? "Otwórz dowolny film lub serial na Netflixie, YouTube, TED lub Plex – panel napisów pojawi się automatycznie."
                                            : "Open any title on Netflix, YouTube, TED, or Plex – dual subtitles appear automatically."}
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="size-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
                    <div className="lg:col-span-6">
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
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                    Slot 1
                                </span>
                            </div>

                            {/* Slot na zdjęcie */}
                            <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                                <Image
                                    src={FEATURE_IMAGE_SLOTS.slot1_dualSubtitles.src}
                                    alt={FEATURE_IMAGE_SLOTS.slot1_dualSubtitles.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/80 via-transparent to-transparent pointer-events-none" />

                                {/* Etykieta podmiany zdjęcia */}
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0D101C]/90 backdrop-blur-md border border-white/[0.1] text-xs text-slate-300">
                                    <div className="flex items-center gap-2 truncate">
                                        <Camera className="size-4 text-indigo-400 shrink-0" />
                                        <span className="truncate font-medium">
                                            {FEATURE_IMAGE_SLOTS.slot1_dualSubtitles.label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
                                        FEATURE_IMAGE_SLOTS.slot1
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* BLOK 2: INTERAKTYWNY SŁOWNIK I WYMOWA AUDIO (ODWRÓCONY UKŁAD)             */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Ramka na zdjęcie 2 (Po lewej na desktopie) */}
                    <div className="lg:col-span-6 order-2 lg:order-1">
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
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                    Slot 2
                                </span>
                            </div>

                            <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
                                <Image
                                    src={FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio.src}
                                    alt={FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/80 via-transparent to-transparent pointer-events-none" />

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0D101C]/90 backdrop-blur-md border border-white/[0.1] text-xs text-slate-300">
                                    <div className="flex items-center gap-2 truncate">
                                        <Camera className="size-4 text-indigo-400 shrink-0" />
                                        <span className="truncate font-medium">
                                            {FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio.label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
                                        FEATURE_IMAGE_SLOTS.slot2
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Treść Bloku 2 */}
                    <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
                            <MousePointerClick className="size-3.5" />
                            <span>{isPl ? "02 • KLIKALNY SŁOWNIK & AUDIO" : "02 • POP-UP DICTIONARY & AUDIO"}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                            {isPl
                                ? "Kliknij dowolne słowo, aby poznać znaczenie i wymowę"
                                : "Click Any Word for Instant Meaning and Native Audio"}
                        </h3>

                        <div className="rounded-xl p-4.5 bg-[#0D101C]/80 border border-white/[0.08] space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                                <Zap className="size-3.5 text-cyan-400" />
                                <span>{isPl ? "Co to jest?" : "What is it?"}</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {isPl
                                    ? "Każde pojedyncze słowo w napisach jest interaktywne. Kliknięcie natychmiast pauzuje odtwarzanie i otwiera precyzyjny dymek z definicją, formą gramatyczną oraz przyciskiem odsłuchu natywnego lektora Chrome Google TTS."
                                    : "Every word in the subtitles is interactive. Clicking immediately pauses playback and opens a dictionary popover with definitions, grammar breakdown, and instant native TTS audio."}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isPl ? "Jak tego używać w praktyce:" : "How to use it in practice:"}
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold">
                            <Brain className="size-3.5" />
                            <span>{isPl ? "03 • WYJAŚNIENIA KONTEKSTOWE AI" : "03 • CONTEXTUAL AI BREAKDOWN"}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                            {isPl
                                ? "Zrozum idiomy, slang i żarty słowne, których nie ma w słowniku"
                                : "Understand Idioms, Slang, and Jokes Beyond Literal Dictionaries"}
                        </h3>

                        <div className="rounded-xl p-4.5 bg-[#0D101C]/80 border border-white/[0.08] space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                                <Zap className="size-3.5 text-purple-400" />
                                <span>{isPl ? "Co to jest?" : "What is it?"}</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {isPl
                                    ? "Tradycyjne słowniki zawodzą przy idiomach takich jak 'bite the bullet' czy potocznych zwrotach w filmach. Asystent AI Lectoro analizuje całe zdanie i scenę, podając zwięzłe wyjaśnienie dlaczego dany zwrot oznacza to, co oznacza."
                                    : "Traditional dictionaries fail at idioms like 'spill the beans' or movie slang. Lectoro's contextual AI analyzes the entire dialogue line and provides a clear, natural explanation tailored to that specific scene."}
                            </p>
                        </div>

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
                    <div className="lg:col-span-6">
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
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                    Slot 3
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

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0D101C]/90 backdrop-blur-md border border-white/[0.1] text-xs text-slate-300">
                                    <div className="flex items-center gap-2 truncate">
                                        <Camera className="size-4 text-indigo-400 shrink-0" />
                                        <span className="truncate font-medium">
                                            {FEATURE_IMAGE_SLOTS.slot3_aiExplanation.label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
                                        FEATURE_IMAGE_SLOTS.slot3
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* BLOK 4: SKRÓTY KLAWISZOWE & PRECYZYJNA NAWIGACJA (JAK W LR)               */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Ramka na zdjęcie 4 (Po lewej na desktopie) */}
                    <div className="lg:col-span-6 order-2 lg:order-1">
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
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                    Slot 4
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

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0D101C]/90 backdrop-blur-md border border-white/[0.1] text-xs text-slate-300">
                                    <div className="flex items-center gap-2 truncate">
                                        <Camera className="size-4 text-indigo-400 shrink-0" />
                                        <span className="truncate font-medium">
                                            {FEATURE_IMAGE_SLOTS.slot4_keyboardShortcuts.label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
                                        FEATURE_IMAGE_SLOTS.slot4
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Treść Bloku 4 */}
                    <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
                            <Keyboard className="size-3.5" />
                            <span>{isPl ? "04 • STEROWANIE KLAWIATURĄ" : "04 • KEYBOARD CONTROLS"}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                            {isPl
                                ? "Steruj filmem jak profesjonalista bez sięgania po myszkę"
                                : "Master Playback Navigation Without Touching the Mouse"}
                        </h3>

                        <div className="rounded-xl p-4.5 bg-[#0D101C]/80 border border-white/[0.08] space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                <Zap className="size-3.5 text-amber-400" />
                                <span>{isPl ? "Co to jest?" : "What is it?"}</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {isPl
                                    ? "Identycznie jak w Language Reactor, Lectoro daje Ci precyzyjne klawisze nawigacji po napisach oraz funkcję automatycznej pauzy po każdej linijce dialogu, abyś mógł spokojnie przeczytać i powtórzyć trudną scenę."
                                    : "Just like Language Reactor, Lectoro gives you dedicated subtitle-by-subtitle navigation hotkeys and an Auto-Pause mode to digest difficult dialogue at your own pace."}
                            </p>
                        </div>

                        {/* Wypisane skróty w czytelnych kafelkach kbd */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isPl ? "Skróty klawiszowe (Hotkeys):" : "Keyboard Shortcuts:"}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 text-xs">
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                                    <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-indigo-500/40 text-indigo-300 font-mono font-bold shadow-xs">
                                        A
                                    </kbd>
                                    <span className="text-slate-300">{isPl ? "Poprzedni napis" : "Previous subtitle"}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                                    <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-indigo-500/40 text-indigo-300 font-mono font-bold shadow-xs">
                                        S
                                    </kbd>
                                    <span className="text-slate-300 font-semibold text-white">
                                        {isPl ? "Powtórz napis (Replay)" : "Repeat subtitle"}
                                    </span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                                    <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-indigo-500/40 text-indigo-300 font-mono font-bold shadow-xs">
                                        D
                                    </kbd>
                                    <span className="text-slate-300">{isPl ? "Następny napis" : "Next subtitle"}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                                    <kbd className="px-2.5 py-1 rounded-md bg-[#161B2E] border border-indigo-500/40 text-indigo-300 font-mono font-bold shadow-xs">
                                        Spacja
                                    </kbd>
                                    <span className="text-slate-300">{isPl ? "Pauza / Odtwórz" : "Play / Pause"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* BLOK 5: FISZKI WIDEO & POWTÓRKI SRS (SPACED REPETITION)                  */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                            <Layers className="size-3.5" />
                            <span>{isPl ? "05 • FISZKI WIDEO & POWTÓRKI SRS" : "05 • VIDEO FLASHCARDS & SRS"}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                            {isPl
                                ? "Zapisuj słówka wraz z kadrem z filmu i utrwalaj je w pamięci"
                                : "Save Words with Real Video Stills & Review via SRS"}
                        </h3>

                        <div className="rounded-xl p-4.5 bg-[#0D101C]/80 border border-white/[0.08] space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                                <Zap className="size-3.5 text-emerald-400" />
                                <span>{isPl ? "Co to jest?" : "What is it?"}</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {isPl
                                    ? "Zamiast suchych list słówek, Lectoro automatycznie tworzy fiszki z dokładnym kadrem sceny, całym zdaniem z filmu i dźwiękiem. Następnie algorytm powtórek rozłożonych w czasie (SRS) planuje krótkie, 5-minutowe sesje na komputerze lub telefonie."
                                    : "Instead of isolated vocabulary lists, Lectoro captures the exact movie snapshot, audio, and surrounding line. An intelligent spaced-repetition engine organizes quick 5-minute daily sessions on desktop or mobile."}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isPl ? "Jak działają codzienne powtórki:" : "How daily reviews work:"}
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
                    <div className="lg:col-span-6">
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
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                    Slot 5
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

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0D101C]/90 backdrop-blur-md border border-white/[0.1] text-xs text-slate-300">
                                    <div className="flex items-center gap-2 truncate">
                                        <Camera className="size-4 text-indigo-400 shrink-0" />
                                        <span className="truncate font-medium">
                                            {FEATURE_IMAGE_SLOTS.slot5_flashcardsSRS.label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
                                        FEATURE_IMAGE_SLOTS.slot5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* BLOK 6: TŁUMACZENIE STRON WWW & ARTYKUŁÓW (ODWRÓCONY UKŁAD)               */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Ramka na zdjęcie 6 (Po lewej na desktopie) */}
                    <div className="lg:col-span-6 order-2 lg:order-1">
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
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                    Slot 6
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

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0D101C]/90 backdrop-blur-md border border-white/[0.1] text-xs text-slate-300">
                                    <div className="flex items-center gap-2 truncate">
                                        <Camera className="size-4 text-indigo-400 shrink-0" />
                                        <span className="truncate font-medium">
                                            {FEATURE_IMAGE_SLOTS.slot6_webReader.label}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
                                        FEATURE_IMAGE_SLOTS.slot6
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Treść Bloku 6 */}
                    <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                            <Globe className="size-3.5" />
                            <span>{isPl ? "06 • CZYTNIK STRON & ARTYKUŁÓW" : "06 • WEB READER MODE"}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                            {isPl
                                ? "Ucz się języka czytając artykuły, wiadomości i wpisy na X"
                                : "Learn by Reading Articles, News, and Social Posts Anywhere"}
                        </h3>

                        <div className="rounded-xl p-4.5 bg-[#0D101C]/80 border border-white/[0.08] space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                                <Zap className="size-3.5 text-blue-400" />
                                <span>{isPl ? "Co to jest?" : "What is it?"}</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {isPl
                                    ? "Lectoro działa nie tylko na wideo. Podczas przeglądania internetu możesz zaznaczyć dowolne słowo lub zdanie na dowolnej stronie www, aby natychmiast zobaczyć tłumaczenie, odsłuchać audio i dodać je do swoich powtórek."
                                    : "Lectoro works outside video too. While browsing the web, highlight any word or sentence on any webpage to immediately inspect translations, hear speech audio, and save to your shared deck."}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isPl ? "Jak używać na stronach www:" : "How to use on web pages:"}
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
