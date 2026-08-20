export default function FeaturesGrid() {
  const features = [
    {
      id: "wideo",
      icon: "🎬",
      title: "Podwójne Napisy na YouTube i Netflix",
      description:
        "Oglądaj filmy i seriale z jednoczesnymi napisami w języku oryginalnym i polskim. Najedź na dowolne słowo, aby natychmiast zobaczyć tłumaczenie, definicję i wymowę bez przerywania immersji.",
      bullets: [
        "Skróty klawiszowe A/D do przewijania po zdaniach",
        "Klawisz S do natychmiastowego zapisu słówka",
        "Wsparcie dla YouTube, Netflix i odtwarzaczy HTML5",
      ],
      badge: "Wideo & Napisy",
      gradient: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30",
    },
    {
      id: "fiszki",
      icon: "🧠",
      title: "Spaced Repetition (Algorytm Anki SM-2)",
      description:
        "Wbudowany bezpośrednio w wyskakujące okienko wtyczki sprawdzony algorytm Anki. Wylicza idealne odstępy czasowe (1m, 12h, 1d, 4d, 10d+), gwarantując przeniesienie słów do pamięci długotrwałej.",
      bullets: [
        "Fiszki z pełnym kontekstem zdania i krystalicznym audio",
        "Odwracanie kart w obie strony (np. EN → PL i PL → EN)",
        "Płynne szkielety ładowania zdjęć (Shimmer) bez layout shiftu",
      ],
      badge: "Anki SM-2 Engine",
      gradient: "from-indigo-500/20 to-purple-500/10",
      border: "border-indigo-500/30",
    },
    {
      id: "kadry",
      icon: "📸",
      title: "Automatyczne Zrzuty Ekranu z Filmów",
      description:
        "Każde zapisane słowo z wideo otrzymuje automatycznie kadr z dokładnego momentu wypowiedzenia. Kojarzenie słówek z emocją i sceną z ulubionego serialu przyspiesza zapamiętywanie o ponad 300%.",
      bullets: [
        "Zapis kadru bez spowalniania odtwarzacza",
        "Płynna optymalizacja i przechowywanie w chmurze Cloudflare R2",
        "Idealne do wizualnej nauki i powtórek",
      ],
      badge: "Visual Memory",
      gradient: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
    },
    {
      id: "ai",
      icon: "✨",
      title: "Asystent Językowy AI (Gemini 2.5)",
      description:
        "Rozumiej humor, idiomy, grę słów i slang uliczny, którego nie przetłumaczy żaden tradycyjny słownik. Gemini analizuje całe zdanie w kontekście sceny filmowej i wyjaśnia gramatykę w przystępny sposób.",
      bullets: [
        "Rozbijanie skomplikowanych konstrukcji gramatycznych",
        "Tłumaczenie wieloznacznych zwrotów i idiomów",
        "Wskazówki kulturowe i przykłady użycia w codziennej mowie",
      ],
      badge: "Gemini 2.5 Intelligence",
      gradient: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30",
    },
    {
      id: "glosy",
      icon: "🎙️",
      title: "Naturalne Głosy ElevenLabs",
      description:
        "Słuchaj krystalicznie czystej wymowy native speakerów dzięki integracji z ElevenLabs. Do wyboru najpopularniejsze, ultra-realistyczne głosy studyjne: Roger, Sarah oraz Charlie.",
      bullets: [
        "Perfekcyjna intonacja, akcent i tempo mowy",
        "Niezależna regulacja prędkości odtwarzania",
        "Błyskawiczne buforowanie dźwięku w chmurze",
      ],
      badge: "ElevenLabs Studio Audio",
      gradient: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
    },
    {
      id: "eksport",
      icon: "📊",
      title: "Generator Quizów & Eksport do Anki i Excela",
      description:
        "Masz pełną kontrolę nad swoją bazą wiedzy. Wygeneruj interaktywny quiz testowy AI ze swoich zapisanych słówek lub wyeksportuj je jednym kliknięciem do Anki (.apkg/.txt), Excela (.xlsx) czy pliku CSV.",
      bullets: [
        "Generator sprawdzianów, pytań ABCD i łączenia par",
        "Eksport ze zrzutami ekranu i nagraniami audio",
        "Bezpieczna synchronizacja w chmurze z profilem Google",
      ],
      badge: "Quiz & Export Hub",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
    },
  ];

  return (
    <section id="funkcje" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="glass-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>⚡</span>
            <span>Kompletny Ekosystem Nauki</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Wszystko, czego potrzebujesz, by opanować język
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            Połączyliśmy najpotężniejsze technologie – napisy dwujęzyczne, algorytmy powtórek w czasie, generatywne AI i syntezę głosu nowej generacji.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={`glass-card rounded-3xl p-8 border ${item.border} bg-gradient-to-b ${item.gradient} flex flex-col justify-between space-y-6 relative overflow-hidden`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md shadow-inner">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-zinc-200 border border-white/15">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {item.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
