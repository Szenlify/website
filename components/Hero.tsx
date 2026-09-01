"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import type { Dict } from "@/lib/i18n/types";

interface WordItem {
    id: "ich" | "glaube" | "wir" | "haben" | "arger";
    word: string;
    trans: string;
    note: string;
    wordAudio: string;
    translationAudio: string;
}

const DEMO_WORDS: Record<WordItem["id"], WordItem> = {
    ich: {
        id: "ich",
        word: "Ich",
        trans: "I",
        note: 'A German personal pronoun meaning "I." It is used when the speaker refers to themselves.',
        wordAudio: "/audio/words/ich.mp3",
        translationAudio: "/audio/translations/ich.mp3",
    },

    glaube: {
        id: "glaube",
        word: "glaube",
        trans: "think / believe",
        note: 'A form of the verb "glauben," meaning "to think" or "to believe." In "Ich glaube," it usually means "I think."',
        wordAudio: "/audio/words/glaube.mp3",
        translationAudio: "/audio/translations/glaube.mp3",
    },

    wir: {
        id: "wir",
        word: "wir",
        trans: "we",
        note: 'A German personal pronoun meaning "we." It refers to the speaker together with other people.',
        wordAudio: "/audio/words/wir.mp3",
        translationAudio: "/audio/translations/wir.mp3",
    },

    haben: {
        id: "haben",
        word: "haben",
        trans: "have",
        note: 'The verb "haben" means "to have." Here it follows "wir," so "wir haben" means "we have."',
        wordAudio: "/audio/words/haben.mp3",
        translationAudio: "/audio/translations/haben.mp3",
    },

    arger: {
        id: "arger",
        word: "Ärger",
        trans: "trouble",
        note: 'A noun meaning "trouble" or "problems." The phrase "Ärger haben" means "to be in trouble."',
        wordAudio: "/audio/words/arger.mp3",
        translationAudio: "/audio/translations/arger.mp3",
    },
};

interface HeroProps {
    dict: Pick<Dict, "hero">;
}

