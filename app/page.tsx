import Hero from "@/components/Hero";
import Platforms from "@/components/Platforms";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { CarouselItem } from "@/components/ShowcaseCarousel";
import { en } from "@/lib/i18n/en";

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://lectoroai.com/#organization",
            name: "Lectoro AI",
            url: "https://lectoroai.com/",
            logo: "https://lectoroai.com/icon.png",
        },
        {
            "@type": "WebSite",
            "@id": "https://lectoroai.com/#website",
            url: "https://lectoroai.com/",
            name: "Lectoro AI",
            description:
                "A Chrome extension for learning languages with clickable dual subtitles, contextual AI explanations and spaced-repetition flashcards.",
            publisher: { "@id": "https://lectoroai.com/#organization" },
            inLanguage: "en",
        },
        {
            "@type": "SoftwareApplication",
            "@id": "https://lectoroai.com/#software",
            name: "Lectoro AI",
            url: "https://lectoroai.com/",
            applicationCategory: "EducationalApplication",
            applicationSubCategory: "Language Learning",
            operatingSystem: "ChromeOS, Windows, macOS, Linux",
            browserRequirements: "Requires Google Chrome",
            description:
                "Learn languages on Netflix, YouTube, Plex, TED and the web with clickable bilingual subtitles, AI explanations, video flashcards and spaced repetition.",
            featureList: [
                "Dual subtitles for Netflix and YouTube",
                "Clickable words with contextual AI explanations",
                "In-page web translation",
                "Video flashcards with scene snapshots",
                "Spaced-repetition reviews",
                "Anki, CSV and PDF export",
            ],
            offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "0",
                highPrice: "19.99",
                offerCount: "3",
            },
            publisher: { "@id": "https://lectoroai.com/#organization" },
        },
        {
            "@type": "FAQPage",
            "@id": "https://lectoroai.com/#faq",
            mainEntity: en.faq.items.map((item) => ({
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

export default function HomePage() {
    const showcase = en.showcase;
    const images: CarouselItem[] = [
        {
            src: "/showcase/1.jpg",
            alt: showcase.s1.alt,
            title: showcase.s1.title,
        },
        {
            src: "/showcase/2.jpg",
            alt: showcase.s2.alt,
            title: showcase.s2.title,
        },
        {
            src: "/showcase/3.jpg",
            alt: showcase.s3.alt,
            title: showcase.s3.title,
        },
        {
            src: "/showcase/4.jpg",
            alt: showcase.s4.alt,
            title: showcase.s4.title,
        },
        {
            src: "/showcase/5.jpg",
            alt: showcase.s5.alt,
            title: showcase.s5.title,
        },
        {
            src: "/showcase/6.jpg",
            alt: showcase.s6.alt,
            title: showcase.s6.title,
        },
        {
            src: "/showcase/wardog.png",
            alt: showcase.s7.alt,
            title: showcase.s7.title,
        },
        {
            src: "/showcase/plex.png",
            alt: showcase.s8.alt,
            title: showcase.s8.title,
        },
    ];

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
            <Navbar dict={en} locale="en" />
            <main id="main-content" className="grow">
                <Hero dict={en} />
                <Platforms dict={en} />
                <Features dict={en} />
                <ShowcaseCarousel images={images} labels={en.showcase} />
                <Comparison dict={en} />
                <HowItWorks dict={en} />
                <Pricing dict={en} />
                <Testimonials dict={en} />
                <FAQ dict={en} />
                <FinalCTA dict={en} />
            </main>
            <Footer dict={en} locale="en" />
        </>
    );
}
