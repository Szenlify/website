"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, RotateCw, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Layers, ArrowLeft, ArrowRight, Zap, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SRS, resolveImageUrl, type ReviewWord } from "@/lib/srs";
import type { Dict, Locale } from "@/lib/i18n/types";

interface ReviewRunnerProps {
    dict: Dict;
    locale: Locale;
}

export default function ReviewRunner({ dict, locale }: ReviewRunnerProps) {
    const {
        user,
        words,
        dueWords,
        rawDueCount,
        loadingWords,
        wordsError,
        isCramMode,
        startCramMode,
        exitCramMode,
        recordWordRating,
        refreshWords,
    } = useAuth();

    const [queue, setQueue] = useState<ReviewWord[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerShown, setAnswerShown] = useState(false);
    const [direction, setDirection] = useState<"normal" | "reverse">("normal");
    const [isFlipping, setIsFlipping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [swipeClass, setSwipeClass] = useState<string>("");
    const [isCardEntering, setIsCardEntering] = useState(false);

    // Mobile touch tracking
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Populate queue whenever dueWords or cramMode changes
    useEffect(() => {
        if (dueWords.length > 0) {
            const shuffled = [...dueWords].sort(() => Math.random() - 0.5);
            setQueue(shuffled);
            setCurrentIndex(0);
            setAnswerShown(false);
            setSwipeClass("");
            setIsCardEntering(true);
            setTimeout(() => setIsCardEntering(false), 300);
        } else {
            setQueue([]);
        }
    }, [dueWords, isCramMode]);

    const currentCard = queue[currentIndex] || null;

    // Available speech synthesis voices
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Load available voices and listen for changes
    useEffect(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

        const updateVoices = () => {
            const vList = window.speechSynthesis.getVoices();
            if (vList && vList.length > 0) {
                setVoices(vList);
            }
        };

        updateVoices();
        window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
        return () => {
            window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
        };
    }, []);

    // Pick best voice — Chrome Google voice priority
    const pickGoogleVoice = useCallback(
        (targetLang: string): SpeechSynthesisVoice | null => {
            const voiceList =
                voices.length > 0
                    ? voices
                    : typeof window !== "undefined" && "speechSynthesis" in window
                    ? window.speechSynthesis.getVoices()
                    : [];

            if (!voiceList || voiceList.length === 0) return null;

            const base = (targetLang || "en").split("-")[0].toLowerCase();
            const langVoices = voiceList.filter((v) =>
                (v.lang || "").toLowerCase().startsWith(base)
            );

            // 1. Exact Google voice for this language (e.g. "Google US English", "Google polski", "Google Deutsch")
            const exactGoogle = langVoices.find((v) => /google/i.test(v.name));
            if (exactGoogle) return exactGoogle;

            // 2. Any voice in list matching language with Google in name
            const anyGoogle = voiceList.find(
                (v) => /google/i.test(v.name) && (v.lang || "").toLowerCase().includes(base)
            );
            if (anyGoogle) return anyGoogle;

            // 3. Natural or Neural voice
            const naturalVoice = langVoices.find((v) => /natural|neural|online/i.test(v.name));
            if (naturalVoice) return naturalVoice;

            // 4. Default language voice
            return langVoices[0] || null;
        },
        [voices]
    );

    // Reset image loaded on card change
    useEffect(() => {
        setImageLoaded(false);
    }, [currentIndex, currentCard?.id]);

    const speakText = useCallback(
        (text: string, lang = "en") => {
            if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
            try {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                const voice = pickGoogleVoice(lang);

                if (voice) {
                    utterance.voice = voice;
                    utterance.lang = voice.lang;
                } else {
                    const bcpMap: Record<string, string> = {
                        en: "en-US", pl: "pl-PL", de: "de-DE", es: "es-ES",
                        fr: "fr-FR", it: "it-IT", ja: "ja-JP", ko: "ko-KR",
                        nl: "nl-NL", pt: "pt-BR", cs: "cs-CZ",
                    };
                    const base = lang.split("-")[0].toLowerCase();
                    utterance.lang = bcpMap[base] || lang;
                }

                utterance.rate = 0.93;
                setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);

                // Chrome fix for speech synthesis pausing
                window.speechSynthesis.resume();
                window.speechSynthesis.speak(utterance);
            } catch (err) {
                console.warn("[TTS] SpeechSynthesis failed:", err);
                setIsSpeaking(false);
            }
        },
        [pickGoogleVoice]
    );

    const flipCard = useCallback(() => {
        setIsFlipping(true);
        setTimeout(() => {
            setAnswerShown((prev) => !prev);
            setIsFlipping(false);
        }, 150);
    }, []);

    const rateCard = useCallback(
        async (grade: 1 | 2) => {
            if (!currentCard) return;

            setSwipeClass(grade === 1 ? "qt-swipe-left" : "qt-swipe-right");

            setTimeout(async () => {
                await recordWordRating(currentCard, grade);
                setSwipeClass("");
                setTouchDeltaX(0);
                setAnswerShown(false);
                setCurrentIndex((prev) => prev + 1);
                setIsCardEntering(true);
                setTimeout(() => setIsCardEntering(false), 300);
            }, 220);
        },
        [currentCard, recordWordRating]
    );

    // Desktop keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === "ArrowDown" || e.key.toLowerCase() === "s" || e.key === " ") {
                e.preventDefault();
                flipCard();
            } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
                e.preventDefault();
                void rateCard(1);
            } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
                e.preventDefault();
                void rateCard(2);
            } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
                e.preventDefault();
                if (currentCard) {
                    const text = direction === "normal"
                        ? (answerShown ? currentCard.translated : currentCard.original)
                        : (answerShown ? currentCard.original : currentCard.translated);
                    const lang = direction === "normal"
                        ? (answerShown ? currentCard.tgtLang || "pl" : currentCard.srcLang || "en")
                        : (answerShown ? currentCard.srcLang || "en" : currentCard.tgtLang || "pl");
                    speakText(text, lang);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [flipCard, rateCard, currentCard, direction, answerShown, speakText]);

    // Touch handlers for mobile swipe — strictly horizontal, zero page scroll
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null || touchStartY === null) return;
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - touchStartX;
        setTouchDeltaX(deltaX);
    };

    const handleTouchEnd = () => {
        if (touchStartX === null) return;
        setIsDragging(false);

        // Swipe threshold: 60px to rate
        if (touchDeltaX < -60) {
            void rateCard(1);
        } else if (touchDeltaX > 60) {
            void rateCard(2);
        }
        // NOTE: Tap does NOT flip the card anymore. Card is only flipped via bottom button.

        setTouchStartX(null);
        setTouchStartY(null);
        setTouchDeltaX(0);
    };

    // Calculate rotation, translation, and glow shadow during touch drag
    const isSwipingLeft = touchDeltaX < -15;
    const isSwipingRight = touchDeltaX > 15;
    const swipeIntensity = Math.min(1, Math.abs(touchDeltaX) / 100);

    const dynamicShadow = isDragging && touchDeltaX !== 0
        ? isSwipingLeft
            ? `0 20px 50px -10px rgba(239, 68, 68, ${0.3 + swipeIntensity * 0.45}), 0 0 30px -5px rgba(239, 68, 68, ${swipeIntensity * 0.4})`
            : `0 20px 50px -10px rgba(16, 185, 129, ${0.3 + swipeIntensity * 0.45}), 0 0 30px -5px rgba(16, 185, 129, ${swipeIntensity * 0.4})`
        : undefined;

    const dynamicBorder = isDragging && touchDeltaX !== 0
        ? isSwipingLeft
            ? `rgba(239, 68, 68, ${0.4 + swipeIntensity * 0.6})`
            : `rgba(16, 185, 129, ${0.4 + swipeIntensity * 0.6})`
        : undefined;

    const cardTransformStyle: React.CSSProperties = isDragging && touchDeltaX !== 0
        ? {
              transform: `translate3d(${touchDeltaX}px, 0, 0) rotate(${touchDeltaX * 0.08}deg)`,
              boxShadow: dynamicShadow,
              borderColor: dynamicBorder,
              transition: "none",
          }
        : {
              boxShadow: dynamicShadow,
              borderColor: dynamicBorder,
              transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.25s ease, border-color 0.25s ease",
          };

    const isNormal = direction === "normal";
    const srcLang = (currentCard?.srcLang || "en").toUpperCase();
    const tgtLang = (currentCard?.tgtLang || "pl").toUpperCase();

    const showWord = isNormal
        ? (answerShown ? currentCard?.translated : currentCard?.original)
        : (answerShown ? currentCard?.original : currentCard?.translated);

    const showSentence = isNormal
        ? (answerShown ? currentCard?.sentenceTranslated : currentCard?.sentence)
        : (answerShown ? currentCard?.sentence : currentCard?.sentenceTranslated);

    const speakLang = isNormal
        ? (answerShown ? currentCard?.tgtLang || "pl" : currentCard?.srcLang || "en")
        : (answerShown ? currentCard?.srcLang || "en" : currentCard?.tgtLang || "pl");

    const isOriginalSide = (isNormal && !answerShown) || (!isNormal && answerShown);
    const wordColorClass = isOriginalSide ? "text-[#4ecdc4]" : "text-[#9ee7b9]";

    // Intervals preview
    const labelAgain = currentCard ? SRS.previewLabel(currentCard.sr, 1) : "1 min";
    const labelGood = currentCard ? SRS.previewLabel(currentCard.sr, 2) : "10 min";

    // Highlight the word in sentence
    const renderHighlightedSentence = () => {
        if (!showSentence) return null;
        if (!showWord) return <span>&ldquo;{showSentence}&rdquo;</span>;

        const regex = new RegExp(`(${showWord.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
        const parts = showSentence.split(regex);

        return (
            <span>
                &ldquo;
                {parts.map((part, i) =>
                    part.toLowerCase() === showWord.toLowerCase() ? (
                        <span key={i} className={`font-bold underline ${wordColorClass}`}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
                &rdquo;
            </span>
        );
    };

    const r = dict.reviews;

    // 1. Loading State
    if (loadingWords) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="size-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-200 font-semibold text-base">{r.loadingTitle}</p>
                <p className="text-slate-400 text-xs mt-1">{r.loadingSubtitle}</p>
            </div>
        );
    }

    // 2. Database Error State
    if (wordsError) {
        return (
            <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center text-center">
                <div className="size-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-lg shadow-red-500/10">
                    <AlertCircle className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{r.dbErrorTitle}</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-sm">{wordsError}</p>
                <button
                    type="button"
                    onClick={() => void refreshWords()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 cursor-pointer transition"
                >
                    <RefreshCw className="size-4" />
                    <span>{r.retryButton}</span>
                </button>
            </div>
        );
    }

    // 3. No Cards in Cloud (0 words in users/{uid}/words)
    if (words.length === 0) {
        return (
            <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center text-center">
                <div className="size-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl mb-5 shadow-xl shadow-indigo-500/10">
                    📚
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {r.noWordsTitle}
                </h2>
                <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
                    {r.noWordsSubtitle} <strong className="text-indigo-300">{user?.email}</strong>.
                </p>

                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left shadow-lg">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-3">
                        <Info className="size-4 shrink-0" />
                        <span>{r.syncHowToTitle}</span>
                    </div>
                    <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-decimal list-inside leading-relaxed">
                        <li>{r.syncStep1}</li>
                        <li>{r.syncStep2}</li>
                        <li>{r.syncStep3} (<span className="text-indigo-300 font-mono">{user?.email}</span>).</li>
                        <li>{r.syncStep4}</li>
                    </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <button
                        type="button"
                        onClick={() => void refreshWords()}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95"
                    >
                        <RotateCw className="size-4" />
                        <span>{r.refreshButton}</span>
                    </button>
                </div>
            </div>
        );
    }

    // 4. All Words Up To Date (words > 0 but dueWords == 0, and not in cramMode)
    if (dueWords.length === 0 && !isCramMode) {
        return (
            <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center text-center">
                <div className="size-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl mb-5 shadow-xl shadow-emerald-500/10">
                    ✅
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {r.allCaughtUpTitle}
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                    {r.allCaughtUpDesc} {r.totalSavedWords} <strong className="text-white">{words.length}</strong>.
                </p>

                {/* Option to practice in Cram Mode anyway */}
                <div className="w-full bg-linear-to-b from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-5 mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-indigo-300 font-bold text-sm mb-1.5">
                        <Zap className="size-4 text-indigo-400" />
                        <span>{r.practicePromptTitle}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 max-w-xs mx-auto">
                        {r.practicePromptDesc} ({words.length})
                    </p>
                    <button
                        type="button"
                        onClick={startCramMode}
                        className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 px-5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95"
                    >
                        <Layers className="size-4" />
                        <span>{r.practiceAllButton} ({words.length})</span>
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => void refreshWords()}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
                >
                    <RotateCw className="size-3.5" />
                    <span>{r.checkNewButton}</span>
                </button>
            </div>
        );
    }

    // 5. Finished Current Queue Session
    if (currentIndex >= queue.length && queue.length > 0) {
        return (
            <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="size-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-4xl mb-6 shadow-xl shadow-indigo-500/10 animate-bounce">
                    🎉
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                    {r.sessionCompleteTitle}
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
                    {r.sessionCompleteDesc} ({queue.length})
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    {isCramMode && (
                        <button
                            type="button"
                            onClick={exitCramMode}
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                        >
                            {r.exitPracticeButton}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => void refreshWords()}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95"
                    >
                        <RotateCw className="size-4" />
                        <span>{r.refreshButton}</span>
                    </button>
                </div>
            </div>
        );
    }

    const progressPercent = Math.round((currentIndex / queue.length) * 100);
    const screenshotUrl = resolveImageUrl(currentCard?.screenshot);
    const activeVoice = pickGoogleVoice(speakLang);

    return (
        <div className="w-full max-w-xl mx-auto px-2 sm:px-6 py-1 sm:py-6 h-full sm:h-auto flex flex-col justify-between items-center select-none overflow-hidden touch-none">
            {/* Header & Controls */}
            <div className="w-full flex items-center justify-between mb-1.5 sm:mb-3 shrink-0">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setDirection((d) => (d === "normal" ? "reverse" : "normal"));
                            setAnswerShown(false);
                        }}
                        title={r.changeDirection}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 transition cursor-pointer active:scale-95"
                    >
                        <span>{direction === "normal" ? srcLang : tgtLang}</span>
                        <span className="text-indigo-400 font-mono">⇄</span>
                        <span>{direction === "normal" ? tgtLang : srcLang}</span>
                    </button>

                    {isCramMode && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {r.cramBadge}
                        </span>
                    )}
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-bold text-slate-300 bg-white/5 border border-white/10 tabular-nums">
                    {currentIndex + 1} / {queue.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2 sm:mb-5 shrink-0">
                <div
                    className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-teal-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* 3D Perspective Flashcard Container */}
            <div className="w-full review-perspective my-auto py-1">
                <div
                    className={`relative w-full rounded-2xl sm:rounded-3xl border border-white/12 bg-linear-to-b from-[#14192d]/95 via-[#0d1020]/95 to-[#090c17]/95 backdrop-blur-2xl p-4 sm:p-7 shadow-2xl shadow-black/80 transition-transform duration-200 select-none touch-none overscroll-none review-flashcard-element cursor-grab active:cursor-grabbing overflow-hidden ${
                        isFlipping ? (answerShown ? "review-flashcard qt-flip-out" : "review-flashcard qt-flip-in") : ""
                    } ${swipeClass} ${isCardEntering ? "card-in" : ""}`}
                    style={cardTransformStyle}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Visual Swipe Badges (Shown dynamically during touch drag) */}
                    {isDragging && touchDeltaX < -25 && (
                        <div
                            className="absolute top-3.5 right-3.5 z-20 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-red-600 border border-red-400 shadow-xl shadow-red-600/40 pointer-events-none transform scale-105 transition-transform"
                            style={{ opacity: Math.min(1, Math.abs(touchDeltaX) / 60) }}
                        >
                            ✕ {r.badgeAgain}
                        </div>
                    )}
                    {isDragging && touchDeltaX > 25 && (
                        <div
                            className="absolute top-3.5 left-3.5 z-20 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-emerald-600 border border-emerald-400 shadow-xl shadow-emerald-600/40 pointer-events-none transform scale-105 transition-transform"
                            style={{ opacity: Math.min(1, Math.abs(touchDeltaX) / 60) }}
                        >
                            ✓ {r.badgeGood}
                        </div>
                    )}

                    {/* Question / Word Row with Chrome Google TTS */}
                    <div className="flex flex-col items-center justify-center mb-2 sm:mb-3">
                        <div className="flex items-center justify-center gap-3">
                            <span className={`text-2xl sm:text-4xl font-black tracking-tight text-center ${wordColorClass}`}>
                                {showWord}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (showWord) speakText(showWord, speakLang);
                                }}
                                title={r.listenAudio}
                                className={`inline-flex items-center justify-center size-9 sm:size-11 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 hover:scale-105 active:scale-95 transition cursor-pointer shrink-0 shadow-lg shadow-indigo-500/20 ${
                                    isSpeaking ? "review-speak-btn speaking" : ""
                                }`}
                            >
                                <Volume2 className="size-4.5 sm:size-5" />
                            </button>
                        </div>

                        {/* Google Voice Status Indicator */}
                        {activeVoice && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-indigo-300/80 font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                <span className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                <span>
                                    {/google/i.test(activeVoice.name)
                                        ? `Chrome ${activeVoice.name}`
                                        : activeVoice.name}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Context Sentence */}
                    {showSentence && (
                        <p className="text-center text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 max-w-md mx-auto line-clamp-3 sm:line-clamp-none">
                            {renderHighlightedSentence()}
                        </p>
                    )}

                    {/* Movie Scene Screenshot from Cloudflare R2 */}
                    {screenshotUrl && (
                        <div className="mt-2.5 sm:mt-3 relative w-full max-h-[19vh] sm:max-h-[26vh] aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/70 flex items-center justify-center shadow-inner mx-auto">
                            {!imageLoaded && <div className="absolute inset-0 review-shimmer" />}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={screenshotUrl}
                                alt={r.movieSnapshotAlt}
                                className={`max-h-[19vh] sm:max-h-[26vh] w-full h-full object-contain transition-opacity duration-300 ${
                                    imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => {
                                    (e.currentTarget.parentElement as HTMLElement)?.classList.add("hidden");
                                }}
                            />
                        </div>
                    )}

                    {/* Mobile Gesture Hint */}
                    <div className="mt-3 text-center text-[10px] font-medium text-slate-500 sm:hidden flex items-center justify-center gap-1.5">
                        <span>← Przesuń: {r.btnAgain} • {r.btnGood}: Przesuń →</span>
                    </div>
                </div>
            </div>

            {/* Bottom Action Area — Flip Button & Ratings */}
            <div className="w-full mt-2 sm:mt-4 shrink-0">
                {!answerShown ? (
                    <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
                        {/* Prominent Flip Button */}
                        <button
                            type="button"
                            onClick={flipCard}
                            className="w-full h-12 sm:h-13 rounded-2xl font-black text-sm sm:text-base text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/40 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-98 transition cursor-pointer"
                        >
                            <RotateCw className="size-4 animate-spin-slow" />
                            <span>{r.flipShowAnswer}</span>
                            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-indigo-200/80 bg-white/10 px-2 py-0.5 rounded ml-1">
                                <kbd className="px-1 py-0.5 rounded bg-white/10">Spacja</kbd> / <kbd className="px-1 py-0.5 rounded bg-white/10">S</kbd> / <kbd className="px-1 py-0.5 rounded bg-white/10">↓</kbd>
                            </span>
                        </button>

                        {/* Quick rating shortcuts / hints */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 opacity-60 hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => void rateCard(1)}
                                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400 text-xs font-bold transition cursor-pointer active:scale-95"
                            >
                                <span>✕ {r.btnAgain}</span>
                                <span className="text-[10px] text-slate-500">+{labelAgain}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => void rateCard(2)}
                                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 text-xs font-bold transition cursor-pointer active:scale-95"
                            >
                                <span>✓ {r.btnGood}</span>
                                <span className="text-[10px] text-slate-500">+{labelGood}</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full">
                        <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                            {r.rateMemoryPrompt}
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full">
                            {/* Button: Again / Grade 1 */}
                            <button
                                type="button"
                                onClick={() => void rateCard(1)}
                                className="group relative flex flex-col items-center justify-center h-14 sm:h-16 p-2 sm:p-3 rounded-2xl border border-red-500/40 bg-linear-to-b from-red-500/20 to-red-500/10 hover:from-red-500/30 hover:to-red-500/15 hover:border-red-500/60 active:scale-98 transition cursor-pointer shadow-xl shadow-red-950/40"
                            >
                                <span className="hidden sm:inline-flex absolute top-2 left-2.5 items-center gap-1 font-mono text-[9px] text-red-400/80">
                                    <kbd className="px-1 py-0.5 rounded bg-red-500/15 border border-red-500/25">←</kbd>
                                    <kbd className="px-1 py-0.5 rounded bg-red-500/15 border border-red-500/25">A</kbd>
                                </span>
                                <span className="text-sm sm:text-base font-black text-red-400 group-hover:text-red-300 transition">
                                    ✕ {r.btnAgain}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400 mt-0.5 tabular-nums">
                                    +{labelAgain}
                                </span>
                            </button>

                            {/* Button: Good / Grade 2 */}
                            <button
                                type="button"
                                onClick={() => void rateCard(2)}
                                className="group relative flex flex-col items-center justify-center h-14 sm:h-16 p-2 sm:p-3 rounded-2xl border border-emerald-500/40 bg-linear-to-b from-emerald-500/20 to-emerald-500/10 hover:from-emerald-500/30 hover:to-emerald-500/15 hover:border-emerald-500/60 active:scale-98 transition cursor-pointer shadow-xl shadow-emerald-950/40"
                            >
                                <span className="hidden sm:inline-flex absolute top-2 right-2.5 items-center gap-1 font-mono text-[9px] text-emerald-400/80">
                                    <kbd className="px-1 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">→</kbd>
                                    <kbd className="px-1 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">D</kbd>
                                </span>
                                <span className="text-sm sm:text-base font-black text-emerald-400 group-hover:text-emerald-300 transition">
                                    ✓ {r.btnGood}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400 mt-0.5 tabular-nums">
                                    +{labelGood}
                                </span>
                            </button>
                        </div>

                        {/* Button to flip back to question */}
                        <button
                            type="button"
                            onClick={flipCard}
                            className="w-full mt-2 h-9 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-98"
                        >
                            <RotateCw className="size-3.5" />
                            <span>{r.flipShowQuestion}</span>
                            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px] text-slate-500 ml-1">
                                <kbd className="px-1 py-0.5 rounded bg-white/10">S</kbd>
                            </span>
                        </button>
                    </div>
                )}

                {/* Keyboard Shortcuts Hint (Desktop only) */}
                <div className="hidden sm:flex items-center justify-center gap-4 mt-4 text-[10px] font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">W</kbd> {r.shortcutPronounce}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">S / Spacja</kbd> {r.shortcutFlip}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">A</kbd> {r.shortcutAgain}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">D</kbd> {r.shortcutGood}
                    </span>
                </div>
            </div>
        </div>
    );
}
