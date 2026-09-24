import Image from "next/image";
import type { Dict } from "@/lib/i18n/types";
import "./platforms.css";

interface PlatformsProps {
    dict: Pick<Dict, "platforms">;
}

const PLATFORMS = [
    {
        name: "Netflix",
        title: "Netflix Dual Subtitles & Video Flashcards",
        render: () => (
            <Image
                src="/platforms/netflix.png"
                alt="Netflix"
                width={120}
                height={33}
                className="h-5 sm:h-6 w-auto object-contain brightness-95 group-hover:brightness-110 transition-all duration-200"
            />
        ),
    },
    {
        name: "YouTube",
        title: "YouTube Dual Subtitles & Focus Mode",
        render: () => (
            <div className="flex items-center gap-2.5">
                <svg
                    className="h-5 sm:h-6 w-auto shrink-0 transition-transform duration-200 group-hover:scale-105"
                    viewBox="0 0 28.57 20"
                    fill="none"
                    role="img"
                    aria-label="YouTube"
                >
                    <path
                        d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12324 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12324 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z"
                        fill="#FF0000"
                    />
                    <path
                        d="M11.4253 14.2854L18.854 10L11.4253 5.7146V14.2854Z"
                        fill="white"
                    />
                </svg>
                <span className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
                    YouTube
                </span>
            </div>
        ),
    },
    {
        name: "TED",
        title: "TED Talks Transcripts & Vocabulary",
        render: () => (
            <div className="flex items-center gap-2">
                <svg
                    className="h-5 sm:h-6 w-auto shrink-0 transition-transform duration-200 group-hover:scale-105"
                    aria-hidden="true"
                    viewBox="0 0 68 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.419 0V6.15129H14.6559V24H7.21617V6.15129H0.453125V0H21.419ZM42.9026 0V6.14144L29.985 6.15129V9.09722H42.9026V14.8271L29.985 14.8182V17.8489H42.9026V24H22.5455V0H42.9026ZM56.3491 0C64.3969 0 67.2375 5.91584 67.2375 11.9665C67.2375 19.3279 63.3154 24 54.8947 24H44.1417V0H56.3491ZM53.9481 6.15129H51.5812V17.8489H54.489C59.122 17.8489 59.7983 14.1177 59.7983 11.8658C59.7983 10.3532 59.3247 6.15129 53.9481 6.15129Z"
                        fill="#EB0028"
                    />
                </svg>
                <span className="font-display font-semibold text-xs sm:text-sm text-slate-400 uppercase tracking-widest">
                    Talks
                </span>
            </div>
        ),
    },
    {
        name: "Plex",
        title: "Plex Media Streaming & Subtitles",
        render: () => (
            <div className="flex items-center gap-2.5">
                <svg
                    className="h-5 sm:h-6 w-auto shrink-0 transition-transform duration-200 group-hover:scale-105"
                    viewBox="0 0 28 28"
                    fill="none"
                    role="img"
                    aria-label="Plex"
                >
                    <path
                        d="M18.6667 14L8.4 0H0L10.2667 14L0 28H8.4L18.6667 14Z"
                        fill="#E5A00D"
                    />
                    <path
                        d="M28 14L17.7333 0H9.33333L19.6 14L9.33333 28H17.7333L28 14Z"
                        fill="#EB9C00"
                    />
                </svg>
                <span className="font-display font-extrabold text-lg sm:text-xl text-[#E5A00D] tracking-wider">
                    PLEX<span className="text-xs text-slate-400 font-normal">.tv</span>
                </span>
            </div>
        ),
    },
    {
        name: "Anki",
        title: "Anki Spaced Repetition SRS Export",
        render: () => (
            <div className="flex items-center gap-2.5">
                <Image
                    src="/platforms/anki.png"
                    alt="Anki"
                    width={40}
                    height={40}
                    className="size-5 sm:size-6 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span className="font-display font-bold text-base sm:text-lg text-slate-200">
                    Anki SRS
                </span>
            </div>
        ),
    },
    {
        name: "X",
        title: "X (Twitter) In-Page Translation",
        render: () => (
            <div className="flex items-center gap-2.5">
                <svg
                    className="size-4.5 sm:size-5 shrink-0 fill-white transition-transform duration-200 group-hover:scale-105"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="X"
                >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="font-display font-bold text-sm sm:text-base text-slate-200">
                    X / Social
                </span>
            </div>
        ),
    },
];

// Duplicate items 4 times to ensure seamless infinite looping on all screen sizes
const MARQUEE_ITEMS = [...PLATFORMS, ...PLATFORMS, ...PLATFORMS, ...PLATFORMS];

export default function Platforms({ dict }: PlatformsProps) {
    const { platforms } = dict;

    return (
        <section
            className="py-10 sm:py-14 border-y border-white/[0.06] bg-gradient-to-b from-[#070913] via-[#080b18]/60 to-[#070913] relative z-10 overflow-hidden"
            aria-label={platforms.label}
        >
            {/* Ambient center radial glow */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-amber-500/10 blur-3xl opacity-40"
                aria-hidden="true"
            />

            {/* Gradient edge masks to fade logos smoothly in and out */}
            <div
                className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 lg:w-44 bg-gradient-to-r from-[#070913] to-transparent z-20"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 lg:w-44 bg-gradient-to-l from-[#070913] to-transparent z-20"
                aria-hidden="true"
            />

            <div className="relative z-10">
                {/* Header label */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider p-6 text-slate-400">
                        <span>{platforms.label}</span>
                    </div>
                </div>

                {/* Animated Marquee Strip (Left to Right) */}
                <div className="overflow-hidden w-full select-none py-1">
                    <div className="platforms-track flex items-center gap-4 sm:gap-6">
                        {MARQUEE_ITEMS.map((item, idx) => (
                            <div
                                key={idx}
                                className={`inline-flex items-center justify-center px-8 py-3 sm:px-16 sm:py-3.5 transition-all duration-300 hover:-translate-y-0.5 shadow-xs hover:shadow-lg cursor-default select-none shrink-0 group`}
                                title={item.title}
                            >
                                {item.render()}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
