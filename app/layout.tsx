import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lectoro AI — Dual Subtitles for Netflix & YouTube, Web Translator & SRS Flashcards",
  description:
    "Master foreign languages naturally through immersion! Bilingual subtitles on Netflix & YouTube, instant in-page web translation, Gemini AI tutor, ElevenLabs voice pronunciation, and Spaced Repetition flashcards. Install for free!",
  keywords: [
    "learn english netflix",
    "bilingual subtitles youtube",
    "chrome language extension",
    "dual subtitles netflix",
    "spaced repetition",
    "anki export",
    "web translator",
    "gemini ai tutor",
    "elevenlabs tts",
    "language immersion",
  ],
  authors: [{ name: "Lectoro AI" }],
  creator: "Lectoro AI",
  publisher: "Lectoro AI",
  metadataBase: new URL("https://lectoroai.com"),
  alternates: {
    canonical: "https://lectoroai.com",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://lectoroai.com",
    title: "Lectoro AI — Turn Netflix & YouTube into Your Personal Language School",
    description:
      "Master languages naturally while watching movies & videos. Dual subtitles, clickable words, AI explanations, and contextual video flashcards. Add to Chrome for free!",
    siteName: "Lectoro AI",
    images: [
      {
        url: "/showcase/video-word-card.jpg",
        width: 1200,
        height: 630,
        alt: "Lectoro AI Language Learning Chrome Extension",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectoro AI — Bilingual Subtitles & Language Immersion in Chrome",
    description:
      "Learn languages effortlessly with Netflix and YouTube. Click words, build video flashcards, and ask Gemini AI.",
    images: ["/showcase/video-word-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#070913] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {/* Ambient Visual Glow & Grid */}
        <div className="ambient-glow" aria-hidden="true">
          <div className="glow-sphere-1"></div>
          <div className="glow-sphere-2"></div>
          <div className="glow-sphere-3"></div>
          <div className="bg-grid-overlay"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
