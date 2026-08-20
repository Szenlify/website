"use client";

import { useState } from "react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Jak zacząć korzystać z Lectoro?",
      a: "Wystarczy kliknąć 'Dodaj do Chrome' na górze strony. Po 5 sekundach wtyczka pojawi się w Twojej przeglądarce. Wejdź na dowolny film na YouTube lub odcinek serialu na Netflixie – podwójne napisy i narzędzia Lectoro pojawią się automatycznie.",
    },
    {
      q: "Czy Lectoro działa na innych przeglądarkach niż Google Chrome?",
      a: "Tak! Lectoro jest w pełni kompatybilne ze wszystkimi przeglądarkami opartymi na silniku Chromium, m.in. Brave, Microsoft Edge, Opera oraz Vivaldi.",
    },
    {
      q: "Jak działa algorytm Spaced Repetition (Anki SM-2)?",
      a: "Algorytm SM-2 opiera się na krzywej zapominania Ebbinghausa. Wylicza optymalny moment na powtórzenie słówka tuż przed tym, jak Twój mózg by o nim zapomniał. Dzięki temu uczysz się w 15 minut dziennie, zamiast wkuwać godzinami przed egzaminem.",
    },
    {
      q: "Czy mogę wyeksportować swoje słówka do aplikacji Anki lub Excela?",
      a: "Tak, Lectoro umożliwia pobranie całej Twojej bazy słówek do formatu .apkg (gotowe talie Anki z dźwiękiem i obrazkami), pliku Excel (.xlsx) oraz uniwersalnego formatu CSV.",
    },
    {
      q: "Jakie głosy ElevenLabs są dostępne w planie PRO?",
      a: "W planie PRO masz dostęp do najpopularniejszych, krystalicznie czystych głosów studyjnych ElevenLabs: Roger, Sarah oraz Charlie. Brzmią w 100% jak prawdziwi native speakerzy z idealną intonacją i naturalnym tempem wypowiedzi.",
    },
    {
      q: "Czy muszę podawać kartę kredytową przy instalacji?",
      a: "Nie! Plan FREE jest całkowicie darmowy i nie wymaga podawania danych płatności ani karty. Możesz korzystać z podstawowych funkcji bez żadnych opłat.",
    },
    {
      q: "Czy moje dane i zapisane słówka są bezpieczne?",
      a: "Tak, cała Twoja biblioteka jest bezpiecznie szyfrowana i synchronizowana w chmurze Firebase/Google Cloud. Dostęp do niej masz wyłącznie Ty po zalogowaniu na swoje konto.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="glass-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>❓</span>
            <span>Najczęściej Zadawane Pytania</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Wszystko, co warto wiedzieć o Lectoro
          </h2>
          <p className="text-base text-zinc-300">
            Masz pytania dotyczące działania wtyczki, instalacji lub planów? Sprawdź odpowiedzi poniżej.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold transform transition-transform shrink-0 ${
                      isOpen ? "rotate-180 bg-indigo-500/20 text-indigo-300 border-indigo-400/30" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in slide-in-from-top-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
