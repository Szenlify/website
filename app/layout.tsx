import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lectoro.app"),
  title: "Lectoro – Nauka Języków z Netflix, YouTube & AI (Spaced Repetition)",
  description:
    "Ucz się języków oglądając YouTube i Netflix. Podwójne napisy, inteligentne fiszki ze zdjęciami z filmu, algorytm Anki SM-2, asystent AI Gemini i ultra-naturalne głosy ElevenLabs.",
  keywords: [
    "nauka angielskiego netflix",
    "podwójne napisy youtube",
    "nauka jezyka z filmow",
    "fiszki anki sm-2",
    "elevenlabs tts english",
    "tlumacz wideo",
    "chrome extension language learning",
    "bilingual subtitles netflix",
    "lectoro",
  ],
  authors: [{ name: "Lectoro Team" }],
  creator: "Lectoro",
  publisher: "Lectoro",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://lectoro.app",
    siteName: "Lectoro",
    title: "Lectoro – Ucz się języków z YouTube, Netflix & AI",
    description:
      "Zamień ulubione filmy w interaktywne lekcje, inteligentne fiszki ze zdjęciami z kadru i krystalicznie czyste audio native speakerów.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Lectoro App Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectoro – Nauka Języków z Wideo & AI",
    description:
      "Podwójne napisy YouTube & Netflix, algorytm Anki SM-2, zrzuty ekranu i ultra-realistyczne głosy ElevenLabs.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lectoro",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Chrome, Edge, Brave, Opera",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "48",
    },
    description:
      "Wtyczka do Chrome do nauki języków z wideo na YouTube i Netflixie, algorytmem Anki SM-2, AI Gemini oraz głosami ElevenLabs.",
  };

  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
