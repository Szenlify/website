import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NON_EN_LOCALES = ["pl", "de", "es"];
const ALL_LOCALES = ["en", ...NON_EN_LOCALES];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Redirect /en/* → /* (canonical English is at root without prefix)
    if (pathname === "/en" || pathname.startsWith("/en/")) {
        const url = request.nextUrl.clone();
        url.pathname =
            pathname === "/en" ? "/" : pathname.slice("/en".length) || "/";
        return NextResponse.redirect(url, { status: 301 });
    }

    // Already prefixed with a non-English locale? Pass through.
    const hasNonEnLocale = NON_EN_LOCALES.some(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
    );
    if (hasNonEnLocale) {
        const locale = pathname.split("/")[1];
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-locale", locale);
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // Rewrite root-level paths to /en/* for rendering (browser URL stays the same)
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", "en");
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
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
