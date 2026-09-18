"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";
import type { Dict } from "@/lib/i18n/types";
import { CHROME_STORE_URL } from "@/lib/config";

interface HeroProps {
    dict: Pick<Dict, "hero">;
}

interface AIExplainItem {
    type: "sentence" | "idiom" | "phrasal_verb";
    title: string;
    badge?: string;
    term: string;
    meaning: string;
    explanation?: string;
    audioText: string;
    audioLang: string;
    phraseWrapId?: string;
}

const AI_QUEUE: AIExplainItem[] = [
    {
        type: "sentence",
        title: "Zdanie",
        badge: "ZDANIE",
        term: "Honestly, I was over the moon when I heard the news.",
        meaning:
            "Szczerze mówiąc, byłem w siódmym niebie, kiedy usłyszałem te wieści.",
        audioText:
            "Szczerze mówiąc, byłem w siódmym niebie, kiedy usłyszałem te wieści.",
        audioLang: "pl-PL",
    },
    {
        type: "idiom",
        title: "over the moon",
        badge: "IDIOM",
        term: "over the moon",
        meaning: "być w siódmym niebie, niezwykle szczęśliwym",
        explanation:
            'Zwrot idiomatyczny oznaczający ogromną radość lub ekscytację. Powszechnie stosowany w języku mówionym po otrzymaniu świetnych wiadomości: <span class="__qt_tts-original-quote">over the moon</span>.',
        audioText: "over the moon. Być w siódmym niebie, niezwykle szczęśliwym.",
        audioLang: "en-US",
        phraseWrapId: "wrap-moon",
    },
    {
        type: "phrasal_verb",
        title: "heard the news",
        badge: "CZASOWNIK FRAZOWY",
        term: "heard the news",
        meaning: "dowiedzieć się, usłyszeć wieści",
        explanation:
            'W tym kontekście oznacza moment otrzymania ważnych informacji. Czasownik nieregularny: <span class="__qt_tts-original-quote">hear – heard – heard</span>.',
        audioText: "heard the news. Dowiedzieć się, usłyszeć wieści.",
        audioLang: "en-US",
        phraseWrapId: "wrap-news",
    },
];

interface SubtitleToken {
    id: string;
    text: string;
    clean: string;
    aiIndex?: number;
    phraseWrapId?: string;
}

const SUBTITLE_TOKENS: SubtitleToken[] = [
    { id: "w1", text: "Honestly,", clean: "Honestly" },
    { id: "w2", text: "I", clean: "I" },
    { id: "w3", text: "was", clean: "was" },
    {
        id: "w4",
        text: "over",
        clean: "over",
        aiIndex: 1,
        phraseWrapId: "wrap-moon",
    },
    {
        id: "w5",
        text: "the",
        clean: "the",
        aiIndex: 1,
        phraseWrapId: "wrap-moon",
    },
    {
        id: "w6",
        text: "moon",
        clean: "moon",
        aiIndex: 1,
        phraseWrapId: "wrap-moon",
    },
    { id: "w7", text: "when", clean: "when" },
    { id: "w8", text: "I", clean: "I" },
    {
        id: "w9",
        text: "heard",
        clean: "heard",
        aiIndex: 2,
        phraseWrapId: "wrap-news",
    },
    {
        id: "w10",
        text: "the",
        clean: "the",
        aiIndex: 2,
        phraseWrapId: "wrap-news",
    },
    {
        id: "w11",
        text: "news.",
        clean: "news",
        aiIndex: 2,
        phraseWrapId: "wrap-news",
    },
];

