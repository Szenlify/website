"use client";

import { useState } from "react";

export default function StepByStepGuide() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      tag: "Krok 1 · Start w 10 sekund",
      title: "Pobierz i dodaj Lectoro do przeglądarki Chrome",
      description:
        "Wejdź do oficjalnego sklepu Chrome Web Store i kliknij 'Dodaj do Chrome'. Wtyczka nie wymaga instalowania zewnętrznych programów, baz danych ani skomplikowanej konfiguracji.",
      details: [
        "100% bezpieczna i zweryfikowana przez Google",
        "Działa na Chrome, Brave, Edge, Opera i Vivaldi",
        "Gotowa do nauki od razu po instalacji",
      ],
      badge: "Chrome Web Store 1-Click",
      icon: "⚡",
      ctaText: "Pobierz z Chrome Web Store",
      ctaLink: "https://chromewebstore.google.com",
    },
    {
      number: 2,
      tag: "Krok 2 · Oglądaj ulubione wideo",
      title: "Włącz film na YouTube, Netflix lub dowolny artykuł",
      description:
        "Oglądaj seriale, podcasty, wywiady na YouTube i Netflixie tak jak zwykle. Lectoro automatycznie nakłada podwójne, interaktywne napisy i przygotowuje wygodne skróty klawiszowe.",
      details: [
        "Jednoczesne napisy w dwóch językach (np. EN + PL)",
        "Nawigacja klawiszami A / D (skok do poprzedniego / następnego zdania)",
        "Automatyczne pauzowanie przy czytaniu napisów",
      ],
      badge: "YouTube & Netflix Immersion",
      icon: "🎬",
    },
    {
      number: 3,
      tag: "Krok 3 · Zapisuj słówka",
      title: "Zapisuj słówka jednym klawiszem [S] ze zdjęciem i audio",
      description:
        "Gdy usłyszysz lub zobaczysz nieznane słowo, najedź na nie myszką lub wciśnij klawisz 'S'. Lectoro automatycznie przechwyci kadr z filmu, pełne zdanie i wymowę native speakera.",
      details: [
        "Automatyczny zrzut ekranu dokładnie ze sceny wideo",
        "Zapis kontekstu całego wypowiedzianego zdania",
        "Działa także przy zaznaczaniu tekstu na dowolnej stronie WWW",
      ],
      badge: "Auto Screenshot & Context",
      icon: "📸",
    },
    {
      number: 4,
      tag: "Krok 4 · Pamięć długotrwała",
      title: "Powtarzaj codziennie z algorytmem Spaced Repetition (SRS)",
      description:
        "Otwórz wtyczkę i uruchom zakładkę Powtórki. Sprawdzony algorytm Anki SM-2 obliczy optymalne odstępy czasowe, by słowa na stałe zapisały się w Twojej pamięci długotrwałej.",
      details: [
        "Płynne szkielety ładowania i odwracanie fiszek w 3D",
        "Kierunek dwukierunkowy: Angielski → Polski i Polski → Angielski",
        "4 stopnie oceny trudności: Znowu, Trudne, Dobre, Łatwe",
      ],
      badge: "Anki SM-2 Algorithm",
      icon: "🧠",
    },
    {
      number: 5,
      tag: "Krok 5 · Supermoce AI",
      title: "Wyjaśniaj slang z Gemini AI i trenuj z ElevenLabs",
      description:
        "Korzystaj z asystenta AI do tłumaczenia humoru, idiomów i niuansów gramatycznych. Słuchaj ultra-realistycznych głosów lektorskich (Roger, Sarah, Charlie) i generuj quizy sprawdzające.",
      details: [
        "Generowanie interaktywnych sprawdzianów i testów AI",
        "Wyjaśnienia kulturowe i potoczne zwroty native speakerów",
        "1-klik eksport bazy słówek do Anki (.apkg) i Excela (.xlsx)",
      ],
      badge: "Gemini 2.5 + ElevenLabs",
      icon: "✨",
    },
  ];

  return (
    <section id="jak-dziala" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="glass-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>🚀</span>
            <span>Instrukcja Krok po Kroku</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Jak używać Lectoro od A do Z?
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            Od instalacji po biegłość językową – zobacz, jak w 5 prostych krokach zamienić codzienne oglądanie filmów w najskuteczniejszy system nauki języka.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(step.number)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeStep === step.number
                  ? "bg-indigo-950/70 border-indigo-500/50 shadow-xl shadow-indigo-500/15"
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.06] opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                    activeStep === step.number
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/40"
                      : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {step.number}
                </span>
                <span className="text-xl">{step.icon}</span>
              </div>
              <span
                className={`text-xs font-bold block ${
                  activeStep === step.number ? "text-indigo-300" : "text-zinc-400"
                }`}
              >
                Krok {step.number}
              </span>
              <span className="text-xs text-zinc-300 font-medium line-clamp-1 mt-0.5">
                {step.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        {steps.map((step) => {
          if (step.number !== activeStep) return null;
          return (
            <div
              key={step.number}
              className="glass-card-static rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left description */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
                    <span>{step.icon}</span>
                    <span>{step.tag}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-3 pt-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-xs font-bold shrink-0">
                          ✓
                        </div>
                        <span className="text-sm font-medium text-zinc-200">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {step.ctaText && (
                    <div className="pt-4">
                      <a
                        href={step.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold shadow-xl"
                      >
                        <span>{step.ctaText}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Visual Graphic */}
                <div className="lg:col-span-5">
                  <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 space-y-4 shadow-2xl relative">
                    <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-3">
                      <span className="font-semibold text-zinc-200">Podgląd etapu {step.number}/5</span>
                      <span className="text-indigo-400 font-mono">Lectoro Pro</span>
                    </div>

                    <div className="space-y-3 py-2">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-white">{step.badge}</p>
                          <p className="text-[11px] text-zinc-400">Automatyczna integracja w przeglądarce</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                        <span className="text-xs font-medium text-indigo-200">Algorytm & Synchronizacja:</span>
                        <span className="text-xs font-bold text-emerald-400">Aktywna (Chmura)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                        disabled={activeStep === 1}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 disabled:opacity-30"
                      >
                        ← Poprzedni
                      </button>
                      <span className="text-xs text-zinc-400">Krok {activeStep} z 5</span>
                      <button
                        onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                        disabled={activeStep === 5}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold disabled:opacity-30"
                      >
                        Następny krok →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
