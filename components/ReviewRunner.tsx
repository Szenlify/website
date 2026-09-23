"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  Turtle,
  RotateCw,
  AlertCircle,
  RefreshCw,
  Layers,
  Zap,
  Info,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SRS, resolveImageUrl, type ReviewWord } from "@/lib/srs";
import type { Dict, Locale } from "@/lib/i18n/types";

import { REVIEW_VOICE, ReviewAudioCache, reviewAudioText, selectReviewVoice } from "@/lib/review-audio";
import "./review.css";

interface ReviewRunnerProps {
  dict: Dict;
  locale: Locale;
}

export default function ReviewRunner({ dict, locale }: ReviewRunnerProps) {
  const {
    user,
    words,
    dueWords,
    loadingWords,
    wordsError,
    isCramMode,
    startCramMode,
    exitCramMode,
    recordWordRating,
    editWord,
    removeWord,
    refreshWords,
  } = useAuth();

  const [queue, setQueue] = useState<ReviewWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerShown, setAnswerShown] = useState(false);
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [flipPhase, setFlipPhase] = useState<"" | "flipping">("");
  const busy = useRef(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [editing, setEditing] = useState<ReviewWord | null>(null);
  const [premiumVoices, setPremiumVoices] = useState<string[]>([]);
  const browserVoices = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRequest = useRef(0);
  const audioCache = useRef(new ReviewAudioCache());
  const [audioMessage, setAudioMessage] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);
  const session = useRef("");
  const pl = locale === "pl";
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [swipeClass, setSwipeClass] = useState<string>("");

  const cardRef = useRef<HTMLDivElement>(null);
  const [enteredCard, setEnteredCard] = useState<string | null>(null);
  const drag = useRef({ x: 0, lastX: 0, time: 0, velocity: 0 });

  // Mobile touch tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Snapshot the session: rating updates must not reorder or reset its queue.
  useEffect(() => {
    if (loadingWords) {
      session.current = "";
      return;
    }
    const key = `${user?.uid || ""}:${isCramMode}`;
    if (session.current === key) return;
    session.current = key;
    setQueue([...dueWords].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setAnswerShown(false);
    setSwipeClass("");
  }, [dueWords, isCramMode, loadingWords, user?.uid]);

  useEffect(() => {
    try {
      setDirection(
        localStorage.getItem("reviewDirection") === "reverse"
          ? "reverse"
          : "normal",
      );
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
    return () => {
      speechRequest.current++;
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      audioCache.current.clear();
    };
  }, []);

  const currentCard = queue[currentIndex] || null;

  // Ask the same server that enforces Lectoro plan entitlements. Fail closed.
  useEffect(() => {
    const controller = new AbortController();
    setPremiumVoices([]);
    const checkAccess = async () => {
      try {
        if (!user) return;
        const token = await user.getIdToken();
        const response = await fetch(
          "https://geminiproxy-gyagzflbra-ew.a.run.app",
          {
            method: "POST",
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "geminiTtsVoices",
              context: "review",
            }),
          },
        );
        if (!response.ok) return;
        const data = await response.json();
        if (!controller.signal.aborted && Array.isArray(data.voices)) {
          setPremiumVoices(
            data.voices.map((voice: { voice_id: string }) => voice.voice_id),
          );
        }
      } catch {
        /* Keep premium locked when entitlement cannot be verified. */
      }
    };
    void checkAccess();
    return () => controller.abort();
  }, [user]);

  useEffect(() => {
    const cache = audioCache.current;
    return () => { cache.clear(); speechRequest.current++; audioRef.current?.pause(); window.speechSynthesis?.cancel(); };
  }, [user?.uid]);

  useEffect(() => {
    speechRequest.current++;
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setAudioLoading(false);
    setAudioMessage("");
    setImageLoaded(false);
  }, [currentCard?.id, currentCard?.original, currentCard?.translated, currentCard?.sentence, currentCard?.sentenceTranslated, direction, answerShown]);

  useEffect(() => {
    if (!premiumVoices.includes(REVIEW_VOICE)) return;
    const upcoming = queue.slice(currentIndex, currentIndex + 3);
    let cancelled = false;
    // Current card first; future cards use low-priority downloads.
    void (async () => {
      for (const [index, card] of upcoming.entries()) {
        if (cancelled) return;
        await Promise.all([
          audioCache.current.get(reviewAudioText(card.original, card.sentence), card.srcLang || "en", index > 0),
          audioCache.current.get(reviewAudioText(card.translated, card.sentenceTranslated), card.tgtLang || "pl", index > 0),
        ]);
      }
    })();
    return () => { cancelled = true; };
  }, [queue, currentIndex, premiumVoices]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const update = () => { browserVoices.current = synth.getVoices(); };
    update();
    synth.addEventListener("voiceschanged", update);
    return () => { synth.removeEventListener("voiceschanged", update); synth.cancel(); };
  }, []);

  const speakFallback = useCallback((text: string, lang: string, rate: number, request: number) => {
    if (request !== speechRequest.current) return;
    const synth = window.speechSynthesis;
    if (!synth || !window.SpeechSynthesisUtterance) {
      setAudioMessage(pl ? "Ta przeglądarka nie obsługuje wymowy." : "Speech is unavailable in this browser.");
      return;
    }
    const available = synth.getVoices();
    const voice = selectReviewVoice(available.length ? available : browserVoices.current, lang);
    const utterance = new SpeechSynthesisUtterance(text);
    // Retain the utterance until playback finishes (including on mobile Safari).
    utteranceRef.current = utterance;
    utterance.lang = voice?.lang || lang;
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.onstart = () => { if (request === speechRequest.current) setIsSpeaking(true); };
    utterance.onend = () => {
      if (request !== speechRequest.current) return;
      utteranceRef.current = null;
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      if (request !== speechRequest.current) return;
      utteranceRef.current = null;
      setIsSpeaking(false);
      if (event.error !== "interrupted" && event.error !== "canceled") {
        setAudioMessage(pl ? "Dotknij głośnika, aby ponowić odsłuch." : "Tap the speaker to retry playback.");
      }
    };
    try {
      synth.cancel();
      synth.speak(utterance);
      synth.resume();
    } catch {
      setIsSpeaking(false);
      setAudioMessage(pl ? "Nie udało się odtworzyć wymowy." : "Could not play speech.");
    }
  }, [pl]);

  const speakText = useCallback(async (text: string, lang = "en", rate = 1) => {
    if (!text) return;
    const request = ++speechRequest.current;
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setAudioMessage("");
    setAudioLoading(false);
    if (!premiumVoices.includes(REVIEW_VOICE) || audioCache.current.isMissing(text, lang)) {
      speakFallback(text, lang, rate, request);
      return;
    }
    setAudioLoading(true);
    const url = await audioCache.current.get(text, lang);
    if (request !== speechRequest.current) return;
    setAudioLoading(false);
    if (!url) {
      speakFallback(text, lang, rate, request);
      return;
    }
    const audio = audioRef.current || new Audio();
    audioRef.current = audio;
    audio.src = url;
    audio.playbackRate = rate;
    audio.preservesPitch = true;
    audio.onended = () => { if (request === speechRequest.current) setIsSpeaking(false); };
    audio.onerror = () => {
      if (request !== speechRequest.current) return;
      setIsSpeaking(false);
      setAudioMessage(pl ? "Nie udało się odtworzyć nagrania. Spróbuj ponownie." : "Could not play recording. Try again.");
    };
    try {
      await audio.play();
      if (request === speechRequest.current) setIsSpeaking(true);
    } catch {
      if (request === speechRequest.current) {
        setIsSpeaking(false);
        setAudioMessage(pl ? "Dotknij głośnika, aby spróbować ponownie." : "Tap the speaker to try again.");
      }
    }
  }, [premiumVoices, speakFallback, pl]);

  const flipCard = useCallback(() => {
    if (busy.current || !currentCard || editing) return;
    busy.current = true;
    setEnteredCard(currentCard.id);
    setFlipPhase("flipping");
    setAnswerShown((prev) => !prev);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 1
      : 720;
    setTimeout(() => {
      setFlipPhase("");
      busy.current = false;
    }, duration);
  }, [currentCard, editing]);

  const rateCard = useCallback(
    async (grade: 1 | 2) => {
      if (!currentCard || busy.current || editing) return;
      busy.current = true;
      setSaving(true);
      setActionError("");
      setSwipeClass("review-flying");
      const card = cardRef.current;
      const sign = grade === 1 ? -1 : 1;
      const start = drag.current.x;
      const destination =
        sign * (window.innerWidth + (card?.offsetWidth || 480));
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const flight = card?.animate(
        [
          {
            transform: `translate3d(${start}px, 0, 0) rotate(${start * 0.08}deg)`,
            opacity: 1,
          },
          {
            transform: `translate3d(${destination}px, 60px, 0) rotate(${sign * 32}deg)`,
            opacity: 1,
          },
        ],
        {
          duration: reduced
            ? 1
            : Math.max(
                280,
                Math.min(
                  480,
                  Math.abs(destination - start) /
                    Math.max(2.5, Math.abs(drag.current.velocity)),
                ),
              ),
          easing: "cubic-bezier(.25,.65,.45,1)",
          fill: "forwards",
        },
      );
      try {
        // Start the save during the flight, but always finish the flight before swapping cards.
        const [result] = await Promise.all([
          recordWordRating(currentCard, grade).then(
            () => null,
            (error) => error,
          ),
          flight?.finished.catch(() => {}),
        ]);
        if (result) throw result;
        speechRequest.current++;
        audioRef.current?.pause();
      window.speechSynthesis?.cancel();
          setIsSpeaking(false);
        setAnswerShown(false);
        setCurrentIndex((prev) => prev + 1);
      } catch (error) {
        flight?.cancel();
        setActionError(
          error instanceof Error ? error.message : "Could not save review",
        );
      } finally {
        drag.current.x = 0;
        setIsDragging(false);
        setSwipeClass("");
        setTouchDeltaX(0);
        setSaving(false);
        busy.current = false;
      }
    },
    [currentCard, recordWordRating, editing],
  );

  // Desktop keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        editing ||
        e.repeat ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (e.target instanceof HTMLElement &&
          e.target.closest("input, textarea, select, [contenteditable=true]"))
      )
        return;

      if (
        e.key === " " &&
        e.target instanceof HTMLElement &&
        e.target.closest("button")
      )
        return;
      if (
        e.key === "ArrowDown" ||
        e.key.toLowerCase() === "s" ||
        e.key === " "
      ) {
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
          const text =
            direction === "normal"
              ? answerShown
                ? currentCard.translated
                : currentCard.original
              : answerShown
                ? currentCard.original
                : currentCard.translated;
          const lang =
            direction === "normal"
              ? answerShown
                ? currentCard.tgtLang || "pl"
                : currentCard.srcLang || "en"
              : answerShown
                ? currentCard.srcLang || "en"
                : currentCard.tgtLang || "pl";
          const sentence =
            direction === "normal"
              ? answerShown
                ? currentCard.sentenceTranslated
                : currentCard.sentence
              : answerShown
                ? currentCard.sentence
                : currentCard.sentenceTranslated;
          void speakText(
            sentence &&
              sentence.trim().toLowerCase() !== text.trim().toLowerCase()
              ? `${text}. ${sentence}`
              : text,
            lang,
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    flipCard,
    rateCard,
    currentCard,
    direction,
    answerShown,
    speakText,
    editing,
  ]);

  // Touch handlers for mobile swipe — strictly horizontal, zero page scroll
  const handleTouchStart = (e: React.TouchEvent) => {
    if (busy.current || (e.target as HTMLElement).closest("button")) return;
    setEnteredCard(currentCard?.id || null);
    drag.current = {
      x: 0,
      lastX: e.touches[0].clientX,
      time: performance.now(),
      velocity: 0,
    };
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (busy.current || touchStartX === null || touchStartY === null) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX;
    if (
      Math.abs(deltaX) < 12 &&
      Math.abs(e.touches[0].clientY - touchStartY) > 12
    ) {
      setTouchStartX(null);
      setIsDragging(false);
      setTouchDeltaX(0);
      return;
    }
    const now = performance.now();
    drag.current.velocity =
      (currentX - drag.current.lastX) / Math.max(1, now - drag.current.time);
    drag.current.lastX = currentX;
    drag.current.time = now;
    drag.current.x = deltaX;
    setTouchDeltaX(deltaX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    setIsDragging(false);

    const x = drag.current.x;
    const velocity =
      performance.now() - drag.current.time < 100 ? drag.current.velocity : 0;
    const threshold = Math.min(
      100,
      (cardRef.current?.offsetWidth || 320) * 0.24,
    );
    if (
      Math.abs(x) >= threshold ||
      (Math.abs(x) > 24 &&
        Math.abs(velocity) > 0.55 &&
        Math.sign(velocity) === Math.sign(x))
    ) {
      void rateCard(x < 0 ? 1 : 2);
    } else {
      drag.current.x = 0;
      setTouchDeltaX(0);
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Calculate rotation, translation, and glow shadow during touch drag
  const isSwipingLeft = touchDeltaX < -15;
  const swipeIntensity = Math.min(1, Math.abs(touchDeltaX) / 100);

  const dynamicShadow =
    isDragging && touchDeltaX !== 0
      ? isSwipingLeft
        ? `0 20px 50px -10px rgba(239, 68, 68, ${0.3 + swipeIntensity * 0.45}), 0 0 30px -5px rgba(239, 68, 68, ${swipeIntensity * 0.4})`
        : `0 20px 50px -10px rgba(16, 185, 129, ${0.3 + swipeIntensity * 0.45}), 0 0 30px -5px rgba(16, 185, 129, ${swipeIntensity * 0.4})`
      : undefined;

  const dynamicBorder =
    isDragging && touchDeltaX !== 0
      ? isSwipingLeft
        ? `rgba(239, 68, 68, ${0.4 + swipeIntensity * 0.6})`
        : `rgba(16, 185, 129, ${0.4 + swipeIntensity * 0.6})`
      : undefined;

  const cardTransformStyle: React.CSSProperties =
    isDragging || !!swipeClass
      ? {
          transform: `translate3d(${touchDeltaX}px, 0, 0) rotate(${touchDeltaX * 0.08}deg)`,
          boxShadow: dynamicShadow,
          borderColor: dynamicBorder,
          transition: "none",
        }
      : {
          transform: "translate3d(0, 0, 0) rotate(0deg)",
          boxShadow: dynamicShadow,
          borderColor: dynamicBorder,
          transition:
            "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.25s ease, border-color 0.25s ease",
        };

  const isNormal = direction === "normal";
  const srcLang = (currentCard?.srcLang || "en").toUpperCase();
  const tgtLang = (currentCard?.tgtLang || "pl").toUpperCase();

  // Intervals preview
  const labelAgain = currentCard
    ? SRS.previewLabel(currentCard.sr, 1)
    : "1 min";
  const labelGood = currentCard
    ? SRS.previewLabel(currentCard.sr, 2)
    : "10 min";

  // Highlight the word in sentence
  const renderHighlightedSentence = (
    showSentence: string | undefined,
    showWord: string,
    original: boolean,
  ) => {
    if (!showSentence) return null;
    if (!showWord) return <span>&ldquo;{showSentence}&rdquo;</span>;

    const regex = new RegExp(
      `(${showWord.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
      "gi",
    );
    const parts = showSentence.split(regex);

    return (
      <span>
        &ldquo;
        {parts.map((part, i) =>
          part.toLowerCase() === showWord.toLowerCase() ? (
            <span
              key={i}
              className={`font-bold underline ${original ? "text-[#4ecdc4]" : "text-[#9ee7b9]"}`}
            >
              {part}
            </span>
          ) : (
            part
          ),
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
        <p className="text-slate-200 font-semibold text-base">
          {r.loadingTitle}
        </p>
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
          {r.noWordsSubtitle}{" "}
          <strong className="text-indigo-300">{user?.email}</strong>.
        </p>

        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left shadow-lg">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-3">
            <Info className="size-4 shrink-0" />
            <span>{r.syncHowToTitle}</span>
          </div>
          <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-decimal list-inside leading-relaxed">
            <li>{r.syncStep1}</li>
            <li>{r.syncStep2}</li>
            <li>
              {r.syncStep3} (
              <span className="text-indigo-300 font-mono">{user?.email}</span>).
            </li>
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
  if (queue.length === 0 && dueWords.length === 0 && !isCramMode) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center text-center">
        <div className="size-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl mb-5 shadow-xl shadow-emerald-500/10">
          ✅
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          {r.allCaughtUpTitle}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
          {r.allCaughtUpDesc} {r.totalSavedWords}{" "}
          <strong className="text-white">{words.length}</strong>.
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
            <span>
              {r.practiceAllButton} ({words.length})
            </span>
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

  if (!currentCard) return null;

  const progressPercent = Math.round((currentIndex / queue.length) * 100);
  const screenshotUrl = resolveImageUrl(currentCard?.screenshot);
  const saveEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing || !user || busy.current) return;
    busy.current = true;
    setSaving(true);
    setActionError("");
    try {
      const updated = {
        ...editing,
        original: editing.original.trim(),
        translated: editing.translated.trim(),
        ttsCacheInvalidatedAt: Date.now(),
      };
      await editWord(updated);
      setQueue((prev) =>
        prev.map((word) => (word.id === updated.id ? updated : word)),
      );
      setEditing(null);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Save failed");
    } finally {
      busy.current = false;
      setSaving(false);
    }
  };
  const removeCard = async () => {
    if (
      !user ||
      busy.current ||
      !window.confirm(pl ? "Usunąć tę fiszkę?" : "Delete this flashcard?")
    )
      return;
    busy.current = true;
    setSaving(true);
    setActionError("");
    try {
      await removeWord(currentCard.id);
      setCurrentIndex((i) => i + 1);
      setAnswerShown(false);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Delete failed");
    } finally {
      busy.current = false;
      setSaving(false);
    }
  };

  return (
    <section className="lectoro-review" aria-label={r.breadcrumbReviews}>
      <div className="review-panel">
        <div className="review-header">
          <span className="review-icon">🧠</span>
          <span className="review-title">
            {pl ? "Powtórki" : "Review"}
          </span>
          <span className="review-count" aria-live="polite">
            {currentIndex + 1}/{queue.length}
          </span>
          <button
            type="button"
            className="review-dir-btn"
            title={r.changeDirection}
            disabled={saving || !!flipPhase}
            onClick={() => {
              const next = direction === "normal" ? "reverse" : "normal";
              setDirection(next);
              setAnswerShown(false);
              try {
                localStorage.setItem("reviewDirection", next);
              } catch {
                /* optional persistence */
              }
            }}
          >
            {isNormal ? srcLang : tgtLang} <span className="dir-arrow">→</span>{" "}
            {isNormal ? tgtLang : srcLang}
          </button>
        </div>
        {(audioLoading || audioMessage) && <p className="review-audio-status" role="status">
          {audioLoading ? (pl ? "Wczytywanie nagrania…" : "Loading recording…") : audioMessage}
        </p>}
        <div
          className="review-progress"
          role="progressbar"
          aria-valuenow={currentIndex}
          aria-valuemin={0}
          aria-valuemax={queue.length}
          aria-label={r.breadcrumbReviews}
        >
          <div
            className="review-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {isCramMode && (
          <button
            className="review-dir-btn"
            type="button"
            onClick={exitCramMode}
          >
            {r.cramBadge} ×
          </button>
        )}
        {actionError && (
          <p className="review-error" role="alert">
            {actionError}
          </p>
        )}
        <div className="review-card">
          {editing ? (
            <form className="review-edit-form" onSubmit={saveEdit}>
              {(
                [
                  ["original", pl ? "Oryginał" : "Original"],
                  ["translated", pl ? "Tłumaczenie" : "Translation"],
                  ["sentence", pl ? "Zdanie" : "Sentence"],
                  [
                    "sentenceTranslated",
                    pl ? "Tłumaczenie zdania" : "Sentence translation",
                  ],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    autoFocus={key === "original"}
                    required={key === "original" || key === "translated"}
                    value={editing[key] || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, [key]: e.target.value })
                    }
                  />
                </label>
              ))}
              <div className="review-edit-actions">
                <button
                  type="button"
                  className="review-edit-cancel"
                  disabled={saving}
                  onClick={() => setEditing(null)}
                >
                  {pl ? "Anuluj" : "Cancel"}
                </button>
                <button className="review-edit-save" disabled={saving}>
                  {pl ? "Zapisz" : "Save"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="review-card-viewport">
                <div
                  ref={cardRef}
                  key={currentCard.id}
                  onAnimationEnd={(event) => {
                    if (event.animationName === "reviewDealIn")
                      setEnteredCard(currentCard.id);
                  }}
                  className={`review-flashcard ${enteredCard !== currentCard.id ? "review-entering" : ""} ${isDragging ? "review-dragging" : ""} ${flipPhase} ${swipeClass}`}
                  style={cardTransformStyle}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={() => {
                    if (busy.current) return;
                    drag.current.x = 0;
                    setTouchStartX(null);
                    setTouchDeltaX(0);
                    setIsDragging(false);
                  }}
                >
                  <div className="review-flip-scene">
                    <div
                      className={`review-flip-inner ${answerShown ? "is-flipped" : ""}`}
                    >
                      {([false, true] as const).map((back) => {
                        const original = isNormal !== back;
                        const word = original
                          ? currentCard.original
                          : currentCard.translated;
                        const sentence = original
                          ? currentCard.sentence
                          : currentCard.sentenceTranslated;
                        const language = original
                          ? currentCard.srcLang || "en"
                          : currentCard.tgtLang || "pl";
                        const text =
                          sentence &&
                          sentence.trim().toLowerCase() !==
                            word.trim().toLowerCase()
                            ? `${word}. ${sentence}`
                            : word;
                        const active = back === answerShown;
                        return (
                          <div
                            key={String(back)}
                            className={`review-flip-face ${back ? "review-flip-back" : "review-flip-front"}`}
                            aria-hidden={!active}
                            inert={!active}
                          >
                            <div className="review-question">
                              <div className="review-word-row">
                                <span
                                  className={`review-word ${original ? "__qt_original" : "__qt_translated"}`}
                                >
                                  {word}
                                </span>
                                <button
                                  type="button"
                                  className={`review-speak-btn ${isSpeaking && active ? "speaking" : ""}`}
                                  aria-label={r.listenAudio}
                                  title={r.listenAudio}
                                  onClick={() => void speakText(text, language)}
                                >
                                  <Volume2 />
                                </button>
                                <button
                                  type="button"
                                  className="review-speak-btn review-speak-slow-btn"
                                  aria-label={
                                    pl
                                      ? "Słuchaj wolniej (0,75×)"
                                      : "Listen slowly (0.75×)"
                                  }
                                  title="0.75×"
                                  onClick={() =>
                                    void speakText(text, language, 0.75)
                                  }
                                >
                                  <Turtle />
                                </button>
                              </div>
                              {sentence &&
                                sentence.trim().toLowerCase() !==
                                  word.trim().toLowerCase() && (
                                  <div className="review-context-row">
                                    <span className="review-context">
                                      {renderHighlightedSentence(
                                        sentence,
                                        word,
                                        original,
                                      )}
                                    </span>
                                  </div>
                                )}
                              {screenshotUrl && (
                                <div className="review-screenshot">
                                  <div
                                    className={`review-screenshot-box ${imageLoaded ? "is-loaded" : ""}`}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      key={screenshotUrl}
                                      className="review-screenshot-img"
                                      src={screenshotUrl}
                                      alt={r.movieSnapshotAlt}
                                      onLoad={() => setImageLoaded(true)}
                                      onError={(e) =>
                                        e.currentTarget.parentElement?.classList.add(
                                          "review-image-hidden",
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={`review-flip-btn ${swipeClass ? "qt-fade-out" : ""}`}
                disabled={saving || !!flipPhase}
                onClick={flipCard}
              >
                <span className="review-flip-keys">
                  <kbd>↓</kbd> <kbd>S</kbd>
                </span>
                <span>
                  {answerShown ? r.flipShowQuestion : r.flipShowAnswer}
                </span>
              </button>
              <div
                className={`review-controls ${swipeClass ? "qt-fade-out" : ""}`}
              >
                <div className="review-rating">
                  <div className="review-rating-label">
                    {pl ? "Czy znasz odpowiedź?" : "Did you know the answer?"}
                  </div>
                  <div className="review-rating-buttons review-rating-buttons-2">
                    {([1, 2] as const).map((grade) => (
                      <button
                        type="button"
                        className={`review-rate-btn ${grade === 1 ? "rate-no" : "rate-yes"}`}
                        key={grade}
                        disabled={saving || !!flipPhase}
                        onClick={() => void rateCard(grade)}
                      >
                        <span className="rate-key-pair">
                          <kbd>{grade === 1 ? "←" : "→"}</kbd>{" "}
                          <kbd>{grade === 1 ? "A" : "D"}</kbd>
                        </span>
                        <span className="rate-copy">
                          <span className="rate-label">
                            {grade === 1
                              ? pl
                                ? "Nie znam"
                                : "Don't know"
                              : pl
                                ? "Znam"
                                : "Know"}
                          </span>
                          <span className="review-next-info">
                            {grade === 1 ? labelAgain : labelGood}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-shortcuts">
                  <span>
                    <span className="shortcut-keys">
                      <kbd>↑</kbd> <kbd>W</kbd>
                    </span>
                    {r.shortcutPronounce}
                  </span>
                  <span>
                    <span className="shortcut-keys">
                      <kbd>↓</kbd> <kbd>S</kbd>
                    </span>
                    {r.shortcutFlip}
                  </span>
                </div>
                <div className="review-actions-row">
                  <button
                    type="button"
                    className="review-edit-btn"
                    disabled={saving || !!flipPhase}
                    onClick={() => setEditing({ ...currentCard })}
                  >
                    ✏️ {pl ? "Edytuj" : "Edit"}
                  </button>
                  <button
                    type="button"
                    className="review-delete-btn"
                    disabled={saving || !!flipPhase}
                    onClick={() => void removeCard()}
                  >
                    🗑 {pl ? "Usuń" : "Delete"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
