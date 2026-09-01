import type { Dict } from "@/lib/i18n/types";

interface TestimonialsProps {
    dict: Pick<Dict, "testimonials">;
}

export default function Testimonials({ dict }: TestimonialsProps) {
    const { testimonials } = dict;
    return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">{testimonials.tag}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">{testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-sm mb-4">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-slate-200 text-sm leading-relaxed italic mb-6">&ldquo;{testimonials.t1.quote}&rdquo;</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">MK</div>
              <div>
                <div className="font-bold text-white text-sm">{testimonials.t1.name}</div>
                <div className="text-xs text-slate-400">{testimonials.t1.role}</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-sm mb-4">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-slate-200 text-sm leading-relaxed italic mb-6">&ldquo;{testimonials.t2.quote}&rdquo;</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm">AN</div>
              <div>
                <div className="font-bold text-white text-sm">{testimonials.t2.name}</div>
                <div className="text-xs text-slate-400">{testimonials.t2.role}</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-sm mb-4">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-slate-200 text-sm leading-relaxed italic mb-6">&ldquo;{testimonials.t3.quote}&rdquo;</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-bold text-white text-sm">PZ</div>
              <div>
                <div className="font-bold text-white text-sm">{testimonials.t3.name}</div>
                <div className="text-xs text-slate-400">{testimonials.t3.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
