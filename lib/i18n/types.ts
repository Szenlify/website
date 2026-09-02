export type Locale = "en" | "pl" | "de" | "es";

export const LOCALES: Locale[] = ["en", "pl", "de", "es"];

export interface FaqItem {
    question: string;
    answer: string;
}

export interface CompetitorCell {
    title: string;
    detail: string;
    isPositive: boolean;
}

export interface ComparisonRow {
    category: string;
    feature: string;
    description: string;
    lectoro: CompetitorCell;
    languageReactor: CompetitorCell;
    lingopie: CompetitorCell;
    duolingo: CompetitorCell;
}

export interface Dict {
    locale: Locale;

    nav: {
        features: string;
        liveDemo: string;
        howItWorks: string;
        comparison: string;
        pricing: string;
        faq: string;
        addToChrome: string;
        addToChromeFree: string;
        privacyPolicy: string;
        termsOfService: string;
    };

    lang: {
        en: string;
        pl: string;
        de: string;
        es: string;
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

    showcase: {
        tag: string;
        title: string;
        previous: string;
        next: string;
        slideLabel: string;
        s1: { alt: string; title: string };
        s2: { alt: string; title: string };
        s3: { alt: string; title: string };
        s4: { alt: string; title: string };
        s5: { alt: string; title: string };
        s6: { alt: string; title: string };
        s7: { alt: string; title: string };
        s8: { alt: string; title: string };
    };

    comparison: {
        tag: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        disclaimer: string;
        winnerBadge: string;
        lectoSubtitle: string;
        lrSubtitle: string;
        lingoSubtitle: string;
        featureCol: string;
        previousAriaLabel: string;
        slidesAriaLabel: string;
        goToAriaLabel: string;
        nextAriaLabel: string;
        verdictTag: string;
        verdictTitle: string;
        verdictBody: string;
        verdictCta: string;
        tabs: {
            vsLR: string;
            vsLRbadge: string;
            vsLingopie: string;
            vsLingopieBadge: string;
            vsDuolingo: string;
            vsDuolingoBadge: string;
        };
        rows: ComparisonRow[];
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
        tag: string;
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
        disclaimer: string;
    };

    meta: {
        homeTitle: string;
        homeDesc: string;
        privacyTitle: string;
        privacyDesc: string;
        termsTitle: string;
        termsDesc: string;
    };

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
            geminiLabel: string;
            geminiText: string;
            elevenlabsLabel: string;
            elevenlabsText: string;
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
            aLabel: string;
            aText: string;
            bLabel: string;
            bText: string;
            cLabel: string;
            cText: string;
            dLabel: string;
            dText: string;
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
