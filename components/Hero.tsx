import Image from "next/image";
import Link from "next/link";
import { CHROME_STORE_URL } from "@/lib/config";
import type { Dict } from "@/lib/i18n/types";
import styles from "./Hero.module.css";

interface HeroProps {
    dict: Dict;
}

export default function Hero({ dict }: HeroProps) {
    const { hero } = dict;
    return (
        <section className="relative pt-12 pb-0 sm:pt-20 sm:pb-0 lg:pt-28 lg:pb-0 text-center overflow-hidden">
            <div className={`${styles.intro} max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`}>
                {/* Live Pill Badge */}
                <div className={`${styles.badge} inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 sm:text-xs text-[11px] font-light text-amber-200 uppercase mb-6 sm:mb-8`}>
                    <span className={styles.waveform} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                    <span>{hero.badge}</span>
                </div>

                {/* Main Hero Headline */}
                <h1 className={`${styles.title} font-display font-black text-[clamp(2.10rem,1.10rem+4.1vw,4.1rem)] text-balance leading-[1.08] tracking-tight text-white mb-6 sm:mb-8`}>
                    {hero.title}{" "}
                    <span className={`${styles.gradientHighlight} text-gradient`}>{hero.titleHighlight}</span>
                </h1>

                {/* Hero Subtitle */}
                <p className={`${styles.subtitle} font-body text-base sm:text-lg lg:text-xl text-slate-200/95 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12 font-normal text-balance`}>
                    {hero.subtitle}
                </p>

                {/* Hero CTA */}
                <div className={`${styles.actions} flex items-center justify-center mb-8 sm:mb-12`}>
                    <Link
                        href={CHROME_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.chromeInstallBtn} group w-full sm:w-auto inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0`}
                    >
                        {/* Animated rotating border sweep */}
                        <span className={styles.borderSweep} aria-hidden="true" />

                        {/* Button inner content */}
                        <span className={styles.btnInner}>
                            <svg
                                height={26}
                                width={26}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="shrink-0 transition-transform duration-300 group-hover:scale-105"
                            >
                                <path d="M188.8 255.93a67.2 67.2 0 1 0 67.2-67.18 67.38 67.38 0 0 0-67.2 67.18" />
                                <path d="M476.75 217.79v.05a207 207 0 0 0-7-28.84h-.11a202 202 0 0 1 7.07 29 203.5 203.5 0 0 0-7.07-29h-155.4c19.05 17 31.36 40.17 31.36 67.05a86.55 86.55 0 0 1-12.31 44.73L231 478.45a2 2 0 0 1 0 .27v.28-.26a224 224 0 0 0 25 1.26c6.84 0 13.61-.39 20.3-1a223 223 0 0 0 29.78-4.74C405.68 451.52 480 362.4 480 255.94a225 225 0 0 0-3.25-38.15" />
                                <path d="M256 345.5c-33.6 0-61.6-17.91-77.29-44.79L76 123.05l-.14-.24A224 224 0 0 0 207.4 474.55v-.05l77.69-134.6a84.1 84.1 0 0 1-29.09 5.6" />
                                <path d="m91.29 104.57 77.35 133.25A89.19 89.19 0 0 1 256 166h205.17a246.5 246.5 0 0 0-25.78-43.94l.12.08A245.3 245.3 0 0 1 461.17 166h.17a246 246 0 0 0-25.66-44 2.6 2.6 0 0 1-.35-.26 223.93 223.93 0 0 0-344.19-17.4l.14.24Z" />
                            </svg>
                            <span>{hero.installCta}</span>
                        </span>
                    </Link>
                </div>

                {/* Trust signals */}
                <div className={`${styles.trust} flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium`}>
                    <span className="text-slate-400">{hero.builtFor}</span>
                    <span className="text-slate-600 hidden xs:inline" aria-hidden="true">•</span>
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-xs tracking-wide">
                        <span className="size-1.5 rounded-full bg-teal-400" aria-hidden="true" />
                        {hero.trialBadge}
                    </span>
                </div>
            </div>

            {/* Hero Image Showcase - Flush to bottom section */}
            <div className="relative mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-6xl">
                {/* Ambient dual-tone glow matching the cyan and amber energy in hero.png */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-4 sm:-inset-x-8 -top-8 sm:-top-16 bottom-0 rounded-t-3xl bg-linear-to-r from-cyan-500/25 via-indigo-500/20 to-amber-500/25 blur-3xl opacity-60"
                />

                {/* Glassmorphic Frame - rounded top, flush bottom */}
                <div className="relative rounded-t-2xl sm:rounded-t-3xl lg:rounded-t-[32px] border-t border-x border-white/15 bg-slate-950/80 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Top specular highlight line */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-linear-to-r from-transparent via-white/35 to-transparent z-10"
                    />

                    {/* Hero Artwork Image */}
                    <Image
                        src="/hh.png"
                        alt={`${hero.title} ${hero.titleHighlight}`}
                        width={1672}
                        height={941}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1152px"
                        className="w-full h-auto object-cover border-t-radius-9xl object-top block"
                    />

                    {/* Subtle bottom fade melting into the next section */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 lg:h-32 bg-linear-to-t from-[#070913] via-[#070913]/35 to-transparent z-10"
                    />
                </div>
            </div>
        </section>
    );
}
