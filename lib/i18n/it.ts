import type { Dict } from "./types";
import { en } from "./en";

export const it: Dict = {
    ...en,
    locale: "it",

    nav: {
        ...en.nav,
        features: "Funzionalità",
        liveDemo: "Demo dal vivo",
        howItWorks: "Come funziona",
        comparison: "Confronto",
        pricing: "Prezzi",
        faq: "FAQ",
        addToChrome: "Aggiungi a Chrome",
        addToChromeFree: "Aggiungi a Chrome — Gratis",
        privacyPolicy: "Informativa sulla privacy",
        termsOfService: "Termini di servizio",
        signIn: "Accedi",
        signOut: "Esci",
        reviews: "Ripassi",
    },

    lang: {
        ...en.lang,
        selectLanguage: "Lingua",
    },

    hero: {
        ...en.hero,
        badge: "Estensione Chrome per l'apprendimento delle lingue",
        title: "Impara le lingue con i sottotitoli doppi su",
        titleHighlight: "Netflix e YouTube",
        subtitle:
            "Fai clic su qualsiasi parola nei sottotitoli bilingui per ottenere una traduzione, pronuncia e spiegazione contestuale dell'IA. Salva i vocaboli con istantanee video e memorizzali con flashcard a ripetizione spaziata.",
        installCta: "Installa in Chrome",
        trialBadge: "3 giorni gratis",
        demoCta: "Prova la demo interattiva",
        noCard: "Nessuna carta di credito richiesta per il piano gratuito",
        builtFor: "Creato per Google Chrome",
    },
};
