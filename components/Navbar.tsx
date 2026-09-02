"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { Check, ChevronDown, Globe2, Menu, Play, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LOCALES, type Dict, type Locale } from "@/lib/i18n/types";
import { CHROME_STORE_URL } from "@/lib/config";
import {
    getLocalizedHref,
    getLocalizedSectionHref,
    switchLocalePathname,
} from "@/lib/routing";

interface NavbarProps {
    dict: Dict;
    locale: Locale;
}

export default function Navbar({ dict, locale }: NavbarProps) {
    const pathname = usePathname();

    const { nav, lang } = dict;
    const LANG_OPTIONS = LOCALES.map((code) => ({ code, label: lang[code] }));
    const currentLangLabel =
        LANG_OPTIONS.find((l) => l.code === locale)?.label ?? "EN";

    const handleLanguageChange = (event: MouseEvent<HTMLAnchorElement>) => {
        event.currentTarget.hash = window.location.hash;
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 bg-[#070913]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Logo locale={locale} />
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link
                            href={getLocalizedSectionHref("features", locale)}
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.features}
                        </Link>
                        <Link
                            href={getLocalizedSectionHref("demo", locale)}
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.liveDemo}
                        </Link>
                        <Link
                            href={getLocalizedSectionHref(
                                "how-it-works",
                                locale,
                            )}
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.howItWorks}
                        </Link>
                        <Link
                            href={getLocalizedSectionHref("comparison", locale)}
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.comparison}
                        </Link>
                        <Link
                            href={getLocalizedSectionHref("pricing", locale)}
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.pricing}
                        </Link>
                        <Link
                            href={getLocalizedSectionHref("faq", locale)}
                            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            {nav.faq}
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        {/* Language selector (desktop) */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    aria-label={lang.selectLanguage}
                                    className="group hidden gap-1.5 rounded-lg text-xs font-bold text-slate-300 lg:inline-flex"
                                >
                                    <Globe2 className="size-3.5" />
                                    <span>{currentLangLabel}</span>
                                    <ChevronDown className="size-3 transition-transform group-data-[state=open]:rotate-180" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                                {LANG_OPTIONS.map((option) => (
                                    <DropdownMenuItem key={option.code} asChild>
                                        <a
                                            key={option.code}
                                            href={switchLocalePathname(
                                                pathname,
                                                option.code as Locale,
                                            )}
                                            onClick={handleLanguageChange}
                                            className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold transition-colors ${option.code === locale ? "bg-indigo-600/30 text-indigo-300" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                                        >
                                            <span>{option.label}</span>
                                            {option.code === locale && (
                                                <Check className="size-3 text-indigo-400" />
                                            )}
                                        </a>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            href={CHROME_STORE_URL}
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
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-xl text-slate-300 lg:hidden"
                                    aria-label="Toggle Navigation Menu"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="lg:hidden">
                                <SheetTitle className="sr-only">
                                    Navigation
                                </SheetTitle>
                                <div className="border-b border-white/10 p-4 pr-16">
                                    <Logo locale={locale} />
                                </div>
                                <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4">
                                    {[
                                        [
                                            getLocalizedSectionHref(
                                                "features",
                                                locale,
                                            ),
                                            nav.features,
                                        ],
                                        [
                                            getLocalizedSectionHref(
                                                "demo",
                                                locale,
                                            ),
                                            nav.liveDemo,
                                        ],
                                        [
                                            getLocalizedSectionHref(
                                                "how-it-works",
                                                locale,
                                            ),
                                            nav.howItWorks,
                                        ],
                                        [
                                            getLocalizedSectionHref(
                                                "comparison",
                                                locale,
                                            ),
                                            nav.comparison,
                                        ],
                                        [
                                            getLocalizedSectionHref(
                                                "pricing",
                                                locale,
                                            ),
                                            nav.pricing,
                                        ],
                                        [
                                            getLocalizedSectionHref(
                                                "faq",
                                                locale,
                                            ),
                                            nav.faq,
                                        ],
                                    ].map(([href, label], index) => (
                                        <SheetClose key={href} asChild>
                                            <Link
                                                href={href}
                                                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white"
                                            >
                                                <span>{label}</span>
                                                {index === 0 && (
                                                    <Sparkles className="size-3.5 text-indigo-400" />
                                                )}
                                                {index === 1 && (
                                                    <Play className="size-3.5 text-indigo-400" />
                                                )}
                                            </Link>
                                        </SheetClose>
                                    ))}

                                    <div className="mt-1 border-t border-white/10 pt-2">
                                        <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                            {lang.selectLanguage}
                                        </p>
                                        <div className="flex flex-wrap gap-2 px-4 pb-1">
                                            {LANG_OPTIONS.map((option) => (
                                                <SheetClose
                                                    key={option.code}
                                                    asChild
                                                >
                                                    <a
                                                        href={switchLocalePathname(
                                                            pathname,
                                                            option.code as Locale,
                                                        )}
                                                        onClick={
                                                            handleLanguageChange
                                                        }
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${option.code === locale ? "bg-indigo-600/40 text-indigo-200 border border-indigo-500/50" : "bg-white/5 text-slate-300 hover:text-white border border-white/10"}`}
                                                    >
                                                        {option.label}
                                                    </a>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-4">
                                        <div className="flex items-center justify-around">
                                            <SheetClose asChild>
                                                <Link
                                                    href={getLocalizedHref(
                                                        "/privacy",
                                                        locale,
                                                    )}
                                                    className="text-xs font-medium text-slate-400 hover:text-white"
                                                >
                                                    {nav.privacyPolicy}
                                                </Link>
                                            </SheetClose>
                                            <span className="text-slate-600">
                                                •
                                            </span>
                                            <SheetClose asChild>
                                                <Link
                                                    href={getLocalizedHref(
                                                        "/terms",
                                                        locale,
                                                    )}
                                                    className="text-xs font-medium text-slate-400 hover:text-white"
                                                >
                                                    {nav.termsOfService}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                        <SheetClose asChild>
                                            <Button
                                                asChild
                                                className="h-11 w-full rounded-xl font-bold"
                                            >
                                                <Link
                                                    href={CHROME_STORE_URL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {nav.addToChromeFree}
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <div className="h-17 lg:h-19" aria-hidden="true" />
        </>
    );
}
