import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Eksport słówek do Anki (.apkg) i algorytm SM-2 – Lectoro",
  description:
    "Dowiedz się jak działa wbudowany w Lectoro algorytm powtórek Anki SM-2 oraz jak wyeksportować swoją bazę słówek do pliku .apkg, Excela lub CSV.",
  keywords: ["anki eksport apkg", "spaced repetition algorytm", "anki sm-2", "fiszki anki z napisów"],
};

export default function AnkiGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="ambient-bg">
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 space-y-12">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white">Strona główna</Link>
          <span>/</span>
          <span className="text-indigo-400">Przewodniki SEO</span>
          <span>/</span>
          <span className="text-white font-medium">Anki & Spaced Repetition</span>
        </div>

        <div className="space-y-4">
          <span className="glass-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <span>🧠</span>
            <span>Spaced Repetition & Anki</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            System powtórek Spaced Repetition i eksport do Anki
          </h1>
          <p className="text-lg text-zinc-300">
            Poznaj algorytm, który rewolucjonizuje zapamiętywanie słówek i dowiedz się jak łatwo przenieść swoją bazę do zewnętrznych aplikacji.
          </p>
        </div>

        <article className="glass-card-static rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-zinc-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Czym jest algorytm Anki SM-2?</h2>
            <p>
              SuperMemo 2 (SM-2) to legendarny algorytm oparty na matematycznym modelu krzywej zapominania. Po każdej powtórce oceniasz trudność fiszki:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-bold text-xs">
                1. Znowu (1 min)
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
                2. Trudne (12 godz.)
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-xs">
                3. Dobre (1 dzień)
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                4. Łatwe (4 dni)
              </div>
            </div>
            <p>
              W Lectoro algorytm ten jest <strong>wbudowany bezpośrednio w okienko wtyczki</strong> – nie musisz instalować osobnej aplikacji Anki na komputerze.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Eksport do plików .apkg i Excel (.xlsx)</h2>
            <p>
              Jeśli wolisz korzystać z aplikacji Anki Desktop lub AnkiMobile na telefonie, Lectoro pozwala jednym kliknięciem wygenerować gotową talię <strong>.apkg</strong> z dołączonymi nagraniami audio i zrzutami ekranu.
            </p>
          </section>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Zacznij powtórki z algorytmem SM-2</h3>
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold"
            >
              <span>Wypróbuj Lectoro za darmo</span>
              <span>→</span>
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
