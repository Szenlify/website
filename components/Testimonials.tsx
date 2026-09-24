import motion from "./LandingMotion.module.css";
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
        <section className="relative z-10 overflow-hidden py-24 sm:py-36 lg:py-44" id="testimonials">
            {/* Ambient Background Blur */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl"
            />

            <div className="mx-auto">
                {/* Header Section */}
                <div className={`${motion.heading} mx-auto px-4 mb-14 sm:mb-20 max-w-3xl text-center`}>
                    <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200">
                        {testimonials.tag}
                    </span>
                    <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl text-balance">
                        {testimonials.title}
                    </h2>
                </div>

                <Carousel
                    opts={{
                        align: "center",
                        loop: false,
                    }}
                    className={`${motion.carousel} w-full`}
                    aria-label={testimonials.title}
                >
                    <CarouselContent className="-ml-4 flex items-stretch">
                        {/* Invisible Spacer Item - aligns the first real item centered */}
                        <CarouselItem
                            aria-hidden="true"
                            className="pointer-events-none shrink-0 pl-4 basis-[1px] opacity-0 sm:basis-[calc(50%-180px)] lg:basis-[calc(50%-260px)]"
                        />

                        {items.map((item) => (
                            <CarouselItem
                                key={item.name}
                                className="flex pl-4 basis-[85%] sm:basis-[380px] lg:basis-[500px]"
                            >
                                <article className={`${motion.quote} relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-slate-900/85 hover:shadow-2xl hover:shadow-indigo-500/15`}>
                                    <div>
                                        {/* Stars Rating */}
                                        <div
                                            className="mb-5 flex items-center gap-1.5 text-amber-400"
                                            aria-label={testimonials.starsLabel}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="size-4.5 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                             <span className="ml-2 text-white/80 text-sm font-bold">5/5</span>
                                        </div>

                                        {/* Quote */}
                                        <p className="mb-8 font-body text-base sm:text-lg leading-relaxed text-slate-100 font-medium">
                                            &ldquo;{item.quote}&rdquo;
                                        </p>
                                    </div>

                                    {/* Author Profile */}
                                    <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                                        <div
                                            className={`flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${item.avatarClass} text-sm font-extrabold text-white shadow-md`}
                                        >
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div className="font-display text-base font-bold text-white tracking-tight">
                                                {item.name}
                                            </div>
                                            <div className="text-xs sm:text-sm font-medium text-slate-400">
                                                {item.role}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="mt-10 flex justify-center gap-3">
                        <CarouselPrevious
                            aria-label={testimonials.previous}
                            className="relative top-auto left-auto translate-y-0 min-h-11 min-w-11 rounded-xl border-white/10 bg-slate-900/60 text-white hover:bg-slate-800 hover:text-white"
                        />
                        <CarouselNext
                            aria-label={testimonials.next}
                            className="relative top-auto right-auto translate-y-0 min-h-11 min-w-11 rounded-xl border-white/10 bg-slate-900/60 text-white hover:bg-slate-800 hover:text-white"
                        />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}