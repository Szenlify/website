import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideCatalogCopy } from "@/lib/guides/catalog";
import { getGuides, GUIDE_SLUGS } from "@/lib/guides";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates, getLocalizedHref } from "@/lib/routing";

const BASE_URL = "https://lectoroai.com";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const copy = getGuideCatalogCopy(locale);
    const path = "/guides";
    const canonical = `${BASE_URL}${getLocalizedHref(path, locale)}`;

    return {
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical,
            languages: getLanguageAlternates(BASE_URL, path),
        },
        openGraph: {
            type: "website",
            url: canonical,
            title: copy.title,
            description: copy.description,
            locale: LOCALE_CONFIG[locale].openGraph,
            images: [
                {
                    url: "/showcase/1.jpg",
                    width: 1280,
                    height: 800,
                    alt: copy.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: ["/showcase/1.jpg"],
        },
    };
}

export default async function GuidesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const copy = getGuideCatalogCopy(locale);
    const guides = getGuides(locale);
    const dict = await getDictionary(locale);
    const homeHref = getLocalizedHref("/", locale);
    const guidesHref = getLocalizedHref("/guides", locale);
    const canonical = `${BASE_URL}${guidesHref}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${canonical}#collection`,
                url: canonical,
                name: copy.title,
                description: copy.description,
                inLanguage: locale,
                mainEntity: {
                    "@type": "ItemList",
                    itemListElement: GUIDE_SLUGS.map((slug, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        url: `${BASE_URL}${getLocalizedHref(`/guides/${slug}`, locale)}`,
                        name: guides[slug].title,
                    })),
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: dict.privacy.breadcrumbHome,
                        item: `${BASE_URL}${homeHref}`,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: copy.label,
                        item: canonical,
                    },
                ],
            },
        ],
    };

    return (
        <section className="pb-24 pt-10 sm:pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex items-center gap-2 text-xs text-slate-400"
                >
                    <Link
                        href={homeHref}
                        className="transition hover:text-white"
                    >
                        {dict.privacy.breadcrumbHome}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-indigo-300">{copy.label}</span>
                </nav>

                <header className="max-w-4xl">
                    <p className="text-xs font-bold uppercase text-indigo-300">
                        {copy.eyebrow}
                    </p>
                    <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
                        {copy.title}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                        {copy.description}
                    </p>
                </header>

                <div className="mt-12 grid gap-7 lg:grid-cols-2">
                    {GUIDE_SLUGS.map((slug, index) => {
                        const guide = guides[slug];
                        const href = getLocalizedHref(
                            `/guides/${slug}`,
                            locale,
                        );
                        const image =
                            index === 0 ? "/showcase/1.jpg" : "/showcase/5.jpg";

                        return (
                            <article
                                key={slug}
                                className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1120]"
                            >
                                <Link href={href} className="group block">
                                    <Image
                                        src={image}
                                        alt={guide.title}
                                        width={1280}
                                        height={800}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="aspect-16/10 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                    />
                                    <div className="p-6 sm:p-8">
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                                            <span>{guide.eyebrow}</span>
                                            <span>{guide.readingTime}</span>
                                        </div>
                                        <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white transition group-hover:text-indigo-200">
                                            {guide.title}
                                        </h2>
                                        <p className="mt-4 line-clamp-3 leading-7 text-slate-300">
                                            {guide.description}
                                        </p>
                                        <span className="mt-6 inline-flex text-sm font-bold text-indigo-300">
                                            {copy.readGuide} →
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
