import type { Metadata } from "next";
import { headers } from "next/headers";
import LandingPage from "./components/LandingPage";
import {
  CHROME_STORE_URL,
  SITE_URL,
  detectCurrency,
  detectLocale,
  dictionaries,
  formatPrice,
  getPrice,
} from "./lib/site";

type HomeProps = {
  searchParams: Promise<{ lang?: string; currency?: string }>;
};

async function getPreferences(searchParams: HomeProps["searchParams"]) {
  const [requestHeaders, params] = await Promise.all([headers(), searchParams]);
  const acceptLanguage = requestHeaders.get("accept-language");
  const locale = detectLocale(acceptLanguage, params.lang);
  const country =
    requestHeaders.get("x-vercel-ip-country") ??
    requestHeaders.get("cf-ipcountry") ??
    requestHeaders.get("x-country-code");
  const currency = detectCurrency(country, acceptLanguage, locale, params.currency);

  return { locale, currency };
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const { locale } = await getPreferences(searchParams);
  const content = dictionaries[locale].meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    applicationName: "Lectoro",
    authors: [{ name: "Lectoro" }],
    creator: "Lectoro",
    publisher: "Lectoro",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName: "Lectoro",
      title: content.title,
      description: content.description,
      images: [{ url: "/icon.png", width: 48, height: 48, alt: "Lectoro" }],
    },
    twitter: {
      card: "summary",
      title: content.title,
      description: content.description,
      images: ["/icon.png"],
    },
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { locale, currency } = await getPreferences(searchParams);
  const dictionary = dictionaries[locale];
  const price = getPrice(currency);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Lectoro",
        url: SITE_URL,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Chrome, Edge, Brave, Opera",
        description: dictionary.meta.description,
        downloadUrl: CHROME_STORE_URL,
        offers: [
          { "@type": "Offer", name: dictionary.pricing.freeName, price: 0, priceCurrency: currency },
          { "@type": "Offer", name: dictionary.pricing.proName, price: price.monthly, priceCurrency: currency },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: dictionary.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LandingPage
        dictionary={dictionary}
        locale={locale}
        currency={currency}
        monthlyPrice={formatPrice(price.monthly, currency, locale)}
        annualPrice={formatPrice(price.annual, currency, locale)}
      />
    </>
  );
}
