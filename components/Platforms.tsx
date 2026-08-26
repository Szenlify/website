import React from "react";

export default function Platforms() {
  return (
    <section className="py-12 border-y border-white/10 bg-[#050711]/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Seamlessly Integrates with Your Favorite Video & Web Platforms
        </p>
        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 font-display font-extrabold text-xl text-red-600 hover:scale-105 transition-transform">
            <span>NETFLIX</span>
          </div>
          <div className="flex items-center gap-2 font-display font-extrabold text-xl text-red-500 hover:scale-105 transition-transform">
            <span>▶ YouTube</span>
          </div>
          <div className="flex items-center gap-2 font-display font-extrabold text-xl text-red-600 hover:scale-105 transition-transform">
            <span>TED Talks</span>
          </div>
          <div className="flex items-center gap-2 font-display font-extrabold text-xl text-blue-500 hover:scale-105 transition-transform">
            <span>Coursera</span>
          </div>
          <div className="flex items-center gap-2 font-display font-extrabold text-xl text-purple-400 hover:scale-105 transition-transform">
            <span>Udemy</span>
          </div>
          <div className="flex items-center gap-2 font-display font-extrabold text-xl text-cyan-400 hover:scale-105 transition-transform">
            <span>🌐 Any Web Article & Docs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
