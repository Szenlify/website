import { LOCALES, type Locale } from "./types";

export const LANGUAGE_COOKIE = "lectoro-language";

export function detectLocale(header: string | null, saved?: string): Locale {
    if (LOCALES.includes(saved as Locale)) return saved as Locale;
    const preferences = (header || "").split(",").map((part, index) => {
        const [tag, ...parameters] = part.trim().toLowerCase().split(";");
        const quality = parameters.find(parameter => parameter.trim().startsWith("q="));
        const weight = quality ? Number(quality.trim().slice(2)) : 1;
        return { locale: tag.split("-")[0] as Locale, weight, index };
    }).filter(item => Number.isFinite(item.weight) && item.weight > 0 && item.weight <= 1)
        .sort((a, b) => b.weight - a.weight || a.index - b.index);
    return preferences.find(item => LOCALES.includes(item.locale))?.locale || "en";
}
