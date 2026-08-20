import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030d17] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-800 flex items-center justify-center font-black text-white text-lg shadow-lg">
                L
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Lectoro</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Nowoczesne rozszerzenie do nauki języków z wideo na YouTube i Netflixie, algorytmem Anki SM-2, AI Gemini oraz głosami ElevenLabs.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Produkt</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="#jak-dziala" className="hover:text-white transition-colors">
                  Jak to działa
                </Link>
              </li>
              <li>
                <Link href="#wideo" className="hover:text-white transition-colors">
                  Podwójne napisy YouTube & Netflix
                </Link>
              </li>
              <li>
                <Link href="#fiszki" className="hover:text-white transition-colors">
                  System powtórek Anki SM-2
                </Link>
              </li>
              <li>
                <Link href="#ai" className="hover:text-white transition-colors">
                  AI & ElevenLabs
                </Link>
              </li>
              <li>
                <Link href="#cennik" className="hover:text-white transition-colors">
                  Cennik i Plany
                </Link>
              </li>
            </ul>
          </div>

          {/* SEO & Guide Subpages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Przewodniki SEO</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/youtube" className="hover:text-white transition-colors">
                  Nauka angielskiego z YouTube
                </Link>
              </li>
              <li>
                <Link href="/netflix" className="hover:text-white transition-colors">
                  Podwójne napisy na Netflixie
                </Link>
              </li>
              <li>
                <Link href="/anki" className="hover:text-white transition-colors">
                  Eksport słówek do Anki (.apkg)
                </Link>
              </li>
              <li>
                <Link href="/instalacja" className="hover:text-white transition-colors">
                  Instalacja w Chrome krok po kroku
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Chrome */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Bezpieczeństwo</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <span className="text-emerald-400 font-semibold">✓ Zweryfikowane przez Google</span>
              </li>
              <li>
                <span>Manifest V3 Architecture</span>
              </li>
              <li>
                <span>Szyfrowanie Cloud Firestore</span>
              </li>
              <li>
                <span>Cloudflare R2 Storage</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Lectoro. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-6">
            <span>Stworzone dla pasjonatów języków</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
