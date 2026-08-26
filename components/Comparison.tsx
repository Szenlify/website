import React from "react";

export default function Comparison() {
  return (
    <section className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Direct Comparison</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">Why Traditional Methods Fall Short</h2>
          <p className="text-slate-400 text-base sm:text-lg">See the difference between tedious rote memorization and modern AI-powered media immersion.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0e1222]/80 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#0d1122]">
                <th className="p-5 sm:p-6 font-display font-bold text-sm text-slate-300">Feature</th>
                <th className="p-5 sm:p-6 font-display font-bold text-sm text-white bg-indigo-500/15 border-x border-indigo-500/30">✨ Lectoro AI</th>
                <th className="p-5 sm:p-6 font-display font-bold text-sm text-slate-400">Apps (e.g. Duolingo)</th>
                <th className="p-5 sm:p-6 font-display font-bold text-sm text-slate-400">Google Translate</th>
                <th className="p-5 sm:p-6 font-display font-bold text-sm text-slate-400">Traditional Flashcards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-300">
              <tr className="hover:bg-white/[0.02] transition">
                <td className="p-5 font-semibold text-white">Dual subtitles for streaming video</td>
                <td className="p-5 bg-indigo-500/10 border-x border-indigo-500/30 text-emerald-400 font-bold">✓ YouTube & Netflix</td>
                <td className="p-5 text-slate-500">✕ None</td>
                <td className="p-5 text-slate-500">✕ None</td>
                <td className="p-5 text-slate-500">✕ None</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition">
                <td className="p-5 font-semibold text-white">Authentic video context & snapshots</td>
                <td className="p-5 bg-indigo-500/10 border-x border-indigo-500/30 text-emerald-400 font-bold">✓ Frame snapshot + Full context</td>
                <td className="p-5 text-slate-500">✕ Artificial sentences</td>
                <td className="p-5 text-slate-500">✕ None</td>
                <td className="p-5 text-slate-500">✕ Text only</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition">
                <td className="p-5 font-semibold text-white">AI Tutor explaining idioms & slang</td>
                <td className="p-5 bg-indigo-500/10 border-x border-indigo-500/30 text-emerald-400 font-bold">✓ Gemini 2.5 Flash</td>
                <td className="p-5 text-slate-500">✕ None</td>
                <td className="p-5 text-slate-500">✕ Literal mistakes</td>
                <td className="p-5 text-slate-500">✕ None</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition">
                <td className="p-5 font-semibold text-white">Intelligent SRS Algorithm (SM-2)</td>
                <td className="p-5 bg-indigo-500/10 border-x border-indigo-500/30 text-emerald-400 font-bold">✓ Built into Chrome</td>
                <td className="p-5 text-slate-500">✕ Linear reviews</td>
                <td className="p-5 text-slate-500">✕ No database</td>
                <td className="p-5 text-emerald-400 font-semibold">✓ Manual sorting</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition">
                <td className="p-5 font-semibold text-white">1-Click Export to Anki / PDF / CSV</td>
                <td className="p-5 bg-indigo-500/10 border-x border-indigo-500/30 text-emerald-400 font-bold">✓ Instant 1-click</td>
                <td className="p-5 text-slate-500">✕ Locked ecosystem</td>
                <td className="p-5 text-slate-500">✕ None</td>
                <td className="p-5 text-slate-500">✕ Manual typing</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition">
                <td className="p-5 font-semibold text-white">Neural Voice Synthesis (ElevenLabs)</td>
                <td className="p-5 bg-indigo-500/10 border-x border-indigo-500/30 text-emerald-400 font-bold">✓ Studio quality voices</td>
                <td className="p-5 text-slate-500">✕ Robotic audio</td>
                <td className="p-5 text-slate-500">✕ Basic TTS</td>
                <td className="p-5 text-slate-500">✕ None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
