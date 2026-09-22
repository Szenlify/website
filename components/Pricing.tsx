"use client";

import "./pricing.css";

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
    const plansRef = useRef<HTMLDivElement>(null);
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

    const signInLabel = <><svg aria-hidden="true" width="18" height="18" className="size-4 shrink-0" viewBox="0 0 24 24">
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
                  </svg><span>{dict.nav.signIn}</span></>;

    const actions = (plan: PaidPlan) => <div className="subscription-plan-action">
        <button type="button" disabled={!!pending} onClick={() => void checkout(plan)} className="subscription-plan-button is-trial">
            {pending === `${plan}:subscription` ? (pl ? "Otwieranie płatności…" : "Opening checkout…") : !user ? signInLabel : (pl ? `Wybierz ${plan.toUpperCase()} — subskrypcja` : `Choose ${plan.toUpperCase()} — subscription`)}
        </button>
        <p className="subscription-trial-note">{pl ? "3 dni bezpłatnie dla uprawnionych nowych klientów. Potem płatność co miesiąc. Anuluj w panelu płatności." : "3 days free for eligible new customers. Then billed monthly. Cancel in the billing portal."}</p>
        {pl && <div className="subscription-blik-option">
            <button type="button" disabled={!!pending} onClick={() => void checkout(plan, "blik")} aria-label={user ? `Kup BLIK — ${BILLING_PLANS[plan].blikPln.toFixed(2).replace(".", ",")} zł` : dict.nav.signIn} className="subscription-plan-button is-blik">
                {pending === `${plan}:blik` ? "Otwieranie BLIK…" : !user ? signInLabel : <><span>Zapłać</span><img src="/blik.svg" alt="BLIK" width={48} height={25} className="blik-logo" /><span>· {BILLING_PLANS[plan].blikPln.toFixed(2).replace(".", ",")} zł</span></>}
            </button>
            <p className="subscription-trial-note">Jednorazowo za 30 dni. Bez okresu próbnego, zapisywania karty i automatycznego odnowienia.</p>
        </div>}
    </div>;

    return (
        <section
            className="lectoro-pricing py-20 border-t border-white/10 bg-[#050711]/40 relative z-10"
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
                <div ref={plansRef} className="subscription-plans-grid max-w-6xl mx-auto" aria-label={pricing.title} aria-busy={!!pending}>
                    {(["free", "basic", "pro"] as const).map(plan => {
                        const paid = plan !== "free";
                        const limits = paid ? BILLING_PLANS[plan] : { cards: 25, ai: 15, voiceCharacters: 0 };
                        const count = (value: number) => Number.isFinite(value) ? value.toLocaleString(language) : (pl ? "Bez limitu" : "Unlimited");
                        return <article key={plan} className={`subscription-plan-card ${plan === "basic" ? "is-recommended" : ""} ${paid ? "has-trial-offer" : ""}`}>
                            <div className="subscription-plan-topline"><strong>{pricing[plan].name}</strong>{plan === "basic" && <span className="subscription-plan-badge">{pricing.mostPopular}</span>}</div>
                            {paid && <div className="subscription-plan-trial-kicker">{pl ? "3 dni bezpłatnego trialu*" : "3-day free trial*"}</div>}
                            <div className="subscription-plan-price"><b>{localizedPricing.plans[plan].formatted}</b><span>{plan === "free" ? pricing.free.forever : pricing[plan].mo}</span></div>
                            <div className="subscription-plan-features">
                                <span><i aria-hidden="true">✓</i><span><b>{pl ? "Bez limitu" : "Unlimited"}</b> {pl ? "tłumaczenia" : "translations"}</span></span>
                                <span><i aria-hidden="true">✓</i><span><b>{count(limits.ai)}</b> {pl ? "zapytań AI / miesiąc" : "AI requests / month"}</span></span>
                                <span><i aria-hidden="true">✓</i><span><b>{count(limits.cards)}</b> {pl ? "fiszek SRS" : "SRS flashcards"}</span></span>
                                <span><i aria-hidden="true">✓</i><span><b>{paid ? (pl ? "Bez limitu" : "Unlimited") : "3 / mo"}</b> {pl ? "eksport Anki / Excel" : "Anki / Excel exports"}</span></span>
                                {paid && <><span><i aria-hidden="true">✓</i><b>{pl ? "Naturalne głosy AI" : "Natural AI voices"}</b></span><span><i aria-hidden="true">✓</i><b>{pl ? "Powtórki bez limitu" : "Unlimited practice"}</b></span></>}
                                <span className={paid ? "" : "is-muted"}><i aria-hidden="true">{paid ? "✓" : "—"}</i>{paid ? `${count(limits.voiceCharacters)} Gemini TTS / ${pl ? "mies." : "mo"}` : (pl ? "Głos systemowy" : "System voice")}</span>
                            </div>
                            {paid ? actions(plan) : <div className="subscription-plan-action">{!user ? <button type="button" disabled={!!pending} className="subscription-plan-button is-secondary" onClick={async () => { setPending("free"); setError(""); try { await loginWithGoogle(); } catch (cause) { setError(cause instanceof Error ? cause.message : "Sign in failed"); } finally { setPending(null); } }}>{pending === "free" ? (pl ? "Logowanie…" : "Signing in…") : signInLabel}</button> : <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="subscription-plan-button is-secondary">{pricing.free.cta}</a>}</div>}
                        </article>;
                    })}
                </div>
                <div className="pricing-nav">
                    <button type="button" aria-label={pl ? "Poprzedni plan" : "Previous plan"} onClick={() => plansRef.current?.scrollBy({ left: -plansRef.current.clientWidth * .9, behavior: "smooth" })}>←</button>
                    <button type="button" aria-label={pl ? "Następny plan" : "Next plan"} onClick={() => plansRef.current?.scrollBy({ left: plansRef.current.clientWidth * .9, behavior: "smooth" })}>→</button>
                </div>
            </div>
        </section>
    );
}
