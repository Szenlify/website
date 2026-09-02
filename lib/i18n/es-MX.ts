import type { Dict } from "./types";
import { es } from "./es";

export const esMX: Dict = {
    ...es,
    locale: "es-MX",

    lang: {
        ...es.lang,
        en: "English",
        pl: "Polski",
        de: "Deutsch",
        es: "Español",
        ja: "日本語",
        ko: "한국어",
        fr: "Français",
        "pt-BR": "Português (Brasil)",
        "es-MX": "Español (México)",
        hi: "हिन्दी",
        selectLanguage: "Idioma",
    },
};
