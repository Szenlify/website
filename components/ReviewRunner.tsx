"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
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

import {
  selectReviewVoice,
  cleanSpeechText,
  getRecommendedSpeechRate,
  isIosDevice,
  isMobileDevice,
  isSafariBrowser,
  ReviewAudioCache,
} from "@/lib/review-audio";
import ReviewScreenshot from "./ReviewScreenshot";
import { resetReviewScroll } from "@/lib/review-scroll";
import "./review.css";

interface ReviewRunnerProps {
  dict: Dict;
  locale: Locale;
}

const REVIEW_RUNNER_COPY: Record<Locale, {
  review: string;
  edit: string;
  delete: string;
  confirmDelete: string;
  cancel: string;
  save: string;
  original: string;
  translation: string;
  sentence: string;
  sentenceTranslation: string;
  loadingAudio: string;
  unsupportedAudio: string;
  retryAudioTap: string;
  playbackFailed: string;
  listenSlowly: string;
  iosVoiceHint: string;
}> = {
  pl: {
    review: "Powtórki",
    edit: "Edytuj",
    delete: "Usuń",
    confirmDelete: "Usunąć tę fiszkę?",
    cancel: "Anuluj",
    save: "Zapisz",
    original: "Oryginał",
    translation: "Tłumaczenie",
    sentence: "Zdanie",
    sentenceTranslation: "Tłumaczenie zdania",
    loadingAudio: "Wczytywanie nagrania…",
    unsupportedAudio: "Ta przeglądarka nie obsługuje wymowy.",
    retryAudioTap: "Dotknij głośnika, aby spróbować ponownie.",
    playbackFailed: "Nie udało się odtworzyć nagrania. Spróbuj ponownie.",
    listenSlowly: "Słuchaj wolniej (0,75×)",
    iosVoiceHint: "Wskazówka iPhone: Możesz bezpłatnie uzyskać studyjną jakość głosu w Ustawienia → Dostępność → Zawartość mówiona → Głosy (pobierz głos Ulepszony).",
  },
  en: {
    review: "Review",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this flashcard?",
    cancel: "Cancel",
    save: "Save",
    original: "Original",
    translation: "Translation",
    sentence: "Sentence",
    sentenceTranslation: "Sentence translation",
    loadingAudio: "Loading recording…",
    unsupportedAudio: "Speech is unavailable in this browser.",
    retryAudioTap: "Tap the speaker to try again.",
    playbackFailed: "Could not play recording. Try again.",
    listenSlowly: "Listen slowly (0.75×)",
    iosVoiceHint: "iPhone tip: Get natural studio voice quality in Settings → Accessibility → Spoken Content → Voices (download Enhanced voice).",
  },
  de: {
    review: "Wiederholung",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirmDelete: "Diese Karteikarte löschen?",
    cancel: "Abbrechen",
    save: "Speichern",
    original: "Original",
    translation: "Übersetzung",
    sentence: "Satz",
    sentenceTranslation: "Satzübersetzung",
    loadingAudio: "Lade Aufnahme…",
    unsupportedAudio: "Sprachausgabe wird in diesem Browser nicht unterstützt.",
    retryAudioTap: "Tippe auf den Lautsprecher, um es erneut zu versuchen.",
    playbackFailed: "Aufnahme konnte nicht abgespielt werden. Bitte erneut versuchen.",
    listenSlowly: "Langsamer anhören (0,75×)",
    iosVoiceHint: "iPhone-Tipp: Natürliche Studioqualität aktivieren unter: Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen (Erweiterte Stimme laden).",
  },
  es: {
    review: "Repaso",
    edit: "Editar",
    delete: "Eliminar",
    confirmDelete: "¿Eliminar esta tarjeta?",
    cancel: "Cancelar",
    save: "Guardar",
    original: "Original",
    translation: "Traducción",
    sentence: "Oración",
    sentenceTranslation: "Traducción de la oración",
    loadingAudio: "Cargando audio…",
    unsupportedAudio: "La pronunciación no está disponible en este navegador.",
    retryAudioTap: "Toca el altavoz para intentarlo de nuevo.",
    playbackFailed: "No se pudo reproducir el audio. Inténtalo de nuevo.",
    listenSlowly: "Escuchar más lento (0,75×)",
    iosVoiceHint: "Consejo iPhone: Consigue voz de estudio gratuita en Ajustes → Accesibilidad → Contenido leído → Voces (descarga voz Mejorada).",
  },
  fr: {
    review: "Révision",
    edit: "Modifier",
    delete: "Supprimer",
    confirmDelete: "Supprimer cette flashcard ?",
    cancel: "Annuler",
    save: "Enregistrer",
    original: "Original",
    translation: "Traduction",
    sentence: "Phrase",
    sentenceTranslation: "Traduction de la phrase",
    loadingAudio: "Chargement de l'audio…",
    unsupportedAudio: "La synthèse vocale n'est pas prise en charge dans ce navigateur.",
    retryAudioTap: "Touchez le haut-parleur pour réessayer.",
    playbackFailed: "Impossible de lire l'enregistrement. Réessayez.",
    listenSlowly: "Écouter plus lentement (0,75×)",
    iosVoiceHint: "Astuce iPhone : Obtenez une voix naturelle en allant dans Réglages → Accessibilité → Contenu énoncé → Voix (téléchargez la voix Améliorée).",
  },
  it: {
    review: "Ripasso",
    edit: "Modifica",
    delete: "Elimina",
    confirmDelete: "Eliminare questa flashcard?",
    cancel: "Annulla",
    save: "Salva",
    original: "Originale",
    translation: "Traduzione",
    sentence: "Frase",
    sentenceTranslation: "Traduzione della frase",
    loadingAudio: "Caricamento audio…",
    unsupportedAudio: "La pronuncia non è disponibile in questo browser.",
    retryAudioTap: "Tocca l'altoparlante per riprovare.",
    playbackFailed: "Impossibile riprodurre la registrazione. Riprova.",
    listenSlowly: "Ascolta più lentamente (0,75×)",
    iosVoiceHint: "Suggerimento iPhone: Ottieni una voce di qualità studio in Impostazioni → Accessibilità → Contenuti letti ad alta voce → Voci (scarica voce Migliorata).",
  },
  cs: {
    review: "Opakování",
    edit: "Upravit",
    delete: "Smazat",
    confirmDelete: "Smazat tuto kartičku?",
    cancel: "Zrušit",
    save: "Uložit",
    original: "Originál",
    translation: "Překlad",
    sentence: "Věta",
    sentenceTranslation: "Překlad věty",
    loadingAudio: "Načítání nahrávky…",
    unsupportedAudio: "Hlasový výstup není v tomto prohlížeči podporován.",
    retryAudioTap: "Klepnutím na reproduktor zkuste znovu.",
    playbackFailed: "Nahrávku se nepodařilo přehrát. Zkuste to znovu.",
    listenSlowly: "Poslouchat pomaleji (0,75×)",
    iosVoiceHint: "Tip pro iPhone: Přirozený studiový hlas získáte v Nastavení → Zpřístupnění → Předčítání obsahu → Hlasy (stáhněte vylepšený hlas).",
  },
  nl: {
    review: "Herhaling",
    edit: "Bewerken",
    delete: "Verwijderen",
    confirmDelete: "Deze flashcard verwijderen?",
    cancel: "Annuleren",
    save: "Opslaan",
    original: "Origineel",
    translation: "Vertaling",
    sentence: "Zin",
    sentenceTranslation: "Zinsvertaling",
    loadingAudio: "Opname laden…",
    unsupportedAudio: "Spraaksynthese is niet beschikbaar in deze browser.",
    retryAudioTap: "Tik op de luidspreker om opnieuw te proberen.",
    playbackFailed: "Kon opname niet afspelen. Probeer het opnieuw.",
    listenSlowly: "Langzamer luisteren (0,75×)",
    iosVoiceHint: "iPhone-tip: Krijg natuurlijke studiokwaliteit via Instellingen → Toegankelijkheid → Gesproken materiaal → Stemmen (download Verbeterde stem).",
  },
  pt: {
    review: "Revisão",
    edit: "Editar",
    delete: "Excluir",
    confirmDelete: "Excluir este flashcard?",
    cancel: "Cancelar",
    save: "Salvar",
    original: "Original",
    translation: "Tradução",
    sentence: "Frase",
    sentenceTranslation: "Tradução da frase",
    loadingAudio: "Carregando áudio…",
    unsupportedAudio: "A pronúncia não é suportada neste navegador.",
    retryAudioTap: "Toque no alto-falante para tentar novamente.",
    playbackFailed: "Não foi possível reproduzir o áudio. Tente novamente.",
    listenSlowly: "Ouvir mais devagar (0,75×)",
    iosVoiceHint: "Dica iPhone: Obtenha qualidade de estúdio gratuita em Ajustes → Acessibilidade → Conteúdo Falado → Vozes (baixe a voz Melhorada).",
  },
  ja: {
    review: "復習",
    edit: "編集",
    delete: "削除",
    confirmDelete: "このカードを削除しますか？",
    cancel: "キャンセル",
    save: "保存",
    original: "原文",
    translation: "翻訳",
    sentence: "例文",
    sentenceTranslation: "例文の翻訳",
    loadingAudio: "音声を読み込み中…",
    unsupportedAudio: "このブラウザは音声読み上げに対応していません。",
    retryAudioTap: "スピーカーをタップして再試行してください。",
    playbackFailed: "音声を再生できませんでした。もう一度お試しください。",
    listenSlowly: "ゆっくり再生 (0.75×)",
    iosVoiceHint: "iPhoneのヒント: 「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」で拡張音声をダウンロードすると、より自然な発音になります。",
  },
  ko: {
    review: "복습",
    edit: "수정",
    delete: "삭제",
    confirmDelete: "이 카드를 삭제하시겠습니까?",
    cancel: "취소",
    save: "저장",
    original: "원문",
    translation: "번역",
    sentence: "예문",
    sentenceTranslation: "예문 번역",
    loadingAudio: "오디오 불러오는 중…",
    unsupportedAudio: "이 브라우저는 음성 재생을 지원하지 않습니다.",
    retryAudioTap: "스피커를 탭하여 다시 시도하세요.",
    playbackFailed: "오디오를 재생하지 못했습니다. 다시 시도해 주세요.",
    listenSlowly: "느리게 듣기 (0.75×)",
    iosVoiceHint: "iPhone 팁: 설정 → 손쉬운 사용 → 콘텐츠 말하기 → 음성에서 '향상된 음성'을 다운로드하면 훨씬 자연스러운 발음을 들을 수 있습니다.",
  },
};

