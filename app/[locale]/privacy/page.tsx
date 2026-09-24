import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, Lock, ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getLanguageAlternates } from "@/lib/routing";

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
        locale === "en" ? `${baseUrl}/privacy` : `${baseUrl}/${locale}/privacy`;

    return {
        title: dict.privacy.title,
        description: dict.meta.privacyDesc,
        alternates: {
            canonical: canonicalUrl,
            languages: getLanguageAlternates(baseUrl, "/privacy"),
        },
        openGraph: {
            type: "website",
            url: canonicalUrl,
            title: `${dict.privacy.title} | Lectoro AI`,
            description: dict.meta.privacyDesc,
        },
        twitter: {
            card: "summary",
            title: `${dict.privacy.title} | Lectoro AI`,
            description: dict.meta.privacyDesc,
        },
    };
}

export default async function LocalePrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const dict = await getDictionary(locale);
    const p = dict.privacy;
    const homeHref = locale === "en" ? "/" : `/${locale}`;

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            {/* Breadcrumb Bar */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
                <Link href={homeHref} className="hover:text-white transition-colors">
                    {p.breadcrumbHome}
                </Link>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-indigo-400 font-semibold" aria-current="page">
                    {p.breadcrumbCurrent}
                </span>
            </nav>

            <article className="rounded-3xl border border-white/[0.08] bg-[#0c1020]/75 p-6 sm:p-12 backdrop-blur-2xl shadow-2xl shadow-black/80">
                {/* Document Header */}
                <header className="border-b border-white/[0.08] pb-8 mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                        <Shield className="size-3.5" />
                        <span>{p.badge}</span>
                    </div>
                    <h1 className="font-display font-black text-3xl sm:text-5xl text-white mb-3 tracking-tight">
                        {p.title}
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                        {p.updatedAt}
                    </p>
                </header>

                {/* Callout Box: Google API & Manifest V3 Compliance */}
                <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 sm:p-6 mb-10 flex items-start gap-4">
                    <Lock className="size-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                        <h2 className="text-sm sm:text-base font-bold text-white mb-1.5">
                            {p.googleCallout.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {p.googleCallout.body}
                        </p>
                    </div>
                </div>

                {/* Policy Sections */}
                <div className="space-y-12 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s1.heading}
                        </h2>
                        <div className="space-y-3">
                            <p>{p.s1.p1}</p>
                            <p>{p.s1.p2}</p>
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s2.heading}
                        </h2>
                        <div className="space-y-4">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">
                                    {p.s2.aLabel}
                                </strong>
                                <p className="text-slate-300 text-sm">{p.s2.aText}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">
                                    {p.s2.bLabel}
                                </strong>
                                <p className="text-slate-300 text-sm">{p.s2.bText}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">
                                    {p.s2.cLabel}
                                </strong>
                                <p className="text-slate-300 text-sm">{p.s2.cText}</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s3.heading}
                        </h2>
                        <ul className="space-y-2.5">
                            {[p.s3.l1, p.s3.l2, p.s3.l3, p.s3.l4].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s4.heading}
                        </h2>
                        <p className="mb-4">{p.s4.intro}</p>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1">{p.s4.aiLabel}</strong>
                                <p className="text-slate-300 text-sm">{p.s4.aiText}</p>
                            </div>
                            {p.s4.cloudflareLabel && (
                                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                    <strong className="text-white block mb-1">{p.s4.cloudflareLabel}</strong>
                                    <p className="text-slate-300 text-sm">{p.s4.cloudflareText}</p>
                                </div>
                            )}
                            {p.s4.firebaseLabel && (
                                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                    <strong className="text-white block mb-1">{p.s4.firebaseLabel}</strong>
                                    <p className="text-slate-300 text-sm">{p.s4.firebaseText}</p>
                                </div>
                            )}
                            {p.s4.translateLabel && (
                                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                    <strong className="text-white block mb-1">{p.s4.translateLabel}</strong>
                                    <p className="text-slate-300 text-sm">{p.s4.translateText}</p>
                                </div>
                            )}
                            {p.s4.elevenlabsLabel && (
                                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                    <strong className="text-white block mb-1">{p.s4.elevenlabsLabel}</strong>
                                    <p className="text-slate-300 text-sm">{p.s4.elevenlabsText}</p>
                                </div>
                            )}
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1">{p.s4.stripeLabel}</strong>
                                <p className="text-slate-300 text-sm">{p.s4.stripeText}</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s5.heading}
                        </h2>
                        <div className="space-y-3">
                            <p>
                                {p.s5.p1.split("chrome.storage.local")[0]}
                                <code className="bg-white/10 px-2 py-0.5 rounded text-indigo-300 font-mono text-xs">
                                    chrome.storage.local
                                </code>
                                {p.s5.p1.split("chrome.storage.local")[1]}
                            </p>
                            <p>{p.s5.p2}</p>
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s6.heading}
                        </h2>
                        <p className="mb-4">{p.s6.intro}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 text-sm">{p.s6.l1label}</strong>
                                <p className="text-slate-400 text-xs">{p.s6.l1text}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 text-sm">{p.s6.l2label}</strong>
                                <p className="text-slate-400 text-xs">{p.s6.l2text}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 text-sm">{p.s6.l3label}</strong>
                                <p className="text-slate-400 text-xs">{p.s6.l3text}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 text-sm">{p.s6.l4label}</strong>
                                <p className="text-slate-400 text-xs">{p.s6.l4text}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {p.s7.heading}
                        </h2>
                        <p className="mb-4">{p.s7.p1}</p>
                        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-indigo-950/40 via-[#0e1329] to-transparent p-6 sm:p-8">
                            <div className="font-display font-bold text-lg text-white mb-2">
                                {p.s7.teamName}
                            </div>
                            <div className="space-y-1.5 text-sm text-slate-300">
                                <div>
                                    <span className="text-slate-500 mr-2">{p.s7.domainLabel}</span>
                                    <span className="text-indigo-300 font-medium">{p.s7.domain}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 mr-2">{p.s7.emailLabel}</span>
                                    <a
                                        href={`mailto:${p.s7.email}`}
                                        className="text-indigo-400 hover:text-indigo-300 font-mono transition-colors inline-flex items-center gap-1.5"
                                    >
                                        <Mail className="size-3.5" />
                                        <span>{p.s7.email}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
        </main>
    );
}
