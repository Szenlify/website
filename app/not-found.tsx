import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Page Not Found",
};

export default function NotFound() {
    return (
        <main
            id="main-content"
            className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 text-center"
        >
            <div className="max-w-xl">
                <p className="mb-4 font-mono text-sm font-bold text-cyan-400">
                    404
                </p>
                <h1 className="mb-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
                    This page could not be found
                </h1>
                <p className="mb-8 text-slate-400">
                    The address may be incorrect or the page may have moved.
                </p>
                <Button asChild size="lg" className="rounded-xl">
                    <Link href="/">
                        <ArrowLeft className="size-4" />
                        Return home
                    </Link>
                </Button>
            </div>
        </main>
    );
}