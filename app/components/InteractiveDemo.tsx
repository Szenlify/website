"use client";

import { useState } from "react";

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"video" | "web" | "srs" | "ai">("video");

  // Video state
  const [videoWordSaved, setVideoWordSaved] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>("unprecedented");

  // Web state
  const [webTooltipVisible, setWebTooltipVisible] = useState(true);
  const [webSaved, setWebSaved] = useState(false);

  // SRS State (Popup Mockup)
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [reviewDirection, setReviewDirection] = useState<"normal" | "reverse">("normal");
  const [voicePickerOpen, setVoicePickerOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("Roger (ElevenLabs)");
  const [activePopupTab, setActivePopupTab] = useState<"review" | "words" | "settings">("review");

  // AI Quiz state
  const [aiSubTab, setAiSubTab] = useState<"breakdown" | "quiz">("breakdown");
  const [quizMode, setQuizMode] = useState<"web" | "pdf">("web");
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [matchingPairs, setMatchingPairs] = useState<{ [key: string]: string }>({});

  const [audioPlaying, setAudioPlaying] = useState(false);

  const sampleSrsCards = [
    {
      word: "unprecedented",
      wordPl: "bezprecedensowy, niespotykany",
      phonetic: "/ʌnˈpres.ɪ.den.tɪd/",
      sentence: "This discovery is an unprecedented breakthrough in modern astrophysics.",
      sentencePl: "To odkrycie to bezprecedensowy przełom we współczesnej astrofizyce.",
      source: "YouTube · Veritasium [04:12]",
      grad: "from-blue-900/60 to-indigo-950/80",
    },
    {
      word: "resilience",
      wordPl: "odporność psychiczna, wytrzymałość",
      phonetic: "/rɪˈzɪl.jəns/",
      sentence: "Her mental resilience helped her overcome the harsh winter.",
      sentencePl: "Jej odporność psychiczna pomogła jej przetrwać srogą zimę.",
      source: "Netflix · Stranger Things S04E07",
      grad: "from-emerald-900/60 to-teal-950/80",
    },
    {
      word: "spill the beans",
      wordPl: "wygadać się, zdradzić tajemnicę",
      phonetic: "/spɪl ðə biːnz/",
      sentence: "Please don't spill the beans about the surprise party!",
      sentencePl: "Proszę, nie wygadaj się o przyjęciu niespodziance!",
      source: "Netflix · Suits S02E04",
      grad: "from-purple-900/60 to-indigo-950/80",
    },
  ];

  const currentSrs = sampleSrsCards[cardIndex % sampleSrsCards.length];

  const handleSpeak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      setAudioPlaying(true);
      utterance.onend = () => setAudioPlaying(false);
      utterance.onerror = () => setAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setAudioPlaying(true);
      setTimeout(() => setAudioPlaying(false), 1200);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12">
      {/* 4 Main Interactive Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-2xl mb-8 shadow-2xl">
        <button
          onClick={() => setActiveTab("video")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "video"
              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-base">🎬</span>
          <span>1. YouTube & Netflix</span>
        </button>

        <button
          onClick={() => setActiveTab("web")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "web"
              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-base">🌐</span>
          <span>2. Tłumacz Stron WWW</span>
        </button>

        <button
          onClick={() => setActiveTab("srs")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "srs"
              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-base">🧠</span>
          <span>3. Fiszki Spaced Repetition</span>
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "ai"
              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-base">✨</span>
          <span>4. AI Gemini & Quizy</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="glass-card-static rounded-3xl p-4 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl bg-[#04111d]/90">
        {/* Glow ambient background */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ════════════════════════════════════════════════════════════════
            OPTION 1: 🎬 ODTWARZACZ YOUTUBE & NETFLIX
            ════════════════════════════════════════════════════════════════ */}
        {activeTab === "video" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Autentyczny interfejs napisów wideo Lectoro (YouTube & Netflix)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Kliknij słowo "unprecedented", aby zobaczyć dymek
                </span>
              </div>
            </div>

            {/* Simulated Video Player Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#070b15] border border-white/15 flex flex-col justify-between p-4 sm:p-6 shadow-2xl group">
              {/* Cinematic background visual */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-black pointer-events-none" />

              {/* Video Top Bar */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-zinc-200 font-medium">
                  <span className="text-red-500 font-black">YouTube</span>
                  <span>·</span>
                  <span>Veritasium - The Breakthrough in Quantum Physics</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/40 text-indigo-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Lectoro: Podwójne Napisy Włączone
                  </span>
                </div>
              </div>

              {/* Center / Subtitles Area */}
              <div className="relative z-20 max-w-2xl mx-auto w-full my-auto space-y-3 text-center">
                {/* Floating Authentic Tooltip Popup (When word clicked/hovered) */}
                {hoveredWord && (
                  <div className="inline-block p-4 rounded-2xl bg-[#0b1020]/95 backdrop-blur-xl border border-indigo-500/40 shadow-2xl text-left transform transition-all animate-in fade-in zoom-in-95">
                    <div className="flex items-start justify-between gap-6 pb-2 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-white">unprecedented</span>
                          <button
                            onClick={() => handleSpeak("unprecedented")}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-indigo-300 transition-colors"
                            title="Odsłuchaj wymowę"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                          </button>
                          <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                            ADJ
                          </span>
                        </div>
                        <span className="text-xs text-indigo-400 font-mono">/ʌnˈpres.ɪ.den.tɪd/</span>
                      </div>

                      <button
                        onClick={() => setVideoWordSaved(!videoWordSaved)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          videoWordSaved
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        }`}
                      >
                        <span>{videoWordSaved ? "✓ Zapisano w fiszkach" : "💾 Zapisz fiszkę + kadr [S]"}</span>
                      </button>
                    </div>

                    <div className="pt-2 space-y-1">
                      <p className="text-sm font-bold text-emerald-300">
                        bezprecedensowy, niespotykany dotąd
                      </p>
                      <p className="text-xs text-zinc-300">
                        💡 <em>Kontekst: Używane w dyskusjach naukowych i biznesowych na określenie przełomowych zjawisk.</em>
                      </p>
                    </div>
                  </div>
                )}

                {/* Subtitle Box (Authentic Lectoro dual-line layout) */}
                <div className="p-3 sm:p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 space-y-1 shadow-2xl">
                  {/* Original EN Line with Word Clickers */}
                  <p className="text-base sm:text-xl font-bold text-white tracking-wide">
                    I have to admit, that was an{" "}
                    <span
                      onClick={() => setHoveredWord("unprecedented")}
                      className="text-indigo-300 underline decoration-indigo-400 decoration-2 underline-offset-4 cursor-pointer hover:text-white bg-indigo-500/20 px-1.5 py-0.5 rounded transition-all"
                    >
                      unprecedented
                    </span>{" "}
                    breakthrough in modern physics.
                  </p>
                  {/* Translated PL Line */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                    Muszę przyznać, że to był bezprecedensowy przełom we współczesnej fizyce.
                  </p>
                </div>
              </div>

              {/* Video Player Bottom Controls & Timeline */}
              <div className="relative z-10 space-y-2">
                <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer">
                  <div className="w-1/3 h-full bg-gradient-to-r from-red-500 via-indigo-500 to-emerald-400 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">▶ 04:12 / 14:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-300 font-medium">Języki napisów:</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">EN</span>
                    <span>+</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-bold">PL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotkeys Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <kbd className="px-2 py-1 rounded bg-indigo-500 text-white font-bold font-mono">A</kbd>
                <span className="text-zinc-300 font-medium">Poprzednie zdanie</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <kbd className="px-2 py-1 rounded bg-indigo-500 text-white font-bold font-mono">D</kbd>
                <span className="text-zinc-300 font-medium">Następne zdanie</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <kbd className="px-2 py-1 rounded bg-emerald-500 text-white font-bold font-mono">S</kbd>
                <span className="text-zinc-300 font-medium">Zapisz fiszkę + kadr</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <kbd className="px-2 py-1 rounded bg-indigo-500 text-white font-bold font-mono">W</kbd>
                <span className="text-zinc-300 font-medium">Powtórz wolniej</span>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            OPTION 2: 🌐 TŁUMACZ STRON WWW (FLOATING TOOLBAR & POPUP)
            ════════════════════════════════════════════════════════════════ */}
        {activeTab === "web" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Pływający pasek narzędziowy Lectoro na dowolnej stronie WWW (Medium, Wikipedia, Dokumentacje)
              </span>
            </div>

            {/* Browser Article Frame Mockup */}
            <div className="rounded-2xl bg-[#070e1c] border border-white/15 p-6 space-y-6">
              {/* Chrome URL Address bar */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs text-zinc-400">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 px-3 py-1 rounded-md bg-black/40 text-zinc-300 font-mono text-[11px] border border-white/10">
                  🔒 https://techcrunch.com/2026/08/high-growth-engineering-practices
                </span>
              </div>

              {/* Article Content with Highlight & Real Toolbar */}
              <div className="space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed relative">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Building Resilient Distributed Systems at Scale
                </h3>

                <p>
                  Modern software architecture is inherently volatile. In high-load environments, teams must build fault-tolerant components and demonstrate exceptional organizational{" "}
                  <span className="relative inline-block font-semibold bg-indigo-500/25 text-indigo-100 px-2 py-0.5 rounded border border-indigo-400/50">
                    resilience
                    {/* The Authentic Floating Icon Toolbar (#__qt_icon) */}
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0f0f23]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black z-30 animate-in fade-in zoom-in-95">
                      <button
                        onClick={() => setWebTooltipVisible(true)}
                        className="w-8 h-8 rounded-xl bg-[#4a6cf7]/80 hover:bg-[#4a6cf7] text-white flex items-center justify-center font-bold text-xs transition-all shadow-md"
                        title="Tłumacz"
                      >
                        A/文
                      </button>
                      <button
                        onClick={() => handleSpeak("resilience")}
                        className="w-8 h-8 rounded-xl bg-[#4ecdc4]/60 hover:bg-[#4ecdc4] text-white flex items-center justify-center text-xs transition-all shadow-md"
                        title="Odsłuchaj wymowę"
                      >
                        🔊
                      </button>
                      <button
                        onClick={() => setActiveTab("ai")}
                        className="w-8 h-8 rounded-xl bg-[#f59e0b]/70 hover:bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs transition-all shadow-md"
                        title="Wyjaśnij z AI"
                      >
                        AI
                      </button>
                    </span>
                  </span>
                  , allowing systems to gracefully recover from network partitions and unexpected surges in traffic.
                </p>

                {/* The Authentic Tooltip Popup (#__qt_tooltip) */}
                {webTooltipVisible && (
                  <div className="max-w-md p-4 rounded-2xl bg-[#0f0f23]/95 backdrop-blur-xl border border-indigo-500/40 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span>📖 SŁOWNIK LECTORO</span>
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">
                          NOUN
                        </span>
                      </span>
                      <button
                        onClick={() => setWebSaved(!webSaved)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          webSaved
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                        }`}
                      >
                        <span>{webSaved ? "✓ Zapisano" : "💾 Zapisz"}</span>
                      </button>
                    </div>

                    <div>
                      <div className="text-lg font-black text-white flex items-center gap-2">
                        <span>resilience</span>
                        <span className="text-xs font-mono text-indigo-400 font-normal">/rɪˈzɪl.jəns/</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-300 mt-1">
                        odporność psychiczna, sprężystość, elastyczność
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-300">
                      <strong>Kontekst ze strony:</strong> <em>"...exceptional organizational resilience, allowing systems..."</em>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            OPTION 3: 🧠 FISZKI SPACED REPETITION (AUTHENTIC POPUP MOCKUP)
            ════════════════════════════════════════════════════════════════ */}
        {activeTab === "srs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Wyskakujące okienko wtyczki Lectoro (Spaced Repetition SM-2 & Głosy ElevenLabs)
              </span>
              <span className="text-xs text-indigo-400 font-medium">Szerokość: 480px (Standard Chrome Popup)</span>
            </div>

            {/* Authentic 480px Extension Window Frame */}
            <div className="max-w-[480px] mx-auto rounded-3xl bg-[#041a24] border border-white/20 p-5 shadow-2xl space-y-4 relative overflow-hidden">
              {/* Ambient light inside popup */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_220px_200px_at_85%_-10%,_rgba(129,140,248,0.15)_0%,_transparent_70%)] pointer-events-none" />

              {/* Popup Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-800 flex items-center justify-center font-black text-white text-base shadow-md">
                    L
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Lectoro · AI Tutor</h4>
                    <p className="text-[10px] text-zinc-400">Codzienny Trening Językowy</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-zinc-300 font-semibold">Zsynchronizowano</span>
                </div>
              </div>

              {/* Popup Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setActivePopupTab("settings")}
                  className={`py-1.5 rounded-lg transition-colors ${
                    activePopupTab === "settings" ? "bg-white/10 text-white font-bold" : "text-zinc-400"
                  }`}
                >
                  ⚙️ Ustawienia
                </button>
                <button
                  onClick={() => setActivePopupTab("words")}
                  className={`py-1.5 rounded-lg transition-colors ${
                    activePopupTab === "words" ? "bg-white/10 text-white font-bold" : "text-zinc-400"
                  }`}
                >
                  📚 Słowa
                </button>
                <button
                  onClick={() => setActivePopupTab("review")}
                  className={`py-1.5 rounded-lg transition-colors ${
                    activePopupTab === "review"
                      ? "bg-indigo-600 text-white font-bold shadow-md"
                      : "text-zinc-400"
                  }`}
                >
                  🧠 Powtórki
                </button>
              </div>

              {/* Review Panel Header (Direction + Voice Picker) */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <span>🧠 Powtórka dnia</span>
                  <span className="text-indigo-400 font-mono">({cardIndex + 1}/15)</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Direction toggle */}
                  <button
                    onClick={() => setReviewDirection(reviewDirection === "normal" ? "reverse" : "normal")}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-bold border border-white/10 flex items-center gap-1"
                    title="Zmień kierunek powtórek"
                  >
                    <span>{reviewDirection === "normal" ? "EN → PL" : "PL → EN"}</span>
                  </button>

                  {/* ElevenLabs Voice selector */}
                  <div className="relative">
                    <button
                      onClick={() => setVoicePickerOpen(!voicePickerOpen)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>🎙️ {selectedVoice.split(" ")[0]}</span>
                      <span className="text-[10px]">⌄</span>
                    </button>

                    {/* Voice Menu Dropdown */}
                    {voicePickerOpen && (
                      <div className="absolute right-0 top-8 w-48 p-2 rounded-2xl bg-[#091222] border border-indigo-500/40 shadow-2xl z-50 space-y-1 animate-in fade-in zoom-in-95 text-xs">
                        <div className="px-2 py-1 text-[10px] uppercase font-bold text-zinc-400 border-b border-white/10">
                          Głosy ElevenLabs
                        </div>
                        {["Roger (ElevenLabs)", "Sarah (ElevenLabs)", "Charlie (ElevenLabs)"].map((v) => (
                          <button
                            key={v}
                            onClick={() => {
                              setSelectedVoice(v);
                              setVoicePickerOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                              selectedVoice === v ? "bg-indigo-600 text-white font-bold" : "text-zinc-300 hover:bg-white/5"
                            }`}
                          >
                            <span>{v.split(" ")[0]}</span>
                            {selectedVoice === v && <span>✓</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${((cardIndex + 1) / 15) * 100}%` }}
                />
              </div>

              {/* Flashcard Body */}
              <div className={`p-5 rounded-2xl bg-gradient-to-b ${currentSrs.grad} border border-white/15 space-y-4 shadow-xl text-center`}>
                {/* Word row with audio */}
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-2xl font-black text-white">
                    {reviewDirection === "normal" ? currentSrs.word : currentSrs.wordPl}
                  </h3>
                  <button
                    onClick={() => handleSpeak(currentSrs.word)}
                    className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-indigo-300 transition-colors"
                    title="Odsłuchaj lektora"
                  >
                    🔊
                  </button>
                </div>

                {/* Context Sentence */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-200 italic">
                  "{reviewDirection === "normal" ? currentSrs.sentence : currentSrs.sentencePl}"
                </div>

                {/* Screenshot Frame with Shimmer Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black/50 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-0 shimmer-animated opacity-25" />
                  <div className="relative z-10 flex flex-col items-center gap-1 text-xs text-zinc-400">
                    <span>📸 {currentSrs.source}</span>
                    <span className="text-[10px] text-zinc-300">Zrzut kadru ze sceny wideo</span>
                  </div>
                </div>

                {/* Card Back / Rating Controls */}
                {cardFlipped ? (
                  <div className="space-y-4 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">Odpowiedź:</span>
                      <p className="text-lg font-extrabold text-emerald-300">
                        {reviewDirection === "normal" ? currentSrs.wordPl : currentSrs.word}
                      </p>
                    </div>

                    {/* 4 SM-2 Rating Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          setCardFlipped(false);
                          setCardIndex((c) => c + 1);
                        }}
                        className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 text-xs font-bold transition-all"
                      >
                        <div>Znowu</div>
                        <div className="text-[9px] opacity-70">1 min</div>
                      </button>
                      <button
                        onClick={() => {
                          setCardFlipped(false);
                          setCardIndex((c) => c + 1);
                        }}
                        className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all"
                      >
                        <div>Trudne</div>
                        <div className="text-[9px] opacity-70">12 godz.</div>
                      </button>
                      <button
                        onClick={() => {
                          setCardFlipped(false);
                          setCardIndex((c) => c + 1);
                        }}
                        className="p-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 text-xs font-bold transition-all"
                      >
                        <div>Dobre</div>
                        <div className="text-[9px] opacity-70">1 dzień</div>
                      </button>
                      <button
                        onClick={() => {
                          setCardFlipped(false);
                          setCardIndex((c) => c + 1);
                        }}
                        className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 text-xs font-bold transition-all"
                      >
                        <div>Łatwe</div>
                        <div className="text-[9px] opacity-70">4 dni</div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setCardFlipped(true)}
                    className="btn-primary w-full py-3 rounded-xl font-bold text-sm shadow-xl"
                  >
                    Pokaż odpowiedź [Spacja]
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            OPTION 4: ✨ AI GEMINI & INTERAKTYWNY GENERATOR QUIZÓW
            ════════════════════════════════════════════════════════════════ */}
        {activeTab === "ai" && (
          <div className="space-y-6">
            {/* Subtab Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAiSubTab("breakdown")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiSubTab === "breakdown"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  ✨ 1. Analiza Idiomów & Gramatyki AI
                </button>
                <button
                  onClick={() => setAiSubTab("quiz")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiSubTab === "quiz"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  🧠 2. Generator Quizów AI
                </button>
              </div>

              <span className="text-xs text-indigo-400 font-mono">Gemini 2.5 Engine</span>
            </div>

            {/* Subtab 1: AI Breakdown */}
            {aiSubTab === "breakdown" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Left: Raw Dialogue Scene */}
                <div className="p-6 rounded-2xl bg-[#070e1c] border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-2">
                      <span className="font-bold text-white">🎬 Scena z serialu: Suits S02E04</span>
                      <span className="text-indigo-400">Wypowiedź Harveya Spectera</span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <p className="text-base font-bold text-white">
                        "Whatever you do, don't{" "}
                        <span className="text-amber-400 underline decoration-amber-400">
                          spill the beans
                        </span>{" "}
                        to the senior partners before tomorrow's meeting."
                      </p>
                      <p className="text-xs text-zinc-300">
                        Cokolwiek zrobisz, nie wygadaj się starszym partnerom przed jutrzejszym spotkaniem.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleSpeak("Whatever you do, don't spill the beans")}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-bold flex items-center justify-center gap-2"
                    >
                      <span>🔊 Odsłuchaj wymowę zdania</span>
                    </button>
                  </div>
                </div>

                {/* Right: AI Context Breakdown Card */}
                <div className="p-6 rounded-2xl bg-[#091222] border border-indigo-500/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-black">
                      ✨ Gemini 2.5 Deep Breakdown
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">Poziom B2/C1</span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-zinc-200">
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
                      <p className="font-bold text-white">💡 Idiom potoczny: "to spill the beans"</p>
                      <p className="text-xs text-zinc-300">
                        Oznacza ujawnienie tajemnicy lub poufnej informacji, zazwyczaj przedwcześnie lub przez nieuwagę.
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-300">
                      <p>
                        <strong>Struktura gramatyczna:</strong> Czasownik nieregularny (spill → spilled/spilt). Występuje najczęściej w formie przeczenia (<em>"Don't spill the beans"</em>).
                      </p>
                      <p>
                        <strong>Synonimy native speakerów:</strong> <em>let the cat out of the bag</em>, <em>blow the whistle</em>, <em>give the game away</em>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Subtab 2: AI Quiz Generator */}
            {aiSubTab === "quiz" && (
              <div className="space-y-6">
                {/* Quiz Export Control Bar (Identical to popup.html) */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧠</span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Quiz <span className="text-indigo-400">AI</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs font-semibold">
                      <button
                        onClick={() => setQuizMode("pdf")}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          quizMode === "pdf" ? "bg-white/15 text-white" : "text-zinc-400"
                        }`}
                      >
                        📄 PDF
                      </button>
                      <button
                        onClick={() => setQuizMode("web")}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          quizMode === "web" ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400"
                        }`}
                      >
                        🖱️ WEB (Interaktywny)
                      </button>
                    </div>

                    <select className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-medium border border-white/10">
                      <option>Ostatnie 10 słówek</option>
                      <option>Losowe z bazy</option>
                    </select>

                    <button className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg">
                      ✨ Generuj quiz
                    </button>
                  </div>
                </div>

                {/* Interactive Question Card */}
                <div className="p-6 rounded-2xl bg-[#091222] border border-emerald-500/30 space-y-4 shadow-2xl max-w-xl mx-auto">
                  <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-3">
                    <span className="text-emerald-400 font-bold">Pytanie 1 z 5 · Wybór wielokrotny</span>
                    <span>Wynik: {quizScore !== null ? `${quizScore}/5` : "W trakcie"}</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-base font-bold text-white">
                      Jak najlepiej przetłumaczysz zwrot <em>"unprecedented breakthrough"</em>?
                    </p>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <button
                        onClick={() => {
                          setQuizSelectedOption(0);
                          setQuizScore(0);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl font-medium transition-all ${
                          quizSelectedOption === 0
                            ? "bg-red-500/20 border border-red-400/50 text-red-200"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300"
                        }`}
                      >
                        A) Oczekiwana zmiana planów
                      </button>

                      <button
                        onClick={() => {
                          setQuizSelectedOption(1);
                          setQuizScore(1);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl font-bold transition-all ${
                          quizSelectedOption === 1
                            ? "bg-emerald-500/30 border border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300"
                        }`}
                      >
                        B) Bezprecedensowy, niespotykany dotąd przełom {quizSelectedOption === 1 && "✓ Prawidłowo!"}
                      </button>

                      <button
                        onClick={() => {
                          setQuizSelectedOption(2);
                          setQuizScore(0);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl font-medium transition-all ${
                          quizSelectedOption === 2
                            ? "bg-red-500/20 border border-red-400/50 text-red-200"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300"
                        }`}
                      >
                        C) Trudna do rozwiązania przeszkoda
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
