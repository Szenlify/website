"use client";

import "./pricing.css";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, loginWithGoogle } from "@/lib/firebase";
import { BILLING_PLANS, getBillingUrl, type PaidPlan, type PaymentMode } from "@/lib/billing";
import type { Dict, Locale } from "@/lib/i18n/types";
import { getLocalizedPricing } from "@/lib/pricing";
import { CHROME_STORE_URL } from "@/lib/config";

interface PricingCopy {
    checkoutFailed: string;
    openingCheckout: string;
    chooseSubscription: (plan: string) => string;
    trialNote: string;
    blikNote: string;
    blikPay: string;
    blikOpening: string;
    subtitle: string;
    googleSignInNote: string;
    unlimited: string;
    trialKicker: string;
    translations: string;
    aiRequests: string;
    flashcards: string;
    ankiExports: string;
    naturalAiVoices: string;
    unlimitedPractice: string;
    ttsMonthly: (count: string) => string;
    systemVoice: string;
    signingIn: string;
    prevPlan: string;
    nextPlan: string;
}

const PRICING_COPY: Record<Locale, PricingCopy> = {
    pl: {
        checkoutFailed: "Błąd płatności. Spróbuj ponownie.",
        openingCheckout: "Otwieranie płatności…",
        chooseSubscription: (p) => `Wybierz ${p.toUpperCase()} — subskrypcja`,
        trialNote: "3 dni bezpłatnie dla uprawnionych nowych klientów. Potem płatność co miesiąc. Anuluj w panelu płatności.",
        blikNote: "Jednorazowo za 30 dni. Bez okresu próbnego, zapisywania karty i automatycznego odnowienia.",
        blikPay: "Zapłać",
        blikOpening: "Otwieranie BLIK…",
        subtitle: "Wybierz subskrypcję lub kup 30 dni dostępu przez BLIK. Ten sam plan działa na stronie i w rozszerzeniu Lectoro.",
        googleSignInNote: "Po wybraniu planu zalogujesz się przez Google, aby przypisać zakup do konta Lectoro.",
        unlimited: "Bez limitu",
        trialKicker: "3 dni bezpłatnego trialu*",
        translations: "tłumaczenia",
        aiRequests: "zapytań AI / miesiąc",
        flashcards: "fiszek SRS",
        ankiExports: "eksport Anki / Excel",
        naturalAiVoices: "Naturalne głosy AI",
        unlimitedPractice: "Powtórki bez limitu",
        ttsMonthly: (c) => `${c} znaków AI TTS / mies.`,
        systemVoice: "Głos systemowy",
        signingIn: "Logowanie…",
        prevPlan: "Poprzedni plan",
        nextPlan: "Następny plan",
    },
    en: {
        checkoutFailed: "Checkout failed. Please try again.",
        openingCheckout: "Opening checkout…",
        chooseSubscription: (p) => `Choose ${p.toUpperCase()} — subscription`,
        trialNote: "3 days free for eligible new customers. Then billed monthly. Cancel anytime in the billing portal.",
        blikNote: "One-time for 30 days. No trial, no stored card, no auto-renewal.",
        blikPay: "Pay with",
        blikOpening: "Opening BLIK…",
        subtitle: "Choose your plan. The same account and plan work on the website and in the Lectoro extension.",
        googleSignInNote: "After choosing a plan, sign in with Google to link your purchase to your Lectoro account.",
        unlimited: "Unlimited",
        trialKicker: "3-day free trial*",
        translations: "translations",
        aiRequests: "AI requests / month",
        flashcards: "SRS flashcards",
        ankiExports: "Anki / Excel exports",
        naturalAiVoices: "Natural AI voices",
        unlimitedPractice: "Unlimited practice",
        ttsMonthly: (c) => `${c} AI TTS chars / mo`,
        systemVoice: "System voice",
        signingIn: "Signing in…",
        prevPlan: "Previous plan",
        nextPlan: "Next plan",
    },
    de: {
        checkoutFailed: "Zahlung fehlgeschlagen. Bitte versuche es erneut.",
        openingCheckout: "Kasse wird geöffnet…",
        chooseSubscription: (p) => `Wähle ${p.toUpperCase()} — Abo`,
        trialNote: "3 Tage kostenlos für berechtigte Neukunden. Danach monatliche Abrechnung. Jederzeit im Abrechnungsportal kündbar.",
        blikNote: "Einmalig für 30 Tage. Ohne Probezeitraum, gespeicherte Karte und automatische Verlängerung.",
        blikPay: "Bezahlen mit",
        blikOpening: "BLIK wird geöffnet…",
        subtitle: "Wähle dein Abo. Derselbe Account und Plan funktionieren auf der Website und in der Lectoro-Erweiterung.",
        googleSignInNote: "Nach der Planauswahl meldest du dich mit Google an, um den Kauf mit deinem Lectoro-Konto zu verknüpfen.",
        unlimited: "Unbegrenzt",
        trialKicker: "3 Tage kostenloser Test*",
        translations: "Übersetzungen",
        aiRequests: "KI-Anfragen / Monat",
        flashcards: "SRS-Karteikarten",
        ankiExports: "Anki- / Excel-Exporte",
        naturalAiVoices: "Natürliche KI-Stimmen",
        unlimitedPractice: "Unbegrenzte Wiederholungen",
        ttsMonthly: (c) => `${c} AI TTS Zeichen / Mon.`,
        systemVoice: "Systemstimme",
        signingIn: "Anmelden…",
        prevPlan: "Vorheriger Plan",
        nextPlan: "Nächster Plan",
    },
    es: {
        checkoutFailed: "Error en el pago. Por favor, inténtalo de nuevo.",
        openingCheckout: "Abriendo pasarela de pago…",
        chooseSubscription: (p) => `Elegir ${p.toUpperCase()} — suscripción`,
        trialNote: "3 días gratis para nuevos clientes elegibles. Luego facturación mensual. Cancela cuando quieras en el portal.",
        blikNote: "Pago único por 30 días. Sin periodo de prueba, sin tarjeta guardada ni renovación automática.",
        blikPay: "Pagar con",
        blikOpening: "Abriendo BLIK…",
        subtitle: "Elige tu plan. La misma cuenta y plan funcionan en el sitio web y en la extensión Lectoro.",
        googleSignInNote: "Después de elegir un plan, inicia sesión con Google para vincular la compra a tu cuenta de Lectoro.",
        unlimited: "Ilimitado",
        trialKicker: "3 días de prueba gratis*",
        translations: "traducciones",
        aiRequests: "peticiones de IA / mes",
        flashcards: "tarjetas SRS",
        ankiExports: "exportaciones Anki / Excel",
        naturalAiVoices: "Voces de IA naturales",
        unlimitedPractice: "Repasos ilimitados",
        ttsMonthly: (c) => `${c} caracteres AI TTS / mes`,
        systemVoice: "Voz del sistema",
        signingIn: "Iniciando sesión…",
        prevPlan: "Plan anterior",
        nextPlan: "Siguiente plan",
    },
    fr: {
        checkoutFailed: "Échec du paiement. Veuillez réessayer.",
        openingCheckout: "Ouverture du paiement…",
        chooseSubscription: (p) => `Choisir ${p.toUpperCase()} — abonnement`,
        trialNote: "3 jours gratuits pour les nouveaux clients éligibles. Facturation mensuelle ensuite. Annulable à tout moment.",
        blikNote: "Paiement unique pour 30 jours. Sans période d'essai, sans carte enregistrée et sans renouvellement.",
        blikPay: "Payer avec",
        blikOpening: "Ouverture de BLIK…",
        subtitle: "Choisissez votre forfait. Le même compte fonctionne sur le site web et dans l'extension Lectoro.",
        googleSignInNote: "Après avoir choisi un plan, connectez-vous avec Google pour lier votre achat à votre compte Lectoro.",
        unlimited: "Illimité",
        trialKicker: "Essai gratuit de 3 jours*",
        translations: "traductions",
        aiRequests: "requêtes IA / mois",
        flashcards: "flashcards SRS",
        ankiExports: "exports Anki / Excel",
        naturalAiVoices: "Voix IA naturelles",
        unlimitedPractice: "Révisions illimitées",
        ttsMonthly: (c) => `${c} car. AI TTS / mois`,
        systemVoice: "Voix système",
        signingIn: "Connexion…",
        prevPlan: "Plan précédent",
        nextPlan: "Plan suivant",
    },
    it: {
        checkoutFailed: "Pagamento non riuscito. Riprova.",
        openingCheckout: "Apertura pagamento…",
        chooseSubscription: (p) => `Scegli ${p.toUpperCase()} — abbonamento`,
        trialNote: "3 giorni gratuiti per i nuovi clienti idonei. Poi fatturazione mensile. Disdici in qualsiasi momento.",
        blikNote: "Pagamento unico per 30 giorni. Nessun periodo di prova, nessuna carta memorizzata né rinnovo automatico.",
        blikPay: "Paga con",
        blikOpening: "Apertura BLIK…",
        subtitle: "Scegli il tuo piano. Lo stesso account funziona sia sul sito web che nell'estensione Lectoro.",
        googleSignInNote: "Dopo aver scelto un piano, accedi con Google per collegare l'acquisto al tuo account Lectoro.",
        unlimited: "Illimitato",
        trialKicker: "Prova gratuita di 3 giorni*",
        translations: "traduzioni",
        aiRequests: "richieste IA / mese",
        flashcards: "flashcard SRS",
        ankiExports: "esportazioni Anki / Excel",
        naturalAiVoices: "Voci IA naturali",
        unlimitedPractice: "Ripasso illimitato",
        ttsMonthly: (c) => `${c} car. AI TTS / mese`,
        systemVoice: "Voce di sistema",
        signingIn: "Accesso in corso…",
        prevPlan: "Piano precedente",
        nextPlan: "Piano successivo",
    },
    cs: {
        checkoutFailed: "Platba se nezdařila. Zkuste to prosím znovu.",
        openingCheckout: "Otevírání pokladny…",
        chooseSubscription: (p) => `Vybrat ${p.toUpperCase()} — předplatné`,
        trialNote: "3 dny zdarma pro oprávněné nové zákazníky. Poté měsíční platba. Zrušte kdykoliv v portálu plateb.",
        blikNote: "Jednorázově na 30 dní. Bez zkušebního období, ukládání karty a automatického prodlužování.",
        blikPay: "Zaplatit přes",
        blikOpening: "Otevírání BLIK…",
        subtitle: "Vyberte si předplatné. Stejný účet a plán fungují na webu i v rozšíření Lectoro.",
        googleSignInNote: "Po výběru plánu se přihlaste přes Google pro propojení nákupu s účtem Lectoro.",
        unlimited: "Bez limitu",
        trialKicker: "3 dny zkušební verze zdarma*",
        translations: "překladů",
        aiRequests: "AI dotazů / měsíc",
        flashcards: "SRS kartiček",
        ankiExports: "export do Anki / Excelu",
        naturalAiVoices: "Přirozené AI hlasy",
        unlimitedPractice: "Neomezené opakování",
        ttsMonthly: (c) => `${c} znaků AI TTS / měs.`,
        systemVoice: "Systémový hlas",
        signingIn: "Přihlašování…",
        prevPlan: "Předchozí plán",
        nextPlan: "Další plán",
    },
    nl: {
        checkoutFailed: "Betaling mislukt. Probeer het opnieuw.",
        openingCheckout: "Afrekenen openen…",
        chooseSubscription: (p) => `Kies ${p.toUpperCase()} — abonnement`,
        trialNote: "3 dagen gratis voor in aanmerking komende nieuwe klanten. Daarna maandelijks gefactureerd. Annuleer op elk moment.",
        blikNote: "Eenmalig voor 30 dagen. Zonder proefperiode, opgeslagen kaart of automatische verlenging.",
        blikPay: "Betalen met",
        blikOpening: "BLIK openen…",
        subtitle: "Kies je abonnement. Hetzelfde account en abonnement werken op de website en in de Lectoro-extensie.",
        googleSignInNote: "Log na het kiezen van een plan in met Google om je aankoop aan je Lectoro-account te koppelen.",
        unlimited: "Onbeperkt",
        trialKicker: "3 dagen gratis proefperiode*",
        translations: "vertalingen",
        aiRequests: "AI-verzoeken / maand",
        flashcards: "SRS-flitskaarten",
        ankiExports: "Anki- / Excel-exports",
        naturalAiVoices: "Natuurlijke AI-stemmen",
        unlimitedPractice: "Onbeperkt oefenen",
        ttsMonthly: (c) => `${c} AI TTS-tekens / mnd`,
        systemVoice: "Systeemstem",
        signingIn: "Inloggen…",
        prevPlan: "Vorig plan",
        nextPlan: "Volgend plan",
    },
    pt: {
        checkoutFailed: "Falha no pagamento. Por favor, tente novamente.",
        openingCheckout: "Abrindo pagamento…",
        chooseSubscription: (p) => `Escolher ${p.toUpperCase()} — assinatura`,
        trialNote: "3 dias grátis para novos clientes elegíveis. Depois cobrança mensal. Cancele quando quiser no portal.",
        blikNote: "Pagamento único por 30 dias. Sem período de teste, sem cartão salvo e sem renovação automática.",
        blikPay: "Pagar com",
        blikOpening: "Abrindo BLIK…",
        subtitle: "Escolha seu plano. A mesma conta e plano funcionam no site e na extensão Lectoro.",
        googleSignInNote: "Após escolher um plano, faça login com o Google para vincular sua compra à conta do Lectoro.",
        unlimited: "Ilimitado",
        trialKicker: "Teste grátis de 3 dias*",
        translations: "traduções",
        aiRequests: "pedidos de IA / mês",
        flashcards: "flashcards SRS",
        ankiExports: "exportações Anki / Excel",
        naturalAiVoices: "Vozes de IA naturais",
        unlimitedPractice: "Revisões ilimitadas",
        ttsMonthly: (c) => `${c} car. AI TTS / mês`,
        systemVoice: "Voz do sistema",
        signingIn: "Entrando…",
        prevPlan: "Plano anterior",
        nextPlan: "Próximo plano",
    },
    ja: {
        checkoutFailed: "決済に失敗しました。もう一度お試しください。",
        openingCheckout: "決済画面を開いています…",
        chooseSubscription: (p) => `${p.toUpperCase()} を選択 — サブスクリプション`,
        trialNote: "対象の新規ユーザーは3日間無料。その後は月額課金。ポータルからいつでも解約可能。",
        blikNote: "30日間の1回払い。トライアルなし、カード登録なし、自動更新なし。",
        blikPay: "で支払う",
        blikOpening: "BLIKを開いています…",
        subtitle: "プランを選択してください。同じアカウントとプランがウェブサイトとLectoro拡張機能で使えます。",
        googleSignInNote: "プランを選択後、Googleでログインして購入をLectoroアカウントに連携します。",
        unlimited: "無制限",
        trialKicker: "3日間無料トライアル*",
        translations: "翻訳",
        aiRequests: "AIリクエスト / 月",
        flashcards: "SRSフラッシュカード",
        ankiExports: "Anki / Excel エクスポート",
        naturalAiVoices: "自然なAI音声",
        unlimitedPractice: "無制限の復習",
        ttsMonthly: (c) => `${c} 文字 AI TTS / 月`,
        systemVoice: "システム音声",
        signingIn: "ログイン中…",
        prevPlan: "前のプラン",
        nextPlan: "次のプラン",
    },
    ko: {
        checkoutFailed: "결제에 실패했습니다. 다시 시도해 주세요.",
        openingCheckout: "결제 화면을 여는 중…",
        chooseSubscription: (p) => `${p.toUpperCase()} 선택 — 구독`,
        trialNote: "자격 요건을 갖춘 신규 고객에게 3일 무료 체험 제공. 이후 매월 결제. 청구 포털에서 언제든 해지 가능.",
        blikNote: "30일 1회 결제. 체험 기간 없음, 카드 저장 없음, 자동 갱신 없음.",
        blikPay: "결제",
        blikOpening: "BLIK 여는 중…",
        subtitle: "플랜을 선택하세요. 동일한 계정과 플랜이 웹사이트와 Lectoro 확장 프로그램에서 모두 작동합니다.",
        googleSignInNote: "플랜 선택 후 Google로 로그인하여 구매 내역을 Lectoro 계정에 연결하세요.",
        unlimited: "무제한",
        trialKicker: "3일 무료 체험*",
        translations: "번역",
        aiRequests: "AI 요청 / 월",
        flashcards: "SRS 플래시카드",
        ankiExports: "Anki / Excel 내보내기",
        naturalAiVoices: "자연스러운 AI 음성",
        unlimitedPractice: "무제한 복습",
        ttsMonthly: (c) => `${c}자 AI TTS / 월`,
        systemVoice: "시스템 음성",
        signingIn: "로그인 중…",
        prevPlan: "이전 플랜",
        nextPlan: "다음 플랜",
    },
};