export default function ReviewRunner({ dict, locale }: ReviewRunnerProps) {
  const rc = REVIEW_RUNNER_COPY[locale] || REVIEW_RUNNER_COPY.en;
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
    flushPendingReviews,
    editWord,
    removeWord,
    refreshWords,
  } = useAuth();

  const [queue, setQueue] = useState<ReviewWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerShown, setAnswerShown] = useState(false);
  const [direction, setDirection] = useState<"normal" | "reverse">(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("reviewDirection") === "reverse"
          ? "reverse"
          : "normal";
      } catch {
        return "normal";
      }
    }
    return "normal";
  });
  const [flipPhase, setFlipPhase] = useState<"" | "flipping">("");
  const busy = useRef(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [editing, setEditing] = useState<ReviewWord | null>(null);
  const browserVoices = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useMemo(() => new ReviewAudioCache(), []);
  const speechRequest = useRef(0);
  const [audioMessage, setAudioMessage] = useState("");
  const session = useRef("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [swipeClass, setSwipeClass] = useState<string>("");

  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, lastX: 0, time: 0, velocity: 0 });

  // Shared touch, pen and mouse drag state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

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
    const speechReq = speechRequest;
    return () => {
      speechReq.current++;
      window.speechSynthesis?.cancel();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      audioCache.clear();
    };
  }, [audioCache]);

  const currentCard = queue[currentIndex] || null;
  const editingCardId = editing?.id;

  // Reset on screen/card transitions, not on typing, audio or swipe frames.
  useLayoutEffect(() => {
    resetReviewScroll();
  }, [currentCard, currentIndex, answerShown, direction, editingCardId,
      isCramMode, loadingWords, wordsError, words.length, actionError]);

  const activeCardKey = `${currentCard?.id || ""}:${currentCard?.original || ""}:${direction}:${answerShown}`;
  const [prevCardKey, setPrevCardKey] = useState(activeCardKey);
  if (prevCardKey !== activeCardKey) {
    setPrevCardKey(activeCardKey);
    setIsSpeaking(false);
    setAudioMessage("");
  }

  useEffect(() => {
    speechRequest.current++;
    window.speechSynthesis?.cancel();
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
  }, [activeCardKey]);

  const [voicesRevision, setVoicesRevision] = useState(0);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const update = () => {
      browserVoices.current = synth.getVoices();
      setVoicesRevision((v) => v + 1);
    };
    update();
    synth.addEventListener("voiceschanged", update);
    return () => {
      synth.removeEventListener("voiceschanged", update);
      synth.cancel();
    };
  }, []);

  const isEdgeTtsTarget = useMemo(
    () => isMobileDevice() || isSafariBrowser(),
    []
  );

  // Background prefetch for mobile and Safari PC Edge TTS audio
  useEffect(() => {
    if (!currentCard || !isEdgeTtsTarget) return;
    const frontText = direction === "normal" ? currentCard.original : currentCard.translated;
    const frontLang = direction === "normal" ? (currentCard.srcLang || "en") : (currentCard.tgtLang || "pl");
    const backText = direction === "normal" ? currentCard.translated : currentCard.original;
    const backLang = direction === "normal" ? (currentCard.tgtLang || "pl") : (currentCard.srcLang || "en");

    void audioCache.getEdge(cleanSpeechText(frontText), frontLang, true);
    void audioCache.getEdge(cleanSpeechText(backText), backLang, true);

    const nextCard = queue[currentIndex + 1];
    if (nextCard) {
      const nextText = direction === "normal" ? nextCard.original : nextCard.translated;
      const nextLang = direction === "normal" ? (nextCard.srcLang || "en") : (nextCard.tgtLang || "pl");
      void audioCache.getEdge(cleanSpeechText(nextText), nextLang, true);
    }
  }, [currentCard, currentIndex, direction, isEdgeTtsTarget, audioCache, queue]);

  const playEdgeAudio = useCallback(
    async (clean: string, lang: string, rate: number, request: number): Promise<boolean> => {
      try {
        setIsSpeaking(true);
        const audioUrl = await audioCache.getEdge(clean, lang);
        if (request !== speechRequest.current) return false;

        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audioPlayerRef.current = audio;
          audio.playbackRate = rate;
          audio.onended = () => {
            if (request === speechRequest.current) {
              setIsSpeaking(false);
              audioPlayerRef.current = null;
            }
          };
          audio.onerror = () => {
            if (request === speechRequest.current) {
              setIsSpeaking(false);
              audioPlayerRef.current = null;
            }
          };
          await audio.play();
          return true;
        }
      } catch {
        // Return false on playback failure or network issue
      }
      return false;
    },
    [audioCache]
  );

  const fallbackNativeSpeak = useCallback(
    (clean: string, lang: string, rate: number, request: number) => {
      const synth = window.speechSynthesis;
      if (!synth || !window.SpeechSynthesisUtterance) {
        void playEdgeAudio(clean, lang, rate, request).then((played) => {
          if (!played && request === speechRequest.current) {
            setAudioMessage(rc.unsupportedAudio);
            setIsSpeaking(false);
          }
        });
        return;
      }
      const available = synth.getVoices();
      const voiceList = available.length ? available : browserVoices.current;
      const voice = selectReviewVoice(voiceList, lang);
      const onMobile = isMobileDevice();

      if (!onMobile && !voice) {
        // In PC browsers without Google voices (e.g. Safari on Mac, Firefox):
        // Automatically play via free Microsoft Edge TTS
        void playEdgeAudio(clean, lang, rate, request).then((played) => {
          if (!played && request === speechRequest.current) {
            setAudioMessage(rc.unsupportedAudio);
            setIsSpeaking(false);
          }
        });
        return;
      }

      const utterance = new SpeechSynthesisUtterance(clean);
      // Retain the utterance until playback finishes (including on mobile Safari).
      utteranceRef.current = utterance;
      utterance.lang = voice?.lang || lang;
      if (voice) utterance.voice = voice;
      utterance.rate = getRecommendedSpeechRate(rate, voice?.name);
      utterance.pitch = 1.0;
      utterance.onstart = () => {
        if (request === speechRequest.current) setIsSpeaking(true);
      };
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
          // If native speech fails, try Edge TTS as fallback
          void playEdgeAudio(clean, lang, rate, request).then((played) => {
            if (!played && request === speechRequest.current) {
              setAudioMessage(rc.retryAudioTap);
            }
          });
        }
      };
      try {
        synth.cancel();
        synth.speak(utterance);
        if (synth.paused) {
          synth.resume();
        }
      } catch {
        void playEdgeAudio(clean, lang, rate, request).then((played) => {
          if (!played && request === speechRequest.current) {
            setIsSpeaking(false);
            setAudioMessage(rc.playbackFailed);
          }
        });
      }
    },
    [rc, playEdgeAudio]
  );

  const speakText = useCallback(
    async (text: string, lang = "en", rate = 1) => {
      if (!text) return;
      const request = ++speechRequest.current;
      window.speechSynthesis?.cancel();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      setIsSpeaking(false);
      setAudioMessage("");

      const clean = cleanSpeechText(text);
      if (!clean) return;

      const onMobile = isMobileDevice();
      const onSafariPc = isSafariBrowser() && !onMobile;

      // 1. Mobile (iPhone / Android / tablets) & Safari on PC: Always use Microsoft Edge TTS (Azure Neural)
      if (onMobile || onSafariPc) {
        const ok = await playEdgeAudio(clean, lang, rate, request);
        if (ok || request !== speechRequest.current) return;
        // If Edge TTS failed (e.g. offline), try native synthesis as fallback
        fallbackNativeSpeak(clean, lang, rate, request);
        return;
      }

      // 2. PC (Chrome / Chromium): Check for native Google voice
      const synth = window.speechSynthesis;
      const available = synth?.getVoices() || [];
      const voiceList = available.length ? available : browserVoices.current;
      const voice = selectReviewVoice(voiceList, lang);

      if (voice) {
        fallbackNativeSpeak(clean, lang, rate, request);
        return;
      }

      // 3. PC browser without Google voice available: Play Microsoft Edge TTS so audio is never missing!
      const edgeOk = await playEdgeAudio(clean, lang, rate, request);
      if (!edgeOk && request === speechRequest.current) {
        fallbackNativeSpeak(clean, lang, rate, request);
      }
    },
    [playEdgeAudio, fallbackNativeSpeak]
  );

  const flipCard = useCallback(() => {
    if (busy.current || !currentCard || editing) return;
    busy.current = true;
    setFlipPhase("flipping");
    setAnswerShown((prev) => !prev);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 1
      : 520;
    setTimeout(() => {
      setFlipPhase("");
      busy.current = false;
    }, duration);
  }, [currentCard, editing]);

  // Natychmiastowy zapis oczekującego bufora, gdy użytkownik ukończy kolejkę powtórek
  useEffect(() => {
    if (currentIndex >= queue.length && queue.length > 0) {
      void flushPendingReviews();
    }
  }, [currentIndex, queue.length, flushPendingReviews]);

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
        sign * ((card?.offsetWidth || 480) * 1.25);
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const flight = card?.animate(
        reduced ? [{ opacity: 1 }, { opacity: 0 }] : [
          {
            transform: `translate3d(${start}px, 0, 0) rotate(${start * 0.035}deg)`,
            opacity: 1,
          },
          {
            transform: `translate3d(${start + (destination - start) * 0.65}px, 6px, 0) rotate(${sign * 7}deg)`,
            opacity: 1,
            offset: 0.65,
          },
          {
            transform: `translate3d(${destination}px, 14px, 0) rotate(${sign * 10}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: reduced ? 100 : 640,
          easing: "cubic-bezier(.32,.08,.3,1)",
          fill: "forwards",
        },
      );
      const entrance = previewRef.current?.animate(
        reduced ? [{ opacity: 0 }, { opacity: 1 }] : [
          { transform: "translate3d(0, 28px, 0) scale(.955)", opacity: 0 },
          { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
        ],
        {
          duration: reduced ? 100 : 560,
          delay: reduced ? 0 : 120,
          easing: "cubic-bezier(.22,1,.36,1)",
          // Release transforms at the end so the promoted card can be dragged.
          fill: "backwards",
        },
      );
      try {
        // Keep both cards mounted until the save and both animations finish.
        const [result] = await Promise.all([
          recordWordRating(currentCard, grade).then(
            () => null,
            (error) => error,
          ),
          flight?.finished.catch(() => {}),
          entrance?.finished.catch(() => {}),
        ]);
        if (result) throw result;
        speechRequest.current++;
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
        setAnswerShown(false);
        setCurrentIndex((prev) => prev + 1);
      } catch (error) {
        flight?.cancel();
        entrance?.cancel();
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

  const touchStartTime = useRef(0);
  const suppressClickUntil = useRef(0);
  const pointerId = useRef<number | null>(null);

  // Pointer capture keeps a swipe continuous outside the card bounds.
  const handlePointerDown = (e: React.PointerEvent) => {
    if (busy.current || !e.isPrimary || e.button !== 0 || pointerId.current !== null ||
      (e.target as HTMLElement).closest("button, input, textarea, a")) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    const now = performance.now();
    touchStartTime.current = now;
    pointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);

    drag.current = {
      x: 0,
      lastX: clientX,
      time: now,
      velocity: 0,
    };
    setTouchStartX(clientX);
    setTouchStartY(clientY);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (busy.current || e.pointerId !== pointerId.current || touchStartX === null || touchStartY === null) return;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    // If movement is predominantly vertical, cancel horizontal drag so user can scroll smoothly
    if (Math.abs(deltaY) > 14 && Math.abs(deltaY) > Math.abs(deltaX) * 1.3) {
      suppressClickUntil.current = performance.now() + 500;
      pointerId.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
      setTouchStartX(null);
      setTouchStartY(null);
      setIsDragging(false);
      setTouchDeltaX(0);
      drag.current.x = 0;
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

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerId !== pointerId.current || touchStartX === null) return;
    pointerId.current = null;
    suppressClickUntil.current = performance.now() + 500;
    setIsDragging(false);

    const x = drag.current.x;
    const elapsed = performance.now() - touchStartTime.current;
    const velocity =
      performance.now() - drag.current.time < 100 ? drag.current.velocity : 0;
    const threshold = Math.min(
      100,
      (cardRef.current?.offsetWidth || 320) * 0.24,
    );

    // 1. Swipe exceeded threshold or fling velocity: rate card
    if (
      Math.abs(x) >= threshold ||
      (Math.abs(x) > 28 &&
        Math.abs(velocity) > 0.55 &&
        Math.sign(velocity) === Math.sign(x))
    ) {
      void rateCard(x < 0 ? 1 : 2);
    } else {
      // 2. Clean quick tap on the card (movement < 12px and duration < 380ms): flip card!
      if (Math.abs(x) < 12 && elapsed < 380) {
        const target = e.target as HTMLElement;
        if (!target.closest("button, input, textarea, a")) {
          flipCard();
        }
      }
      drag.current.x = 0;
      setTouchDeltaX(0);
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (busy.current || performance.now() < suppressClickUntil.current) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, input, textarea, a")) return;
    if (Math.abs(touchDeltaX) > 10) return;
    flipCard();
  };

  // Calculate rotation, translation, and glow shadow during touch drag
  const isSwipingLeft = touchDeltaX < -15;
  const swipeIntensity = Math.min(1, Math.abs(touchDeltaX) / 80);

  const dynamicShadow =
    isDragging && touchDeltaX !== 0
      ? isSwipingLeft
        ? `0 8px 24px -6px rgba(239, 68, 68, ${swipeIntensity * 0.32}), 0 0 12px rgba(239, 68, 68, ${swipeIntensity * 0.12})`
        : `0 8px 24px -6px rgba(16, 185, 129, ${swipeIntensity * 0.32}), 0 0 12px rgba(16, 185, 129, ${swipeIntensity * 0.12})`
      : undefined;

  const dynamicBorder =
    isDragging && touchDeltaX !== 0
      ? isSwipingLeft
        ? `rgba(239, 68, 68, ${swipeIntensity * 0.2})`
        : `rgba(16, 185, 129, ${swipeIntensity * 0.2})`
      : undefined;

  const cardTransformStyle: React.CSSProperties =
    isDragging || !!swipeClass
      ? {
          transform: `translate3d(${touchDeltaX}px, 0, 0) rotate(${touchDeltaX * 0.035}deg)`,
          boxShadow: dynamicShadow,
          borderColor: dynamicBorder,
          transition: "none",
        }
      : {
          transform: "translate3d(0, 0, 0) rotate(0deg)",
          boxShadow: dynamicShadow,
          borderColor: dynamicBorder,
          transition:
            "transform 0.4s cubic-bezier(.22, 1, .36, 1), opacity 0.36s ease-out, box-shadow 0.25s ease, border-color 0.25s ease",
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
            onClick={async () => {
              await flushPendingReviews();
              await refreshWords();
            }}
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

  const speakVisibleCard = (rate = 1) => {
    if (busy.current) return;
    const original = isNormal !== answerShown;
    const word = original ? currentCard.original : currentCard.translated;
    const sentence = original ? currentCard.sentence : currentCard.sentenceTranslated;
    const language = original ? currentCard.srcLang || "en" : currentCard.tgtLang || "pl";
    const text = sentence && sentence.trim().toLowerCase() !== word.trim().toLowerCase()
      ? `${word}. ${sentence}`
      : word;
    void speakText(text, language, rate);
  };

  const progressPercent = Math.round((currentIndex / queue.length) * 100);
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
      !window.confirm(rc.confirmDelete)
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
            {rc.review}
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
        {audioMessage && (
          <p className="review-audio-status" role="status">
            {audioMessage}
          </p>
        )}
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
                  ["original", rc.original],
                  ["translated", rc.translation],
                  ["sentence", rc.sentence],
                  [
                    "sentenceTranslated",
                    rc.sentenceTranslation,
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
                  {rc.cancel}
                </button>
                <button className="review-edit-save" disabled={saving}>
                  {rc.save}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="review-card-viewport">
                {queue.slice(currentIndex, currentIndex + 2).map((currentCard, offset) => {
                  const preview = offset > 0;
                  const screenshotUrl = resolveImageUrl(currentCard.screenshot);
                  return (
                    <div
                      ref={preview ? previewRef : cardRef}
                      key={currentCard.id}
                      aria-hidden={preview || undefined}
                      inert={preview}
                      className={`review-flashcard ${preview ? "review-preview" : "review-active"} ${!preview && isDragging ? "review-dragging" : ""} ${preview ? "" : flipPhase} ${preview ? "" : swipeClass}`}
                      style={preview ? undefined : cardTransformStyle}
                      onClick={preview ? undefined : handleCardClick}
                      onPointerDown={preview ? undefined : handlePointerDown}
                      onPointerMove={preview ? undefined : handlePointerMove}
                      onPointerUp={preview ? undefined : handlePointerUp}
                      onPointerCancel={() => {
                        if (busy.current) return;
                        pointerId.current = null;
                        suppressClickUntil.current = performance.now() + 500;
                        drag.current.x = 0;
                        setTouchStartX(null);
                        setTouchStartY(null);
                        setTouchDeltaX(0);
                        setIsDragging(false);
                      }}
                    >
                      {/* Dynamic Swipe Action Stamps on Mobile */}
                      {!preview && isDragging && touchDeltaX !== 0 && (
                        <>
                          {touchDeltaX < -15 && (
                            <div
                              className="review-swipe-stamp review-swipe-stamp-again"
                              style={{ opacity: Math.min(1, (Math.abs(touchDeltaX) - 15) / 50) }}
                            >
                              <span className="stamp-title">{r.btnAgain}</span>
                            </div>
                          )}
                          {touchDeltaX > 15 && (
                            <div
                              className="review-swipe-stamp review-swipe-stamp-good"
                              style={{ opacity: Math.min(1, (Math.abs(touchDeltaX) - 15) / 50) }}
                            >
                              <span className="stamp-title">{r.btnGood}</span>
                            </div>
                          )}
                        </>
                      )}
                      <div className="review-flip-scene">
                        <div
                          className={`review-flip-inner ${!preview && answerShown ? "is-flipped" : ""}`}
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
                            const active = !preview && back === answerShown;
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
                                    <div
                                      className="review-inline-audio flex items-center gap-2 my-2"
                                      onPointerDown={(event) => event.stopPropagation()}
                                      onPointerUp={(event) => event.stopPropagation()}
                                      onClick={(event) => event.stopPropagation()}
                                    ><button
                                      type="button"
                                      className={`review-speak-btn ${isSpeaking && active ? "speaking" : ""}`}
                                      aria-label={r.listenAudio}
                                      title={r.listenAudio}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        void speakText(text, language);
                                      }}
                                    >
                                      <Volume2 />
                                    </button>
                                    <button
                                      type="button"
                                      className="review-speak-btn review-speak-slow-btn"
                                      aria-label={rc.listenSlowly}
                                      title="0.75×"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        void speakText(text, language, 0.75);
                                      }}
                                    >
                                      <Turtle />
                                    </button>
                                  </div>
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
                                    <ReviewScreenshot
                                      key={screenshotUrl}
                                      src={screenshotUrl}
                                      alt={r.movieSnapshotAlt}
                                      locale={locale}
                                      active={active}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="review-card-actions">
                <button
                  type="button"
                  className="review-flip-btn"
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
                <div className="review-mobile-audio" role="group" aria-label={r.listenAudio}>
                  <button
                    type="button"
                    className="review-speak-btn review-speak-slow-btn"
                    disabled={saving || !!flipPhase}
                    aria-label={rc.listenSlowly}
                    title={rc.listenSlowly}
                    onClick={() => speakVisibleCard(0.75)}
                  >
                    <Turtle aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`review-speak-btn review-speak-primary ${isSpeaking ? "speaking" : ""}`}
                    disabled={saving || !!flipPhase}
                    aria-label={r.listenAudio}
                    title={r.listenAudio}
                    onClick={() => speakVisibleCard()}
                  >
                    <Volume2 aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div
                className="review-controls"
              >
                <div className="review-rating">
                  <div className="review-rating-label">
                    {r.knowWordPrompt}
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
                            {grade === 1 ? r.btnAgain : r.btnGood}
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
                    ✏️ {rc.edit}
                  </button>
                  <button
                    type="button"
                    className="review-delete-btn"
                    disabled={saving || !!flipPhase}
                    onClick={() => void removeCard()}
                  >
                    🗑 {rc.delete}
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
