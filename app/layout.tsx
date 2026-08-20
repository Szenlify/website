import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SITE_URL, detectLocale } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#07111d",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = detectLocale((await headers()).get("accept-language"));

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
