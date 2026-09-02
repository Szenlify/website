"use client";

import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ComponentProps,
    type KeyboardEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

type CarouselContextValue = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: CarouselApi;
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a Carousel");
    }
    return context;
}

function Carousel({
    opts,
    plugins,
    setApi,
    className,
    children,
    ...props
}: ComponentProps<"div"> & {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    setApi?: (api: CarouselApi) => void;
}) {
    const [carouselRef, api] = useEmblaCarousel(opts, plugins);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((carouselApi: NonNullable<CarouselApi>) => {
        setCanScrollPrev(carouselApi.canScrollPrev());
        setCanScrollNext(carouselApi.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollNext, scrollPrev],
    );

    useEffect(() => {
        if (!api) return;
        const frame = requestAnimationFrame(() => onSelect(api));
        api.on("reInit", onSelect);
        api.on("select", onSelect);
        return () => {
            cancelAnimationFrame(frame);
            api.off("reInit", onSelect);
            api.off("select", onSelect);
        };
    }, [api, onSelect]);

    useEffect(() => {
        if (api && setApi) setApi(api);
    }, [api, setApi]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                data-slot="carousel"
                role="region"
                aria-roledescription="carousel"
                onKeyDownCapture={handleKeyDown}
                className={cn("relative", className)}
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
}

function CarouselContent({ className, ...props }: ComponentProps<"div">) {
    const { carouselRef } = useCarousel();
    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                data-slot="carousel-content"
                className={cn("flex touch-pan-y", className)}
                {...props}
            />
        </div>
    );
}

function CarouselItem({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="carousel-item"
            role="group"
            aria-roledescription="slide"
            className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
            {...props}
        />
    );
}

function CarouselPrevious({
    className,
    ...props
}: ComponentProps<typeof Button>) {
    const { scrollPrev, canScrollPrev } = useCarousel();
    return (
        <Button
            data-slot="carousel-previous"
            variant="outline"
            size="icon"
            className={cn("absolute size-9 rounded-full", className)}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ArrowLeft />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
}

function CarouselNext({ className, ...props }: ComponentProps<typeof Button>) {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
        <Button
            data-slot="carousel-next"
            variant="outline"
            size="icon"
            className={cn("absolute size-9 rounded-full", className)}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ArrowRight />
            <span className="sr-only">Next slide</span>
        </Button>
    );
}

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
};
