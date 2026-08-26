import React from "react";

export default function FinalCTA() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden border border-indigo-500/40 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-cyan-900/40 shadow-2xl shadow-indigo-950/60">
          <div className="relative z-10">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white mb-4">
              Stop Memorizing Words.<br />
              <span className="text-gradient">Start Living the Language Today.</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Join over 50,000 language learners mastering English, Spanish, German, French, and Japanese while enjoying their favorite series.
            </p>
            <a
              href="https://chromewebstore.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <span>Add Lectoro AI to Chrome — Free</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
