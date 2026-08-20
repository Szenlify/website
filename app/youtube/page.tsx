import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Jak uczyć się angielskiego z YouTube? Podwójne napisy i fiszki – Lectoro",
  description:
    "Kompletny poradnik jak oglądać filmy na YouTube z podwójnymi napisami, zapisywać słówka jednym klawiszem [S] i powtarzać je metodą Spaced Repetition w Lectoro.",
  keywords: ["nauka angielskiego youtube", "podwójne napisy youtube", "napisy dwujęzyczne youtube", "fiszki z youtube"],
};

export default function YouTubeGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
      </div>

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white">Strona główna</Link>
          <span>/</span>
          <span className="text-indigo-400">Przewodniki SEO</span>
          <span>/</span>
          <span className="text-white font-medium">YouTube & Podwójne Napisy</span>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <span className="glass-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <span>🎬</span>
            <span>YouTube Language Immersion</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Jak uczyć się języka z YouTube za pomocą podwójnych napisów?
          </h1>
          <p className="text-lg text-zinc-300">
            YouTube to największa na świecie darmowa baza autentycznych materiałów językowych. Zobacz, jak wyciągnąć z niego 100% z pomocą wtyczki Lectoro.
          </p>
        </div>

        {/* Content sections */}
        <article className="glass-card-static rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-zinc-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Dlaczego tradycyjne oglądanie YouTube nie wystarcza?</h2>
            <p>
              Oglądanie filmów wyłącznie z polskimi napisami sprawia, że mózg ignoruje ścieżkę dźwiękową i skupia się na czytaniu w języku ojczystym. Z kolei włączenie tylko napisów w języku angielskim często prowadzi do frustracji, gdy natrafisz na nieznany idiom lub szybką wymowę.
            </p>
            <p>
              Rozwiązaniem są <strong>podwójne, interaktywne napisy Lectoro</strong>. Widzisz oryginalny tekst oraz tłumaczenie, a najechanie na dowolne słowo natychmiast wyświetla jego definicję i wymowę.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Skróty klawiszowe w odtwarzaczu YouTube</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white">
                  <kbd className="px-2 py-0.5 rounded bg-indigo-500 text-white text-xs">A</kbd>
                  <span>Poprzednie zdanie</span>
                </div>
                <p className="text-xs text-zinc-400">Błyskawicznie cofa wideo do początku poprzedniego napisu.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white">
                  <kbd className="px-2 py-0.5 rounded bg-indigo-500 text-white text-xs">D</kbd>
                  <span>Następne zdanie</span>
                </div>
                <p className="text-xs text-zinc-400">Przeskakuje do kolejnego zdania w filmie.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white">
                  <kbd className="px-2 py-0.5 rounded bg-indigo-500 text-white text-xs">S</kbd>
                  <span>Zapisz fiszkę + kadr</span>
                </div>
                <p className="text-xs text-zinc-400">Zapisuje słowo, zdanie, audio i zrzut ekranu do bazy powtórek.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white">
                  <kbd className="px-2 py-0.5 rounded bg-indigo-500 text-white text-xs">W</kbd>
                  <span>Powtórz / Zwolnij</span>
                </div>
                <p className="text-xs text-zinc-400">Odtwarza bieżące zdanie w zwolnionym tempie (shadowing).</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Polecane kanały do nauki na YouTube</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-200">
              <li><strong>Veritasium & Kurzgesagt</strong> – Popularyzacja nauki, czysta i wyraźna dykcja.</li>
              <li><strong>TED & TED-Ed</strong> – Prezentacje, bogate słownictwo akademickie i biznesowe.</li>
              <li><strong>The Diary Of A CEO (Steven Bartlett)</strong> – Wywiady biznesowe, naturalny język konwersacyjny.</li>
              <li><strong>Ali Abdaal & Matt D'Avella</strong> – Produktywność, styl życia, codzienne zwroty.</li>
            </ul>
          </section>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Wypróbuj Lectoro na YouTube już teraz</h3>
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold"
            >
              <span>Zainstaluj wtyczkę w Chrome (Za darmo)</span>
              <span>→</span>
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
