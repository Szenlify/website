"use client";

import "./pricing.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, loginWithGoogle } from "@/lib/firebase";
import { BILLING_PLANS, getBillingUrl, type PaidPlan, type PaymentMode } from "@/lib/billing";
import type { Dict, Locale } from "@/lib/i18n/types";
import { getLocalizedPricing } from "@/lib/pricing";
import { CHROME_STORE_URL } from "@/lib/config";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface PricingCopy {
    checkoutFailed: string;
    openingCheckout: string;
    chooseSubscription: (plan: string) => string;
    trialNoteHtml: (price: string) => string;
    blikNote: string;
    blikPayLead: string;
    blikOpening: string;
    subtitle: string;
    googleSignInNote: string;
    unlimited: string;
    trialKicker: string;
    startTrial: string;
    planNames: {
        free: string;
        basic: string;
        pro: string;
    };
    badgePopular: string;
    priceForever: string;
    pricePerMonth: string;
    featureTranslate: string;
    featureAiUses: string;
    featureAiUsesMo: string;
    featureSrs: string;
    featureExport: string;
    featureNaturalVoices: string;
    featureUnlimitedPractice: string;
    geminiVoices: string;
    basicVoice: string;
    signingIn: string;
    prevPlan: string;
    nextPlan: string;
}

