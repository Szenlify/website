import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Instalacja Lectoro w Google Chrome krok po kroku – Poradnik",
  description:
    "Prosta instrukcja jak pobrać, zainstalować i przypiąć wtyczkę Lectoro w przeglądarce Google Chrome, Brave, Edge lub Opera w 10 sekund.",
  keywords: ["instalacja lectoro", "chrome web store rozszerzenie instalacja", "jak zainstalowac wtyczke chrome"],
};

export default function InstalacjaGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
      </div>

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 space-y-12">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white">Strona główna</Link>
          <span>/</span>
          <span className="text-indigo-400">Przewodniki SEO</span>
          <span>/</span>
          <span className="text-white font-medium">Instalacja Krok po Kroku</span>
        </div>

        <div className="space-y-4">
          <span className="glass-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <span>⚡</span>
            <span>Instrukcja Instalacji</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Jak zainstalować Lectoro w 10 sekund?
          </h1>
          <p className="text-lg text-zinc-300">
            Instalacja rozszerzenia jest całkowicie bezpłatna, bezpieczna i nie wymaga restartu komputera.
          </p>
        </div>

        <article className="glass-card-static rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 text-zinc-300 leading-relaxed">
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">
                1
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Wejdź na stronę w Chrome Web Store</h3>
                <p className="text-sm text-zinc-300">
                  Kliknij przycisk poniżej, aby otworzyć oficjalną stronę rozszerzenia Lectoro w sklepie Google.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">
                2
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Kliknij 'Dodaj do Chrome'</h3>
                <p className="text-sm text-zinc-300">
                  W oknie dialogowym potwierdź dodanie wtyczki. Google pobierze i zainstaluje rozszerzenie automatycznie w kilka sekund.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">
                3
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Przypnij ikonę do paska (Opcjonalnie)</h3>
                <p className="text-sm text-zinc-300">
                  Kliknij ikonę puzzla w prawym górnym rogu przeglądarki i kliknij pinezkę przy Lectoro, aby mieć szybki dostęp do powtórek fiszek jednym kliknięciem.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold"
            >
              <span>Przejdź do Chrome Web Store</span>
              <span>→</span>
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
