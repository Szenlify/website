import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Nauka angielskiego i hiszpańskiego z Netflixem – Lectoro",
  description:
    "Dowiedz się jak oglądać seriale na Netflixie z podwójnymi napisami, uczyć się slangu i zapisywać fiszki z kadrami filmowymi w rozszerzeniu Lectoro.",
  keywords: ["nauka angielskiego netflix", "podwójne napisy netflix", "napisy dwujęzyczne netflix", "seriale do nauki angielskiego"],
};

export default function NetflixGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-3" />
      </div>

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 space-y-12">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white">Strona główna</Link>
          <span>/</span>
          <span className="text-indigo-400">Przewodniki SEO</span>
          <span>/</span>
          <span className="text-white font-medium">Netflix & Seriale</span>
        </div>

        <div className="space-y-4">
          <span className="glass-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase text-red-400 bg-red-500/10 border-red-500/30">
            <span>🍿</span>
            <span>Netflix Language Learning</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Jak zamienić oglądanie seriali na Netflixie w efektywną naukę języka?
          </h1>
          <p className="text-lg text-zinc-300">
            Oglądaj Stranger Things, Suits, Friends czy Dom z Papieru z interaktywnymi napisami i ucz się żywego języka, którym posługują się native speakerzy.
          </p>
        </div>

        <article className="glass-card-static rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-zinc-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Podwójne napisy na Netflixie z Lectoro</h2>
            <p>
              Netflix domyślnie pozwala włączyć tylko jeden język napisów. Lectoro łączy oryginalną ścieżkę dialogową z profesjonalnym polskim tłumaczeniem bezpośrednio na ekranie Twojego odtwarzacza.
            </p>
            <p>
              Dzięki temu nie musisz zatrzymywać filmu i wpisywać słów do translatora – wystarczy najechać kursorem na nieznany wyraz.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Pamięć wizualna i emocjonalna (Kadr z filmu)</h2>
            <p>
              Badania nad pamięcią wykazują, że słowa powiązane z silną emocją i konkretnym obrazem (twarz aktora, dramatyczna scena, żart) są zapamiętywane do 4x szybciej niż suche listy ze słownika.
            </p>
            <p>
              Lectoro zapisuje w Twojej fiszce <strong>kadr ze sceny</strong>, pełne zdanie i audio. Podczas powtórki Twój mózg natychmiast odtwarza kontekst serialu.
            </p>
          </section>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Uruchom Lectoro na swoim koncie Netflix</h3>
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold"
            >
              <span>Dodaj Lectoro do Chrome</span>
              <span>→</span>
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
