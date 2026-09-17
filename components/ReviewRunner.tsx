"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Volume2, CheckCircle2, RotateCw, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SRS, resolveImageUrl, type ReviewWord } from "@/lib/srs";
import type { Dict, Locale } from "@/lib/i18n/types";

interface ReviewRunnerProps {
    dict: Dict;
    locale: Locale;
}

export default function ReviewRunner({ dict, locale }: ReviewRunnerProps) {
    const { user, dueWords, loadingWords, recordWordRating, refreshWords } = useAuth();

    const [queue, setQueue] = useState<ReviewWord[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerShown, setAnswerShown] = useState(false);
    const [direction, setDirection] = useState<"normal" | "reverse">("normal");
    const [isFlipping, setIsFlipping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [swipeClass, setSwipeClass] = useState<string>("");

    // Mobile touch tracking
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Initial shuffle of due words
    useEffect(() => {
        if (dueWords.length > 0) {
            const shuffled = [...dueWords].sort(() => Math.random() - 0.5);
            setQueue(shuffled);
            setCurrentIndex(0);
            setAnswerShown(false);
            setSwipeClass("");
        } else {
            setQueue([]);
        }
    }, [dueWords]);

    const currentCard = queue[currentIndex] || null;

    // Reset image loaded on card change
    useEffect(() => {
        setImageLoaded(false);
    }, [currentIndex, currentCard?.id]);

    const speakText = useCallback((text: string, lang = "en") => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.95;
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    }, []);

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
            }, 220);
        },
        [currentCard, recordWordRating]
    );

    // Desktop keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
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

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const currentX = e.touches[0].clientX;
        const delta = currentX - touchStartX;
        setTouchDeltaX(delta);
    };

    const handleTouchEnd = () => {
        if (touchStartX === null) return;
        setIsDragging(false);

        // Swipe threshold: 75px
        if (touchDeltaX < -75) {
            void rateCard(1);
        } else if (touchDeltaX > 75) {
            void rateCard(2);
        } else if (Math.abs(touchDeltaX) < 8) {
            // Tap to flip
            flipCard();
        }

        setTouchStartX(null);
        setTouchDeltaX(0);
    };

    // Calculate rotation and style during touch drag
    const cardTransformStyle = isDragging && touchDeltaX !== 0
        ? {
              transform: `translateX(${touchDeltaX}px) rotate(${touchDeltaX * 0.08}deg)`,
              transition: "none",
          }
        : {};

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

    // Loading State
    if (loadingWords) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="size-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-300 font-medium">Ładowanie Twoich powtórek...</p>
            </div>
        );
    }

    // Finished or Empty State
    if (queue.length === 0 || currentIndex >= queue.length) {
        const isDone = queue.length > 0 && currentIndex >= queue.length;
        return (
            <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[65vh]">
                <div className="size-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-4xl mb-6 shadow-xl shadow-indigo-500/10">
                    {isDone ? "🎉" : "✅"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                    {isDone ? "Gratulacje!" : "Brak kart do powtórki!"}
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
                    {isDone
                        ? `Ukończyłeś wszystkie ${queue.length} powtórek na teraz! Twoja pamięć długotrwała została wzmocniona.`
                        : "Wszystkie Twoje słówka są na bieżąco powtórzone. Dodaj nowe wyrażenia z Netflixa lub YouTube w rozszerzeniu Lectoro albo wróć za jakiś czas."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <button
                        type="button"
                        onClick={() => void refreshWords()}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer"
                    >
                        <RotateCw className="size-4" />
                        <span>Odśwież powtórki</span>
                    </button>
                </div>
            </div>
        );
    }

    const progressPercent = Math.round((currentIndex / queue.length) * 100);
    const screenshotUrl = resolveImageUrl(currentCard?.screenshot);

    return (
        <div className="max-w-md mx-auto px-4 py-8 flex flex-col items-center select-none">
            {/* Header & Controls */}
            <div className="w-full flex items-center justify-between mb-2">
                <button
                    type="button"
                    onClick={() => {
                        setDirection((d) => (d === "normal" ? "reverse" : "normal"));
                        setAnswerShown(false);
                    }}
                    title="Zmień kierunek nauki"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 transition cursor-pointer"
                >
                    <span>{direction === "normal" ? srcLang : tgtLang}</span>
                    <span className="text-indigo-400">→</span>
                    <span>{direction === "normal" ? tgtLang : srcLang}</span>
                </button>

                <div className="px-3 py-1 rounded-full text-xs font-bold text-slate-300 bg-white/5 border border-white/10 tabular-nums">
                    {currentIndex + 1} / {queue.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-linear-to-r from-indigo-500 to-teal-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Swipeable & Flippable Flashcard */}
            <div
                className={`relative w-full rounded-2xl border border-white/10 bg-[#0f111a]/85 backdrop-blur-2xl p-6 shadow-2xl shadow-black/60 transition-transform duration-200 cursor-pointer ${
                    isFlipping ? (answerShown ? "review-flashcard qt-flip-out" : "review-flashcard qt-flip-in") : ""
                } ${swipeClass}`}
                style={cardTransformStyle}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={flipCard}
            >
                {/* Visual Swipe Badges (Mobile indicator while dragging) */}
                {isDragging && touchDeltaX < -25 && (
                    <div
                        className="absolute top-4 right-4 z-20 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider text-red-300 bg-red-500/30 border border-red-400/50 pointer-events-none"
                        style={{ opacity: Math.min(1, Math.abs(touchDeltaX) / 75) }}
                    >
                        Nie znam
                    </div>
                )}
                {isDragging && touchDeltaX > 25 && (
                    <div
                        className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/30 border border-emerald-400/50 pointer-events-none"
                        style={{ opacity: Math.min(1, Math.abs(touchDeltaX) / 75) }}
                    >
                        Znam
                    </div>
                )}

                {/* Word & Speaker */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${wordColorClass}`}>
                        {showWord}
                    </span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (showWord) speakText(showWord, speakLang);
                        }}
                        title="Odsłuchaj wymowę"
                        className={`inline-flex items-center justify-center size-9 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 hover:scale-105 active:scale-95 transition cursor-pointer ${
                            isSpeaking ? "review-speak-btn speaking" : ""
                        }`}
                    >
                        <Volume2 className="size-4" />
                    </button>
                </div>

                {/* Context Sentence */}
                {showSentence && (
                    <p className="text-center text-slate-300 text-sm sm:text-base leading-relaxed mb-4 max-w-xs mx-auto">
                        {renderHighlightedSentence()}
                    </p>
                )}

                {/* Movie Scene Screenshot from Cloudflare R2 */}
                {screenshotUrl && (
                    <div className="mt-4 relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                        {!imageLoaded && <div className="absolute inset-0 review-shimmer" />}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={screenshotUrl}
                            alt="Movie frame"
                            className={`w-full h-full object-contain transition-opacity duration-300 ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                // Hide container if image fails to load
                                (e.currentTarget.parentElement as HTMLElement)?.classList.add("hidden");
                            }}
                        />
                    </div>
                )}

                {/* Mobile tap hint */}
                <div className="mt-4 text-center text-[11px] font-medium text-slate-500 sm:hidden">
                    Dotknij, aby obrócić • Przesuń w lewo/prawo
                </div>
            </div>

            {/* Flip Button */}
            <button
                type="button"
                onClick={flipCard}
                className="mt-4 mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
            >
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">↓</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">S</kbd>
                </span>
                <span>{answerShown ? "Pokaż pytanie" : "Pokaż odpowiedź"}</span>
            </button>

            {/* Rating Controls */}
            <div className="w-full">
                <div className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Czy znałeś odpowiedź?
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {/* Button: Nie znam (Again / Grade 1) */}
                    <button
                        type="button"
                        onClick={() => void rateCard(1)}
                        className="group relative flex flex-col items-center justify-center min-h-[70px] p-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 hover:border-red-500/40 active:translate-y-0.5 transition cursor-pointer shadow-lg shadow-red-950/20"
                    >
                        <span className="absolute top-2 left-2.5 inline-flex items-center gap-1 font-mono text-[9px] text-red-400/80">
                            <kbd className="px-1 py-0.5 rounded bg-red-500/10 border border-red-500/20">←</kbd>
                            <kbd className="px-1 py-0.5 rounded bg-red-500/10 border border-red-500/20">A</kbd>
                        </span>
                        <span className="text-sm font-bold text-red-400 group-hover:text-red-300 transition">
                            Nie znam
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 mt-0.5 tabular-nums">
                            {labelAgain}
                        </span>
                    </button>

                    {/* Button: Znam (Good / Grade 2) */}
                    <button
                        type="button"
                        onClick={() => void rateCard(2)}
                        className="group relative flex flex-col items-center justify-center min-h-[70px] p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 hover:border-emerald-500/40 active:translate-y-0.5 transition cursor-pointer shadow-lg shadow-emerald-950/20"
                    >
                        <span className="absolute top-2 right-2.5 inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400/80">
                            <kbd className="px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">→</kbd>
                            <kbd className="px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">D</kbd>
                        </span>
                        <span className="text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition">
                            Znam
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 mt-0.5 tabular-nums">
                            {labelGood}
                        </span>
                    </button>
                </div>

                {/* Keyboard Shortcuts Hint (Desktop) */}
                <div className="hidden sm:flex items-center justify-center gap-4 mt-6 text-[10px] font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">W</kbd> wymowa
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">S</kbd> obrót
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">A</kbd> nie znam
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">D</kbd> znam
                    </span>
                </div>
            </div>
        </div>
    );
}
