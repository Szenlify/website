"use client";

import { useState } from "react";

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="cennik" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="glass-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>💎</span>
            <span>Przejrzysty Cennik</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Zainwestuj w swoją płynność językową
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            Zacznij całkowicie za darmo lub odblokuj pełną moc sztucznej inteligencji i lektorów ElevenLabs.
          </p>

          {/* Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? "text-white" : "text-zinc-400"}`}>
              Rozliczenie miesięczne
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 rounded-full bg-indigo-950 border border-indigo-500/40 p-1 relative transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-indigo-500 shadow-md transform transition-transform ${
                  annual ? "translate-x-6 bg-emerald-400" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${annual ? "text-white" : "text-zinc-400"}`}>
                Rozliczenie roczne
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                -20% (2 msc gratis)
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* FREE PLAN */}
          <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Plan Startowy</span>
                <h3 className="text-2xl font-bold text-white mt-1">FREE</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Idealny do codziennego oglądania wideo i sprawdzania pojedynczych słówek.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">0 zł</span>
                <span className="text-xs text-zinc-400">/ na zawsze</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Podwójne napisy YouTube & Netflix</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Pływający tłumacz na stronach WWW</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Algorytm Anki SM-2 w popup</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Głosy systemowe TTS</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>30 zapytań AI / miesiąc</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 opacity-60">
                  <span>✕</span>
                  <span>Generator Quizów AI</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 opacity-60">
                  <span>✕</span>
                  <span>Głosy ElevenLabs (Roger, Sarah, Charlie)</span>
                </div>
              </div>
            </div>

            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full py-3 rounded-xl font-bold text-center text-sm"
            >
              Zacznij za darmo
            </a>
          </div>

          {/* BASIC PLAN */}
          <div className="glass-card rounded-3xl p-8 border border-indigo-500/30 flex flex-col justify-between space-y-8 bg-indigo-950/20 relative">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Dla Uczących się</span>
                <h3 className="text-2xl font-bold text-white mt-1">BASIC</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Dla osób, które regularnie oglądają seriale i budują bazę słówek.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {annual ? "23 zł" : "29 zł"}
                </span>
                <span className="text-xs text-zinc-400">/ miesiąc</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Wszystko z planu FREE</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200 font-semibold text-indigo-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>300 zapytań AI / miesiąc</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Generator sprawdzianów i Quizów AI</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Eksport do Anki (.apkg) i Excela (.xlsx)</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Zrzuty ekranu bez limitu</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 opacity-60">
                  <span>✕</span>
                  <span>Głosy ElevenLabs</span>
                </div>
              </div>
            </div>

            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full py-3 rounded-xl font-bold text-center text-sm border-indigo-500/40 hover:bg-indigo-600/20"
            >
              Wybierz plan Basic
            </a>
          </div>

          {/* PRO PLAN (Featured) */}
          <div className="glass-card rounded-3xl p-8 border-2 border-indigo-500 flex flex-col justify-between space-y-8 bg-gradient-to-b from-indigo-950/60 via-slate-950 to-indigo-950/40 relative shadow-2xl shadow-indigo-500/20">
            {/* Best value tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 text-white text-xs font-black uppercase tracking-wider shadow-lg">
              🔥 Najpopularniejszy wybór
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Maksymalna Immersja
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">PRO</h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Kompletne narzędzie ze studyjnymi głosami AI i zaawansowaną analizą językową.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {annual ? "39 zł" : "49 zł"}
                </span>
                <span className="text-xs text-zinc-400">/ miesiąc</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Wszystko z planu BASIC</span>
                </div>
                <div className="flex items-center gap-3 text-white font-bold bg-indigo-500/20 px-2 py-1 rounded-lg border border-indigo-500/30">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>1000 zapytań AI / miesiąc</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-300 font-bold">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Naturalne głosy ElevenLabs (Roger, Sarah, Charlie)</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Priorytetowa prędkość generowania AI</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Nielimitowane powtórki i quizy</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Dostęp do nowości i wczesnych funkcji</span>
                </div>
              </div>
            </div>

            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3.5 rounded-xl font-extrabold text-center text-sm shadow-xl shadow-indigo-500/30"
            >
              Odblokuj Lectoro PRO
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
