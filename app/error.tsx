"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ retry }: { retry: () => void }) {
    return (
        <main
            id="main-content"
            className="relative z-10 flex min-h-[70vh] items-center justify-center px-4 py-20 text-center"
        >
            <div className="max-w-xl">
                <p className="mb-4 font-mono text-sm font-bold text-rose-400">
                    ERROR
                </p>
                <h1 className="mb-4 font-display text-4xl font-extrabold text-white">
                    Something went wrong
                </h1>
                <p className="mb-8 text-slate-400">
                    The page could not be loaded. Please try again.
                </p>
                <Button onClick={retry} size="lg" className="rounded-xl">
                    <RotateCcw className="size-4" />
                    Try again
                </Button>
            </div>
        </main>
    );
}