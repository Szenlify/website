import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES } from "@/lib/i18n/types";

import { detectLocale, LANGUAGE_COOKIE } from "@/lib/i18n/detect-locale";

const NON_EN_LOCALES = LOCALES.filter((locale) => locale !== "en");
const ALL_LOCALES = LOCALES;

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/api" || pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
        return NextResponse.next();
    }

    // Redirect /en/* → /* (canonical English is at root without prefix)
    if (pathname === "/en" || pathname.startsWith("/en/")) {
        const url = request.nextUrl.clone();
        url.pathname =
            pathname === "/en" ? "/" : pathname.slice("/en".length) || "/";
        const response = NextResponse.redirect(url, { status: 307 });
        response.cookies.set(LANGUAGE_COOKIE, "en", { path: "/", maxAge: 31536000, sameSite: "lax", secure: request.nextUrl.protocol === "https:" });
        response.headers.set("Cache-Control", "private, no-store");
        return response;
    }

    // Already prefixed with a non-English locale? Pass through.
    const pathnameLocale = pathname.split("/")[1];
    const matchedLocale = NON_EN_LOCALES.find(
        (locale) => locale.toLowerCase() === pathnameLocale.toLowerCase(),
    );
    if (matchedLocale) {
        if (pathnameLocale !== matchedLocale) {
            const url = request.nextUrl.clone();
            url.pathname = pathname.replace(
                `/${pathnameLocale}`,
                `/${matchedLocale}`,
            );
            return NextResponse.redirect(url, { status: 301 });
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-locale", matchedLocale);
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const preferred = detectLocale(request.headers.get("accept-language"), request.cookies.get(LANGUAGE_COOKIE)?.value);
    if (preferred !== "en") {
        const target = request.nextUrl.clone();
        target.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
        const response = NextResponse.redirect(target, { status: 307 });
        response.headers.set("Vary", "Accept-Language, Cookie");
        response.headers.set("Cache-Control", "private, no-store");
        return response;
    }

    // Rewrite root-level paths to /en/* for rendering (browser URL stays the same)
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", "en");
    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    response.headers.set("Vary", "Accept-Language, Cookie");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - _next/static, _next/image (Next.js assets)
         * - Files with extensions (images, fonts, etc.)
         * - api routes
         */
        "/((?!_next/static|_next/image|favicon|icon\\.png|hero\\.png|platforms|showcase|audio|.*\\..*).*)",
    ],
};

// Re-export ALL_LOCALES for use elsewhere
export { ALL_LOCALES };
