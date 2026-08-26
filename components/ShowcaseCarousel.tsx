"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

export interface CarouselItem {
  src: string;
  alt?: string;
  title?: string;
}

/**
 * 📸 LISTA ZDJĘĆ DO KARUZELI:
 * Tutaj po prostu dodajesz kolejne zdjęcia!
 * Możesz podać samą ścieżkę do pliku w folderze /public np. "/showcase/twoje-zdjecie.jpg"
 * lub obiekt { src: "...", alt: "...", title: "..." }.
 */
export const DEFAULT_SHOWCASE_IMAGES: (string | CarouselItem)[] = [
  {
    src: "/showcase/video-word-card.jpg",
    alt: "Interactive dual subtitles with clickable word cards",
    title: "Clickable Subtitles & Instant AI Definitions",
  },
  {
    src: "/showcase/video-ai-closed.jpg",
    alt: "Dual Subtitles mode in video player",
    title: "Seamless Bilingual Subtitles on Netflix & YouTube",
  },
  {
    src: "/showcase/review-panel.jpg",
    alt: "Spaced Repetition (SRS) Flashcard review panel",
    title: "Spaced Repetition (SRS) Micro-Review Sessions",
  },
  {
    src: "/showcase/Screenshot 2026-08-20 at 18.02.19.png",
    alt: "Lectoro AI Learning Dashboard",
    title: "Complete Video Immersion Learning Flow",
  },
];

interface ShowcaseCarouselProps {
  images?: (string | CarouselItem)[];
}

export default function ShowcaseCarousel({ images = DEFAULT_SHOWCASE_IMAGES }: ShowcaseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Mouse Drag / Swipe State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);
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

  const updateCurrentIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;

    // When near the start where the invisible spacer is active
    if (scrollLeft <= 30) {
      setCurrentIndex(0);
      return;
    }

    // Children[0] is the invisible spacer, Children[1..N] are the actual image cards
    const slides = Array.from(container.children).slice(1, normalizedImages.length + 1) as HTMLElement[];
    let closestIndex = 0;
    let minDiff = Infinity;

    slides.forEach((slide, idx) => {
      const diff = Math.abs(slide.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setCurrentIndex(closestIndex);
  }, [normalizedImages.length]);

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    if (index === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      setCurrentIndex(0);
      return;
    }
    // Target child index is +1 because children[0] is the invisible spacer
    const targetChild = container.children[index + 1] as HTMLElement | undefined;
    if (targetChild) {
      container.scrollTo({ left: targetChild.offsetLeft, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, currentIndex - 1);
    scrollToSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(normalizedImages.length - 1, currentIndex + 1);
    scrollToSlide(nextIndex);
  };

  // --- Mouse Drag to Swipe Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    isMovedRef.current = false;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4; // Sensitivity multiplier
    if (Math.abs(walk) > 4) {
      isMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      updateCurrentIndex();
    }
  };

  return (
    <section className="py-14 sm:py-20 relative z-10 overflow-hidden bg-[#04060e]/50 border-b border-white/5 w-full">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex items-end justify-between gap-4">
        <div />
        <div className="flex flex-col items-center">
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
        Full-width Bleed Carousel Track:
        - Pierwszy element to niewidoczne "zdjęcie" (spacer):
          * Na telefonach: 5vw (5% szerokości ekranu)
          * Na PC: 40vw (40% szerokości ekranu)
        - Brak stałego paddingu z lewej/prawej (pl-0 pr-0).
        - W pozycji początkowej jest pusta przestrzeń (5% na tel, 40% na PC),
          a przy przewijaniu palcem lub myszką zdjęcia wjeżdżają w to puste pole
          i zapełniają ekran aż do samej lewej krawędzi!
      */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={updateCurrentIndex}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-3 no-scrollbar pl-0 pr-0 select-none ${
            isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab snap-x snap-mandatory"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Niewidoczne pierwsze "zdjęcie" jako odstęp początkowy: 5% na telefonie, 40% na PC */}
          <div
            className="w-[4vw] min-w-[4vw] lg:w-[25vw] lg:min-w-[25vw] shrink-0 pointer-events-none snap-start"
            aria-hidden="true"
          />

          {/* Właściwe zdjęcia w karuzeli */}
          {normalizedImages.map((img, index) => (
            <div
              key={index}
              className="w-[82vw] min-w-[82vw] sm:w-[68vw] sm:min-w-[68vw] md:w-[58vw] md:min-w-[58vw] lg:w-[45vw] lg:min-w-[45vw] xl:w-[42vw] xl:min-w-[42vw] max-w-[760px] shrink-0 snap-start rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0a0e1e]/90 backdrop-blur-xl shadow-2xl shadow-black/80 group hover:border-indigo-500/50 transition-all duration-300 relative aspect-[16/10]"
            >
              <Image
                src={img.src}
                alt={img.alt || `Lectoro Screenshot ${index + 1}`}
                fill
                draggable={false}
                sizes="(max-width: 768px) 82vw, (max-width: 1200px) 45vw, 760px"
                className="object-cover w-full h-full pointer-events-none group-hover:scale-[1.015] transition-transform duration-500"
              />

              {/* Gradient Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913]/75 via-transparent to-transparent pointer-events-none" />

              {/* Optional Title Overlay */}
              {img.title && (
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 text-left pointer-events-none">
                  <span className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow-md bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                    {img.title}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Końcowy odstęp na prawą krawędź */}
          <div className="w-[5vw] min-w-[5vw] lg:w-[15vw] lg:min-w-[15vw] shrink-0 pointer-events-none" aria-hidden="true" />
        </div>

        {/* Wskaźniki kropkowe (dots) */}
        <div className="flex items-center justify-center gap-2 mt-6">
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
