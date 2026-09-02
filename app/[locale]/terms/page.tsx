import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

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
            languages: {
                "x-default": `${baseUrl}/terms`,
                en: `${baseUrl}/terms`,
                pl: `${baseUrl}/pl/terms`,
                de: `${baseUrl}/de/terms`,
                es: `${baseUrl}/es/terms`,
                ja: `${baseUrl}/ja/terms`,
            },
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Breadcrumb Bar */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <Link href={homeHref} className="hover:text-white transition">
                    {t.breadcrumbHome}
                </Link>
                <span>/</span>
                <span className="text-indigo-400 font-semibold">
                    {t.breadcrumbCurrent}
                </span>
            </div>

            <div className="glass-panel p-8 sm:p-12 shadow-2xl">
                {/* Document Header */}
                <div className="border-b border-white/10 pb-8 mb-8">
                    <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                        {t.badge}
                    </div>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
                        {t.title}
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                        {t.updatedAt}
                    </p>
                </div>

                {/* Terms Sections */}
                <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s1.heading}
                        </h2>
                        <p>{t.s1.p1}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s2.heading}
                        </h2>
                        <p>{t.s2.p1}</p>
                        <p className="mt-2">{t.s2.p2}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s3.heading}
                        </h2>
                        <div className="space-y-3 pl-2">
                            <div>
                                <strong className="text-white">
                                    {t.s3.aLabel}
                                </strong>
                                <p className="text-slate-400">{t.s3.aText}</p>
                            </div>
                            <div>
                                <strong className="text-white">
                                    {t.s3.bLabel}
                                </strong>
                                <p className="text-slate-400">{t.s3.bText}</p>
                            </div>
                            <div>
                                <strong className="text-white">
                                    {t.s3.cLabel}
                                </strong>
                                <p className="text-slate-400">{t.s3.cText}</p>
                            </div>
                            <div>
                                <strong className="text-white">
                                    {t.s3.dLabel}
                                </strong>
                                <p className="text-slate-400">{t.s3.dText}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s4.heading}
                        </h2>
                        <p>{t.s4.intro}</p>
                        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-400">
                            <li>{t.s4.l1}</li>
                            <li>{t.s4.l2}</li>
                            <li>{t.s4.l3}</li>
                            <li>{t.s4.l4}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s5.heading}
                        </h2>
                        <p>{t.s5.p1}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s6.heading}
                        </h2>
                        <p>{t.s6.p1}</p>
                        <p className="mt-2">{t.s6.p2}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s7.heading}
                        </h2>
                        <p>{t.s7.p1}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {t.s8.heading}
                        </h2>
                        <p>{t.s8.p1}</p>
                        <div className="mt-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                            <div className="font-bold text-white">
                                {t.s8.teamName}
                            </div>
                            <div className="text-slate-400 text-xs mt-1">
                                {t.s8.domainLabel}{" "}
                                <span className="text-indigo-400">
                                    {t.s8.domain}
                                </span>
                            </div>
                            <div className="text-slate-400 text-xs">
                                {t.s8.emailLabel}{" "}
                                <a
                                    href={`mailto:${t.s8.email}`}
                                    className="text-indigo-400 font-mono"
                                >
                                    {t.s8.email}
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
