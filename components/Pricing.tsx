"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, loginWithGoogle } from "@/lib/firebase";
import { BILLING_PLANS, getBillingUrl, type PaidPlan, type PaymentMode } from "@/lib/billing";
import type { Dict, Locale } from "@/lib/i18n/types";
import { getLocalizedPricing } from "@/lib/pricing";
import { CHROME_STORE_URL } from "@/lib/config";

interface PricingProps {
    dict: Dict;
    locale?: Locale;
}

export default function Pricing({ dict, locale }: PricingProps) {
    const { pricing } = dict;
    const language = locale || dict.locale;
    const pl = language === "pl";
    const localizedPricing = getLocalizedPricing(language);
    const { user } = useAuth();
    const [pending, setPending] = useState<string | null>(null);
    const [error, setError] = useState("");
    const inFlight = useRef(false);
    const checkout = useCallback(async (plan?: PaidPlan, paymentMode: PaymentMode = "subscription") => {
        if (inFlight.current) return;
        inFlight.current = true;
        setPending(plan ? `${plan}:${paymentMode}` : "portal");
        setError("");
        try {
            let account = auth.currentUser;
            if (!account) {
                // Preserve purchase intent if mobile authentication uses a redirect.
                sessionStorage.setItem("lectoro-purchase", JSON.stringify({ plan, paymentMode, createdAt: Date.now() }));
                account = await loginWithGoogle();
                if (!account) return;
            }
            sessionStorage.removeItem("lectoro-purchase");
            const url = await getBillingUrl(account, language, plan ? { plan, paymentMode } : undefined);
            window.location.assign(url);
        } catch (cause) {
            sessionStorage.removeItem("lectoro-purchase");
            setError(cause instanceof Error ? cause.message : (pl ? "Błąd płatności. Spróbuj ponownie." : "Checkout failed. Please try again."));
        } finally { inFlight.current = false; setPending(null); }
    }, [language, pl]);

    useEffect(() => {
        if (!user || inFlight.current) return;
        try {
            const saved = sessionStorage.getItem("lectoro-purchase");
            if (!saved) return;
            const intent = JSON.parse(saved);
            sessionStorage.removeItem("lectoro-purchase");
            if (Date.now() - intent.createdAt < 15 * 60 * 1000 && ["basic", "pro", undefined].includes(intent.plan) && ["subscription", "blik"].includes(intent.paymentMode)) {
                void checkout(intent.plan, intent.paymentMode);
            }
        } catch { sessionStorage.removeItem("lectoro-purchase"); }
    }, [user, checkout]);

    const actions = (plan: PaidPlan) => <div className="space-y-3">
        <button type="button" disabled={!!pending} onClick={() => void checkout(plan)} className="w-full min-h-12 py-3.5 px-4 rounded-xl text-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-wait">
            {pending === `${plan}:subscription` ? (pl ? "Otwieranie płatności…" : "Opening checkout…") : (pl ? `Wybierz ${plan.toUpperCase()} — subskrypcja` : `Choose ${plan.toUpperCase()} — subscription`)}
        </button>
        <p className="text-xs text-slate-400 leading-relaxed">{pl ? "3 dni bezpłatnie dla uprawnionych nowych klientów. Potem płatność co miesiąc. Anuluj w panelu płatności." : "3 days free for eligible new customers. Then billed monthly. Cancel in the billing portal."}</p>
        {pl && <div className="border-t border-white/10 pt-3 space-y-2">
            <button type="button" disabled={!!pending} onClick={() => void checkout(plan, "blik")} className="w-full min-h-12 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-white transition disabled:opacity-50 disabled:cursor-wait">
                {pending === `${plan}:blik` ? "Otwieranie BLIK…" : `Kup BLIK — ${BILLING_PLANS[plan].blikPln.toFixed(2).replace(".", ",")} zł`}
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">Jednorazowo za 30 dni. Bez okresu próbnego, zapisywania karty i automatycznego odnowienia.</p>
        </div>}
    </div>;

    return (
        <section
            className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="pricing"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {pricing.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {pricing.title}
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        {pl ? "Wybierz subskrypcję lub kup 30 dni dostępu przez BLIK. Ten sam plan działa na stronie i w rozszerzeniu Lectoro." : "Choose your plan. The same account and plan work on the website and in the Lectoro extension."}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mb-8 text-center space-y-3">
                    <p className="text-sm text-slate-400">{pl ? "Ceny wyświetlamy dla wybranej wersji językowej. Ostateczną kwotę i walutę potwierdzisz w Stripe przed zakupem. BLIK rozliczany w PLN." : "Prices are shown for the selected language. Confirm the final amount and currency in Stripe before purchase."}</p>
                    {!user && <p className="text-sm text-slate-300">{pl ? "Po wybraniu planu zalogujesz się przez Google, aby przypisać zakup do konta Lectoro." : "After choosing a plan, sign in with Google to link your purchase to your Lectoro account."}</p>}
                    {user && <button type="button" disabled={!!pending} onClick={() => void checkout()} className="min-h-11 px-4 py-2 text-sm text-indigo-300 underline underline-offset-4 disabled:opacity-50">{pending === "portal" ? (pl ? "Otwieranie…" : "Opening…") : (pl ? "Zarządzaj subskrypcją i fakturami" : "Manage subscription and invoices")}</button>}
                    {error && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {/* Free Plan */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between">
                        <div>
                            <div className="font-display font-extrabold text-2xl text-white mb-1">
                                {pricing.free.name}
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                {pricing.free.desc}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    {localizedPricing.plans.free.formatted}
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    {pricing.free.forever}
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f2}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "Do 25 zapisanych fiszek SRS" : "Up to 25 saved SRS flashcards"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "15 zapytań AI / miesiąc" : "15 AI requests / month"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.free.f5}</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl text-center text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition"
                        >
                            {pricing.free.cta}
                        </a>
                    </div>

                    {/* Basic Plan (Most Popular) */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between relative bg-gradient-to-b from-[#1e274d]/90 to-[#0e1222]/95 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/25 md:-translate-y-2">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                            {pricing.mostPopular}
                        </div>

                        <div>
                            <div className="font-display font-extrabold text-2xl text-indigo-400 mb-1">
                                {pricing.basic.name}
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                {pricing.basic.desc}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    {localizedPricing.plans.basic.formatted}
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    {pricing.basic.mo}
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                                <li className="flex items-start gap-3 text-indigo-300 font-bold">
                                    <span className="text-indigo-400 font-black">
                                        ✓
                                    </span>
                                    <span>{pl ? "3 dni trialu — subskrypcja, dla uprawnionych" : "3-day subscription trial for eligible customers"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.basic.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "Do 2 500 fiszek SRS w chmurze" : "Up to 2,500 cloud SRS flashcards"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "800 zapytań AI / miesiąc" : "800 AI requests / month"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "10 000 znaków Gemini TTS / miesiąc" : "10,000 Gemini TTS characters / month"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "Eksport Anki i Excel bez limitu" : "Unlimited Anki and Excel exports"}</span>
                                </li>
                            </ul>
                        </div>

                        {actions("basic")}
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-panel p-8 sm:p-9 flex flex-col justify-between">
                        <div>
                            <div className="font-display font-extrabold text-2xl text-white mb-1">
                                {pricing.pro.name}
                            </div>
                            <p className="text-xs text-slate-400 mb-6">
                                {pricing.pro.desc}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="font-display font-black text-5xl text-white">
                                    {localizedPricing.plans.pro.formatted}
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                    {pricing.pro.mo}
                                </span>
                            </div>

                            <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                                <li className="flex items-start gap-3 text-indigo-300 font-bold">
                                    <span className="text-indigo-400 font-black">
                                        ✓
                                    </span>
                                    <span>{pl ? "3 dni trialu — subskrypcja, dla uprawnionych" : "3-day subscription trial for eligible customers"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pricing.pro.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "Fiszki SRS bez limitu" : "Unlimited SRS flashcards"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "Zapytania AI bez limitu" : "Unlimited AI requests"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "100 000 znaków Gemini TTS / miesiąc" : "100,000 Gemini TTS characters / month"}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>
                                    <span>{pl ? "Eksport Anki i Excel bez limitu" : "Unlimited Anki and Excel exports"}</span>
                                </li>
                            </ul>
                        </div>

                        {actions("pro")}
                    </div>
                </div>
            </div>
        </section>
    );
}
