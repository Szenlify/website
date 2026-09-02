import type { Dict } from "@/lib/i18n/types";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialsProps {
    dict: Pick<Dict, "testimonials">;
}

export default function Testimonials({ dict }: TestimonialsProps) {
    const { testimonials } = dict;
    const items = [
        {
            ...testimonials.t1,
            initials: "MK",
            avatarClass: "from-indigo-500 to-cyan-400",
        },
        {
            ...testimonials.t2,
            initials: "AN",
            avatarClass: "from-purple-500 to-pink-500",
        },
        {
            ...testimonials.t3,
            initials: "PZ",
            avatarClass: "from-cyan-500 to-emerald-400",
        },
    ];

    return (
        <section className="relative z-10 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-cyan-400">
                        {testimonials.tag}
                    </span>
                    <h2 className="mb-4 font-display text-3xl font-extrabold text-white sm:text-5xl">
                        {testimonials.title}
                    </h2>
                </div>

                <Carousel
                    opts={{ align: "start" }}
                    className="w-full"
                    aria-label={testimonials.title}
                >
                    <CarouselContent className="items-stretch gap-5 sm:gap-6 lg:gap-8">
                        {items.map((item) => (
                            <CarouselItem
                                key={item.name}
                                className="flex basis-[88%] sm:basis-[62%] lg:basis-[42%]"
                            >
                                <article className="glass-panel flex min-h-72 flex-1 flex-col justify-between p-6 sm:p-8">
                                    <div>
                                        <div
                                            className="mb-4 text-sm text-amber-400"
                                            aria-label={testimonials.starsLabel}
                                        >
                                            &#9733;&#9733;&#9733;&#9733;&#9733;
                                        </div>
                                        <p className="mb-6 text-sm italic leading-relaxed text-slate-200">
                                            &ldquo;{item.quote}&rdquo;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex size-10 items-center justify-center rounded-full bg-linear-to-tr ${item.avatarClass} text-sm font-bold text-white`}
                                            aria-hidden="true"
                                        >
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {item.role}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <CarouselPrevious
                            className="static size-10 rounded-xl"
                            aria-label={testimonials.previous}
                        />
                        <CarouselNext
                            className="static size-10 rounded-xl"
                            aria-label={testimonials.next}
                        />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
