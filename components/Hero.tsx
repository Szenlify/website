import Image from "next/image";
import { Check } from "lucide-react";
import ChromeInstallButton from "./ChromeInstallButton";
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
                    <ChromeInstallButton label={hero.installCta} />
                </div>

                {/* Trust signals */}
                <div className={`${styles.trust} flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium`}>
                    <span className="inline-flex items-center gap-2 text-slate-300">
                        <Check className="size-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                        <span>{hero.builtFor}</span>
                    </span>
                    <span className="size-1 rounded-full bg-slate-700 hidden sm:inline-block shrink-0" aria-hidden="true" />
                    <span className="inline-flex items-center gap-2 text-emerald-300">
                        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] shrink-0" aria-hidden="true" />
                        <span className="font-semibold tracking-wide">{hero.trialBadge}</span>
                    </span>
                </div>
            </div>

            {/* Hero Image Showcase - Flush to bottom section */}
            <div className={`${styles.showcase} relative mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-6xl`}>
                {/* Ambient dual-tone glow matching the cyan and amber energy in hero.png */}
                <div
                    aria-hidden="true"
                    className={`${styles.ambientGlow} pointer-events-none absolute -inset-x-4 sm:-inset-x-8 -top-8 sm:-top-16 bottom-0 rounded-t-3xl bg-linear-to-r from-cyan-500/25 via-indigo-500/20 to-amber-500/25 blur-3xl opacity-60`}
                />

                {/* Glassmorphic Frame - rounded top, flush bottom */}
                <div className="relative rounded-t-2xl sm:rounded-t-3xl lg:rounded-t-[32px] border-t border-x border-white/15 bg-slate-950/80 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Top specular highlight line */}
                    <div
                        aria-hidden="true"
                        className={`${styles.frameHighlight} pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-linear-to-r from-transparent via-white/35 to-transparent z-10`}
                    />

                    <div className={styles.artworkShine} aria-hidden="true" />

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
