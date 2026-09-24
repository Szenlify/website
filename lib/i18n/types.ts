export const LOCALE_CONFIG = {
    en: { openGraph: "en_US", skipLink: "Skip to content" },
    de: { openGraph: "de_DE", skipLink: "Zum Inhalt springen" },
    fr: { openGraph: "fr_FR", skipLink: "Aller au contenu" },
    nl: { openGraph: "nl_NL", skipLink: "Naar inhoud springen" },
    pl: { openGraph: "pl_PL", skipLink: "Przejdź do treści" },
    es: { openGraph: "es_ES", skipLink: "Saltar al contenido" },
    it: { openGraph: "it_IT", skipLink: "Salta al contenuto" },
    cs: { openGraph: "cs_CZ", skipLink: "Přejít k obsahu" },
    pt: { openGraph: "pt_PT", skipLink: "Saltar para o conteúdo" },
    ja: { openGraph: "ja_JP", skipLink: "メインコンテンツへ移動" },
    ko: { openGraph: "ko_KR", skipLink: "본문으로 이동" },
} as const;

export type Locale = keyof typeof LOCALE_CONFIG;

export const LOCALES = Object.keys(LOCALE_CONFIG) as Locale[];

export interface FaqItem {
    question: string;
    answer: string;
}

export interface CompetitorCell {
    title: string;
    detail: string;
    isPositive: boolean;
}

export interface Dict {
    locale: Locale;

    nav: {
        features: string;
        liveDemo: string;
        howItWorks: string;
        pricing: string;
        faq: string;
        addToChrome: string;
        addToChromeFree: string;
        privacyPolicy: string;
        termsOfService: string;
        signIn: string;
        signOut: string;
        reviews: string;
    };

    lang: {
        en: string;
        ja: string;
        de: string;
        ko: string;
        fr: string;
        nl: string;
        pl: string;
        es: string;
        it: string;
        cs: string;
        pt: string;
        selectLanguage: string;
    };

    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        installCta: string;
        trialBadge: string;
        demoCta: string;
        noCard: string;
        builtFor: string;
    };

    platforms: {
        label: string;
        anyWeb: string;
    };

    features: {
        tag: string;
        title: string;
        subtitle: string;
        f1: { title: string; desc: string; b1: string; b2: string; b3: string };
        f2: { title: string; desc: string; b1: string; b2: string; b3: string };
        f3: { title: string; desc: string; b1: string; b2: string; b3: string };
        f4: {
            badge: string;
            title: string;
            desc: string;
            l1: string;
            l2: string;
            l3: string;
        };
        f5: { title: string; desc: string; b1: string; b2: string; b3: string };
        f6: { title: string; desc: string; b1: string; b2: string; b3: string };
    };


    hiw: {
        tag: string;
        title: string;
        subtitle: string;
        s1title: string;
        s1desc: string;
        s2title: string;
        s2desc: string;
        s3title: string;
        s3desc: string;
    };

    pricing: {
        title: string;
        subtitle: string;
        mostPopular: string;
        free: {
            name: string;
            desc: string;
            forever: string;
            cta: string;
            f1: string;
            f2: string;
            f3: string;
            f4: string;
            f5: string;
        };
        basic: {
            name: string;
            desc: string;
            mo: string;
            cta: string;
            trial: string;
            f1: string;
            f2: string;
            f3: string;
            f4: string;
            f5: string;
            f6: string;
        };
        pro: {
            name: string;
            desc: string;
            mo: string;
            cta: string;
            trial: string;
            f1: string;
            f2: string;
            f3: string;
            f4: string;
            f5: string;
        };
    };

    testimonials: {
        tag: string;
        title: string;
        starsLabel: string;
        previous: string;
        next: string;
        t1: { quote: string; name: string; role: string };
        t2: { quote: string; name: string; role: string };
        t3: { quote: string; name: string; role: string };
    };

    faq: {
        tag: string;
        title: string;
        items: FaqItem[];
    };

    finalCta: {
        title1: string;
        title2: string;
        subtitle: string;
        cta: string;
    };

    footer: {
        tagline: string;
        product: string;
        legal: string;
        contact: string;
        subtitlesLink: string;
        translatorLink: string;
        flashcardsLink: string;
        pricingLink: string;
        privacyLink: string;
        termsLink: string;
        faqLink: string;
        copyright: string;
    };

    meta: {
        homeTitle: string;
        homeDesc: string;
        privacyTitle: string;
        privacyDesc: string;
        termsTitle: string;
        termsDesc: string;
        reviewsTitle: string;
        reviewsDesc: string;
    };

    reviews: ReviewsDict;

    showcase?: ShowcaseDict;

    privacy: {
        breadcrumbHome: string;
        breadcrumbCurrent: string;
        badge: string;
        title: string;
        updatedAt: string;
        googleCallout: { title: string; body: string };
        s1: { heading: string; p1: string; p2: string };
        s2: {
            heading: string;
            aLabel: string;
            aText: string;
            bLabel: string;
            bText: string;
            cLabel: string;
            cText: string;
        };
        s3: { heading: string; l1: string; l2: string; l3: string; l4: string };
        s4: {
            heading: string;
            intro: string;
            aiLabel: string;
            aiText: string;
            cloudflareLabel?: string;
            cloudflareText?: string;
            firebaseLabel?: string;
            firebaseText?: string;
            translateLabel?: string;
            translateText?: string;
            elevenlabsLabel?: string;
            elevenlabsText?: string;
            stripeLabel: string;
            stripeText: string;
        };
        s5: { heading: string; p1: string; p2: string };
        s6: {
            heading: string;
            intro: string;
            l1label: string;
            l1text: string;
            l2label: string;
            l2text: string;
            l3label: string;
            l3text: string;
            l4label: string;
            l4text: string;
        };
        s7: {
            heading: string;
            p1: string;
            teamName: string;
            domainLabel: string;
            domain: string;
            emailLabel: string;
            email: string;
        };
    };

    terms: {
        breadcrumbHome: string;
        breadcrumbCurrent: string;
        badge: string;
        title: string;
        updatedAt: string;
        s1: { heading: string; p1: string };
        s2: { heading: string; p1: string; p2: string };
        s3: {
            heading: string;
            sellerLabel?: string;
            sellerText?: string;
            aLabel: string;
            aText: string;
            bLabel: string;
            bText: string;
            cLabel: string;
            cText: string;
            dLabel: string;
            dText: string;
            eLabel?: string;
            eText?: string;
        };
        s4: {
            heading: string;
            intro: string;
            l1: string;
            l2: string;
            l3: string;
            l4: string;
        };
        s5: { heading: string; p1: string };
        s6: { heading: string; p1: string; p2: string };
        s7: { heading: string; p1: string };
        s8: {
            heading: string;
            p1: string;
            teamName: string;
            domainLabel: string;
            domain: string;
            emailLabel: string;
            email: string;
        };
    };
}

