import React from "react";

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">User Testimonials</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">Loved by 50,000+ Language Enthusiasts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-sm mb-4">★★★★★</div>
              <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                “I was watching Peaky Blinders on Netflix and finally understand British slang! I click a word, Gemini explains the nuance in 1 second, and the snapshot lands right on my flashcard. Brilliant.”
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
                MK
              </div>
              <div>
                <div className="font-bold text-white text-sm">Michael Kowalczyk</div>
                <div className="text-xs text-slate-400">Software Engineer & Netflix Enthusiast</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-sm mb-4">★★★★★</div>
              <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                “Preparing for my CAE exam has never been easier. I save advanced collocations from TED talks and academic articles, then export them in one click to Anki. Saved me 20+ hours of typing.”
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm">
                AN
              </div>
              <div>
                <div className="font-bold text-white text-sm">Anna Novak</div>
                <div className="text-xs text-slate-400">English Philology Student</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-sm mb-4">★★★★★</div>
              <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                “ElevenLabs pronunciation sounds so incredibly natural that my accent improved significantly. A quick 5-minute review session every morning has become my favorite ritual.”
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-bold text-white text-sm">
                PZ
              </div>
              <div>
                <div className="font-bold text-white text-sm">Peter Zielinski</div>
                <div className="text-xs text-slate-400">Founder & Polyglot</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
