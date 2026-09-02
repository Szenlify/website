import Image from "next/image";
import React from "react";
import type { Dict } from "@/lib/i18n/types";

interface PlatformsProps {
    dict: Pick<Dict, "platforms">;
}

export default function Platforms({ dict }: PlatformsProps) {
    const { platforms } = dict;
    return (
        <section className="py-10 sm:py-12 border-y border-white/10 bg-[#050711]/60 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                    {platforms.label}
                </p>

                <div className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-14 flex-wrap">
                    {/* Netflix */}
                    <Image
                        src="/platforms/netflix.png"
                        alt="Netflix"
                        width={100}
                        height={100}
                        sizes="(max-width: 640px) 48px, 56px"
                        className="size-12 object-contain sm:size-14"
                    />

                    {/* YouTube */}
                    <div
                        className="flex items-center gap-2"
                        title="YouTube Dual Subtitles"
                    >
                        <svg
                            className="h-6 sm:h-7 w-auto group-hover:scale-105 transition-transform duration-200"
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
                        <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tighter">
                            YouTube
                        </span>
                    </div>

                    {/* TED Talks */}
                    <svg
                        className="h-6 lg:mr-3"
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
                        ></path>
                    </svg>

                    {/* X.com */}

                    <svg
                        className="h-5 sm:h-6 w-auto fill-white group-hover:scale-105 transition-transform duration-200"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="X"
                    >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>

                    {/* Plex.tv */}
                    <div
                        className="flex items-center gap-2"
                        title="Plex Media Server & Streaming"
                    >
                        <svg
                            className="h-6 sm:h-7 w-auto group-hover:scale-105 transition-transform duration-200"
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
                            PLEX
                            <span className="text-xs text-slate-400 font-normal">
                                .tv
                            </span>
                        </span>
                    </div>

                    {/* Any Web Article & Docs */}
                    <div
                        className="flex items-center gap-2.5"
                        title="Any Web Page, Article or Documentation"
                    >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-200">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <span className="font-display font-semibold text-sm sm:text-base text-slate-200">
                            {platforms.anyWeb}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
