import type { Dict } from "./types";
import { en } from "./en";

export const cs: Dict = {
    ...en,
    locale: "cs",

    nav: {
        ...en.nav,
        features: "Funkce",
        liveDemo: "Živé demo",
        howItWorks: "Jak to funguje",
        comparison: "Porovnání",
        pricing: "Ceník",
        faq: "Časté dotazy",
        addToChrome: "Přidat do Chrome",
        addToChromeFree: "Přidat do Chrome — Zdarma",
        privacyPolicy: "Zásady ochrany osobních údajů",
        termsOfService: "Podmínky služby",
        signIn: "Přihlásit se",
        signOut: "Odhlásit se",
        reviews: "Opakování",
    },

    lang: {
        ...en.lang,
        selectLanguage: "Jazyk",
    },

    hero: {
        ...en.hero,
        badge: "Rozšíření Chrome pro výuku jazyků",
        title: "Učte se jazyky s dvojitými titulky na",
        titleHighlight: "Netflixu a YouTube",
        subtitle:
            "Klikněte na jakékoli slovo v bilingvních titulkách pro překlad, výslovnost a kontextové vysvětlení pomocí AI. Ukládejte slovní zásobu se snímky scén a zapamatujte si ji pomocí kartiček s rozloženým opakováním.",
        installCta: "Nainstalovat do Chrome",
        trialBadge: "3 dny zdarma",
        demoCta: "Vyzkoušet interaktivní demo",
        noCard: "Pro bezplatný plán není potřeba platební karta",
        builtFor: "Vytvořeno pro Google Chrome",
    },
};
