import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates } from "@/lib/routing";

export async function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const dict = await getDictionary(locale);
    const baseUrl = "https://lectoroai.com";
    const localeUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

    return {
        title: {
            default: dict.meta.homeTitle,
            template: "%s | Lectoro AI",
        },
        description: dict.meta.homeDesc,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: localeUrl,
            languages: getLanguageAlternates(baseUrl),
        },
        openGraph: {
            type: "website",
            locale: LOCALE_CONFIG[locale].openGraph,
            url: localeUrl,
            siteName: "Lectoro AI",
            images: [
                {
                    url: "/showcase/1.jpg",
                    width: 1280,
                    height: 800,
                    alt: "Lectoro AI",
                },
            ],
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const dict = await getDictionary(locale);

    return (
        <>
            <Navbar dict={dict} locale={locale} />
            <main id="main-content" className="grow">
                {children}
            </main>
            <Footer dict={dict} locale={locale} />
        </>
    );
}