interface PricingProps {
    dict: Dict;
    locale?: Locale;
}

export default function Pricing({ dict, locale }: PricingProps) {
    const { pricing } = dict;
    const language = (locale || dict.locale) as Locale;
    const pc = PRICING_COPY[language] || PRICING_COPY.en;
    const isPl = language === "pl";
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
            setError(cause instanceof Error ? cause.message : pc.checkoutFailed);
        } finally { inFlight.current = false; setPending(null); }
    }, [language, pc.checkoutFailed]);

    useEffect(() => {
        if (!user || inFlight.current) return;
        try {
            const saved = sessionStorage.getItem("lectoro-purchase");
            if (!saved) return;
            const intent = JSON.parse(saved);
            sessionStorage.removeItem("lectoro-purchase");
            if (Date.now() - intent.createdAt < 15 * 60 * 1000 && ["basic", "pro", undefined].includes(intent.plan) && ["subscription", "blik"].includes(intent.paymentMode)) {
                const timer = setTimeout(() => {
                    void checkout(intent.plan, intent.paymentMode);
                }, 0);
                return () => clearTimeout(timer);
            }
        } catch { sessionStorage.removeItem("lectoro-purchase"); }
    }, [user, checkout]);

    const signInLabel = (
        <>
            <svg aria-hidden="true" width="18" height="18" className="size-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{dict.nav.signIn}</span>
        </>
    );

    const actions = (plan: PaidPlan) => (
        <div className="subscription-plan-action">
            <button
                type="button"
                disabled={!!pending}
                onClick={() => void checkout(plan)}
                className="subscription-plan-button is-trial"
            >
                {pending === `${plan}:subscription`
                    ? pc.openingCheckout
                    : !user
                    ? signInLabel
                    : pc.chooseSubscription(plan)}
            </button>
            <p className="subscription-trial-note">{pc.trialNote}</p>
            {isPl && (
                <div className="subscription-blik-option">
                    <button
                        type="button"
                        disabled={!!pending}
                        onClick={() => void checkout(plan, "blik")}
                        aria-label={user ? `${pc.blikPay} BLIK — ${BILLING_PLANS[plan].blikPln.toFixed(2).replace(".", ",")} zł` : dict.nav.signIn}
                        className="subscription-plan-button is-blik"
                    >
                        {pending === `${plan}:blik` ? (
                            pc.blikOpening
                        ) : !user ? (
                            signInLabel
                        ) : (
                            <>
                                <span>{pc.blikPay}</span>
                                <Image src="/blik.svg" alt="BLIK" width={48} height={25} className="blik-logo inline-block" />
                                <span>· {BILLING_PLANS[plan].blikPln.toFixed(2).replace(".", ",")} zł</span>
                            </>
                        )}
                    </button>
                    <p className="subscription-trial-note">{pc.blikNote}</p>
                </div>
            )}
        </div>
    );

    return (
        <section
            className="lectoro-pricing py-14 sm:py-20 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="pricing"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {pricing.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {pricing.title}
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        {pc.subtitle}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mb-8 text-center space-y-3">
                    {!user && <p className="text-sm text-slate-300">{pc.googleSignInNote}</p>}

                    {error && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}
                </div>
                <div ref={plansRef} className="subscription-plans-grid max-w-6xl mx-auto" aria-label={pricing.title} aria-busy={!!pending}>
                    {(["free", "basic", "pro"] as const).map((plan) => {
                        const paid = plan !== "free";
                        const limits = paid ? BILLING_PLANS[plan] : { cards: 25, ai: 15, voiceCharacters: 0 };
                        const count = (value: number) => Number.isFinite(value) ? value.toLocaleString(language) : pc.unlimited;
                        return (
                            <article key={plan} className={`subscription-plan-card ${plan === "basic" ? "is-recommended" : ""} ${paid ? "has-trial-offer" : ""}`}>
                                <div className="subscription-plan-topline">
                                    <strong>{pricing[plan].name}</strong>
                                    {plan === "basic" && <span className="subscription-plan-badge">{pricing.mostPopular}</span>}
                                </div>
                                {paid && <div className="subscription-plan-trial-kicker">{pc.trialKicker}</div>}
                                <div className="subscription-plan-price">
                                    <b>{localizedPricing.plans[plan].formatted}</b>
                                    <span>{plan === "free" ? pricing.free.forever : pricing[plan].mo}</span>
                                </div>
                                <div className="subscription-plan-features">
                                    <span><i aria-hidden="true">✓</i><span><b>{pc.unlimited}</b> {pc.translations}</span></span>
                                    <span><i aria-hidden="true">✓</i><span><b>{count(limits.ai)}</b> {pc.aiRequests}</span></span>
                                    <span><i aria-hidden="true">✓</i><span><b>{count(limits.cards)}</b> {pc.flashcards}</span></span>
                                    <span><i aria-hidden="true">✓</i><span><b>{paid ? pc.unlimited : "3 / mo"}</b> {pc.ankiExports}</span></span>
                                    {paid && (
                                        <>
                                            <span><i aria-hidden="true">✓</i><b>{pc.naturalAiVoices}</b></span>
                                            <span><i aria-hidden="true">✓</i><b>{pc.unlimitedPractice}</b></span>
                                        </>
                                    )}
                                    <span className={paid ? "" : "is-muted"}>
                                        <i aria-hidden="true">{paid ? "✓" : "—"}</i>
                                        {paid ? pc.ttsMonthly(count(limits.voiceCharacters)) : pc.systemVoice}
                                    </span>
                                </div>
                                {paid ? (
                                    actions(plan)
                                ) : (
                                    <div className="subscription-plan-action">
                                        {!user ? (
                                            <button
                                                type="button"
                                                disabled={!!pending}
                                                className="subscription-plan-button is-secondary"
                                                onClick={async () => {
                                                    setPending("free");
                                                    setError("");
                                                    try {
                                                        await loginWithGoogle();
                                                    } catch (cause) {
                                                        setError(cause instanceof Error ? cause.message : "Sign in failed");
                                                    } finally {
                                                        setPending(null);
                                                    }
                                                }}
                                            >
                                                {pending === "free" ? pc.signingIn : signInLabel}
                                            </button>
                                        ) : (
                                            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="subscription-plan-button is-secondary">
                                                {pricing.free.cta}
                                            </a>
                                        )}
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
                <div className="pricing-nav">
                    <button type="button" aria-label={pc.prevPlan} onClick={() => plansRef.current?.scrollBy({ left: -(plansRef.current?.clientWidth || 300) * 0.9, behavior: "smooth" })}>←</button>
                    <button type="button" aria-label={pc.nextPlan} onClick={() => plansRef.current?.scrollBy({ left: (plansRef.current?.clientWidth || 300) * 0.9, behavior: "smooth" })}>→</button>
                </div>
            </div>
        </section>
    );
}
