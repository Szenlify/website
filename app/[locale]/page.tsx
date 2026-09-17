import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Platforms from "@/components/Platforms";
import FeatureShowcase from "@/components/FeatureShowcase";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import HomeView from "@/components/HomeView";
import { getDictionary, isLocale } from "@/lib/i18n";
import type { CarouselItem } from "@/components/ShowcaseCarousel";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates } from "@/lib/routing";
import { getLocalizedPricing } from "@/lib/pricing";

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
    const ogLocale = LOCALE_CONFIG[locale].openGraph;

    return {
        title: dict.meta.homeTitle,
        description: dict.meta.homeDesc,
        alternates: {
            canonical: localeUrl,
            languages: getLanguageAlternates(baseUrl),
        },
        openGraph: {
            type: "website",
            url: localeUrl,
            title: dict.meta.homeTitle,
            description: dict.meta.homeDesc,
            locale: ogLocale,
            images: [
                {
                    url: "/showcase/1.jpg",
                    width: 1280,
                    height: 800,
                    alt: "Lectoro AI",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: dict.meta.homeTitle,
            description: dict.meta.homeDesc,
            images: ["/showcase/1.jpg"],
        },
    };
}

export default async function LocaleHomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const dict = await getDictionary(locale);

    // Build localized carousel images (same src, translated alt+title)
    const s = dict.showcase;
    const localizedImages: CarouselItem[] = [
        { src: "/showcase/1.jpg", alt: s.s1.alt, title: s.s1.title },
        { src: "/showcase/2.jpg", alt: s.s2.alt, title: s.s2.title },
        { src: "/showcase/3.jpg", alt: s.s3.alt, title: s.s3.title },
        { src: "/showcase/4.jpg", alt: s.s4.alt, title: s.s4.title },
        { src: "/showcase/5.jpg", alt: s.s5.alt, title: s.s5.title },
        { src: "/showcase/6.jpg", alt: s.s6.alt, title: s.s6.title },
        { src: "/showcase/wardog.png", alt: s.s7.alt, title: s.s7.title },
        { src: "/showcase/plex.png", alt: s.s8.alt, title: s.s8.title },
    ];

    const baseUrl = "https://lectoroai.com";
    const siteUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

    const pricingData = getLocalizedPricing(locale);

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                name: "Lectoro AI",
                url: `${baseUrl}/`,
                logo: `${baseUrl}/icon.png`,
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                url: `${siteUrl}/`,
                name: "Lectoro AI",
                description: dict.meta.homeDesc,
                publisher: { "@id": `${baseUrl}/#organization` },
                inLanguage: locale,
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${baseUrl}/#software`,
                name: "Lectoro AI",
                url: `${baseUrl}/`,
                applicationCategory: "EducationalApplication",
                operatingSystem: "Chrome",
                description: dict.meta.homeDesc,
                featureList: [
                    dict.features.f1.title,
                    dict.features.f2.title,
                    dict.features.f3.title,
                    dict.features.f4.title,
                    dict.features.f5.title,
                    dict.features.f6.title,
                ],
                offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: pricingData.currency,
                    lowPrice: String(pricingData.plans.free.amount),
                    highPrice: String(pricingData.plans.pro.amount),
                    offerCount: "3",
                },
                publisher: { "@id": `${baseUrl}/#organization` },
            },
            {
                "@type": "FAQPage",
                "@id": `${siteUrl}/#faq`,
                inLanguage: locale,
                mainEntity: dict.faq.items.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer,
                    },
                })),
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />
            <HomeView dict={dict} locale={locale}>
                <Hero dict={dict} />
                <Platforms dict={dict} />
                <FeatureShowcase dict={dict} locale={locale} />
                <ShowcaseCarousel images={localizedImages} labels={dict.showcase} />
                <Comparison dict={dict} />
                <HowItWorks dict={dict} />
                <Pricing dict={dict} locale={locale} />
                <Testimonials dict={dict} />
                <FAQ dict={dict} />
                <FinalCTA dict={dict} />
            </HomeView>
        </>
    );
}
