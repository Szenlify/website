import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata: Metadata = {
    title: "Page Not Found | Lectoro AI",
    description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
    return (
        <main
            id="main-content"
            className="relative z-10 flex min-h-[80vh] items-center justify-center px-4 py-20 text-center"
        >
            <div className="max-w-lg w-full rounded-3xl border border-white/10 bg-[#0c1020]/80 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl shadow-black/80">
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shadow-lg shadow-cyan-500/10">
                    <Compass className="size-7" />
                </div>
                <div className="inline-block font-mono text-xs font-extrabold uppercase tracking-widest text-cyan-300 mb-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    Error 404
                </div>
                <h1 className="mb-4 font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Page Not Found
                </h1>
                <p className="mb-8 text-slate-300 text-sm sm:text-base leading-relaxed">
                    The address may have been typed incorrectly or the page has moved to another location.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-100"
                >
                    <ArrowLeft className="size-4" />
                    <span>Return to Homepage</span>
                </Link>
            </div>
        </main>
    );
}