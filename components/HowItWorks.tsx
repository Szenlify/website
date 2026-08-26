import React from "react";

export default function HowItWorks() {
  return (
    <section className="py-24 relative z-10" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Simple Onboarding</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">How to Start Learning in 3 Easy Steps</h2>
          <p className="text-slate-400 text-base sm:text-lg">No need to change your daily habits. Learn while watching what you already love.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 relative">
            <div className="font-display font-black text-5xl text-indigo-500/20 mb-4">01</div>
            <h3 className="font-display font-bold text-xl text-white mb-3">Install Extension</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Add Lectoro AI to Chrome with a single click. Zero complicated setup, no credit card required.
            </p>
          </div>

          <div className="glass-panel p-8 relative">
            <div className="font-display font-black text-5xl text-indigo-500/20 mb-4">02</div>
            <h3 className="font-display font-bold text-xl text-white mb-3">Watch & Click</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Play your favorite Netflix series or YouTube videos. Click any unknown word in the subtitles to reveal its meaning instantly.
            </p>
          </div>

          <div className="glass-panel p-8 relative">
            <div className="font-display font-black text-5xl text-indigo-500/20 mb-4">03</div>
            <h3 className="font-display font-bold text-xl text-white mb-3">Review 5 Min Daily</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Open the extension popup during your morning coffee for a 5-minute SRS session. Long-term memory handles the rest!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
