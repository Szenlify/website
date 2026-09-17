/**
 * Lectoro – Spaced Repetition System (Multiplier-based Exponential SRS)
 * 1:1 match with Lectoro extension SRS engine (shared/srs.js).
 */

export interface SRState {
    interval: number;
    reps: number;
    step: number;
    easeFactor: number;
    lapses: number;
    nextReview: number;
    lastReview: number | null;
}

export interface ReviewWord {
    id: string;
    original: string;
    translated: string;
    sentence?: string;
    sentenceTranslated?: string;
    srcLang?: string;
    tgtLang?: string;
    screenshot?: string;
    timestamp?: number;
    updatedAt?: number;
    sr?: SRState;
    ttsCacheInvalidatedAt?: number;
}

export const MINS_IN_DAY = 1440;
export const MS_IN_DAY = 86400000;
export const RELEARN_INTERVAL_DAYS = 1 / MINS_IN_DAY; // 1 minute
export const INTRA_DAY_LEARN_INTERVAL_DAYS = 10 / MINS_IN_DAY; // 10 minutes
export const BASE_GRADUATING_INTERVAL_DAYS = 1; // 1 day
export const DEFAULT_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;
export const MAX_EASE_FACTOR = 3.5;
export const MAX_INTERVAL_DAYS = 730; // 2 years safety cap

export const SRS = {
    defaultState: (): SRState => ({
        interval: 0,
        reps: 0,
        step: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        lapses: 0,
        nextReview: 0,
        lastReview: null,
    }),

    update(sr?: Partial<SRState>, grade: 1 | 2 = 2, now = Date.now()): SRState {
        let interval = sr?.interval ?? 0;
        let reps = sr?.reps ?? sr?.step ?? 0;
        let easeFactor =
            Number.isFinite(sr?.easeFactor) && (sr?.easeFactor ?? 0) >= MIN_EASE_FACTOR
                ? (sr!.easeFactor as number)
                : DEFAULT_EASE_FACTOR;
        let lapses = sr?.lapses ?? 0;

        const isFail = grade === 1;

        if (isFail) {
            easeFactor = Math.max(
                MIN_EASE_FACTOR,
                Math.round((easeFactor - 0.2) * 100) / 100
            );
            lapses += 1;
            reps = 0;
            interval = RELEARN_INTERVAL_DAYS;
        } else {
            if (interval < INTRA_DAY_LEARN_INTERVAL_DAYS || reps === 0) {
                interval = INTRA_DAY_LEARN_INTERVAL_DAYS;
                reps = 1;
            } else if (interval < BASE_GRADUATING_INTERVAL_DAYS) {
                interval = BASE_GRADUATING_INTERVAL_DAYS;
                reps = 2;
            } else {
                const multiplied = Math.round(interval * easeFactor);
                const nextInterval = Math.max(Math.round(interval) + 1, multiplied);
                interval = Math.min(nextInterval, MAX_INTERVAL_DAYS);
                reps += 1;

                if (reps >= 4) {
                    easeFactor = Math.min(
                        MAX_EASE_FACTOR,
                        Math.round((easeFactor + 0.05) * 100) / 100
                    );
                }
            }
        }

        return {
            interval,
            reps,
            step: reps,
            easeFactor,
            lapses,
            nextReview: now + Math.round(interval * MS_IN_DAY),
            lastReview: now,
        };
    },

    previewLabel(sr?: Partial<SRState>, grade: 1 | 2 = 2): string {
        return SRS.formatInterval(SRS.update(sr, grade).interval);
    },

    formatInterval(days: number): string {
        if (!days || days <= 0) return "0 min";
        const mins = Math.round(days * MINS_IN_DAY);
        if (mins < 60) return `${mins} min`;

        const h = Math.round(mins / 60);
        if (h < 24) return `${h} h`;

        const d = Math.round(days);
        if (d < 14) return `${d} d`;

        const w = Math.round(days / 7);
        if (d < 60) return `${w} tydz.`;

        const m = Math.round(days / 30);
        if (d < 365) return `${m} mies.`;

        const y = Math.round((days / 365) * 10) / 10;
        return `${y} r.`;
    },

    isDue(word: ReviewWord, now = Date.now()): boolean {
        if (!word || !word.sr) return true;
        return (word.sr.nextReview || 0) <= now;
    },

    ensure(word: ReviewWord): ReviewWord {
        if (!word) return word;
        if (!word.sr) {
            word.sr = SRS.defaultState();
        } else {
            const reps = word.sr.reps ?? word.sr.step ?? 0;
            word.sr.reps = reps;
            word.sr.step = reps;
            word.sr.easeFactor = word.sr.easeFactor ?? DEFAULT_EASE_FACTOR;
            word.sr.interval = word.sr.interval ?? 0;
            word.sr.lapses = word.sr.lapses ?? 0;
            word.sr.nextReview = word.sr.nextReview ?? 0;
            word.sr.lastReview = word.sr.lastReview ?? null;
        }
        return word;
    },
};

const R2_CDN_BASE_URL = "https://pub-ee4534784e534bd9af38ba8022bc5e1e.r2.dev";

export function resolveImageUrl(screenshot?: string): string {
    if (!screenshot || typeof screenshot !== "string") return "";
    const trimmed = screenshot.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("data:") || /^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }
    const cleanPath = trimmed.replace(/^\/+/, "");
    if (cleanPath.startsWith("images/")) {
        return `${R2_CDN_BASE_URL}/${cleanPath}`;
    }
    return `${R2_CDN_BASE_URL}/images/${cleanPath}`;
}