export interface ShowcaseDict {
    badge: string;
    title: string;
    subtitle: string;
    b1Tag: string;
    b1Title: string;
    b1HowTo: string;
    b1Step1: string;
    b1Step2: string;
    b1Step3: string;
    b2Tag: string;
    b2Title: string;
    b2HowTo: string;
    b2Step1: string;
    b2Step2: string;
    b2Step3: string;
    b3Tag: string;
    b3Title: string;
    b3HowTo: string;
    b3Step1: string;
    b3Step2: string;
    b3Step3: string;
    b4Tag: string;
    b4Title: string;
    b4HowTo: string;
    b4K1: string;
    b4K1Desc: string;
    b4K2: string;
    b4K2Desc: string;
    b4K3: string;
    b4K3Desc: string;
    b4K4: string;
    b4K4Desc: string;
    b4K5: string;
    b4K5Desc: string;
    b4K6: string;
    b4K6Desc: string;
    b5Tag: string;
    b5Title: string;
    b5HowTo: string;
    b5Step1: string;
    b5Step2: string;
    b5Step3: string;
    b6Tag: string;
    b6Title: string;
    b6HowTo: string;
    b6Step1: string;
    b6Step2: string;
    b6Step3: string;
}

export interface ReviewsDict {
    badge: string;
    title: string;
    subtitle: string;
    breadcrumbHome: string;
    breadcrumbDashboard: string;
    breadcrumbReviews: string;
    loadingTitle: string;
    loadingSubtitle: string;
    dbErrorTitle: string;
    retryButton: string;
    noWordsTitle: string;
    noWordsSubtitle: string;
    syncHowToTitle: string;
    syncStep1: string;
    syncStep2: string;
    syncStep3: string;
    syncStep4: string;
    refreshButton: string;
    allCaughtUpTitle: string;
    allCaughtUpDesc: string;
    totalSavedWords: string;
    practicePromptTitle: string;
    practicePromptDesc: string;
    practiceAllButton: string;
    checkNewButton: string;
    sessionCompleteTitle: string;
    sessionCompleteDesc: string;
    exitPracticeButton: string;
    changeDirection: string;
    cramBadge: string;
    listenAudio: string;
    movieSnapshotAlt: string;
    mobileSwipeHint: string;
    flipShowAnswer: string;
    flipShowQuestion: string;
    mobileTapFlip: string;
    rateMemoryPrompt: string;
    knowWordPrompt: string;
    btnAgain: string;
    btnGood: string;
    badgeAgain: string;
    badgeGood: string;
    shortcutPronounce: string;
    shortcutFlip: string;
    shortcutAgain: string;
    shortcutGood: string;
    unauthTitle: string;
    unauthDesc: string;
    signInWithGoogle: string;
    signingIn: string;
    loggedInAs: string;
    backToHome: string;
}
