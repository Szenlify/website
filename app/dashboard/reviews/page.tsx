import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { en } from "@/lib/i18n/en";
import { getLanguageAlternates } from "@/lib/routing";
import DashboardReviewsClient from "@/components/DashboardReviewsClient";

const baseUrl = "https://lectoroai.com";
const canonicalUrl = `${baseUrl}/dashboard/reviews`;
const title = en.meta.reviewsTitle || `${en.nav.reviews} | Lectoro AI`;
const description = en.meta.reviewsDesc || en.meta.homeDesc;

export const metadata: Metadata = {
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
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
};

export default function DashboardReviewsRootPage() {
    return (
        <>
            <Navbar dict={en} locale="en" />
            <main id="main-content" className="grow">
                <DashboardReviewsClient dict={en} locale="en" />
            </main>
            <Footer dict={en} locale="en" />
        </>
    );
}