export default function Hero({ dict }: HeroProps) {
    const { hero } = dict;
    const [selectedWord, setSelectedWord] = useState<WordItem>(
        DEMO_WORDS.haben,
    );
    const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
    const [activeAudio, setActiveAudio] = useState<{
        id: string;
        type: "word" | "explanation";
    } | null>(null);
    const currentAudioRef = React.useRef<HTMLAudioElement | null>(null);

    const stopCurrentAudio = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
            currentAudioRef.current = null;
        }
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
        setActiveAudio(null);
    };

    const playAudioWithFallback = (
        audioFileUrl: string,
        fallbackText: string,
        fallbackLang: string,
        id: string,
        type: "word" | "explanation",
    ) => {
        stopCurrentAudio();
        setActiveAudio({ id, type });

        const audio = new Audio(audioFileUrl);
        currentAudioRef.current = audio;

        const triggerFallback = () => {
            currentAudioRef.current = null;
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(fallbackText);
                utterance.lang = fallbackLang;
                utterance.rate = 0.95;
                utterance.onend = () => setActiveAudio(null);
                utterance.onerror = () => setActiveAudio(null);
                window.speechSynthesis.speak(utterance);
            } else {
                setActiveAudio(null);
            }
        };

        audio.onended = () => {
            setActiveAudio(null);
            currentAudioRef.current = null;
        };

        audio.onerror = () => {
            // Audio not added to folder yet -> seamless fallback
            triggerFallback();
        };

        audio.play().catch(() => {
            triggerFallback();
        });
    };

    const handlePlayWordAudio = (item: WordItem) => {
        playAudioWithFallback(
            item.wordAudio,
            item.word,
            "de-DE",
            item.id,
            "word",
        );
    };

    const handlePlayExplanationAudio = (item: WordItem) => {
        const speechText = `${item.trans}. ${item.note}`;
        playAudioWithFallback(
            item.translationAudio,
            speechText,
            "en-US",
            item.id,
            "explanation",
        );
    };

    const handleSaveFlashcard = () => {
        setSavedSuccess(true);
        setTimeout(() => {
            setSavedSuccess(false);
        }, 2500);
    };

    return (
        <section className="relative pt-20 pb-16 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Live Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300 tracking-wide uppercase mb-6">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] badge-dot"></span>
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
                        href="https://chromewebstore.google.com/"
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
                    {/* <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>★★★★★</span>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-slate-400 font-normal">(1,280+ ratings)</span>
          </div> */}
                    {/* <span>•</span> */}
                    <span>{hero.noCard}</span>
                    <span>•</span>
                    <span>{hero.builtFor}</span>
                </div>
            </div>

            {/* Interactive Hero Showcase & Drop-In Slot for AI Video Recording */}
            <div
                className="max-w-5xl mx-auto mt-8 sm:mt-12"
                id="demo"
                translate="no"
            >
                <div className="relative group">
                    {/* Glow effect behind container */}
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

                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 shrink-0">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                <span className="hidden sm:inline">
                                    LectoroAI
                                </span>
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
                        <div className="ai-video-slot relative bg-linear-to-b from-[#1b2141] via-[#0d1226] to-[#080a14] p-6 sm:p-8">
                            {/* Backdrop Cinematic linear Overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/85 z-2 pointer-events-none"></div>

                            <div className="absolute h-full w-full top-0 left-0">
                                <Image
                                    src="/hero.png"
                                    alt="AI Video"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Lectoro Active Mode Watermark */}
                            <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 rounded-lg text-xs font-bold text-white w-fit shadow-md">
                                <svg
                                    className="w-3.5 h-3.5 text-cyan-400 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                <span>Lectoro Subtitles Mode</span>
                            </div>

                            {/* Subtitles & Interactive Popover Area */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl mx-auto text-center pt-8 pb-4">
                                {/* Popover Tooltip matching exact Extension layout & styles */}
                                <div
                                    className="__qt_sentence_translation"
                                    id="__qt_sentence_translation"
                                >
                                    <div className="__qt_header">
                                        <span>DE → EN</span>
                                    </div>
                                    <div className="__qt_body">
                                        {/* DE Row (Original Word + Audio Pronunciation) */}
                                        <div className="__qt_row">
                                            <span
                                                className="__qt_label"
                                                title="Source language: German"
                                            >
                                                DE
                                            </span>
                                            <span className="__qt_text __qt_original">
                                                {selectedWord.word}
                                            </span>
                                            <span className="__qt_word-actions">
                                                <button
                                                    type="button"
                                                    className={`__qt_speak ${activeAudio?.id === selectedWord.id && activeAudio?.type === "word" ? "speaking" : ""}`}
                                                    onClick={() =>
                                                        handlePlayWordAudio(
                                                            selectedWord,
                                                        )
                                                    }
                                                    title="Play German pronunciation"
                                                    aria-label="Play German pronunciation"
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                    </svg>
                                                </button>
                                            </span>
                                        </div>

                                        {/* EN Row (Translation + Read Translation & AI Explanation) */}
                                        <div className="__qt_row">
                                            <span
                                                className="__qt_label"
                                                title="Translation language: English"
                                            >
                                                EN
                                            </span>
                                            <span className="__qt_text __qt_translated">
                                                {selectedWord.trans}
                                            </span>
                                            <span className="__qt_word-actions">
                                                <button
                                                    type="button"
                                                    className={`__qt_speak ${activeAudio?.id === selectedWord.id && activeAudio?.type === "explanation" ? "speaking" : ""}`}
                                                    onClick={() =>
                                                        handlePlayExplanationAudio(
                                                            selectedWord,
                                                        )
                                                    }
                                                    title="Play English translation and AI explanation"
                                                    aria-label="Play English translation and AI explanation"
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                    </svg>
                                                </button>
                                            </span>
                                        </div>

                                        {/* AI Result Block */}
                                        <div className="__qt_ai-result">
                                            <div className="__qt_ai-label">
                                                ✨ AI Explanation:
                                            </div>
                                            <div className="__qt_ai-text">
                                                {selectedWord.note}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="__qt_save-footer">
                                        <button
                                            type="button"
                                            className={`__qt_ai-explain-save-btn ${savedSuccess ? "saved" : ""}`}
                                            onClick={handleSaveFlashcard}
                                            title="Save word for review"
                                        >
                                            <span>
                                                {savedSuccess
                                                    ? "Saved to Deck!"
                                                    : "Save"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Dual Subtitle Box with Speaker Icon next to every word */}
                                <div className="inline-block px-1 py-4">
                                    <div className="font-display text-xl sm:text-3xl font-extrabold text-white mb-1.5 tracking-tight flex items-center justify-center flex-wrap gap-2">
                                        {(
                                            [
                                                "ich",
                                                "glaube",
                                                "wir",
                                                "haben",
                                                "arger",
                                            ] as const
                                        ).map((wordKey) => {
                                            const item = DEMO_WORDS[wordKey];
                                            const isSelected =
                                                selectedWord.id === item.id;

                                            return (
                                                <span
                                                    key={item.id}
                                                    className={`clickable-word ${isSelected ? "active" : ""}`}
                                                    onClick={() => {
                                                        setSelectedWord(item);
                                                    }}
                                                >
                                                    <span>{item.word}</span>
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <div className="text-sm sm:text-base font-medium text-slate-400">
                                        I think we&apos;re in trouble.
                                    </div>
                                </div>
                            </div>

                            {/* Player Bottom Control Bar */}
                            <div className="relative z-10 flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="text-white hover:text-indigo-400 transition"
                                        aria-label="Pause Demo"
                                    >
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
                                        DE ⇄ EN
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
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
