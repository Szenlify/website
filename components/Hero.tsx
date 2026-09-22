import Link from "next/link";
import { CHROME_STORE_URL } from "@/lib/config";
import type { Dict } from "@/lib/i18n/types";

interface HeroProps {
    dict: Dict;
}

export default function Hero({ dict }: HeroProps) {
    const { hero } = dict;
    return (
        <section className="relative pt-20 pb-16 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Live Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 tracking-wide uppercase mb-6">
                    <span>{hero.badge}</span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white mb-6">
                    {hero.title}{" "}
                    <span className="text-gradient">{hero.titleHighlight}</span>
                </h1>

                {/* Hero Subtitle */}
                <p className="font-body text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-3xl mx-auto mb-10">
                    {hero.subtitle}
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                        href={CHROME_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 rounded-2xl text-base font-extrabold text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        <svg
                            height={32}
                            width={32}
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="ionicon shrink-0"
                        >
                            <path d="M188.8 255.93a67.2 67.2 0 1 0 67.2-67.18 67.38 67.38 0 0 0-67.2 67.18" />
                            <path d="M476.75 217.79v.05a207 207 0 0 0-7-28.84h-.11a202 202 0 0 1 7.07 29 203.5 203.5 0 0 0-7.07-29h-155.4c19.05 17 31.36 40.17 31.36 67.05a86.55 86.55 0 0 1-12.31 44.73L231 478.45a2 2 0 0 1 0 .27v.28-.26a224 224 0 0 0 25 1.26c6.84 0 13.61-.39 20.3-1a223 223 0 0 0 29.78-4.74C405.68 451.52 480 362.4 480 255.94a225 225 0 0 0-3.25-38.15" />
                            <path d="M256 345.5c-33.6 0-61.6-17.91-77.29-44.79L76 123.05l-.14-.24A224 224 0 0 0 207.4 474.55v-.05l77.69-134.6a84.1 84.1 0 0 1-29.09 5.6" />
                            <path d="m91.29 104.57 77.35 133.25A89.19 89.19 0 0 1 256 166h205.17a246.5 246.5 0 0 0-25.78-43.94l.12.08A245.3 245.3 0 0 1 461.17 166h.17a246 246 0 0 0-25.66-44 2.6 2.6 0 0 1-.35-.26 223.93 223.93 0 0 0-344.19-17.4l.14.24Z" />
                        </svg>
                        <span>{hero.installCta}</span>
                        <span className="px-2.5 absolute -top-2 -left-3 sm:-left-6 rotate-[-27deg] py-1 rounded-lg text-xs font-extrabold -tracking-widest bg-teal-500 text-amber-200 uppercase">
                            <span className="animate-pulse">
                                {hero.trialBadge}
                            </span>
                        </span>
                    </Link>

                    <Link
                        href="#demo"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        <span>{hero.demoCta}</span>
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-400 font-medium">
                    {/* <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>★★★★★</span>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-slate-400 font-normal">(1,280+ ratings)</span>
          </div> */}
                    {/* <span>•</span> */}
                    <span>{hero.builtFor}</span>
                </div>
            </div>

            <div id="demo" className="relative mx-3 mt-8 max-w-5xl scroll-mt-24 sm:mx-6 sm:mt-12 lg:mx-auto">
                <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-3xl bg-linear-to-r from-indigo-500/20 via-purple-500/15 to-cyan-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:rounded-3xl">
                    <video
                        className="block max-h-[80svh] w-full object-contain"
                        width={1200}
                        height={600}
                        controls
                        playsInline
                        preload="metadata"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        aria-label={dict.hero.demoCta}
                    >
                        <source src="/v1.webm" type="video/webm" />
                        <source src="/v1.mp4" type="video/mp4" />
                        <a href="/v1.mp4">{dict.hero.demoCta}</a>
                    </video>
                </div>
            </div>
        </section>
    );
}