const PRICING_COPY: Record<Locale, PricingCopy> = {
    pl: {
        checkoutFailed: "Błąd płatności. Spróbuj ponownie.",
        openingCheckout: "Otwieranie płatności…",
        chooseSubscription: (p) => `Wybierz ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>0 zł dzisiaj</b> · potem ${price}/mies.<br>Anuluj w dowolnym momencie.`,
        blikNote: "30 dni · Jednorazowo · Bez karty i automatycznego odnowienia",
        blikPayLead: "Płać z",
        blikOpening: "Otwieranie BLIK…",
        subtitle: "Wybierz subskrypcję lub kup 30 dni dostępu przez BLIK. Ten sam plan działa na stronie i w rozszerzeniu Lectoro.",
        googleSignInNote: "Po wybraniu planu zalogujesz się przez Google, aby przypisać zakup do konta Lectoro.",
        unlimited: "Nielimitowane",
        trialKicker: "3 dni za darmo",
        startTrial: "3-dniowy okres próbny",
        planNames: {
            free: "PLAN DARMOWY",
            basic: "PLAN BASIC",
            pro: "PLAN PRO",
        },
        badgePopular: "Popularny",
        priceForever: "na zawsze",
        pricePerMonth: "/ miesiąc",
        featureTranslate: "tłumaczenia",
        featureAiUses: "użyć AI",
        featureAiUsesMo: "użyć AI / mies.",
        featureSrs: "fiszki SRS",
        featureExport: "eksport do Anki i Excela",
        featureNaturalVoices: "Naturalne głosy",
        featureUnlimitedPractice: "Nielimitowane ćwiczenia AI",
        geminiVoices: "Naturalne głosy",
        basicVoice: "Głos podstawowy",
        signingIn: "Logowanie…",
        prevPlan: "Poprzedni plan",
        nextPlan: "Następny plan",
    },
    en: {
        checkoutFailed: "Checkout failed. Please try again.",
        openingCheckout: "Opening checkout…",
        chooseSubscription: (p) => `Choose ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>$0 today</b> · then ${price}/mo.<br>Cancel anytime.`,
        blikNote: "30 days · One-time · No card & no auto-renewal",
        blikPayLead: "Pay with",
        blikOpening: "Opening BLIK…",
        subtitle: "Choose your plan. The same account and plan work on the website and in the Lectoro extension.",
        googleSignInNote: "After choosing a plan, sign in with Google to link your purchase to your Lectoro account.",
        unlimited: "Unlimited",
        trialKicker: "3 days free",
        startTrial: "Start 3-day trial",
        planNames: {
            free: "FREE PLAN",
            basic: "BASIC PLAN",
            pro: "PRO PLAN",
        },
        badgePopular: "Popular",
        priceForever: "forever",
        pricePerMonth: "/ month",
        featureTranslate: "translate",
        featureAiUses: "AI uses",
        featureAiUsesMo: "AI uses / mo",
        featureSrs: "SRS flashcards",
        featureExport: "Anki & Excel export",
        featureNaturalVoices: "Natural voices",
        featureUnlimitedPractice: "Unlimited AI practice",
        geminiVoices: "Gemini voices",
        basicVoice: "Basic voice",
        signingIn: "Signing in…",
        prevPlan: "Previous plan",
        nextPlan: "Next plan",
    },
    de: {
        checkoutFailed: "Zahlung fehlgeschlagen. Bitte versuche es erneut.",
        openingCheckout: "Kasse wird geöffnet…",
        chooseSubscription: (p) => `${p.toUpperCase()} wählen`,
        trialNoteHtml: (price) => `<b>0 € heute</b> · danach ${price}/Monat<br>Jederzeit kündbar.`,
        blikNote: "30 Tage · Einmalig · Ohne automatische Verlängerung",
        blikPayLead: "Bezahlen mit",
        blikOpening: "BLIK wird geöffnet…",
        subtitle: "Wähle dein Abo. Derselbe Account und Plan funktionieren auf der Website und in der Lectoro-Erweiterung.",
        googleSignInNote: "Nach der Planauswahl meldest du dich mit Google an, um den Kauf mit deinem Lectoro-Konto zu verknüpfen.",
        unlimited: "Unbegrenzt",
        trialKicker: "3 Tage kostenlos",
        startTrial: "3-Tage-Testversion starten",
        planNames: {
            free: "KOSTENLOSER PLAN",
            basic: "BASIC-PLAN",
            pro: "PRO-PLAN",
        },
        badgePopular: "Beliebt",
        priceForever: "dauerhaft",
        pricePerMonth: "/ Monat",
        featureTranslate: "Übersetzung",
        featureAiUses: "KI-Nutzungen",
        featureAiUsesMo: "KI-Nutzungen / Monat",
        featureSrs: "SRS-Karteikarten",
        featureExport: "Anki- & Excel-Export",
        featureNaturalVoices: "Natürliche Stimmen",
        featureUnlimitedPractice: "Unbegrenztes KI-Training",
        geminiVoices: "Natürliche Stimmen",
        basicVoice: "Systemstimme",
        signingIn: "Anmelden…",
        prevPlan: "Vorheriger Plan",
        nextPlan: "Nächster Plan",
    },
    es: {
        checkoutFailed: "Error en el pago. Por favor, inténtalo de nuevo.",
        openingCheckout: "Abriendo pasarela de pago…",
        chooseSubscription: (p) => `Elegir ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>0 € hoy</b> · luego ${price}/mes<br>Cancela en cualquier momento.`,
        blikNote: "30 días · Pago único · Sin renovación automática",
        blikPayLead: "Pagar con",
        blikOpening: "Abriendo BLIK…",
        subtitle: "Elige tu plan. La misma cuenta y plan funcionan en el sitio web y en la extensión Lectoro.",
        googleSignInNote: "Después de elegir un plan, inicia sesión con Google para vincular la compra a tu cuenta de Lectoro.",
        unlimited: "Ilimitado",
        trialKicker: "3 días gratis",
        startTrial: "Iniciar prueba de 3 días",
        planNames: {
            free: "PLAN GRATUITO",
            basic: "PLAN BASIC",
            pro: "PLAN PRO",
        },
        badgePopular: "Popular",
        priceForever: "para siempre",
        pricePerMonth: "/ mes",
        featureTranslate: "traducción",
        featureAiUses: "usos de IA",
        featureAiUsesMo: "usos de IA / mes",
        featureSrs: "tarjetas SRS",
        featureExport: "exportación Anki y Excel",
        featureNaturalVoices: "Voces naturales",
        featureUnlimitedPractice: "Práctica ilimitada con IA",
        geminiVoices: "Voces naturales",
        basicVoice: "Voz del sistema",
        signingIn: "Iniciando sesión…",
        prevPlan: "Plan anterior",
        nextPlan: "Siguiente plan",
    },
    fr: {
        checkoutFailed: "Échec du paiement. Veuillez réessayer.",
        openingCheckout: "Ouverture du paiement…",
        chooseSubscription: (p) => `Choisir ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>0 € aujourd'hui</b> · puis ${price}/mois<br>Annulez à tout moment.`,
        blikNote: "30 jours · Paiement unique · Sans renouvellement",
        blikPayLead: "Payer avec",
        blikOpening: "Ouverture de BLIK…",
        subtitle: "Choisissez votre forfait. Le même compte fonctionne sur le site web et dans l'extension Lectoro.",
        googleSignInNote: "Après avoir choisi un plan, connectez-vous avec Google pour lier votre achat à votre compte Lectoro.",
        unlimited: "Illimité",
        trialKicker: "3 jours gratuits",
        startTrial: "Essai gratuit de 3 jours",
        planNames: {
            free: "FORFAIT GRATUIT",
            basic: "FORFAIT BASIC",
            pro: "FORFAIT PRO",
        },
        badgePopular: "Populaire",
        priceForever: "pour toujours",
        pricePerMonth: "/ mois",
        featureTranslate: "traduction",
        featureAiUses: "utilisations IA",
        featureAiUsesMo: "utilisations IA / mois",
        featureSrs: "cartes SRS",
        featureExport: "export Anki & Excel",
        featureNaturalVoices: "Voix naturelles",
        featureUnlimitedPractice: "Entraînement IA illimité",
        geminiVoices: "Voix naturelles",
        basicVoice: "Voix standard",
        signingIn: "Connexion…",
        prevPlan: "Plan précédent",
        nextPlan: "Plan suivant",
    },
    it: {
        checkoutFailed: "Pagamento non riuscito. Riprova.",
        openingCheckout: "Apertura pagamento…",
        chooseSubscription: (p) => `Scegli ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>0 € oggi</b> · poi ${price}/mese<br>Disdici in qualsiasi momento.`,
        blikNote: "30 giorni · Pagamento unico · Nessun rinnovo automatico",
        blikPayLead: "Paga con",
        blikOpening: "Apertura BLIK…",
        subtitle: "Scegli il tuo piano. Lo stesso account funziona sia sul sito web che nell'estensione Lectoro.",
        googleSignInNote: "Dopo aver scelto un piano, accedi con Google per collegare l'acquisto al tuo account Lectoro.",
        unlimited: "Illimitato",
        trialKicker: "3 giorni gratis",
        startTrial: "Inizia prova di 3 giorni",
        planNames: {
            free: "PIANO GRATUITO",
            basic: "PIANO BASIC",
            pro: "PIANO PRO",
        },
        badgePopular: "Popolare",
        priceForever: "per sempre",
        pricePerMonth: "/ mese",
        featureTranslate: "traduzione",
        featureAiUses: "utilizzi IA",
        featureAiUsesMo: "utilizzi IA / mese",
        featureSrs: "flashcard SRS",
        featureExport: "esportazione Anki ed Excel",
        featureNaturalVoices: "Voci naturali",
        featureUnlimitedPractice: "Pratica IA illimitata",
        geminiVoices: "Voci naturali",
        basicVoice: "Voce standard",
        signingIn: "Accesso in corso…",
        prevPlan: "Piano precedente",
        nextPlan: "Piano successivo",
    },
    cs: {
        checkoutFailed: "Platba se nezdařila. Zkuste to prosím znovu.",
        openingCheckout: "Otevírání pokladny…",
        chooseSubscription: (p) => `Vybrat ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>0 Kč dnes</b> · poté ${price}/měs.<br>Zrušení kdykoliv.`,
        blikNote: "30 dní · Jednorázově · Bez automatického prodlužování",
        blikPayLead: "Zaplatit přes",
        blikOpening: "Otevírání BLIK…",
        subtitle: "Vyberte si předplatné. Stejný účet a plán fungují na webu i v rozšíření Lectoro.",
        googleSignInNote: "Po výběru plánu se přihlaste přes Google pro propojení nákupu s účtem Lectoro.",
        unlimited: "Bez limitu",
        trialKicker: "3 dny zdarma",
        startTrial: "Spustit 3denní zkušební verzi",
        planNames: {
            free: "PLÁN ZDARMA",
            basic: "PLÁN BASIC",
            pro: "PLÁN PRO",
        },
        badgePopular: "Oblíbený",
        priceForever: "napořád",
        pricePerMonth: "/ měsíc",
        featureTranslate: "překlad",
        featureAiUses: "využití AI",
        featureAiUsesMo: "využití AI / měsíc",
        featureSrs: "SRS kartičky",
        featureExport: "export do Anki a Excelu",
        featureNaturalVoices: "Přirozené hlasy",
        featureUnlimitedPractice: "Neomezené procvičování AI",
        geminiVoices: "Přirozené hlasy",
        basicVoice: "Základní hlas",
        signingIn: "Přihlašování…",
        prevPlan: "Předchozí plán",
        nextPlan: "Další plán",
    },
    nl: {
        checkoutFailed: "Betaling mislukt. Probeer het opnieuw.",
        openingCheckout: "Afrekenen openen…",
        chooseSubscription: (p) => `Kies ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>0 € vandaag</b> · daarna ${price}/mnd<br>Altijd opzegbaar.`,
        blikNote: "30 dagen · Eenmalig · Zonder automatische verlenging",
        blikPayLead: "Betalen met",
        blikOpening: "BLIK openen…",
        subtitle: "Kies je abonnement. Hetzelfde account en abonnement werken op de website en in de Lectoro-extensie.",
        googleSignInNote: "Log na het kiezen van een plan in met Google om je aankoop aan je Lectoro-account te koppelen.",
        unlimited: "Onbeperkt",
        trialKicker: "3 dagen gratis",
        startTrial: "Start 3 dagen proefversie",
        planNames: {
            free: "GRATIS ABONNEMENT",
            basic: "BASIC ABONNEMENT",
            pro: "PRO ABONNEMENT",
        },
        badgePopular: "Populair",
        priceForever: "voor altijd",
        pricePerMonth: "/ maand",
        featureTranslate: "vertaling",
        featureAiUses: "AI-gebruik",
        featureAiUsesMo: "AI-gebruik / maand",
        featureSrs: "SRS-flitskaarten",
        featureExport: "Anki- & Excel-export",
        featureNaturalVoices: "Natuurlijke stemmen",
        featureUnlimitedPractice: "Onbeperkt oefenen met AI",
        geminiVoices: "Natuurlijke stemmen",
        basicVoice: "Standaard stem",
        signingIn: "Inloggen…",
        prevPlan: "Vorig plan",
        nextPlan: "Volgend plan",
    },
    pt: {
        checkoutFailed: "Falha no pagamento. Por favor, tente novamente.",
        openingCheckout: "Abrindo pagamento…",
        chooseSubscription: (p) => `Escolher ${p.toUpperCase()}`,
        trialNoteHtml: (price) => `<b>R$ 0 hoje</b> · depois ${price}/mês<br>Cancele quando quiser.`,
        blikNote: "30 dias · Pagamento único · Sem renovação automática",
        blikPayLead: "Pagar com",
        blikOpening: "Abrindo BLIK…",
        subtitle: "Escolha seu plano. A mesma conta e plano funcionam no site e na extensão Lectoro.",
        googleSignInNote: "Após escolher um plan, faça login com o Google para vincular sua compra à conta do Lectoro.",
        unlimited: "Ilimitado",
        trialKicker: "3 dias grátis",
        startTrial: "Iniciar teste de 3 dias",
        planNames: {
            free: "PLANO GRATUITO",
            basic: "PLANO BASIC",
            pro: "PLANO PRO",
        },
        badgePopular: "Popular",
        priceForever: "para sempre",
        pricePerMonth: "/ mês",
        featureTranslate: "tradução",
        featureAiUses: "usos de IA",
        featureAiUsesMo: "usos de IA / mês",
        featureSrs: "flashcards SRS",
        featureExport: "exportação Anki & Excel",
        featureNaturalVoices: "Vozes naturais",
        featureUnlimitedPractice: "Prática ilimitada de IA",
        geminiVoices: "Vozes naturais",
        basicVoice: "Voz do sistema",
        signingIn: "Entrando…",
        prevPlan: "Plano anterior",
        nextPlan: "Próximo plano",
    },
    ja: {
        checkoutFailed: "決済に失敗しました。もう一度お試しください。",
        openingCheckout: "決済画面を開いています…",
        chooseSubscription: (p) => `${p.toUpperCase()} を選択`,
        trialNoteHtml: (price) => `<b>本日は¥0</b> · 以降 ${price}/月<br>いつでもキャンセル可能。`,
        blikNote: "30日間の1回払い · 自動更新なし",
        blikPayLead: "で支払う",
        blikOpening: "BLIKを開いています…",
        subtitle: "プランを選択してください。同じアカウントとプランがウェブサイトとLectoro拡張機能で使えます。",
        googleSignInNote: "プランを選択後、Googleでログインして購入をLectoroアカウントに連携します。",
        unlimited: "無制限",
        trialKicker: "3日間無料",
        startTrial: "3日間無料体験を開始",
        planNames: {
            free: "無料プラン",
            basic: "BASIC プラン",
            pro: "PRO プラン",
        },
        badgePopular: "人気",
        priceForever: "永久無料",
        pricePerMonth: "/ 月",
        featureTranslate: "翻訳",
        featureAiUses: "AI利用回数",
        featureAiUsesMo: "AI利用回数 / 月",
        featureSrs: "SRS単語カード",
        featureExport: "Anki & Excelエクスポート",
        featureNaturalVoices: "自然な音声",
        featureUnlimitedPractice: "無制限のAI学習",
        geminiVoices: "自然な音声",
        basicVoice: "基本音声",
        signingIn: "ログイン中…",
        prevPlan: "前のプラン",
        nextPlan: "次のプラン",
    },
    ko: {
        checkoutFailed: "결제에 실패했습니다. 다시 시도해 주세요.",
        openingCheckout: "결제 화면을 여는 중…",
        chooseSubscription: (p) => `${p.toUpperCase()} 선택`,
        trialNoteHtml: (price) => `<b>오늘 ₩0</b> · 이후 ${price}/월<br>언제든 취소 가능.`,
        blikNote: "30일 1회 결제 · 자동 갱신 없음",
        blikPayLead: "결제",
        blikOpening: "BLIK 여는 중…",
        subtitle: "플랜을 선택하세요. 동일한 계정과 플랜이 웹사이트와 Lectoro 확장 프로그램에서 모두 작동합니다.",
        googleSignInNote: "플랜 선택 후 Google로 로그인하여 구매 내역을 Lectoro 계정에 연결하세요.",
        unlimited: "무제한",
        trialKicker: "3일 무료",
        startTrial: "3일 무료 체험 시작",
        planNames: {
            free: "무료 플랜",
            basic: "BASIC 플랜",
            pro: "PRO 플랜",
        },
        badgePopular: "인기",
        priceForever: "평생 무료",
        pricePerMonth: "/ 월",
        featureTranslate: "번역",
        featureAiUses: "AI 이용",
        featureAiUsesMo: "AI 이용 / 월",
        featureSrs: "SRS 단어장",
        featureExport: "Anki & Excel 내보내기",
        featureNaturalVoices: "자연스러운 음성",
        featureUnlimitedPractice: "무제한 AI 학습",
        geminiVoices: "자연스러운 음성",
        basicVoice: "기본 음성",
        signingIn: "로그인 중…",
        prevPlan: "이전 플랜",
        nextPlan: "다음 플랜",
    },
};

