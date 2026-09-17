import type { Dict } from "./types";
import { en } from "./en";

export const nl: Dict = {
    ...en,
    locale: "nl",

    nav: {
        ...en.nav,
        features: "Functies",
        liveDemo: "Live demo",
        howItWorks: "Hoe het werkt",
        comparison: "Vergelijking",
        pricing: "Prijzen",
        faq: "Veelgestelde vragen",
        addToChrome: "Toevoegen aan Chrome",
        addToChromeFree: "Toevoegen aan Chrome — Gratis",
        privacyPolicy: "Privacybeleid",
        termsOfService: "Servicevoorwaarden",
        signIn: "Inloggen",
        signOut: "Uitloggen",
        reviews: "Herhalingen",
    },

    lang: {
        ...en.lang,
        selectLanguage: "Taal",
    },

    hero: {
        ...en.hero,
        badge: "Chrome-extensie voor het leren van talen",
        title: "Leer talen met dubbele ondertiteling op",
        titleHighlight: "Netflix & YouTube",
        subtitle:
            "Klik op elk woord in tweetalige ondertitels voor een vertaling, uitspraak en contextuele AI-uitleg. Bewaar woordenschat met videoscene-snapshots en onthoud ze met flashcards met gespreide herhaling.",
        installCta: "Installeren in Chrome",
        trialBadge: "3 dagen gratis",
        demoCta: "Interactieve demo proberen",
        noCard: "Geen creditcard nodig voor het gratis abonnement",
        builtFor: "Gemaakt voor Google Chrome",
    },
};