export default function Hero({ dict }: HeroProps) {
    const { hero } = dict;

    // Enter AI Mode State
    const [isOpen, setIsOpen] = useState(true);
    const [dataState, setDataState] = useState<"ai-loading" | "ready">("ready");
    const [activeStep, setActiveStep] = useState(0);
    const [hoveredSubIdx, setHoveredSubIdx] = useState<number | null>(null);
    const [hoveredPillIdx, setHoveredPillIdx] = useState<number | null>(null);
    const [savedIndices, setSavedIndices] = useState<Set<number>>(new Set());
    const [aiSavedIndices, setAiSavedIndices] = useState<Set<number>>(
        new Set(),
    );
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaywallOpen, setIsPaywallOpen] = useState(false);
    const [isProBadge, setIsProBadge] = useState(true);
    const [revealKey, setRevealKey] = useState(0);

    const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Audio TTS player
    const handleSpeak = useCallback((text: string, lang = "en-US") => {
        if (typeof window === "undefined") return;

        if (speechTimerRef.current) {
            clearTimeout(speechTimerRef.current);
        }

        if ("speechSynthesis" in window) {
            try {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = lang;
                utterance.rate = 0.92;
                setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);

                // Fallback timeout
                speechTimerRef.current = setTimeout(() => {
                    setIsSpeaking(false);
                }, 3500);
            } catch {
                setIsSpeaking(false);
            }
        } else {
            setIsSpeaking(true);
            speechTimerRef.current = setTimeout(() => {
                setIsSpeaking(false);
            }, 1800);
        }
    }, []);

    // Trigger Enter AI analysis with realistic shimmer
    const triggerAnalysis = useCallback(
        (targetIndex = 0) => {
            setIsPaywallOpen(false);
            setDataState("ai-loading");
            setIsOpen(true);
            setActiveStep(targetIndex);

            setTimeout(() => {
                setDataState("ready");
                setRevealKey((prev) => prev + 1);
            }, 550);
        },
        [],
    );

    // Next step
    const handleNext = useCallback(() => {
        setActiveStep((curr) => {
            const next = Math.min(curr + 1, AI_QUEUE.length - 1);
            return next;
        });
    }, []);

    // Prev step
    const handlePrev = useCallback(() => {
        setActiveStep((curr) => {
            const prev = Math.max(curr - 1, 0);
            return prev;
        });
    }, []);

    // Save word / flashcard (Z)
    const handleSave = useCallback(() => {
        setSavedIndices((prev) => {
            const next = new Set(prev);
            next.add(activeStep);
            return next;
        });
    }, [activeStep]);

    // Save AI sentence flashcard
    const handleAiSave = useCallback(() => {
        setAiSavedIndices((prev) => {
            const next = new Set(prev);
            next.add(activeStep);
            return next;
        });
    }, [activeStep]);

    // Toggle Paywall Modal Demo
    const handleTogglePaywall = useCallback(() => {
        setIsPaywallOpen((prev) => !prev);
    }, []);

    // Global keyboard shortcuts (Enter, Q, A, D, Z, Escape, W)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore when user typing in real input
            const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea" || tag === "select") {
                return;
            }

            const code = e.code;
            const key = e.key.toLowerCase();

            if (code === "Enter" || code === "NumpadEnter" || key === "q") {
                e.preventDefault();
                if (!isOpen) {
                    triggerAnalysis(0);
                } else {
                    setIsOpen(false);
                }
            } else if (code === "Escape" || key === "w") {
                if (isOpen || isPaywallOpen) {
                    e.preventDefault();
                    setIsOpen(false);
                    setIsPaywallOpen(false);
                }
            } else if (code === "KeyD" || code === "ArrowRight") {
                if (isOpen && !isPaywallOpen) {
                    e.preventDefault();
                    handleNext();
                }
            } else if (code === "KeyA" || code === "ArrowLeft") {
                if (isOpen && !isPaywallOpen) {
                    e.preventDefault();
                    handlePrev();
                }
            } else if (code === "KeyZ" || key === "v") {
                if (isOpen && !isPaywallOpen) {
                    e.preventDefault();
                    handleSave();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
        isOpen,
        isPaywallOpen,
        triggerAnalysis,
        handleNext,
        handlePrev,
        handleSave,
    ]);

    const currentItem = AI_QUEUE[activeStep];
    const isSentence = currentItem.type === "sentence";
    const isSaved = savedIndices.has(activeStep);
    const isAiSaved = aiSavedIndices.has(activeStep);

    return (
        <section className="relative pt-20 pb-16 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Live Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 tracking-wide uppercase mb-6">
                    <span>{hero.badge}</span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white mb-6">
                    {hero.title}{" "}
                    <span className="text-gradient">{hero.titleHighlight}</span>
                </h1>

                {/* Hero Subtitle */}
                <p className="font-body text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-3xl mx-auto mb-10">
                    {hero.subtitle}
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                        href={CHROME_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 rounded-2xl text-base font-extrabold text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
                        <span>{hero.installCta}</span>
                        <span className="px-2.5 absolute -top-2 -left-3 sm:-left-6 rotate-[-27deg] py-1 rounded-lg text-xs font-extrabold -tracking-widest bg-teal-500 text-amber-200 uppercase">
                            <span className="animate-pulse">
                                {hero.trialBadge}
                            </span>
                        </span>
                    </Link>

                    <Link
                        href="#demo"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        <span>{hero.demoCta}</span>
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-400 font-medium">
                    <span>{hero.noCard}</span>
                    <span>•</span>
                    <span>{hero.builtFor}</span>
                </div>
            </div>

            {/* Interactive Hero Showcase: Tryb Enter AI 1-do-1 z Enter.md */}
            <div
                className="max-w-5xl mx-auto mt-8 sm:mt-12"
                id="demo"
                translate="no"
            >
                <div className="relative group">
                    {/* Ambient Glow behind player */}
                    <div className="absolute -inset-4 bg-linear-to-r from-indigo-500/30 via-purple-500/20 to-cyan-500/30 rounded-[28px] blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

                    {/* Main Player Simulator Frame */}
                    <div className="relative z-10 bg-[#090d1a] border-y sm:border border-white/15 rounded-none sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90">
                        {/* Player Top Window Bar */}
                        <div className="bg-[#0d1224] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                            </div>

                            <div className="flex items-center gap-2 bg-white/4 px-3.5 py-1 rounded-md text-xs font-mono text-slate-400 border border-white/5 max-w-50 sm:max-w-none truncate">
                                <svg
                                    className="w-3.5 h-3.5 text-slate-400 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                        ry="2"
                                    ></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <span className="truncate">
                                    https://www.netflix.com/watch/81040344
                                </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => triggerAnalysis(activeStep)}
                                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-[11px] font-semibold text-purple-300 hover:bg-purple-500/25 transition cursor-pointer"
                                    title="Wciśnij Enter na klawiaturze, aby uruchomić analizę"
                                >
                                    <span>✨ Re-Analyze</span>
                                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono border border-white/20 text-white">
                                        Enter
                                    </kbd>
                                </button>

                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 shrink-0 pl-1">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                    <span className="hidden sm:inline">
                                        Lectoro AI
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Video Viewport Area */}
                        <div
                            className="ai-video-slot relative bg-linear-to-b from-[#1b2141] via-[#0d1226] to-[#080a14] p-6 sm:p-8 min-h-[440px] sm:min-h-[500px]"
                            data-lectoro-ai-active="true"
                        >
                            {/* Backdrop Cinematic Linear Overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/85 z-2 pointer-events-none"></div>

                            {/* Background Movie Frame */}
                            <div className="absolute h-full w-full top-0 left-0">
                                <Image
                                    src="/hero.png"
                                    alt="Lectoro AI Netflix player scene"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Pause Indicator overlay during AI inspection */}
                            {isOpen && (
                                <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-300">
                                    <span className="w-1.5 h-3 inline-flex gap-0.5 items-center justify-center">
                                        <span className="w-0.5 h-2.5 bg-amber-400 rounded-full"></span>
                                        <span className="w-0.5 h-2.5 bg-amber-400 rounded-full"></span>
                                    </span>
                                    <span>AI Paused</span>
                                </div>
                            )}

                            {/* ═══════════════════════════════════════════════════════════════
                                1:1 ENTER AI TRANSLATION OVERLAY POPUP (Enter.md Section 4 & 6)
                                ═══════════════════════════════════════════════════════════════ */}
                            {isOpen && (
                                <div
                                    key={revealKey}
                                    id="__qt_sentence_translation"
                                    className="__qt_sub-overlay __qt_ai-explain-overlay __qt_translation-reveal"
                                    data-state={dataState}
                                >
                                    {dataState === "ai-loading" ? (
                                        <span className="ai-loader-label">
                                            ✨ Analyzing…
                                        </span>
                                    ) : isPaywallOpen ? (
                                        /* ═══════════════════════════════════════════════════════════════
                                           IN-VIDEO PAYWALL MODAL PREVIEW (Enter.md Section 6.9)
                                           ═══════════════════════════════════════════════════════════════ */
                                        <div className="__qt_translation-copy">
                                            <div className="__qt_paywall-header">
                                                <div className="__qt_paywall-badge-title">
                                                    <span className="__qt_paywall-icon">
                                                        ✦
                                                    </span>
                                                    <span>
                                                        Odblokuj Lectoro PRO AI
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="__qt_paywall-close-btn"
                                                    onClick={() =>
                                                        setIsPaywallOpen(false)
                                                    }
                                                    title="Wróć do analizy (Esc)"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            <div className="__qt_paywall-body">
                                                <div className="__qt_paywall-card">
                                                    <div className="__qt_paywall-status-banner">
                                                    <span className="__qt_paywall-check">
                                                        ✓
                                                    </span>
                                                    <div className="__qt_paywall-status-text">
                                                        <strong>
                                                            Darmowy limit: 15/15
                                                            wykorzystany
                                                        </strong>
                                                        <span>
                                                            Aktywuj Pro, aby
                                                            kontynuować naukę
                                                            bez ograniczeń.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="__qt_paywall-offer-title">
                                                    Korzyści nielimitowanego
                                                    konta Pro:
                                                </div>
                                                <ul className="__qt_paywall-perks-list">
                                                    <li>
                                                        <span className="__qt_paywall-spark">
                                                            ✦
                                                        </span>
                                                        <span>
                                                            Błyskawiczne
                                                            wyjaśnienia idiomów
                                                            i slangu z Gemini
                                                            Flash
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="__qt_paywall-spark">
                                                            ✦
                                                        </span>
                                                        <span>
                                                            Natywny lektor TTS
                                                            Google dla każdego
                                                            słówka i zwrotu
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="__qt_paywall-spark">
                                                            ✦
                                                        </span>
                                                        <span>
                                                            Automatyczny zapis
                                                            do talii powtórek
                                                            SRS (klawisz Z)
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="__qt_paywall-footer">
                                            <button
                                                type="button"
                                                className="__qt_paywall-btn-ghost"
                                                onClick={() =>
                                                    setIsPaywallOpen(false)
                                                }
                                            >
                                                Wróć do analizy
                                            </button>
                                            <a
                                                href={CHROME_STORE_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="__qt_paywall-btn-primary"
                                            >
                                                Wypróbuj Pro za darmo
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    /* ═══════════════════════════════════════════════════════════════
                                       STANDARD ENTER AI EXPLANATION POPUP (Enter.md Section 4 & 6.5)
                                       ═══════════════════════════════════════════════════════════════ */
                                    <div className="__qt_translation-copy">
                                        {/* 1. Header with Ribbon, Credit Pill and Navigation Group */}
                                        <div className="__qt_header">
                                            <div
                                                className="__qt_ai-queue-ribbon"
                                                role="tablist"
                                                aria-label="Breakdown items"
                                            >
                                                {AI_QUEUE.map((item, idx) => {
                                                    const isActive =
                                                        idx === activeStep;
                                                    const isQueued =
                                                        idx !== activeStep;
                                                    const isHighlighted =
                                                        hoveredSubIdx === idx;
                                                    const icon =
                                                        item.type === "sentence"
                                                            ? "💬"
                                                            : "✨";

                                                    return (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            role="tab"
                                                            aria-selected={
                                                                isActive
                                                            }
                                                            className={`__qt_ai-queue-pill ${
                                                                isActive
                                                                    ? "active"
                                                                    : ""
                                                            } ${
                                                                isQueued
                                                                    ? "__qt_ai-pill-upcoming"
                                                                    : ""
                                                            } ${
                                                                isHighlighted
                                                                    ? "__qt_pill-highlight"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                setActiveStep(
                                                                    idx,
                                                                )
                                                            }
                                                            onMouseEnter={() =>
                                                                setHoveredPillIdx(
                                                                    idx,
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setHoveredPillIdx(
                                                                    null,
                                                                )
                                                            }
                                                            title={item.title}
                                                        >
                                                            <span className="__qt_pill-icon">
                                                                {icon}
                                                            </span>
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* AI Credit Pill */}
                                            <span
                                                className={`__qt_ai-credit-pill ${
                                                    isProBadge ? "is-pro" : ""
                                                }`}
                                                onClick={handleTogglePaywall}
                                                title="Kliknij, aby podejrzeć status limitu i In-Video Paywall"
                                            >
                                                {isProBadge
                                                    ? "✦ PRO AI"
                                                    : "✦ AI 14/15"}
                                            </span>

                                            {/* Navigation Group (Prev / Counter / Next) */}
                                            <div className="__qt_ai-nav-group">
                                                <button
                                                    type="button"
                                                    className="__qt_ai-nav-btn __qt_ai-prev-btn"
                                                    onClick={handlePrev}
                                                    disabled={activeStep === 0}
                                                    title="Poprzedni etap (← / A)"
                                                >
                                                    ◀
                                                </button>
                                                <span className="__qt_ai-step-counter">
                                                    {activeStep + 1}/
                                                    {AI_QUEUE.length}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="__qt_ai-nav-btn __qt_ai-next-btn"
                                                    onClick={handleNext}
                                                    disabled={
                                                        activeStep >=
                                                        AI_QUEUE.length - 1
                                                    }
                                                    title="Następny etap (→ / D)"
                                                >
                                                    ▶
                                                </button>
                                            </div>
                                        </div>

                                        {/* 2. Body Card (Sentence vs Idiom/Phrasal Verb) */}
                                        <div className="__qt_body">
                                            <div
                                                className="__qt_ai-term-card"
                                                data-type={currentItem.type}
                                            >
                                                {isSentence ? (
                                                    <div className="__qt_ai-term-title-wrap __qt_ai-sentence-wrap">
                                                        <div className="__qt_ai-term-meaning">
                                                            {
                                                                currentItem.meaning
                                                            }
                                                        </div>
                                                        <span className="__qt_word-actions">
                                                            <button
                                                                type="button"
                                                                className={`__qt_speak ${
                                                                    isSpeaking
                                                                        ? "speaking"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    handleSpeak(
                                                                        currentItem.audioText,
                                                                        currentItem.audioLang,
                                                                    )
                                                                }
                                                                title="Odsłuchaj lektora TTS"
                                                                aria-label="Odsłuchaj lektora TTS"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="14"
                                                                    height="14"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="__qt_ai-term-header">
                                                            {currentItem.badge && (
                                                                <span className="__qt_ai-badge">
                                                                    {
                                                                        currentItem.badge
                                                                    }
                                                                </span>
                                                            )}
                                                            <div className="__qt_ai-term-title-wrap">
                                                                <span className="__qt_ai-term">
                                                                    {
                                                                        currentItem.term
                                                                    }
                                                                </span>
                                                                <span className="__qt_word-actions">
                                                                    <button
                                                                        type="button"
                                                                        className={`__qt_speak ${
                                                                            isSpeaking
                                                                                ? "speaking"
                                                                                : ""
                                                                        }`}
                                                                        onClick={() =>
                                                                            handleSpeak(
                                                                                currentItem.audioText,
                                                                                currentItem.audioLang,
                                                                            )
                                                                        }
                                                                        title="Odsłuchaj wymowę lektora"
                                                                        aria-label="Odsłuchaj wymowę lektora"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="14"
                                                                            height="14"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        >
                                                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                                                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {currentItem.meaning && (
                                                            <div className="__qt_ai-term-meaning">
                                                                {
                                                                    currentItem.meaning
                                                                }
                                                            </div>
                                                        )}

                                                        {currentItem.explanation && (
                                                            <div
                                                                className="__qt_ai-term-explanation"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: currentItem.explanation,
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* 3. Action Footer (Save & AI Sentence) */}
                                        <div className="__qt_save-footer">
                                            <button
                                                type="button"
                                                className={`__qt_save-word-btn __qt_save-footer-btn ${
                                                    isSaved ? "saved" : ""
                                                }`}
                                                onClick={handleSave}
                                                disabled={isSaved}
                                                title="Zapisz do codziennych powtórek fiszek (Z)"
                                            >
                                                {isSaved ? (
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="#4ecdc4"
                                                            stroke="#4ecdc4"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>Saved!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>Save</span>
                                                        <kbd className="__qt_key-hint">
                                                            Z
                                                        </kbd>
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                className={`__qt_save-ai-btn __qt_save-footer-btn ${
                                                    isAiSaved ? "saved" : ""
                                                }`}
                                                onClick={handleAiSave}
                                                disabled={isAiSaved}
                                                title="Wygeneruj inteligentne zdanie kontekstowe do powtórki"
                                            >
                                                {isAiSaved ? (
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="#a78bfa"
                                                            stroke="#a78bfa"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                            <path d="M2 17l10 5 10-5" />
                                                            <path d="M2 12l10 5 10-5" />
                                                        </svg>
                                                        <span>
                                                            Saved to Review!
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                            <path d="M2 17l10 5 10-5" />
                                                            <path d="M2 12l10 5 10-5" />
                                                        </svg>
                                                        <span>AI Sentence</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ═══════════════════════════════════════════════════════════════
                            VIDEO SUBTITLE OVERLAY (Enter.md Section 6.8 & Section 1-3)
                            ═══════════════════════════════════════════════════════════════ */}
                        <div
                            id="__qt_custom_subtitles_layer"
                            className="px-4 select-none"
                        >
                            <div className="max-w-3xl mx-auto flex items-center justify-center flex-wrap gap-x-1 sm:gap-x-1.5 gap-y-1">
                                {/* Word 1-3: "Honestly, I was" */}
                                {SUBTITLE_TOKENS.slice(0, 3).map((token) => (
                                    <span
                                        key={token.id}
                                        className="__qt_sub-word"
                                        onClick={() => triggerAnalysis(0)}
                                        title="Kliknij, aby otworzyć tłumaczenie całego zdania"
                                    >
                                        {token.text}
                                    </span>
                                ))}

                                {/* Idiom phrase: "over the moon" (wrapped into __qt_ai-sub-wrap) */}
                                <span
                                    className={`__qt_ai-sub-wrap ${
                                        isOpen && activeStep === 1
                                            ? "__qt_ai-sub-active"
                                            : isOpen
                                              ? "__qt_ai-sub-upcoming"
                                              : ""
                                    } ${
                                        hoveredPillIdx === 1
                                            ? "brightness-125"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        if (!isOpen) triggerAnalysis(1);
                                        else setActiveStep(1);
                                    }}
                                    onMouseEnter={() => setHoveredSubIdx(1)}
                                    onMouseLeave={() => setHoveredSubIdx(null)}
                                    title="Idiom: 'over the moon' (kliknij, aby wyjaśnić)"
                                >
                                    {SUBTITLE_TOKENS.slice(3, 6).map(
                                        (token) => (
                                            <span
                                                key={token.id}
                                                className="__qt_sub-word"
                                            >
                                                {token.text}
                                            </span>
                                        ),
                                    )}
                                </span>

                                {/* Word 7-8: "when I" */}
                                {SUBTITLE_TOKENS.slice(6, 8).map((token) => (
                                    <span
                                        key={token.id}
                                        className="__qt_sub-word"
                                        onClick={() => triggerAnalysis(0)}
                                        title="Kliknij, aby otworzyć tłumaczenie zdania"
                                    >
                                        {token.text}
                                    </span>
                                ))}

                                {/* Phrasal verb: "heard the news." (wrapped into __qt_ai-sub-wrap) */}
                                <span
                                    className={`__qt_ai-sub-wrap ${
                                        isOpen && activeStep === 2
                                            ? "__qt_ai-sub-active"
                                            : isOpen
                                              ? "__qt_ai-sub-upcoming"
                                              : ""
                                    } ${
                                        hoveredPillIdx === 2
                                            ? "brightness-125"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        if (!isOpen) triggerAnalysis(2);
                                        else setActiveStep(2);
                                    }}
                                    onMouseEnter={() => setHoveredSubIdx(2)}
                                    onMouseLeave={() => setHoveredSubIdx(null)}
                                    title="Zwrot: 'heard the news' (kliknij, aby wyjaśnić)"
                                >
                                    {SUBTITLE_TOKENS.slice(8, 11).map(
                                        (token) => (
                                            <span
                                                key={token.id}
                                                className="__qt_sub-word"
                                            >
                                                {token.text}
                                            </span>
                                        ),
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Player Bottom Control Bar */}
                        <div className="relative z-10 flex items-center mt-12 justify-between px-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl mt-auto">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (isOpen) setIsOpen(false);
                                        else triggerAnalysis(0);
                                    }}
                                    className="text-white hover:text-cyan-400 transition cursor-pointer"
                                    aria-label={
                                        isOpen ? "Wznów odtwarzanie" : "Pauza"
                                    }
                                    title={
                                        isOpen ? "Wznów film" : "Zatrzymaj film"
                                    }
                                >
                                    {isOpen ? (
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="6"
                                                y="4"
                                                width="4"
                                                height="16"
                                            ></rect>
                                            <rect
                                                x="14"
                                                y="4"
                                                width="4"
                                                height="16"
                                            ></rect>
                                        </svg>
                                    )}
                                </button>
                                <span className="text-xs font-mono text-slate-400">
                                    14:28 / 42:15
                                </span>
                            </div>
                            <div className="flex-1 mx-4 sm:mx-6 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                                <div className="w-[45%] h-full bg-linear-to-r from-indigo-500 to-cyan-400 rounded-full"></div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-300">
                                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                                    EN ⇄ PL
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsProBadge((p) => !p)}
                                    className="text-[10px] text-slate-400 hover:text-amber-300 transition"
                                    title="Przełącz status konta PRO / Free"
                                >
                                    {isProBadge ? "PRO" : "FREE"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Shortcuts Guidance Bar under the Simulator */}
                    <div className="mt-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                        <div className="flex items-center gap-1.5 font-medium text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                            <span className="hidden sm:inline">
                                Użyj klawiatury lub przycisków
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!isOpen) triggerAnalysis(0);
                                    else setIsOpen(false);
                                }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition cursor-pointer active:scale-95"
                            >
                                <kbd className="px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono border border-white/20 text-cyan-300">
                                    Enter
                                </kbd>
                                <span>{isOpen ? "Zamknij" : "Analiza AI"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={!isOpen || activeStep === 0}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 disabled:opacity-30 transition cursor-pointer"
                            >
                                <kbd className="px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono border border-white/20 text-slate-300">
                                    A
                                </kbd>
                                <span>Wstecz</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={
                                    !isOpen || activeStep >= AI_QUEUE.length - 1
                                }
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 disabled:opacity-30 transition cursor-pointer"
                            >
                                <kbd className="px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono border border-white/20 text-slate-300">
                                    D
                                </kbd>
                                <span>Dalej</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!isOpen || isSaved}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-teal-300 disabled:opacity-30 transition cursor-pointer"
                            >
                                <kbd className="px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono border border-white/20 text-teal-300">
                                    Z
                                </kbd>
                                <span>Zapisz</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleTogglePaywall}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 transition cursor-pointer"
                                title="Zobacz wygląd okna Paywall z sekcji 6.9"
                            >
                                <span className="text-xs">✦</span>
                                <span>Paywall Demo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}
