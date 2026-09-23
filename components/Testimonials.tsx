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
            avatarClass: "from-indigo-500 via-purple-500 to-pink-500",
        },
        {
            ...testimonials.t2,
            initials: "AN",
            avatarClass: "from-cyan-400 via-teal-500 to-emerald-500",
        },
        {
            ...testimonials.t3,
            initials: "PZ",
            avatarClass: "from-amber-400 via-orange-500 to-rose-500",
        },
    ];

    return (
        <section className="relative z-10 overflow-hidden py-14 sm:py-24">
            {/* Ambient Background Blur */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-indigo-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl"
            />

            <div className="mx-auto ">
                {/* Header Section */}
                <div className="mx-auto px-4 mb-8 sm:mb-16 max-w-3xl text-center">
                    <span className="mb-3 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300">
                        {testimonials.tag}
                    </span>
                    <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                        {testimonials.title}
                    </h2>
                </div>

                <Carousel
                    opts={{
                        align: "center",
                        loop: false,
                    }}
                    className="w-full"
                    aria-label={testimonials.title}
                >
                    <CarouselContent className="-ml-4 flex items-stretch">
                        {/* Invisible Spacer Item - aligns the first real item centered */}
                        <CarouselItem
                            aria-hidden="true"
                            className="pointer-events-none shrink-0 pl-4 basis-[1px] opacity-0 sm:basis-[calc(50%-180px)] lg:basis-[calc(50%-240px)]"
                        />

                        {items.map((item) => (
                            <CarouselItem
                                key={item.name}
                                className="flex pl-4 basis-[80%] sm:basis-[360px] lg:basis-[480px]"
                            >
                                <article className="relative flex min-h-[280px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-indigo-500/10">
                                    <div>
                                        {/* Stars Rating */}
                                        <div
                                            className="mb-4 flex items-center gap-1 text-amber-400"
                                            aria-label={testimonials.starsLabel}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="size-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <p className="mb-6 font-body text-sm leading-relaxed text-slate-200/90 sm:text-base">
                                            &ldquo;{item.quote}&rdquo;
                                        </p>
                                    </div>

                                    {/* Author Profile */}
                                    <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                                        <div
                                            className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-tr ${item.avatarClass} text-sm font-extrabold text-white shadow-md`}
                                            aria-hidden="true"
                                        >
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">
                                                {item.name}
                                            </div>
                                            <div className="text-xs font-medium text-slate-400">
                                                {item.role}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <div className="mt-10 flex items-center justify-center gap-3">
                        <CarouselPrevious
                            className="static size-11 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                            aria-label={testimonials.previous}
                        />
                        <CarouselNext
                            className="static size-11 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                            aria-label={testimonials.next}
                        />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}