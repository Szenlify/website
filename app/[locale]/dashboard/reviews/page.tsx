import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates } from "@/lib/routing";
import DashboardReviewsClient from "@/components/DashboardReviewsClient";

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
    const canonicalUrl =
        locale === "en"
            ? `${baseUrl}/dashboard/reviews`
            : `${baseUrl}/${locale}/dashboard/reviews`;

    const title = dict.meta.reviewsTitle || `${dict.nav.reviews} | Lectoro AI`;
    const description = dict.meta.reviewsDesc || dict.meta.homeDesc;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: getLanguageAlternates(baseUrl, "/dashboard/reviews"),
        },
        openGraph: {
            type: "website",
            url: canonicalUrl,
            title,
            description,
            locale: LOCALE_CONFIG[locale].openGraph,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function LocaleDashboardReviewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const dict = await getDictionary(locale);

    return <div data-reviews-screen><DashboardReviewsClient dict={dict} locale={locale} /></div>;
}
