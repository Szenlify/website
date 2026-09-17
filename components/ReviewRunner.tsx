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

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null || touchStartY === null) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        // If user is mostly scrolling vertically, ignore horizontal swipe
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaX) < 15) {
            return;
        }

        setTouchDeltaX(deltaX);
    };

    const handleTouchEnd = () => {
        if (touchStartX === null) return;
        setIsDragging(false);

        // Swipe threshold: 65px
        if (touchDeltaX < -65) {
            void rateCard(1);
        } else if (touchDeltaX > 65) {
            void rateCard(2);
        } else if (Math.abs(touchDeltaX) < 8) {
            // Tap to flip
            flipCard();
        }

        setTouchStartX(null);
        setTouchStartY(null);
        setTouchDeltaX(0);
    };

    // Calculate rotation and style during touch drag
    const cardTransformStyle: React.CSSProperties = isDragging && touchDeltaX !== 0
        ? {
              transform: `translateX(${touchDeltaX}px) rotate(${touchDeltaX * 0.07}deg)`,
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

    // 1. Loading State
    if (loadingWords) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="size-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-200 font-semibold text-base">Ładowanie powtórek z chmury...</p>
                <p className="text-slate-400 text-xs mt-1">Sprawdzanie bazy Firebase Firestore...</p>
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
                <h3 className="text-xl font-bold text-white mb-2">Błąd bazy danych</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-sm">{wordsError}</p>
                <button
                    type="button"
                    onClick={() => void refreshWords()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 cursor-pointer transition"
                >
                    <RefreshCw className="size-4" />
                    <span>Spróbuj ponownie</span>
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
                    Brak słówek w chmurze
                </h2>
                <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
                    Dla konta <strong className="text-indigo-300">{user?.email}</strong> nie znaleziono jeszcze zapisanych słówek w chmurze Firebase.
                </p>

                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left shadow-lg">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-3">
                        <Info className="size-4 shrink-0" />
                        <span>Jak zsynchronizować słówka z wtyczki Lectoro:</span>
                    </div>
                    <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-decimal list-inside leading-relaxed">
                        <li>Otwórz rozszerzenie <strong>Lectoro</strong> na pasku Chrome.</li>
                        <li>Kliknij zakładkę <strong>Ustawienia / Chmura</strong>.</li>
                        <li>Upewnij się, że jesteś zalogowany tym samym kontem Google (<span className="text-indigo-300 font-mono">{user?.email}</span>).</li>
                        <li>Kliknij przycisk <strong>Synchronizuj</strong> – Twoje słówka z filmów i seriali zostaną przesłane do chmury.</li>
                    </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <button
                        type="button"
                        onClick={() => void refreshWords()}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95"
                    >
                        <RotateCw className="size-4" />
                        <span>Odśwież powtórki</span>
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
                    Brak kart do powtórki!
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                    Wszystkie Twoje słówka są na bieżąco powtórzone. Masz w sumie <strong className="text-white">{words.length}</strong> zapisanych słówek w bazie. Następne powtórki zaplanowane są zgodnie z algorytmem SRS.
                </p>

                {/* Option to practice in Cram Mode anyway */}
                <div className="w-full bg-linear-to-b from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-5 mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-indigo-300 font-bold text-sm mb-1.5">
                        <Zap className="size-4 text-indigo-400" />
                        <span>Chcesz poćwiczyć mimo to?</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 max-w-xs mx-auto">
                        Możesz przejrzeć i przećwiczyć wszystkie {words.length} słówek bez czekania na zegar powtórek.
                    </p>
                    <button
                        type="button"
                        onClick={startCramMode}
                        className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 px-5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95"
                    >
                        <Layers className="size-4" />
                        <span>Powtórz wszystkie ({words.length} słówek)</span>
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => void refreshWords()}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
                >
                    <RotateCw className="size-3.5" />
                    <span>Sprawdź nowe powtórki w bazie</span>
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
                    Sesja ukończona!
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
                    Ukończyłeś wszystkie <strong>{queue.length}</strong> powtórek z tej sesji! Twoja pamięć długotrwała została utrwalona.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    {isCramMode && (
                        <button
                            type="button"
                            onClick={exitCramMode}
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                        >
                            Zakończ tryb ćwiczeń
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => void refreshWords()}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95"
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
        <div className="w-full max-w-xl mx-auto px-3 sm:px-6 py-2 sm:py-6 flex flex-col items-center select-none">
            {/* Header & Controls */}
            <div className="w-full flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setDirection((d) => (d === "normal" ? "reverse" : "normal"));
                            setAnswerShown(false);
                        }}
                        title="Zmień kierunek nauki"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 transition cursor-pointer active:scale-95"
                    >
                        <span>{direction === "normal" ? srcLang : tgtLang}</span>
                        <span className="text-indigo-400 font-mono">⇄</span>
                        <span>{direction === "normal" ? tgtLang : srcLang}</span>
                    </button>

                    {isCramMode && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Ćwiczenia
                        </span>
                    )}
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-bold text-slate-300 bg-white/5 border border-white/10 tabular-nums">
                    {currentIndex + 1} / {queue.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 sm:mb-6">
                <div
                    className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-teal-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Swipeable & Flippable Flashcard (Desktop & Mobile 1:1 Polish) */}
            <div
                className={`relative w-full rounded-2xl sm:rounded-3xl border border-white/12 bg-[#0d101d]/90 backdrop-blur-2xl p-5 sm:p-8 shadow-2xl shadow-black/80 transition-transform duration-200 cursor-pointer overflow-hidden ${
                    isFlipping ? (answerShown ? "review-flashcard qt-flip-out" : "review-flashcard qt-flip-in") : ""
                } ${swipeClass} ${isCardEntering ? "card-in" : ""}`}
                style={cardTransformStyle}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={flipCard}
            >
                {/* Visual Swipe Badges (Mobile indicator while dragging) */}
                {isDragging && touchDeltaX < -25 && (
                    <div
                        className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-red-600/90 border border-red-400 shadow-xl shadow-red-600/30 pointer-events-none"
                        style={{ opacity: Math.min(1, Math.abs(touchDeltaX) / 65) }}
                    >
                        ✕ NIE ZNAM
                    </div>
                )}
                {isDragging && touchDeltaX > 25 && (
                    <div
                        className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-emerald-600/90 border border-emerald-400 shadow-xl shadow-emerald-600/30 pointer-events-none"
                        style={{ opacity: Math.min(1, Math.abs(touchDeltaX) / 65) }}
                    >
                        ✓ ZNAM
                    </div>
                )}

                {/* Question / Word Row */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-center ${wordColorClass}`}>
                        {showWord}
                    </span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (showWord) speakText(showWord, speakLang);
                        }}
                        title="Odsłuchaj wymowę (W)"
                        className={`inline-flex items-center justify-center size-10 sm:size-11 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 hover:scale-105 active:scale-95 transition cursor-pointer shrink-0 ${
                            isSpeaking ? "review-speak-btn speaking" : ""
                        }`}
                    >
                        <Volume2 className="size-5" />
                    </button>
                </div>

                {/* Context Sentence */}
                {showSentence && (
                    <p className="text-center text-slate-300 text-sm sm:text-base leading-relaxed mb-4 max-w-md mx-auto">
                        {renderHighlightedSentence()}
                    </p>
                )}

                {/* Movie Scene Screenshot from Cloudflare R2 */}
                {screenshotUrl && (
                    <div className="mt-4 relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center shadow-inner">
                        {!imageLoaded && <div className="absolute inset-0 review-shimmer" />}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={screenshotUrl}
                            alt="Kadr z filmu"
                            className={`w-full h-full object-contain transition-opacity duration-300 ${
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
                <div className="mt-4 text-center text-[11px] font-medium text-slate-500 sm:hidden flex items-center justify-center gap-2">
                    <span>← Przesuń: Nie znam</span>
                    <span>•</span>
                    <span>Dotknij: Obrót</span>
                    <span>•</span>
                    <span>Znam: Przesuń →</span>
                </div>
            </div>

            {/* Desktop Flip Button */}
            <button
                type="button"
                onClick={flipCard}
                className="mt-4 mb-5 hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition cursor-pointer active:scale-95"
            >
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">↓</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">S</kbd>
                </span>
                <span>{answerShown ? "Pokaż pytanie (Obróć)" : "Pokaż odpowiedź (Obróć)"}</span>
            </button>

            {/* Mobile Big Flip Action Bar (Shown when answer is not yet revealed) */}
            {!answerShown && (
                <div className="w-full mt-3 sm:hidden">
                    <button
                        type="button"
                        onClick={flipCard}
                        className="w-full h-13 rounded-2xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/40 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-98 transition cursor-pointer"
                    >
                        <span>Pokaż odpowiedź (Dotknij)</span>
                    </button>
                </div>
            )}

            {/* Rating Controls (Shown on Desktop always, on Mobile especially after flip) */}
            <div className={`w-full ${!answerShown ? "opacity-75 sm:opacity-100" : ""}`}>
                <div className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 mt-2 sm:mt-0">
                    {answerShown ? "Oceń swoją pamięć:" : "Wiesz co to znaczy?"}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Button: Nie znam (Again / Grade 1) */}
                    <button
                        type="button"
                        onClick={() => void rateCard(1)}
                        className="group relative flex flex-col items-center justify-center min-h-[64px] sm:min-h-[76px] p-3 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 active:scale-98 transition cursor-pointer shadow-lg shadow-red-950/30"
                    >
                        <span className="hidden sm:inline-flex absolute top-2 left-2.5 items-center gap-1 font-mono text-[9px] text-red-400/80">
                            <kbd className="px-1 py-0.5 rounded bg-red-500/10 border border-red-500/20">←</kbd>
                            <kbd className="px-1 py-0.5 rounded bg-red-500/10 border border-red-500/20">A</kbd>
                        </span>
                        <span className="text-sm sm:text-base font-black text-red-400 group-hover:text-red-300 transition">
                            Nie znam
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 mt-0.5 tabular-nums">
                            +{labelAgain}
                        </span>
                    </button>

                    {/* Button: Znam (Good / Grade 2) */}
                    <button
                        type="button"
                        onClick={() => void rateCard(2)}
                        className="group relative flex flex-col items-center justify-center min-h-[64px] sm:min-h-[76px] p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-98 transition cursor-pointer shadow-lg shadow-emerald-950/30"
                    >
                        <span className="hidden sm:inline-flex absolute top-2 right-2.5 items-center gap-1 font-mono text-[9px] text-emerald-400/80">
                            <kbd className="px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">→</kbd>
                            <kbd className="px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">D</kbd>
                        </span>
                        <span className="text-sm sm:text-base font-black text-emerald-400 group-hover:text-emerald-300 transition">
                            Znam
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 mt-0.5 tabular-nums">
                            +{labelGood}
                        </span>
                    </button>
                </div>

                {/* Keyboard Shortcuts Hint (Desktop only) */}
                <div className="hidden sm:flex items-center justify-center gap-4 mt-6 text-[11px] font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">W</kbd> wymowa
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">S / Spacja</kbd> obrót
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">A</kbd> nie znam
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">D</kbd> znam
                    </span>
                </div>
            </div>
        </div>
    );
}