function BlikLogoSvg({ id = "default" }: { id?: string }) {
    const gradId = `blikGrad_${id}`;
    return (
        <svg
            className="blik-logo"
            viewBox="20 19 80 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <linearGradient id={gradId} x1="36.4" y1="30.6" x2="44.5" y2="22.7" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E52F08" />
                    <stop offset="1" stopColor="#E94F96" />
                </linearGradient>
            </defs>
            <path
                d="M46.1362 26.7057C46.1565 23.574 43.6343 21.0189 40.5027 20.9986C37.3711 20.9782 34.8159 23.5004 34.7956 26.632C34.7753 29.7636 37.2975 32.3188 40.4291 32.3391C43.5607 32.3595 46.1158 29.8373 46.1362 26.7057Z"
                fill={`url(#${gradId})`}
            />
            <path
                d="M89.7466 58.7831H97.9114L88.1018 46.1135L96.997 35.2271H89.5914L80.8562 46.1815V22.8215H74.5162V58.7831H80.8562L80.8514 46.2119L89.7466 58.7831Z"
                fill="#fff"
            />
            <path d="M50.5937 22.8167H56.9321V58.7815H50.5937V22.8167Z" fill="#fff" />
            <path d="M62.5569 35.2255H68.8953V58.7815H62.5569V35.2255Z" fill="#fff" />
            <path
                d="M34.1145 34.9903C32.13 34.9875 30.176 35.4779 28.4281 36.4175V22.8175H22.0889V47.0111C22.0882 49.3893 22.7929 51.7143 24.1136 53.692C25.4344 55.6697 27.3119 57.2114 29.5089 58.122C31.7058 59.0326 34.1235 59.2712 36.4561 58.8078C38.7887 58.3443 40.9315 57.1996 42.6134 55.5183C44.2954 53.837 45.441 51.6946 45.9054 49.3622C46.3698 47.0298 46.1321 44.6121 45.2224 42.4148C44.3126 40.2175 42.7717 38.3393 40.7945 37.0177C38.8173 35.6962 36.4927 34.9906 34.1145 34.9903ZM34.1145 52.7983C32.9701 52.7983 31.8514 52.459 30.8998 51.8232C29.9482 51.1874 29.2066 50.2837 28.7686 49.2265C28.3306 48.1692 28.216 47.0058 28.4392 45.8833C28.6624 44.7609 29.2134 43.7299 30.0226 42.9206C30.8317 42.1113 31.8627 41.5602 32.9851 41.3368C34.1075 41.1134 35.2709 41.2279 36.3283 41.6657C37.3856 42.1036 38.2894 42.8451 38.9253 43.7966C39.5612 44.748 39.9007 45.8667 39.9009 47.0111C39.9012 47.7711 39.7517 48.5237 39.4611 49.226C39.1704 49.9282 38.7442 50.5663 38.2068 51.1037C37.6695 51.6411 37.0314 52.0674 36.3293 52.3582C35.6271 52.649 34.8745 52.7985 34.1145 52.7983Z"
                fill="#fff"
            />
        </svg>
    );
}

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

    const checkout = useCallback(
        async (plan?: PaidPlan, paymentMode: PaymentMode = "subscription") => {
            if (inFlight.current) return;
            inFlight.current = true;
            setPending(plan ? `${plan}:${paymentMode}` : "portal");
            setError("");
            try {
                let account = auth.currentUser;
                if (!account) {
                    sessionStorage.setItem(
                        "lectoro-purchase",
                        JSON.stringify({ plan, paymentMode, createdAt: Date.now() })
                    );
                    account = await loginWithGoogle();
                    if (!account) return;
                }
                sessionStorage.removeItem("lectoro-purchase");
                const url = await getBillingUrl(
                    account,
                    language,
                    plan ? { plan, paymentMode } : undefined
                );
                window.location.assign(url);
            } catch (cause) {
                sessionStorage.removeItem("lectoro-purchase");
                setError(cause instanceof Error ? cause.message : pc.checkoutFailed);
            } finally {
                inFlight.current = false;
                setPending(null);
            }
        },
        [language, pc.checkoutFailed]
    );

    useEffect(() => {
        if (!user || inFlight.current) return;
        try {
            const saved = sessionStorage.getItem("lectoro-purchase");
            if (!saved) return;
            const intent = JSON.parse(saved);
            sessionStorage.removeItem("lectoro-purchase");
            if (
                Date.now() - intent.createdAt < 15 * 60 * 1000 &&
                ["basic", "pro", undefined].includes(intent.plan) &&
                ["subscription", "blik"].includes(intent.paymentMode)
            ) {
                const timer = setTimeout(() => {
                    void checkout(intent.plan, intent.paymentMode);
                }, 0);
                return () => clearTimeout(timer);
            }
        } catch {
            sessionStorage.removeItem("lectoro-purchase");
        }
    }, [user, checkout]);

    const renderPlanCard = (plan: "free" | "basic" | "pro") => {
        const paid = plan !== "free";
        const isRecommended = plan === "basic";
        const limits = paid ? BILLING_PLANS[plan] : { cards: 25, ai: 15, voiceCharacters: 0 };
        const count = (value: number) =>
            Number.isFinite(value) ? value.toLocaleString(language) : pc.unlimited;
        const formattedPrice = localizedPricing.plans[plan].formatted;

        return (
            <article
                className={`subscription-plan-card ${isRecommended ? "is-recommended" : ""} ${
                    paid ? "has-trial-offer" : ""
                }`}
            >
                <div className="subscription-plan-topline">
                    <strong>{pc.planNames[plan]}</strong>
                    {isRecommended && <span className="subscription-plan-badge">{pc.badgePopular}</span>}
                </div>

                {paid && <div className="subscription-plan-trial-kicker">{pc.trialKicker}</div>}

                <div className="subscription-plan-price">
                    <b>{formattedPrice}</b>
                    <span>{plan === "free" ? pc.priceForever : pc.pricePerMonth}</span>
                </div>

                <div className="subscription-plan-features">
                    <span>
                        <i aria-hidden="true">✓</i>
                        <span>
                            <b>{pc.unlimited}</b> {pc.featureTranslate}
                        </span>
                    </span>
                    <span>
                        <i aria-hidden="true">✓</i>
                        <span>
                            <b>{count(limits.ai)}</b> {paid ? pc.featureAiUsesMo : pc.featureAiUses}
                        </span>
                    </span>
                    <span>
                        <i aria-hidden="true">✓</i>
                        <span>
                            <b>{count(limits.cards)}</b> {pc.featureSrs}
                        </span>
                    </span>
                    <span>
                        <i aria-hidden="true">✓</i>
                        <span>
                            <b>{paid ? pc.unlimited : language === "pl" ? "3/mies." : "3/mo"}</b>{" "}
                            {pc.featureExport}
                        </span>
                    </span>
                    {paid && (
                        <>
                            <span>
                                <i aria-hidden="true">✓</i>
                                <b>{pc.featureNaturalVoices}</b>
                            </span>
                            <span>
                                <i aria-hidden="true">✓</i>
                                <b>{pc.featureUnlimitedPractice}</b>
                            </span>
                        </>
                    )}
                    <span className={paid ? "" : "is-muted"}>
                        <i aria-hidden="true">{paid ? "✓" : "—"}</i>
                        <span>
                            {paid
                                ? `${count(limits.voiceCharacters)} ${pc.geminiVoices}`
                                : pc.basicVoice}
                        </span>
                    </span>
                </div>

                <div className="subscription-plan-action">
                    {paid ? (
                        <>
                            <button
                                type="button"
                                disabled={!!pending}
                                onClick={() => void checkout(plan)}
                                className="subscription-plan-button is-trial"
                            >
                                <span className="subscription-button-label">
                                    {pending === `${plan}:subscription`
                                        ? pc.openingCheckout
                                        : pc.startTrial}
                                </span>
                                <span aria-hidden="true">→</span>
                            </button>
                            <span
                                className="subscription-trial-note"
                                dangerouslySetInnerHTML={{ __html: pc.trialNoteHtml(formattedPrice) }}
                            />
                            {isPl && (
                                <div className="subscription-blik-option">
                                    <button
                                        type="button"
                                        disabled={!!pending}
                                        onClick={() => void checkout(plan, "blik")}
                                        className="subscription-plan-button is-blik"
                                        aria-label={`${pc.blikPayLead} BLIK: ${BILLING_PLANS[plan].blikPln
                                            .toFixed(2)
                                            .replace(".", ",")} zł`}
                                    >
                                        {pending === `${plan}:blik` ? (
                                            pc.blikOpening
                                        ) : (
                                            <>
                                                <span className="blik-lead">{pc.blikPayLead}</span>
                                                <BlikLogoSvg id={plan} />
                                                <span className="blik-price-strong">
                                                    · {BILLING_PLANS[plan].blikPln.toFixed(2).replace(".", ",")} zł
                                                </span>
                                            </>
                                        )}
                                    </button>
                                    <span className="subscription-trial-note">{pc.blikNote}</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="subscription-plan-button is-secondary"
                        >
                            <span className="subscription-button-label">{pricing.free.cta}</span>
                            <span aria-hidden="true">→</span>
                        </a>
                    )}
                </div>
            </article>
        );
    };

    return (
        <section
            className="lectoro-pricing py-20 sm:py-28 lg:py-36 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="pricing"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4 tracking-tight text-balance">
                        {pricing.title}
                    </h2>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed text-balance max-w-2xl mx-auto mb-8">
                        {pc.subtitle}
                    </p>

                   
                </div>

                <div className="max-w-3xl mx-auto mb-8 text-center space-y-3">
                    {!user && <p className="text-sm text-slate-300">{pc.googleSignInNote}</p>}

                    {error && (
                        <p
                            role="alert"
                            className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
                        >
                            {error}
                        </p>
                    )}
                </div>

                {/* Mobile / Tablet: Smooth Drag & Swipe Carousel (< lg) */}
                <div className="lg:hidden">
                    <Carousel
                        opts={{
                            align: "center",
                            loop: false,
                        }}
                        className="w-full"
                        aria-label={pricing.title}
                        aria-busy={!!pending}
                    >
                        <CarouselContent className="-ml-4 flex items-stretch">
                            <CarouselItem
                                aria-hidden="true"
                                className="pointer-events-none shrink-0 pl-4 basis-[1px] opacity-0 sm:basis-[calc(50%-170px)]"
                            />

                            {(["free", "basic", "pro"] as const).map((plan) => (
                                <CarouselItem
                                    key={plan}
                                    className="flex pl-4 basis-[86%] sm:basis-[340px]"
                                >
                                    {renderPlanCard(plan)}
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="mt-8 flex justify-center gap-3">
                            <CarouselPrevious
                                aria-label={pc.prevPlan}
                                className="relative top-auto left-auto translate-y-0 min-h-11 min-w-11 rounded-xl border-white/10 bg-slate-900/60 text-white hover:bg-slate-800 hover:text-white"
                            />
                            <CarouselNext
                                aria-label={pc.nextPlan}
                                className="relative top-auto right-auto translate-y-0 min-h-11 min-w-11 rounded-xl border-white/10 bg-slate-900/60 text-white hover:bg-slate-800 hover:text-white"
                            />
                        </div>
                    </Carousel>
                </div>

                {/* PC Desktop: All 3 plans visible side-by-side without scroll (>= lg) */}
                <div
                    className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch"
                    aria-label={pricing.title}
                >
                    {(["free", "basic", "pro"] as const).map((plan) => (
                        <div key={plan} className="flex">
                            {renderPlanCard(plan)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
