import Image from "next/image";
import type { Dict } from "@/lib/i18n/types";

interface FeaturesProps {
    dict: Pick<Dict, "features">;
}

export default function Features({ dict }: FeaturesProps) {
    const { features } = dict;
    return (
        <section className="py-24 relative z-10" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {features.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {features.title}
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        {features.subtitle}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="glass-panel p-8 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                🎬
                            </div>
                            <h3 className="font-display font-bold text-2xl text-white mb-3">
                                {features.f1.title}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {features.f1.desc}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f1.b1}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f1.b2}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f1.b3}
                            </span>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="glass-panel p-8 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                🌐
                            </div>
                            <h3 className="font-display font-bold text-2xl text-white mb-3">
                                {features.f2.title}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {features.f2.desc}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f2.b1}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f2.b2}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f2.b3}
                            </span>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="glass-panel p-8 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                🧠
                            </div>
                            <h3 className="font-display font-bold text-2xl text-white mb-3">
                                {" "}
                                {features.f3.title}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {features.f3.desc}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f3.b1}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f3.b2}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f3.b3}
                            </span>
                        </div>
                    </div>

                    {/* Feature 4: Spotlight Flashcards & SRS (Full Width) */}
                    <div className="glass-panel col-span-1 md:col-span-2 lg:col-span-3 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#141a32]/90 to-[#0e1222]/95 border-indigo-500/30">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-4">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></span>
                                <span>{features.f4.badge}</span>
                            </div>
                            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight">
                                {features.f4.title}
                            </h3>
                            <p className="text-slate-300 text-base leading-relaxed mb-6">
                                {features.f4.desc}
                            </p>
                            <ul className="space-y-3 text-slate-300 text-sm mb-6">
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>{" "}
                                    {features.f4.l1}
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>{" "}
                                    {features.f4.l2}
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-bold">
                                        ✓
                                    </span>{" "}
                                    {features.f4.l3}
                                </li>
                            </ul>
                        </div>

                        {/* Interactive Flashcard Showcase Widget */}
                        <div className="w-full max-w-xs mx-auto rotate-4">
                            <Image
                                src="/showcase/review.png"
                                alt="Review flashcard popup"
                                width={600}
                                height={600}
                                className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-indigo-500/30"
                            />
                        </div>
                    </div>

                    {/* Feature 5 */}
                    <div className="glass-panel p-8 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                🎙️
                            </div>
                            <h3 className="font-display font-bold text-2xl text-white mb-3">
                                {features.f5.title}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {features.f5.desc}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f5.b1}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f5.b2}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f5.b3}
                            </span>
                        </div>
                    </div>

                    {/* Feature 6 */}
                    <div className="glass-panel p-8 flex flex-col justify-between group col-span-1 md:col-span-2">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                <Image
                                    src="/platforms/anki.png"
                                    alt="Anki"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <h3 className="font-display font-bold text-2xl text-white mb-3">
                                {features.f6.title}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {features.f6.desc}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f6.b1}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f6.b2}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                                {features.f6.b3}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
