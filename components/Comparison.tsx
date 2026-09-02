"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import type { Dict } from "@/lib/i18n/types";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CHROME_STORE_URL } from "@/lib/config";

type CompetitorKey = "languageReactor" | "lingopie" | "duolingo";

interface ComparisonProps {
    dict: Dict;
}

export default function Comparison({ dict }: ComparisonProps) {
    const { comparison } = dict;
    const competitorTabs: {
        key: CompetitorKey;
        label: string;
        badge: string;
    }[] = [
        {
            key: "languageReactor",
            label: comparison.tabs.vsLR,
            badge: comparison.tabs.vsLRbadge,
        },
        {
            key: "lingopie",
            label: comparison.tabs.vsLingopie,
            badge: comparison.tabs.vsLingopieBadge,
        },
        {
            key: "duolingo",
            label: comparison.tabs.vsDuolingo,
            badge: comparison.tabs.vsDuolingoBadge,
        },
    ];
    const [mobileCompetitor, setMobileCompetitor] =
        useState<CompetitorKey>("languageReactor");
    const [mobileSlide, setMobileSlide] = useState(0);
    const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!mobileCarouselApi) return;
        const updateMobileSlide = () =>
            setMobileSlide(mobileCarouselApi.selectedScrollSnap());
        const frame = requestAnimationFrame(updateMobileSlide);
        mobileCarouselApi.on("select", updateMobileSlide);
        mobileCarouselApi.on("reInit", updateMobileSlide);
        return () => {
            cancelAnimationFrame(frame);
            mobileCarouselApi.off("select", updateMobileSlide);
            mobileCarouselApi.off("reInit", updateMobileSlide);
        };
    }, [mobileCarouselApi]);

    return (
        <section
            className="py-24 border-t border-white/10 bg-[#050711]/60 relative z-10 overflow-hidden"
            id="comparison"
        >
            {/* Background Ambient Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 mb-4 tracking-wider uppercase">
                        <span>{comparison.tag}</span>
                    </div>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {comparison.title}{" "}
                        <span className="text-gradient">
                            {comparison.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        {comparison.subtitle}
                    </p>
                    <p className="text-slate-500 text-xs mt-3">
                        {comparison.disclaimer}
                    </p>
                </div>

                {/* ========================================================================= */}
                {/* DESKTOP TABLE VIEW (Visible on lg and up)                                 */}
                {/* ========================================================================= */}
                <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-[#0e1222]/85 backdrop-blur-xl shadow-2xl shadow-black/80">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="border-b border-white/10 bg-[#090d1a]/95">
                                <th className="p-6 w-[28%] font-display font-bold text-sm text-slate-300">
                                    {comparison.featureCol}
                                </th>

                                {/* LECTORO AI (HERO COLUMN) */}
                                <th className="p-6 w-[26%] bg-indigo-600/15 border-x-2 border-indigo-500/40 relative">
                                    <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400" />
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-display font-black text-lg text-white flex items-center gap-1.5">
                                            <Logo size="sm" linked={false} />
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                                            {comparison.winnerBadge}
                                        </span>
                                    </div>
                                    <span className="text-xs text-indigo-300/80 font-normal mt-1 block">
                                        {comparison.lectoSubtitle}
                                    </span>
                                </th>

                                {/* LANGUAGE REACTOR */}
                                <th className="p-6 w-[23%] border-r border-white/10">
                                    <div className="font-display font-bold text-base text-slate-200">
                                        Language Reactor
                                    </div>
                                    <span className="text-xs text-slate-400 font-normal mt-1 block">
                                        {comparison.lrSubtitle}
                                    </span>
                                </th>

                                {/* LINGOPIE */}
                                <th className="p-6 w-[23%]">
                                    <div className="font-display font-bold text-base text-slate-200">
                                        Lingopie
                                    </div>
                                    <span className="text-xs text-slate-400 font-normal mt-1 block">
                                        {comparison.lingoSubtitle}
                                    </span>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-sm">
                            {comparison.rows.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Feature & Category */}
                                    <td className="p-6 align-top space-y-1">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                                            {row.category}
                                        </span>
                                        <h4 className="font-bold text-white text-sm">
                                            {row.feature}
                                        </h4>
                                        <p className="text-slate-400 text-xs leading-relaxed">
                                            {row.description}
                                        </p>
                                    </td>

                                    {/* LECTORO AI (HERO DATA) */}
                                    <td className="p-6 align-top bg-indigo-500/10 border-x-2 border-indigo-500/30 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                                                ✓
                                            </span>
                                            <span className="font-bold text-white text-sm">
                                                {row.lectoro.title}
                                            </span>
                                        </div>
                                        <p className="text-indigo-200/80 text-xs leading-relaxed pl-7">
                                            {row.lectoro.detail}
                                        </p>
                                    </td>

                                    {/* LANGUAGE REACTOR */}
                                    <td className="p-6 align-top border-r border-white/10 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
                                                ✕
                                            </span>
                                            <span className="font-semibold text-slate-300 text-sm">
                                                {row.languageReactor.title}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed pl-7">
                                            {row.languageReactor.detail}
                                        </p>
                                    </td>

                                    {/* LINGOPIE / TRADITIONAL */}
                                    <td className="p-6 align-top space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
                                                ✕
                                            </span>
                                            <span className="font-semibold text-slate-300 text-sm">
                                                {row.lingopie.title}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed pl-7">
                                            {row.lingopie.detail}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ========================================================================= */}
                {/* MOBILE & TABLET UX VIEW (Card Switcher - No Horizontal Scroll Chaos!)     */}
                {/* ========================================================================= */}
                <Tabs
                    value={mobileCompetitor}
                    onValueChange={(value) =>
                        setMobileCompetitor(value as CompetitorKey)
                    }
                    className="block space-y-6 lg:hidden"
                >
                    <TabsList className="flex h-auto flex-col items-stretch justify-center gap-2 bg-transparent sm:flex-row sm:items-center">
                        {competitorTabs.map((tab) => {
                            const isSelected = mobileCompetitor === tab.key;
                            return (
                                <TabsTrigger
                                    key={tab.key}
                                    value={tab.key}
                                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                                        isSelected
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400"
                                            : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}
                                    >
                                        {tab.badge}
                                    </span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    <TabsContent value={mobileCompetitor} className="mt-0">
                        <Carousel
                            setApi={setMobileCarouselApi}
                            opts={{ align: "center", containScroll: false }}
                            className="relative"
                        >
                            <CarouselContent className="items-stretch gap-4 px-[6%] pb-6 sm:px-[14%]">
                                {comparison.rows.map((row, index) => {
                                    const compData = row[mobileCompetitor];
                                    const isActive = mobileSlide === index;

                                    return (
                                        <CarouselItem
                                            key={row.category}
                                            className={`basis-[88%] rounded-2xl border bg-[#0e1222]/90 p-5 shadow-xl backdrop-blur-lg transition-all duration-300 sm:basis-[72%] sm:p-6 ${
                                                isActive
                                                    ? "border-indigo-500/50 opacity-100 scale-100"
                                                    : "border-white/10 opacity-60 scale-[0.96]"
                                            }`}
                                        >
                                            {/* Category & Feature Title */}
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                                                    {row.category}
                                                </span>
                                                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                                                    {row.feature}
                                                </h3>
                                                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                                                    {row.description}
                                                </p>
                                            </div>

                                            {/* Direct Head-to-Head Comparison */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                                {/* ✨ Lectoro AI Card (Hero) */}
                                                <div className="p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/40 space-y-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-black text-white flex items-center gap-1">
                                                            <Logo size="sm" linked={false} />
                                                        </span>
                                                        <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-xs font-black">
                                                            ✓
                                                        </span>
                                                    </div>
                                                    <h4 className="font-bold text-white text-xs sm:text-sm">
                                                        {row.lectoro.title}
                                                    </h4>
                                                    <p className="text-indigo-200/80 text-xs leading-relaxed">
                                                        {row.lectoro.detail}
                                                    </p>
                                                </div>

                                                {/* ❌ Competitor Card */}
                                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold text-slate-400">
                                                            {mobileCompetitor ===
                                                            "languageReactor"
                                                                ? "Language Reactor"
                                                                : mobileCompetitor ===
                                                                    "lingopie"
                                                                  ? "Lingopie"
                                                                  : "Duolingo"}
                                                        </span>
                                                        <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center text-xs font-black">
                                                            ✕
                                                        </span>
                                                    </div>
                                                    <h4 className="font-bold text-slate-300 text-xs sm:text-sm">
                                                        {compData.title}
                                                    </h4>
                                                    <p className="text-slate-400 text-xs leading-relaxed">
                                                        {compData.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>

                            <div className="flex items-center justify-center gap-4">
                                <CarouselPrevious
                                    aria-label={comparison.previousAriaLabel}
                                    className="static size-10 rounded-xl"
                                />

                                <div
                                    className="flex items-center justify-center gap-2"
                                    aria-label={comparison.slidesAriaLabel}
                                >
                                    {comparison.rows.map((row, index) => (
                                        <Button
                                            key={row.category}
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                mobileCarouselApi?.scrollTo(
                                                    index,
                                                )
                                            }
                                            aria-label={`${comparison.goToAriaLabel} ${index + 1}: ${row.category}`}
                                            aria-current={
                                                mobileSlide === index
                                                    ? "true"
                                                    : undefined
                                            }
                                            className={`h-4 min-w-4 rounded-full p-0 transition-all duration-300 ${
                                                mobileSlide === index
                                                    ? "w-7 bg-linear-to-r from-indigo-500 to-cyan-400"
                                                    : "w-2 bg-white/20 hover:bg-white/40"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <CarouselNext
                                    aria-label={comparison.nextAriaLabel}
                                    className="static size-10 rounded-xl"
                                />
                            </div>
                        </Carousel>
                    </TabsContent>
                </Tabs>

                {/* ========================================================================= */}
                {/* BOTTOM VERDICT & ACTION BANNER (HIGH CONVERSION)                         */}
                {/* ========================================================================= */}
                <div className="mt-14 glass-panel p-6 sm:p-10 border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-[#0e1222]/90 to-cyan-950/30 rounded-3xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>{comparison.verdictTag}</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                                {comparison.verdictTitle}
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                                {comparison.verdictBody}
                            </p>
                        </div>

                        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <Link
                                href={CHROME_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-500/30 hover:scale-102 active:scale-98 transition-all duration-200"
                            >
                                {comparison.verdictCta}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
