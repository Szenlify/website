import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import type { Dict } from "@/lib/i18n/types";

interface FooterProps {
    dict: Dict;
    locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
    const { footer } = dict;
    const privacyHref = locale === "en" ? "/privacy" : `/${locale}/privacy`;
    const termsHref = locale === "en" ? "/terms" : `/${locale}/terms`;

    return (
        <footer className="bg-[#050711] border-t border-white/10 pt-16 pb-12 relative z-10 text-slate-400 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-1">
                        <div className="mb-4"><Logo size="sm" /></div>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs">{footer.tagline}</p>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">{footer.product}</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><a href="#features" className="hover:text-white transition">{footer.subtitlesLink}</a></li>
                            <li><a href="#features" className="hover:text-white transition">{footer.translatorLink}</a></li>
                            <li><a href="#features" className="hover:text-white transition">{footer.flashcardsLink}</a></li>
                            <li><a href="#pricing" className="hover:text-white transition">{footer.pricingLink}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">{footer.legal}</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link href={privacyHref} className="hover:text-white transition">{footer.privacyLink}</Link></li>
                            <li><Link href={termsHref} className="hover:text-white transition">{footer.termsLink}</Link></li>
                            <li><a href="#faq" className="hover:text-white transition">{footer.faqLink}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">{footer.contact}</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><a href="mailto:support@lectoroai.com" className="text-slate-300 hover:text-white transition">support@lectoroai.com</a></li>
                            <li className="text-slate-500 font-mono text-[11px]">Domain: lectoroai.com</li>
                            <li className="text-slate-500 font-mono text-[11px]">Version 1.0.0 (Manifest V3)</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div>{footer.copyright}</div>
                    <div className="text-center sm:text-right max-w-md">{footer.disclaimer}</div>
                </div>
            </div>
        </footer>
    );
}
