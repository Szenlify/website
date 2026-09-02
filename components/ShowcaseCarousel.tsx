"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { Dict } from "@/lib/i18n/types";

export interface CarouselItem {
    src: string;
    alt?: string;
    title?: string;
}

/**
 * 📸 LISTA ZDJĘĆ DO KARUZELI:
 * Tutaj możesz podawać kolejne zdjęcia z folderu /public
 */
export const DEFAULT_SHOWCASE_IMAGES: (string | CarouselItem)[] = [
    {
        src: "/showcase/1.jpg",
        alt: "Lectoro AI clickable subtitles and translation panel on a TED video",
        title: "Learn from Clickable Video Subtitles",
    },
    {
        src: "/showcase/2.jpg",
        alt: "Lectoro AI Chrome extension translating selected text and subtitles on X",
        title: "Translate Text on Any Web Page",
    },
    {
        src: "/showcase/3.jpg",
        alt: "Lectoro AI setup guide for YouTube and Netflix subtitles, keyboard shortcuts and flashcard reviews",
        title: "Video Learning and Review Workflow",
    },
    {
        src: "/showcase/4.jpg",
        alt: "Lectoro AI English to German subtitle translation with a contextual AI explanation on YouTube",
        title: "AI Explains Phrases in Context",
    },
    {
        src: "/showcase/5.jpg",
        alt: "Lectoro AI spaced-repetition flashcard with a saved Netflix scene snapshot",
        title: "Review Video Flashcards with SRS",
    },
    {
        src: "/showcase/6.jpg",
        alt: "Lectoro AI toolbar translating and reading selected words on an X post",
        title: "Translate, Listen or Ask AI",
    },
    {
        src: "/showcase/wardog.png",
        alt: "Lectoro AI English to French translation and idiom explanation over a video",
        title: "Understand Idioms While Watching",
    },
    {
        src: "/showcase/plex.png",
        alt: "Lectoro AI daily flashcard review open beside the Plex streaming catalog",
        title: "Learn and Review Vocabulary on Plex",
    },
];

interface ShowcaseCarouselProps {
    images?: (string | CarouselItem)[];
    labels: Pick<Dict, "showcase">["showcase"];
}

export default function ShowcaseCarousel({
    images = DEFAULT_SHOWCASE_IMAGES,
    labels,
}: ShowcaseCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const normalizedImages = images.map((item, idx) => {
        if (typeof item === "string") {
            return {
                src: item,
                alt: `Showcase slide ${idx + 1}`,
            };
        }
        return item;
    });

    useEffect(() => {
        if (!api) return;
        const updateCurrentIndex = () =>
            setCurrentIndex(api.selectedScrollSnap());
        updateCurrentIndex();
        api.on("select", updateCurrentIndex);
        api.on("reInit", updateCurrentIndex);
        return () => {
            api.off("select", updateCurrentIndex);
            api.off("reInit", updateCurrentIndex);
        };
    }, [api]);

    return (
        <section className="py-14 sm:py-20 relative z-10 overflow-hidden bg-[#04060e]/50 border-b border-white/5 w-full">
            <Carousel
                setApi={setApi}
                opts={{ align: "center", containScroll: false }}
                className="w-full"
                aria-labelledby="showcase-title"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex items-end justify-between gap-4">
                    <div className="hidden w-24 sm:block" />
                    <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 block">
                            {labels.tag}
                        </span>
                        <h2
                            id="showcase-title"
                            className="font-display font-extrabold text-2xl sm:text-4xl text-white"
                        >
                            {labels.title}
                        </h2>
                    </div>
                    <div className="flex w-24 items-center justify-end gap-2 shrink-0">
                        <CarouselPrevious
                            aria-label={labels.previous}
                            className="static size-10 rounded-xl sm:size-11"
                        />
                        <CarouselNext
                            aria-label={labels.next}
                            className="static size-10 rounded-xl sm:size-11"
                        />
                    </div>
                </div>

                <CarouselContent className="items-center gap-4 py-6 sm:gap-8">
                    {normalizedImages.map((img, index) => {
                        const isActive = currentIndex === index;

                        return (
                            <CarouselItem
                                key={img.src}
                                className="basis-auto"
                                aria-label={`${labels.slideLabel} ${index + 1} / ${normalizedImages.length}`}
                            >
                                <div
                                    className={`h-90 md:h-[44vh] rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 relative group flex items-center justify-center shadow-2xl ${
                                        isActive
                                            ? "border-indigo-500/60 shadow-indigo-500/25 scale-100 opacity-100"
                                            : "border-white/10 shadow-black/80 scale-[0.9] opacity-65 hover:opacity-85 hover:scale-[0.97]"
                                    }`}
                                >
                                    <div className="relative h-full w-auto flex items-center justify-center bg-[#080b19]">
                                        <Image
                                            src={img.src}
                                            alt={
                                                img.alt ||
                                                `Lectoro Screenshot ${index + 1}`
                                            }
                                            width={1800}
                                            height={1100}
                                            sizes="(max-width: 640px) 86vw, 78vw"
                                            draggable={false}
                                            className="h-full w-auto max-w-[86vw] sm:max-w-[78vw] object-contain rounded-2xl sm:rounded-3xl pointer-events-none"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#070913]/85 via-[#070913]/30 to-transparent pointer-events-none" />
                                        {img.title && (
                                            <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 text-left pointer-events-none">
                                                <span className="text-xs sm:text-sm font-semibold text-white/95 drop-shadow-md bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 inline-flex items-center gap-2">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${isActive ? "bg-cyan-400 animate-pulse" : "bg-white/40"}`}
                                                    />
                                                    <span>{img.title}</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <div className="flex items-center justify-center gap-2 mt-4">
                    {normalizedImages.map((_, index) => (
                        <Button
                            key={index}
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => api?.scrollTo(index)}
                            className={`h-4 min-w-4 rounded-full p-0 transition-all duration-300 ${
                                currentIndex === index
                                    ? "w-8 bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-400"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={`${labels.slideLabel} ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    );
}
