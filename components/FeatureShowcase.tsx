"use client";

import Image from "next/image";
import "./feature-showcase.css";
import {
  Layers,
  Sparkles,
  Command,
  type LucideIcon,
} from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/en";

export const FEATURE_IMAGE_SLOTS = {
  slot1_dualSubtitles: {
    src: "/showcase/11.jpg",
    alt: "Lectoro AI Dual Subtitles on Netflix & YouTube",
    windowTitle: "Netflix / YouTube Dual Subtitles (Lectoro AI)",
  },
  slot2_dictionaryAudio: {
    src: "/showcase/22.jpg",
    alt: "Interactive Pop-up Dictionary with Native Audio Pronunciation",
    windowTitle: "Lectoro Pop-up Dictionary & Speech (Sulafat & Algieba)",
  },
  slot3_aiExplanation: {
    src: "/showcase/4.jpg",
    alt: "Contextual AI Sentence Breakdown & CEFR Level",
    windowTitle: "AI Contextual Grammar & Idioms",
  },
  slot4_keyboardShortcuts: {
    src: "/showcase/3.jpg",
    alt: "Keyboard Navigation W / A / S / D / Q / Z Controls",
    windowTitle: "Playback Controls & Hotkeys (W / A / S / D / Q / Z)",
  },
  slot5_flashcardsSRS: {
    src: "/showcase/5.jpg",
    alt: "SuperMemo SM-2 Spaced Repetition Flashcards with Scene Stills",
    windowTitle: "SuperMemo SM-2 SRS Review Runner & Mobile Reviews",
  },
  slot6_webReader: {
    src: "/showcase/2.jpg",
    alt: "In-Page Web Article Translator and Live Text Highlighting",
    windowTitle: "Web Reader & Instant Text-to-Speech",
  },
} as const;

interface ImageSlot {
  src: string;
  alt: string;
  windowTitle: string;
}

interface ShortcutItem {
  keys: string[];
  desc: string;
}

interface FeatureBlockData {
  tag: string;
  tagColor: string;
  icon?: LucideIcon;
  title: string;
  howTo: string;
  slot: ImageSlot;
  steps?: string[];
  stepBadgeColor?: string;
  shortcuts?: ShortcutItem[];
}

function FeatureWindow({ slot }: { slot: ImageSlot }) {
  return (
    <div className="group relative rounded-2xl sm:rounded-3xl bg-[#0A0D18] border border-white/[0.1] shadow-2xl shadow-black/80 overflow-hidden">
      <div className="bg-[#0D101C] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
          <span className="size-2.5 rounded-full bg-amber-500/70 inline-block" />
          <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
        </div>
        <span className="text-xs font-mono text-slate-300 font-medium truncate max-w-[200px] sm:max-w-none">
          {slot.windowTitle}
        </span>
      </div>

      <div className="relative aspect-[16/10] bg-[#070912] flex items-center justify-center overflow-hidden">
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain group-hover:scale-[0.98] transition-transform duration-300"
        />
      </div>
    </div>
  );
}

