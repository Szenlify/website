import type { Locale } from "@/lib/i18n/types";

const PREFIXED_LOCALES: Locale[] = ["pl", "de", "es", "ja"];

export function getLocalizedHref(path: string, locale: Locale): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return locale === "en" ? normalizedPath : `/${locale}${normalizedPath}`;
}

export function getLocalizedSectionHref(
    section: string,
    locale: Locale,
): string {
    return `${getLocalizedHref("/", locale)}#${section}`;
}

export function switchLocalePathname(
    pathname: string,
    targetLocale: Locale,
): string {
    let basePath = pathname;

    for (const locale of ["en", ...PREFIXED_LOCALES]) {
        if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
            basePath = pathname.slice(locale.length + 1) || "/";
            break;
        }
    }

    return getLocalizedHref(basePath, targetLocale);
}
