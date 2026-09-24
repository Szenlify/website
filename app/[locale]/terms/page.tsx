import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale, Mail, CheckCircle2 } from "lucide-react";
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
        locale === "en" ? `${baseUrl}/terms` : `${baseUrl}/${locale}/terms`;

    return {
        title: dict.terms.title,
        description: dict.meta.termsDesc,
        alternates: {
            canonical: canonicalUrl,
            languages: getLanguageAlternates(baseUrl, "/terms"),
        },
        openGraph: {
            type: "website",
            url: canonicalUrl,
            title: `${dict.terms.title} | Lectoro AI`,
            description: dict.meta.termsDesc,
        },
        twitter: {
            card: "summary",
            title: `${dict.terms.title} | Lectoro AI`,
            description: dict.meta.termsDesc,
        },
    };
}

export default async function LocaleTermsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const dict = await getDictionary(locale);
    const t = dict.terms;
    const homeHref = locale === "en" ? "/" : `/${locale}`;

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            {/* Breadcrumb Bar */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
                <Link href={homeHref} className="hover:text-white transition-colors">
                    {t.breadcrumbHome}
                </Link>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-indigo-400 font-semibold" aria-current="page">
                    {t.breadcrumbCurrent}
                </span>
            </nav>

            <article className="rounded-3xl border border-white/[0.08] bg-[#0c1020]/75 p-6 sm:p-12 backdrop-blur-2xl shadow-2xl shadow-black/80">
                {/* Document Header */}
                <header className="border-b border-white/[0.08] pb-8 mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                        <Scale className="size-3.5" />
                        <span>{t.badge}</span>
                    </div>
                    <h1 className="font-display font-black text-3xl sm:text-5xl text-white mb-3 tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                        {t.updatedAt}
                    </p>
                </header>

                {/* Terms Sections */}
                <div className="space-y-12 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s1.heading}
                        </h2>
                        <p>{t.s1.p1}</p>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s2.heading}
                        </h2>
                        <div className="space-y-3">
                            <p>{t.s2.p1}</p>
                            <p>{t.s2.p2}</p>
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s3.heading}
                        </h2>
                        <div className="space-y-4">
                            {t.s3.sellerLabel && (
                                <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5">
                                    <strong className="text-white block mb-1 font-semibold">
                                        {t.s3.sellerLabel}
                                    </strong>
                                    <p className="text-slate-300 text-sm leading-relaxed">{t.s3.sellerText}</p>
                                </div>
                            )}
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">{t.s3.aLabel}</strong>
                                <p className="text-slate-300 text-sm">{t.s3.aText}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">{t.s3.bLabel}</strong>
                                <p className="text-slate-300 text-sm">{t.s3.bText}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">{t.s3.cLabel}</strong>
                                <p className="text-slate-300 text-sm">{t.s3.cText}</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <strong className="text-white block mb-1 font-semibold">{t.s3.dLabel}</strong>
                                <p className="text-slate-300 text-sm">{t.s3.dText}</p>
                            </div>
                            {t.s3.eLabel && (
                                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                    <strong className="text-white block mb-1 font-semibold">{t.s3.eLabel}</strong>
                                    <p className="text-slate-300 text-sm">{t.s3.eText}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s4.heading}
                        </h2>
                        <p className="mb-4">{t.s4.intro}</p>
                        <ul className="space-y-2.5">
                            {[t.s4.l1, t.s4.l2, t.s4.l3, t.s4.l4].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="size-4 text-indigo-400 shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s5.heading}
                        </h2>
                        <p>{t.s5.p1}</p>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s6.heading}
                        </h2>
                        <div className="space-y-3">
                            <p>{t.s6.p1}</p>
                            <p>{t.s6.p2}</p>
                        </div>
                    </section>

                    <section className="border-b border-white/[0.06] pb-10">
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s7.heading}
                        </h2>
                        <p>{t.s7.p1}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">
                            {t.s8.heading}
                        </h2>
                        <p className="mb-4">{t.s8.p1}</p>
                        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-indigo-950/40 via-[#0e1329] to-transparent p-6 sm:p-8">
                            <div className="font-display font-bold text-lg text-white mb-2">
                                {t.s8.teamName}
                            </div>
                            <div className="space-y-1.5 text-sm text-slate-300">
                                <div>
                                    <span className="text-slate-500 mr-2">{t.s8.domainLabel}</span>
                                    <span className="text-indigo-300 font-medium">{t.s8.domain}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 mr-2">{t.s8.emailLabel}</span>
                                    <a
                                        href={`mailto:${t.s8.email}`}
                                        className="text-indigo-400 hover:text-indigo-300 font-mono transition-colors inline-flex items-center gap-1.5"
                                    >
                                        <Mail className="size-3.5" />
                                        <span>{t.s8.email}</span>
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
