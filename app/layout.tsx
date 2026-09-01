import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
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
    title: {
        default: "Lectoro AI: Dual Subtitles for Netflix & YouTube",
        template: "%s | Lectoro AI",
    },
    description:
        "Learn languages while watching Netflix, YouTube, Plex and TED. Click bilingual subtitles for AI explanations, save video flashcards and review them with SRS.",
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
    applicationName: "Lectoro AI",
    category: "Education",
    metadataBase: new URL("https://lectoroai.com"),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    icons: {
        icon: "/icon.png",
        apple: "/icon.png",
    },
    openGraph: {
        type: "website",
        url: "https://lectoroai.com",
        title: "Lectoro AI: Dual Subtitles for Netflix & YouTube",
        description:
            "Click bilingual subtitles for contextual AI explanations, save words with video snapshots and remember them with spaced repetition.",
        siteName: "Lectoro AI",
        locale: "en_US",
        images: [
            {
                url: "/showcase/1.jpg",
                width: 1280,
                height: 800,
                alt: "Lectoro AI clickable subtitles and AI explanation on a TED video",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Lectoro AI: Dual Subtitles for Netflix & YouTube",
        description:
            "Click subtitles for AI explanations, save contextual video flashcards and review vocabulary with SRS.",
        images: ["/showcase/1.jpg"],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#070913",
    colorScheme: "dark",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = (await headers()).get("x-locale") ?? "en";

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <body
                suppressHydrationWarning
                className="bg-[#070913] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white"
            >
                {/* Ambient Visual Glow & Grid */}
                <div className="ambient-glow" aria-hidden="true">
                    <div className="glow-sphere-1"></div>
                    <div className="glow-sphere-2"></div>
                    <div className="glow-sphere-3"></div>
                    <div className="bg-grid-overlay"></div>
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}
