import { LOCALES, type Locale } from "@/lib/i18n/types";

export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== "en");

export function getLocalizedHref(path: string, locale: Locale): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (locale === "en") return normalizedPath;
    return normalizedPath === "/"
        ? `/${locale}`
        : `/${locale}${normalizedPath}`;
}

export function getLocalizedSectionHref(
    section: string,
    locale: Locale,
): string {
    return `${getLocalizedHref("/", locale)}#${section}`;
}

export function getLanguageAlternates(baseUrl: string, path = "") {
    return Object.fromEntries([
        ["x-default", `${baseUrl}${path}`],
        ...LOCALES.map((locale) => [
            locale,
            `${baseUrl}${getLocalizedHref(path || "/", locale)}`.replace(
                /\/$/,
                "",
            ),
        ]),
    ]);
}

export function switchLocalePathname(
    pathname: string,
    targetLocale: Locale,
): string {
    let basePath = pathname;

    for (const locale of LOCALES) {
        if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
            basePath = pathname.slice(locale.length + 1) || "/";
            break;
        }
    }

    return getLocalizedHref(basePath, targetLocale);
}
