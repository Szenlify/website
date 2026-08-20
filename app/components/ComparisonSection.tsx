export default function ComparisonSection() {
  const comparisonData = [
    {
      feature: "Podwójne napisy YouTube & Netflix",
      lectoro: true,
      lr: true,
      trancy: true,
      migaku: true,
      anki: false,
    },
    {
      feature: "Automatyczny zrzut kadru ze sceny",
      lectoro: true,
      lr: false,
      trancy: false,
      migaku: "Trudna konfig.",
      anki: "Ręcznie",
    },
    {
      feature: "Wbudowany algorytm Anki SM-2 w popup",
      lectoro: true,
      lr: false,
      trancy: false,
      migaku: "Wymaga app Anki",
      anki: true,
    },
    {
      feature: "Wyjaśnienia kontekstowe AI (Gemini 2.5)",
      lectoro: true,
      lr: false,
      trancy: "Ograniczone",
      migaku: false,
      anki: false,
    },
    {
      feature: "Ultra-naturalne głosy ElevenLabs",
      lectoro: true,
      lr: false,
      trancy: false,
      migaku: false,
      anki: false,
    },
    {
      feature: "Generator Quizów & Testów z Twoich słów",
      lectoro: true,
      lr: false,
      trancy: false,
      migaku: false,
      anki: false,
    },
    {
      feature: "Eksport do Anki (.apkg) & Excela (.xlsx)",
      lectoro: true,
      lr: "Tylko CSV",
      trancy: "Ograniczony",
      migaku: true,
      anki: true,
    },
    {
      feature: "Zero skomplikowanej instalacji (1-Click)",
      lectoro: true,
      lr: true,
      trancy: true,
      migaku: false,
      anki: false,
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="glass-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>⚖️</span>
            <span>Porównanie z Alternatywami</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Dlaczego Lectoro nie ma sobie równych?
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            Tradycyjne rozszerzenia są przestarzałe, a zewnętrzne programy wymagają godzin konfiguracji. Lectoro łączy wszystko w jednym, nowoczesnym narzędziu.
          </p>
        </div>

        <div className="glass-card-static rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40">
                  <th className="py-5 px-6 text-sm font-bold text-zinc-300">Funkcjonalność</th>
                  <th className="py-5 px-6 text-center text-sm font-extrabold text-indigo-400 bg-indigo-950/40 border-x border-indigo-500/30">
                    <div className="flex items-center justify-center gap-1.5">
                      <span>⚡ Lectoro</span>
                      <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-indigo-500 text-white">
                        Lider
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-center text-sm font-semibold text-zinc-400">Language Reactor</th>
                  <th className="py-5 px-6 text-center text-sm font-semibold text-zinc-400">Trancy</th>
                  <th className="py-5 px-6 text-center text-sm font-semibold text-zinc-400">Migaku</th>
                  <th className="py-5 px-6 text-center text-sm font-semibold text-zinc-400">Zwykłe Anki</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-200">{row.feature}</td>

                    {/* Lectoro column */}
                    <td className="py-4 px-6 text-center font-bold text-emerald-400 bg-indigo-950/30 border-x border-indigo-500/20">
                      {row.lectoro === true ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                          ✓
                        </span>
                      ) : (
                        row.lectoro
                      )}
                    </td>

                    {/* LR */}
                    <td className="py-4 px-6 text-center text-zinc-400">
                      {row.lr === true ? (
                        <span className="text-emerald-400">✓</span>
                      ) : row.lr === false ? (
                        <span className="text-red-400/60">✕</span>
                      ) : (
                        row.lr
                      )}
                    </td>

                    {/* Trancy */}
                    <td className="py-4 px-6 text-center text-zinc-400">
                      {row.trancy === true ? (
                        <span className="text-emerald-400">✓</span>
                      ) : row.trancy === false ? (
                        <span className="text-red-400/60">✕</span>
                      ) : (
                        row.trancy
                      )}
                    </td>

                    {/* Migaku */}
                    <td className="py-4 px-6 text-center text-zinc-400">
                      {row.migaku === true ? (
                        <span className="text-emerald-400">✓</span>
                      ) : row.migaku === false ? (
                        <span className="text-red-400/60">✕</span>
                      ) : (
                        <span className="text-amber-300 text-xs">{row.migaku}</span>
                      )}
                    </td>

                    {/* Anki */}
                    <td className="py-4 px-6 text-center text-zinc-400">
                      {row.anki === true ? (
                        <span className="text-emerald-400">✓</span>
                      ) : row.anki === false ? (
                        <span className="text-red-400/60">✕</span>
                      ) : (
                        <span className="text-amber-300 text-xs">{row.anki}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
