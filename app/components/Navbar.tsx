"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-[#070e1c] rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                  L
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Lectoro
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 tracking-wider">
                  AI
                </span>
              </span>
              <span className="text-[11px] text-zinc-400 font-medium -mt-0.5">
                Nauka języków z wideo & WWW
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="#jak-dziala" className="hover:text-white transition-colors">
              Jak to działa
            </Link>
            <Link href="#wideo" className="hover:text-white transition-colors">
              YouTube & Netflix
            </Link>
            <Link href="#fiszki" className="hover:text-white transition-colors">
              Fiszki SRS
            </Link>
            <Link href="#ai" className="hover:text-white transition-colors">
              AI & ElevenLabs
            </Link>
            <Link href="#cennik" className="hover:text-white transition-colors">
              Cennik
            </Link>
            <Link href="#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zM22.069 5.47l-5.344 9.256a5.46 5.46 0 0 1 1.82 4.729 5.438 5.438 0 0 1-.41 2.09A11.954 11.954 0 0 0 24 12c0-2.394-.705-4.624-1.931-6.53zM12 16.364a4.364 4.364 0 1 0 0-8.728 4.364 4.364 0 0 0 0 8.728z" />
              </svg>
              <span>Dodaj do Chrome</span>
              <span className="text-xs font-normal opacity-80 pl-1 border-l border-white/20">
                Za darmo
              </span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-x-0 border-t border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="#jak-dziala"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Jak to działa
          </Link>
          <Link
            href="#wideo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            YouTube & Netflix
          </Link>
          <Link
            href="#fiszki"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Fiszki SRS (Spaced Repetition)
          </Link>
          <Link
            href="#ai"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            AI Gemini & ElevenLabs
          </Link>
          <Link
            href="#cennik"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Cennik
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            FAQ
          </Link>
          <div className="pt-2">
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-center"
            >
              <span>Zainstaluj wtyczkę w Chrome (Za darmo)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
