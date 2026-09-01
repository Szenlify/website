"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import type { Dict } from "@/lib/i18n/types";

interface NavbarProps {
    dict: Dict;
    locale: string;
}

const NON_EN_LOCALES = ["pl", "de", "es"];

function buildLocaleHref(pathname: string, targetLocale: string): string {
    let basePath = pathname;
    for (const l of ["en", ...NON_EN_LOCALES]) {
        if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
            basePath = pathname.slice(l.length + 1) || "/";
            break;
        }
    }
    return targetLocale === "en"
        ? basePath || "/"
        : `/${targetLocale}${basePath === "/" ? "" : basePath}`;
}

export default function Navbar({ dict, locale }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
    const headerRef = useRef<HTMLElement>(null);
    const langRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                isMobileMenuOpen &&
                headerRef.current &&
                !headerRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
            if (
                isLangOpen &&
                langRef.current &&
                !langRef.current.contains(event.target as Node)
            ) {
                setIsLangOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMobileMenuOpen, isLangOpen]);

    const { nav, lang } = dict;
    const LANG_OPTIONS = [
        { code: "en", label: lang.en },
        { code: "pl", label: lang.pl },
        { code: "de", label: lang.de },
        { code: "es", label: lang.es },
    ];
    const currentLangLabel =
        LANG_OPTIONS.find((l) => l.code === locale)?.label ?? "EN";

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/65 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />
            <header
                ref={headerRef}
                className="sticky top-0 z-50 bg-[#070913]/70 backdrop-blur-xl border-b border-white/10 transition-all duration-200"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Logo />
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link
                            href="#features"
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.features}
                        </Link>
                        <Link
                            href="#demo"
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.liveDemo}
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.howItWorks}
                        </Link>
                        <Link
                            href="#comparison"
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.comparison}
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.pricing}
                        </Link>
                        <Link
                            href="#faq"
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.faq}
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        {/* Language selector (desktop) */}
                        <div ref={langRef} className="relative hidden lg:block">
                            <button
                                type="button"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                aria-label={lang.selectLanguage}
                                aria-expanded={isLangOpen}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-200"
                            >
                                <svg
                                    className="w-3.5 h-3.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                <span>{currentLangLabel}</span>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {isLangOpen && (
                                <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#0d1224]/98 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50">
                                    {LANG_OPTIONS.map((option) => (
                                        <Link
                                            key={option.code}
                                            href={buildLocaleHref(
                                                pathname,
                                                option.code,
                                            )}
                                            onClick={() => setIsLangOpen(false)}
                                            className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold transition-colors ${option.code === locale ? "bg-indigo-600/30 text-indigo-300" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                                        >
                                            <span>{option.label}</span>
                                            {option.code === locale && (
                                                <span className="text-indigo-400 text-[10px]">
                                                    ✓
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link
                            href="https://chromewebstore.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                        >
                            <svg
                                height={24}
                                width={24}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="ionicon"
                            >
                                <path d="M188.8 255.93a67.2 67.2 0 1 0 67.2-67.18 67.38 67.38 0 0 0-67.2 67.18" />
                                <path d="M476.75 217.79v.05a207 207 0 0 0-7-28.84h-.11a202 202 0 0 1 7.07 29 203.5 203.5 0 0 0-7.07-29h-155.4c19.05 17 31.36 40.17 31.36 67.05a86.55 86.55 0 0 1-12.31 44.73L231 478.45a2 2 0 0 1 0 .27v.28-.26a224 224 0 0 0 25 1.26c6.84 0 13.61-.39 20.3-1a223 223 0 0 0 29.78-4.74C405.68 451.52 480 362.4 480 255.94a225 225 0 0 0-3.25-38.15" />
                                <path d="M256 345.5c-33.6 0-61.6-17.91-77.29-44.79L76 123.05l-.14-.24A224 224 0 0 0 207.4 474.55v-.05l77.69-134.6a84.1 84.1 0 0 1-29.09 5.6" />
                                <path d="m91.29 104.57 77.35 133.25A89.19 89.19 0 0 1 256 166h205.17a246.5 246.5 0 0 0-25.78-43.94l.12.08A245.3 245.3 0 0 1 461.17 166h.17a246 246 0 0 0-25.66-44 2.6 2.6 0 0 1-.35-.26 223.93 223.93 0 0 0-344.19-17.4l.14.24Z" />
                            </svg>
                            <span>{nav.addToChrome}</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            aria-label="Toggle Navigation Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <span
                                    className={`h-0.5 w-full bg-current rounded-full transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                                />
                                <span
                                    className={`h-0.5 w-full bg-current rounded-full transition-all duration-200 ease-in-out ${isMobileMenuOpen ? "opacity-0" : ""}`}
                                />
                                <span
                                    className={`h-0.5 w-full bg-current rounded-full transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#070913]/98 backdrop-blur-2xl border-t border-white/10 shadow-2xl ${isMobileMenuOpen ? "max-h-[620px] opacity-100 translate-y-0 pointer-events-auto" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}
                >
                    <nav className="flex flex-col gap-1.5 px-4 pt-3 pb-6">
                        <Link
                            href="#features"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition flex items-center justify-between"
                        >
                            <span>{nav.features}</span>
                            <span className="text-xs text-indigo-400">✨</span>
                        </Link>
                        <Link
                            href="#demo"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition flex items-center justify-between"
                        >
                            <span>{nav.liveDemo}</span>
                            <span className="text-xs text-indigo-400">▶</span>
                        </Link>
                        <Link
                            href="#how-it-works"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition"
                        >
                            {nav.howItWorks}
                        </Link>
                        <Link
                            href="#comparison"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition"
                        >
                            {nav.comparison}
                        </Link>
                        <Link
                            href="#pricing"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition"
                        >
                            {nav.pricing}
                        </Link>
                        <Link
                            href="#faq"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition"
                        >
                            {nav.faq}
                        </Link>

                        {/* Language switcher (mobile) */}
                        <div className="pt-2 border-t border-white/10 mt-1">
                            <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                {lang.selectLanguage}
                            </p>
                            <div className="flex flex-wrap gap-2 px-4 pb-1">
                                {LANG_OPTIONS.map((option) => (
                                    <Link
                                        key={option.code}
                                        href={buildLocaleHref(
                                            pathname,
                                            option.code,
                                        )}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${option.code === locale ? "bg-indigo-600/40 text-indigo-200 border border-indigo-500/50" : "bg-white/5 text-slate-300 hover:text-white border border-white/10"}`}
                                    >
                                        {option.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                            <div className="flex items-center justify-around py-1">
                                <Link
                                    href={
                                        locale === "en"
                                            ? "/privacy"
                                            : `/${locale}/privacy`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xs font-medium text-slate-400 hover:text-white transition"
                                >
                                    {nav.privacyPolicy}
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link
                                    href={
                                        locale === "en"
                                            ? "/terms"
                                            : `/${locale}/terms`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xs font-medium text-slate-400 hover:text-white transition"
                                >
                                    {nav.termsOfService}
                                </Link>
                            </div>
                            <Link
                                href="https://chromewebstore.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/30"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                                <span>{nav.addToChromeFree}</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
