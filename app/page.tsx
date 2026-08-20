import Link from "next/link";
import Navbar from "./components/Navbar";
import InteractiveDemo from "./components/InteractiveDemo";
import StepByStepGuide from "./components/StepByStepGuide";
import FeaturesGrid from "./components/FeaturesGrid";
import ComparisonSection from "./components/ComparisonSection";
import PricingSection from "./components/PricingSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Ambient glowing background blobs */}
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>

      <Navbar />

      <main className="flex-1">
        {/* ── HERO SECTION ── */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-badge text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>⚡ Nowość: Podwójne napisy YouTube & Netflix + Gemini 2.5 AI</span>
            </div>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Oglądaj ulubione filmy i{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
                ucz się języka w naturalny sposób
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
              Lectoro zamienia dowolne wideo na <strong>YouTube i Netflixie</strong> oraz artykuły w internecie w interaktywne lekcje, <strong>inteligentne fiszki ze zdjęciami z filmu</strong> i krystalicznie czyste audio native speakerów.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/40"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zM22.069 5.47l-5.344 9.256a5.46 5.46 0 0 1 1.82 4.729 5.438 5.438 0 0 1-.41 2.09A11.954 11.954 0 0 0 24 12c0-2.394-.705-4.624-1.931-6.53zM12 16.364a4.364 4.364 0 1 0 0-8.728 4.364 4.364 0 0 0 0 8.728z" />
                </svg>
                <span>Dodaj do Chrome (Za darmo)</span>
              </a>

              <Link
                href="#jak-dziala"
                className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2"
              >
                <span>Zobacz jak to działa</span>
                <span>↓</span>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-base">★★★★★</span>
                <span className="font-bold text-white">5.0</span>
                <span>w Chrome Web Store</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>100% Darmowy start</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>Bez karty kredytowej</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400">🧠</span>
                <span>Algorytm Anki SM-2</span>
              </div>
            </div>

            {/* Interactive Live Demo */}
            <InteractiveDemo />
          </div>
        </section>

        {/* ── STEP BY STEP GUIDE (Od A do Z) ── */}
        <StepByStepGuide />

        {/* ── DETAILED FEATURES GRID ── */}
        <FeaturesGrid />

        {/* ── COMPARISON SECTION ── */}
        <ComparisonSection />

        {/* ── PRICING SECTION ── */}
        <PricingSection />

        {/* ── FAQ SECTION ── */}
        <FaqSection />

        {/* ── FINAL CTA BANNER ── */}
        <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-950/70 to-slate-900 border border-indigo-500/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

            <span className="glass-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>🚀</span>
              <span>Rozpocznij Naukę Już Dziś</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Gotowy na płynny angielski bez nudnych podręczników?
            </h2>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300">
              Zainstaluj Lectoro w kilka sekund i przekonaj się, jak przyjemna może być nauka języka podczas oglądania ulubionych filmów i seriali.
            </p>

            <div className="pt-4">
              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/50"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zM22.069 5.47l-5.344 9.256a5.46 5.46 0 0 1 1.82 4.729 5.438 5.438 0 0 1-.41 2.09A11.954 11.954 0 0 0 24 12c0-2.394-.705-4.624-1.931-6.53zM12 16.364a4.364 4.364 0 1 0 0-8.728 4.364 4.364 0 0 0 0 8.728z" />
                </svg>
                <span>Zainstaluj w Chrome (Za darmo)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
