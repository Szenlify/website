"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

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
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/2.jpg",
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/3.jpg",
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/4.jpg",
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/5.jpg",
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/6.jpg",
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/wardog.png",
        alt: "Master Idioms & Context with AI",
        title: "Master Idioms & Context with AI",
    },
    {
        src: "/showcase/plex.png",
        alt: "Flashcards within reach",
        title: "Flashcards within reach",
    },
];

interface ShowcaseCarouselProps {
    images?: (string | CarouselItem)[];
}

export default function ShowcaseCarousel({
    images = DEFAULT_SHOWCASE_IMAGES,
}: ShowcaseCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Mouse Drag State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const startXRef = useRef<number>(0);
    const startScrollLeftRef = useRef<number>(0);
    const isMovedRef = useRef<boolean>(false);

    // Normalize images to uniform object format
    const normalizedImages = images.map((item, idx) => {
        if (typeof item === "string") {
            return {
                src: item,
                alt: `Showcase slide ${idx + 1}`,
            };
        }
        return item;
    });

    // Calculate which slide is closest to container center
    const updateCurrentIndex = useCallback(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const containerCenter =
            container.scrollLeft + container.clientWidth / 2;

        let closestIndex = 0;
        let minDiff = Infinity;

        slideRefs.current.forEach((slide, idx) => {
            if (!slide) return;
            const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
            const diff = Math.abs(slideCenter - containerCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = idx;
            }
        });

        setCurrentIndex(closestIndex);
    }, []);

    // Smooth scroll to center a specific slide
    const scrollToSlide = useCallback((index: number) => {
        const container = scrollRef.current;
        const slide = slideRefs.current[index];
        if (!container || !slide) return;

        const containerCenter = container.clientWidth / 2;
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const targetScrollLeft = slideCenter - containerCenter;

        container.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
        });
        setCurrentIndex(index);
    }, []);

    // Center the first slide on initial render and on resize
    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToSlide(0);
        }, 120);
        return () => clearTimeout(timer);
    }, [scrollToSlide]);

    const handlePrev = () => {
        const nextIndex = Math.max(0, currentIndex - 1);
        scrollToSlide(nextIndex);
    };

    const handleNext = () => {
        const nextIndex = Math.min(
            normalizedImages.length - 1,
            currentIndex + 1,
        );
        scrollToSlide(nextIndex);
    };

    // --- Mouse Drag to Swipe Handlers (Fluid 1:1 dragging without snap fighting) ---
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        isMovedRef.current = false;
        startXRef.current = e.pageX;
        startScrollLeftRef.current = scrollRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const deltaX = e.pageX - startXRef.current;
        if (Math.abs(deltaX) > 5) {
            isMovedRef.current = true;
        }
        // 1:1 immediate tracking
        scrollRef.current.scrollLeft = startScrollLeftRef.current - deltaX;
    };

    const handleMouseUpOrLeave = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const containerCenter =
            container.scrollLeft + container.clientWidth / 2;

        // Center the closest slide smoothly after drag release
        let closestIndex = 0;
        let minDiff = Infinity;

        slideRefs.current.forEach((slide, idx) => {
            if (!slide) return;
            const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
            const diff = Math.abs(slideCenter - containerCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = idx;
            }
        });

        scrollToSlide(closestIndex);
    };

    return (
        <section className="py-14 sm:py-20 relative z-10 overflow-hidden bg-[#04060e]/50 border-b border-white/5 w-full">
            {/* Background glow orb */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex items-end justify-between gap-4">
                <div />
                <div className="flex flex-col items-center text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 block">
                        Visual Experience
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                        See Lectoro AI in Action
                    </h2>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        aria-label="Previous screenshot"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentIndex >= normalizedImages.length - 1}
                        aria-label="Next screenshot"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 
        Full-width Smooth Snapping Carousel Track:
        - Natural image dimensions (no fixed aspect ratio cropping)
        - Snap-center ensures the active item is placed exactly in the middle
        - Side spacers enable first and last items to be centered at any screen width
      */}
            <div className="w-full overflow-hidden">
                <div
                    ref={scrollRef}
                    onScroll={updateCurrentIndex}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    className={`flex items-center gap-4 sm:gap-8 overflow-x-auto py-6 no-scrollbar select-none touch-pan-x ${
                        isDragging
                            ? "cursor-grabbing scroll-auto snap-none"
                            : "cursor-grab scroll-smooth snap-x snap-mandatory"
                    }`}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {/* Symmetrical Leading Spacer: allows first slide to center at 50vw */}
                    <div
                        className="shrink-0 pointer-events-none w-[max(1rem,calc(50vw-min(40vw,380px)))]"
                        aria-hidden="true"
                    />

                    {/* Carousel Slides in their Natural Original Dimensions */}
                    {normalizedImages.map((img, index) => {
                        const isActive = currentIndex === index;

                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    slideRefs.current[index] = el;
                                }}
                                onClick={() => {
                                    if (!isMovedRef.current) {
                                        scrollToSlide(index);
                                    }
                                }}
                                className={`shrink-0 snap-center h-90 md:h-[44vh] rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 relative group flex items-center justify-center cursor-pointer shadow-2xl ${
                                    isActive
                                        ? "border-indigo-500/60 shadow-indigo-500/25 scale-100 opacity-100"
                                        : "border-white/10 shadow-black/80 scale-[0.9] opacity-65 hover:opacity-85 hover:scale-[0.97]"
                                }`}
                            >
                                {/* Image Container with Original Aspect Ratio (object-contain, no cropping) */}
                                <div className="relative h-full w-auto flex items-center justify-center bg-[#080b19]">
                                    <Image
                                        src={img.src}
                                        alt={
                                            img.alt ||
                                            `Lectoro Screenshot ${index + 1}`
                                        }
                                        width={1800}
                                        height={1100}
                                        draggable={false}
                                        className="h-full w-auto max-w-[86vw] sm:max-w-[78vw] object-contain rounded-2xl sm:rounded-3xl pointer-events-none"
                                        priority={index === 0}
                                    />

                                    {/* Subtle bottom gradient vignette for text legibility */}
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070913]/85 via-[#070913]/30 to-transparent pointer-events-none" />

                                    {/* Title Overlay Badge */}
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
                        );
                    })}

                    {/* Symmetrical Trailing Spacer: allows last slide to center at 50vw */}
                    <div
                        className="shrink-0 pointer-events-none w-[max(1rem,calc(50vw-min(40vw,380px)))]"
                        aria-hidden="true"
                    />
                </div>

                {/* Wskaźniki kropkowe (dots) */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    {normalizedImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => scrollToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                currentIndex === index
                                    ? "w-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
