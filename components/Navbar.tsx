"use client";

import { LANGUAGE_COOKIE } from "@/lib/i18n/detect-locale";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  Globe2,
  LogOut,
  Menu,
  Sparkles,
} from "lucide-react";
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
import { getGuideCatalogCopy } from "@/lib/guides/catalog";
import {
  getLocalizedHref,
  getLocalizedSectionHref,
  switchLocalePathname,
} from "@/lib/routing";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  dict: Dict;
  locale: Locale;
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const pathname = usePathname();
  const isReviewsPage = /\/dashboard\/reviews\/?$/.test(pathname);
  const {
    user,
    isSigningIn,
    rawDueCount,
    openLanding,
    signInWithGoogle,
    signOut,
  } = useAuth();

  const { nav, lang } = dict;
  const guidesLabel = getGuideCatalogCopy(locale).label;
  const LANG_OPTIONS = LOCALES.map((code) => ({ code, label: lang[code] }));
  const currentLangLabel =
    LANG_OPTIONS.find((l) => l.code === locale)?.label ?? "EN";

  const handleLanguageChange = (event: MouseEvent<HTMLAnchorElement>) => {
    const language = event.currentTarget.dataset.locale;
    if (language && LOCALES.includes(language as Locale)) {
      document.cookie = `${LANGUAGE_COOKIE}=${language}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    }
    event.currentTarget.hash = window.location.hash;
    event.currentTarget.search = window.location.search;
  };

  return (
    <>
      <header data-review-navigation={isReviewsPage} className="fixed inset-x-0 top-0 z-50 bg-[#070913]/60 backdrop-blur-xl border-b border-white/10 transition-all duration-200 pt-[env(safe-area-inset-top,0px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Logo locale={locale} className="shrink-0 max-sm:gap-2 max-sm:[&_span]:text-xl max-[360px]:[&>img]:hidden" />
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href={getLocalizedSectionHref("features", locale)}
              onClick={() => openLanding()}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
            >
              {nav.features}
            </Link>
            <Link
              href={getLocalizedHref("/guides", locale)}
              onClick={() => openLanding()}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
            >
              {guidesLabel}
            </Link>
            <Link
              href={getLocalizedSectionHref("how-it-works", locale)}
              onClick={() => openLanding()}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
            >
              {nav.howItWorks}
            </Link>
            <Link
              href={getLocalizedSectionHref("pricing", locale)}
              onClick={() => openLanding()}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
            >
              {nav.pricing}
            </Link>
          </nav>

          <div className="navbar-actions flex items-center gap-2 sm:gap-3">
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
                      data-locale={option.code}
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

            {/* Sign in / User Profile */}
            {!user ? (
              <button
                type="button"
                disabled={isSigningIn}
                onClick={() => void signInWithGoogle()}
                className="min-h-11 whitespace-nowrap inline-flex items-center gap-2 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isSigningIn ? (
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
                    />
                  </svg>
                )}
                <span>
                  {isSigningIn ? dict.reviews.signingIn : nav.signIn}
                </span>
              </button>
            ) : (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    title={user.displayName || user.email || "User"}
                    className={`relative min-h-11 min-w-11 justify-center flex items-center gap-1.5 p-1 sm:px-2 rounded-xl hover:bg-white/5 border transition cursor-pointer active:scale-95 ${
                      pathname.includes("/dashboard/reviews")
                        ? "border-violet-500/40 bg-violet-500/10"
                        : "border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="size-7 shrink-0">
                      {user.photoURL ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="size-7 rounded-full border border-violet-400/30 object-cover"
                        />
                      ) : (
                        <div className="size-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white">
                          {(user.displayName ||
                            user.email ||
                            "U")[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="hidden md:inline text-xs font-semibold text-slate-300 max-w-[100px] truncate">
                      {user.displayName || user.email}
                    </span>
                    <ChevronDown className="size-3 text-slate-400" />
                    {rawDueCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-violet-600 text-white text-[9.5px] font-bold font-mono flex items-center justify-center tabular-nums pointer-events-none">
                        {rawDueCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-bold text-white truncate">
                      {user.displayName || user.email || "User"}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href={getLocalizedHref("/dashboard/reviews", locale)}
                      className="text-violet-300 hover:text-white hover:bg-violet-600/30 cursor-pointer text-xs font-bold py-2 flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-3.5 text-violet-400" />
                        <span>{nav.reviews}</span>
                      </div>
                      {rawDueCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-mono font-bold">
                          {rawDueCount}
                        </span>
                      )}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => void signOut()}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer text-xs font-semibold py-2"
                  >
                    <LogOut className="size-3.5 mr-2" />
                    <span>{nav.signOut}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 shrink-0 rounded-xl text-slate-300 lg:hidden"
                  data-review-menu-trigger
                  aria-label="Toggle Navigation Menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="lg:hidden" aria-describedby={undefined}>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="border-b border-white/10 p-4 pr-16">
                  <Logo locale={locale} className="shrink-0 max-sm:gap-2 max-sm:[&_span]:text-xl max-[360px]:[&>img]:hidden" />
                </div>
                <nav className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  {user && (
                    <SheetClose asChild>
                      <Link
                        href={getLocalizedHref("/dashboard/reviews", locale)}
                        className="flex items-center justify-between rounded-2xl p-3.5 mb-2 bg-linear-to-r from-indigo-600/40 via-purple-600/30 to-indigo-600/20 border border-indigo-500/40 text-white font-bold text-sm shadow-md shadow-indigo-500/20 active:scale-98 transition text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="size-4 text-indigo-400" />
                          <span>{nav.reviews}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-violet-600 text-white text-xs font-mono font-bold">
                          {rawDueCount}
                        </span>
                      </Link>
                    </SheetClose>
                  )}
                  {[
                    [getLocalizedSectionHref("features", locale), nav.features],
                    [getLocalizedHref("/guides", locale), guidesLabel],
                    [
                      getLocalizedSectionHref("how-it-works", locale),
                      nav.howItWorks,
                    ],
                    [getLocalizedSectionHref("pricing", locale), nav.pricing],
                  ].map(([href, label], index) => (
                    <SheetClose key={href} asChild>
                      <Link
                        href={href}
                        onClick={() => openLanding()}
                        className="flex items-center justify-between min-h-12 rounded-xl px-4 py-3 text-base font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white"
                      >
                        <span>{label}</span>
                        {index === 0 && (
                          <Sparkles className="size-3.5 text-indigo-400" />
                        )}
                        {index === 1 && (
                          <BookOpen className="size-3.5 text-indigo-400" />
                        )}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="mt-1 border-t border-white/10 pt-2">
                    <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {lang.selectLanguage}
                    </p>
                    <div className="px-4 pb-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button type="button" className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-400" aria-label={lang.selectLanguage}>
                            <Globe2 aria-hidden="true" className="size-4 text-indigo-300" />
                            <span className="flex-1 text-left">{currentLangLabel}</span>
                            <ChevronDown aria-hidden="true" className="size-4 text-slate-400" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" sideOffset={8} collisionPadding={16} className="z-[60] w-[var(--radix-dropdown-menu-trigger-width)] max-h-[min(22rem,var(--radix-dropdown-menu-content-available-height))] overflow-y-auto overscroll-contain rounded-xl p-1.5">
                          {LANG_OPTIONS.map(option => (
                            <DropdownMenuItem key={option.code} asChild>
                              <a href={switchLocalePathname(pathname, option.code)} data-locale={option.code} onClick={handleLanguageChange} aria-current={option.code === locale ? "true" : undefined} className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-sm ${option.code === locale ? "bg-indigo-500/15 text-indigo-200" : "text-slate-300"}`}>
                                <span>{option.label}</span>
                                {option.code === locale && <Check aria-hidden="true" className="size-4 text-indigo-300" />}
                              </a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-around">
                      <SheetClose asChild>
                        <Link
                          href={getLocalizedHref("/privacy", locale)}
                          className="inline-flex min-h-11 items-center text-xs font-medium text-slate-400 hover:text-white"
                        >
                          {nav.privacyPolicy}
                        </Link>
                      </SheetClose>
                      <span className="text-slate-600">•</span>
                      <SheetClose asChild>
                        <Link
                          href={getLocalizedHref("/terms", locale)}
                          className="inline-flex min-h-11 items-center text-xs font-medium text-slate-400 hover:text-white"
                        >
                          {nav.termsOfService}
                        </Link>
                      </SheetClose>
                    </div>

                    {/* Mobile Auth Button */}
                    {!user ? (
                      <Button
                        type="button"
                        disabled={isSigningIn}
                        onClick={() => void signInWithGoogle()}
                        className="h-11 w-full rounded-xl font-bold flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                      >
                        {isSigningIn ? (
                          <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        ) : (
                          <svg className="size-4" viewBox="0 0 24 24">
                            <path
                              fill="#EA4335"
                              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                            />
                            <path
                              fill="#4285F4"
                              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
                            />
                          </svg>
                        )}
                        <span>
                          {isSigningIn
                            ? dict.reviews.signingIn
                            : nav.signIn}
                        </span>
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Link
                            href={getLocalizedHref(
                              "/dashboard/reviews",
                              locale,
                            )}
                            title={nav.reviews}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 transition cursor-pointer text-left active:scale-98"
                          >
                            <div className="flex items-center gap-2">
                              {user.photoURL ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={user.photoURL}
                                  alt={user.displayName || "User"}
                                  className="size-7 rounded-full border border-indigo-400/40 object-cover"
                                />
                              ) : (
                                <div className="size-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                                  {(user.displayName ||
                                    user.email ||
                                    "U")[0].toUpperCase()}
                                </div>
                              )}
                              <span className="text-xs font-bold text-white max-w-[130px] truncate">
                                {user.displayName || user.email}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-violet-600 text-white text-[11px] font-bold">
                              {rawDueCount}
                            </span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => void signOut()}
                            className="h-10 w-full rounded-xl text-xs font-bold text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300"
                          >
                            <LogOut className="size-3.5 mr-2" />
                            <span>{nav.signOut}</span>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div data-review-navigation-spacer={isReviewsPage} className="h-17 lg:h-19" aria-hidden="true" />
    </>
  );
}
