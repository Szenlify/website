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
        locale === "en" ? `${baseUrl}/privacy` : `${baseUrl}/${locale}/privacy`;

    return {
        title: dict.privacy.title,
        description: dict.meta.privacyDesc,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                "x-default": `${baseUrl}/privacy`,
                en: `${baseUrl}/privacy`,
                pl: `${baseUrl}/pl/privacy`,
                de: `${baseUrl}/de/privacy`,
                es: `${baseUrl}/es/privacy`,
                ja: `${baseUrl}/ja/privacy`,
            },
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Breadcrumb Bar */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <Link href={homeHref} className="hover:text-white transition">
                    {p.breadcrumbHome}
                </Link>
                <span>/</span>
                <span className="text-indigo-400 font-semibold">
                    {p.breadcrumbCurrent}
                </span>
            </div>

            <div className="glass-panel p-8 sm:p-12 shadow-2xl">
                {/* Document Header */}
                <div className="border-b border-white/10 pb-8 mb-8">
                    <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                        {p.badge}
                    </div>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
                        {p.title}
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                        {p.updatedAt}
                    </p>
                </div>

                {/* Callout Box: Google API & Manifest V3 Compliance */}
                <div className="bg-indigo-500/10 border-l-4 border-indigo-500 rounded-r-xl p-5 mb-8">
                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                        <span>{p.googleCallout.title}</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        {p.googleCallout.body}
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s1.heading}
                        </h2>
                        <p>{p.s1.p1}</p>
                        <p className="mt-2">{p.s1.p2}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s2.heading}
                        </h2>
                        <div className="space-y-3 pl-2">
                            <div>
                                <strong className="text-white">
                                    {p.s2.aLabel}
                                </strong>
                                <p className="text-slate-400">{p.s2.aText}</p>
                            </div>
                            <div>
                                <strong className="text-white">
                                    {p.s2.bLabel}
                                </strong>
                                <p className="text-slate-400">{p.s2.bText}</p>
                            </div>
                            <div>
                                <strong className="text-white">
                                    {p.s2.cLabel}
                                </strong>
                                <p className="text-slate-400">{p.s2.cText}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s3.heading}
                        </h2>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                            <li>
                                <strong className="text-white">—</strong>{" "}
                                {p.s3.l1}
                            </li>
                            <li>
                                <strong className="text-white">—</strong>{" "}
                                {p.s3.l2}
                            </li>
                            <li>
                                <strong className="text-white">—</strong>{" "}
                                {p.s3.l3}
                            </li>
                            <li>
                                <strong className="text-white">—</strong>{" "}
                                {p.s3.l4}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s4.heading}
                        </h2>
                        <p>{p.s4.intro}</p>
                        <ul className="list-disc pl-5 space-y-2 mt-3 text-slate-400">
                            <li>
                                <strong className="text-white">
                                    {p.s4.geminiLabel}
                                </strong>{" "}
                                {p.s4.geminiText}
                            </li>
                            <li>
                                <strong className="text-white">
                                    {p.s4.elevenlabsLabel}
                                </strong>{" "}
                                {p.s4.elevenlabsText}
                            </li>
                            <li>
                                <strong className="text-white">
                                    {p.s4.stripeLabel}
                                </strong>{" "}
                                {p.s4.stripeText}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s5.heading}
                        </h2>
                        <p>
                            {p.s5.p1.split("chrome.storage.local")[0]}
                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-xs">
                                chrome.storage.local
                            </code>
                            {p.s5.p1.split("chrome.storage.local")[1]}
                        </p>
                        <p className="mt-2">{p.s5.p2}</p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s6.heading}
                        </h2>
                        <p>{p.s6.intro}</p>
                        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-400">
                            <li>
                                <strong>{p.s6.l1label}</strong> {p.s6.l1text}
                            </li>
                            <li>
                                <strong>{p.s6.l2label}</strong> {p.s6.l2text}
                            </li>
                            <li>
                                <strong>{p.s6.l3label}</strong> {p.s6.l3text}
                            </li>
                            <li>
                                <strong>{p.s6.l4label}</strong> {p.s6.l4text}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-xl text-white mb-3">
                            {p.s7.heading}
                        </h2>
                        <p>{p.s7.p1}</p>
                        <div className="mt-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                            <div className="font-bold text-white">
                                {p.s7.teamName}
                            </div>
                            <div className="text-slate-400 text-xs mt-1">
                                {p.s7.domainLabel}{" "}
                                <span className="text-indigo-400">
                                    {p.s7.domain}
                                </span>
                            </div>
                            <div className="text-slate-400 text-xs">
                                {p.s7.emailLabel}{" "}
                                <a
                                    href={`mailto:${p.s7.email}`}
                                    className="text-indigo-400 font-mono"
                                >
                                    {p.s7.email}
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
