import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#050711] border-t border-white/10 pt-16 pb-12 relative z-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo size="sm" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Next-generation immersion platform with bilingual video subtitles, AI assistant, ElevenLabs audio, and Spaced Repetition.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Netflix & YouTube Subtitles
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">
                  In-Page Web Translator
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">
                  SRS Flashcard Library
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Pricing & Trials
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Legal & Help</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Manifest */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="mailto:support@lectoroai.com" className="text-slate-300 hover:text-white transition">
                  support@lectoroai.com
                </a>
              </li>
              <li className="text-slate-500 font-mono text-[11px]">Domain: lectoroai.com</li>
              <li className="text-slate-500 font-mono text-[11px]">Version 1.0.0 (Manifest V3)</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 Lectoro AI (lectoroai.com). All rights reserved.</div>
          <div className="text-center sm:text-right max-w-md">
            Netflix and YouTube are registered trademarks of their respective owners. Lectoro AI is an independent software extension and is not affiliated with Netflix Inc. or Google LLC.
          </div>
        </div>
      </div>
    </footer>
  );
}