function FeatureInfo({ item }: { item: FeatureBlockData }) {
  const Icon = item.icon;

  return (
    <>
      {/* Badge bez tła i bordera */}
      <div className={`inline-flex items-center gap-2 px-3 ${item.tagColor} text-xs font-mono font-bold uppercase tracking-wider`}>
        {Icon && <Icon className="size-3.5" />}
        <span>{item.tag}</span>
      </div>

      {/* Mniejszy tytuł zgodny z Blokiem 1 */}
      <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-[1.15]">
        {item.title}
      </h3>

      {/* Jak używać */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {item.howTo}
        </h4>

        {item.steps && (
          <ul className="space-y-3 text-sm sm:text-base text-slate-200">
            {item.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3.5">
                <span
                  className={`size-6 rounded-full ${item.stepBadgeColor || "bg-emerald-500/15 border-emerald-500/35 text-emerald-300"} flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5`}
                >
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        )}

        {item.shortcuts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
            {item.shortcuts.map((shortcut, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center gap-4"
              >
                <div className="inline-flex items-center gap-1.5 shrink-0 select-none">
                  {shortcut.keys.map((k, kIdx) => (
                    <span key={k} className="inline-flex items-center gap-1.5">
                      <kbd className="relative inline-flex items-center justify-center min-w-[32px] h-8 px-2 sm:px-2.5 font-mono font-extrabold border rounded bg-amber-50 text-xs sm:text-[13px] text-black tracking-wide">
                        {k}
                      </kbd>
                      {kIdx < shortcut.keys.length - 1 && (
                        <span className="text-slate-500 font-mono text-xs font-bold px-0.5 select-none" aria-hidden="true">
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                  {shortcut.desc}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

interface FeatureShowcaseProps {
  dict: Dict;
  locale: Locale;
}

export default function FeatureShowcase({ dict }: FeatureShowcaseProps) {
  const sc = dict.showcase || en.showcase!;

  const features: FeatureBlockData[] = [
    {
      tag: sc.b1Tag,
      tagColor: "text-emerald-300",
      title: sc.b1Title,
      howTo: sc.b1HowTo,
      steps: [sc.b1Step1, sc.b1Step2, sc.b1Step3],
      stepBadgeColor: "bg-emerald-500/15 border border-emerald-500/35 text-emerald-300",
      slot: FEATURE_IMAGE_SLOTS.slot1_dualSubtitles,
    },
    {
      tag: sc.b2Tag,
      tagColor: "text-cyan-300",
      title: sc.b2Title,
      howTo: sc.b2HowTo,
      steps: [sc.b2Step1, sc.b2Step2, sc.b2Step3],
      stepBadgeColor: "bg-cyan-500/15 border border-cyan-500/35 text-cyan-300",
      slot: FEATURE_IMAGE_SLOTS.slot2_dictionaryAudio,
    },
    {
      tag: sc.b3Tag,
      tagColor: "text-purple-300",
      title: sc.b3Title,
      howTo: sc.b3HowTo,
      steps: [sc.b3Step1, sc.b3Step2, sc.b3Step3],
      stepBadgeColor: "bg-purple-500/15 border border-purple-500/35 text-purple-300",
      slot: FEATURE_IMAGE_SLOTS.slot3_aiExplanation,
    },
    {
      tag: sc.b4Tag,
      tagColor: "text-amber-300",
      icon: Command,
      title: sc.b4Title,
      howTo: sc.b4HowTo,
      slot: FEATURE_IMAGE_SLOTS.slot4_keyboardShortcuts,
      shortcuts: [
        { keys: ["W", "↑"], desc: sc.b4K1Desc },
        { keys: ["A", "←"], desc: sc.b4K2Desc },
        { keys: ["D", "→"], desc: sc.b4K3Desc },
        { keys: ["S", "↓"], desc: sc.b4K4Desc },
        { keys: ["Q", "Enter"], desc: sc.b4K5Desc },
        { keys: ["Z"], desc: sc.b4K6Desc },
      ],
    },
    {
      tag: sc.b5Tag,
      tagColor: "text-emerald-300",
      icon: Layers,
      title: sc.b5Title,
      howTo: sc.b5HowTo,
      steps: [sc.b5Step1, sc.b5Step2, sc.b5Step3],
      stepBadgeColor: "bg-emerald-500/15 border border-emerald-500/35 text-emerald-300",
      slot: FEATURE_IMAGE_SLOTS.slot5_flashcardsSRS,
    },
    {
      tag: sc.b6Tag,
      tagColor: "text-blue-300",
      title: sc.b6Title,
      howTo: sc.b6HowTo,
      steps: [sc.b6Step1, sc.b6Step2, sc.b6Step3],
      stepBadgeColor: "bg-blue-500/15 border border-blue-500/35 text-blue-300",
      slot: FEATURE_IMAGE_SLOTS.slot6_webReader,
    },
  ];

  return (
    <section className="py-24 sm:py-36 lg:py-44 relative z-10 overflow-clip" id="features">
      {/* Header sekcji */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-28 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 mb-5 tracking-wider uppercase">
          <Sparkles className="size-3.5" />
          <span>{sc.badge}</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5 max-w-3xl mx-auto text-balance">
          {sc.title}
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-balance">
          {sc.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-36 lg:space-y-48">
        {features.map((item, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={index}
              data-feature-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center"
            >
              {isReversed ? (
                <>
                  <div data-reveal-side="left" className="lg:col-span-6 order-2 lg:order-1">
                    <FeatureWindow slot={item.slot} />
                  </div>
                  <div
                    data-reveal-side="right"
                    className="lg:col-span-6 space-y-6 sm:space-y-8 order-1 lg:order-2"
                  >
                    <FeatureInfo item={item} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    data-reveal-side="left"
                    className="lg:col-span-6 space-y-6"
                  >
                    <FeatureInfo item={item} />
                  </div>
                  <div data-reveal-side="right" className="lg:col-span-6">
                    <FeatureWindow slot={item.slot} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
