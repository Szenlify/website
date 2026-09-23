// Device-native free high-quality speech playback & passive CDN cache. Never generates speech via paid APIs.
export const REVIEW_VOICE = "Sulafat";
const CDN = "https://pub-ee4534784e534bd9af38ba8022bc5e1e.r2.dev";

export function reviewAudioText(word: string, sentence?: string) {
  return sentence && sentence.trim().toLowerCase() !== word.trim().toLowerCase()
    ? `${word}. ${sentence}` : word;
}

export async function reviewAudioUrl(text: string, language: string) {
  const lang = (language || "en").trim().toLowerCase();
  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/.test(lang) || lang.length > 35) {
    throw new Error("Invalid audio language");
  }
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text.trim()));
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  return `${CDN}/audio/gemini/gemini-2.5-flash-preview-tts/v1/${REVIEW_VOICE}/${lang}/${hash}.wav`;
}

export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|webOS/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(max-width: 768px) and (pointer: coarse)").matches)
  );
}

export function isSafariBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isAppleVendor = typeof navigator.vendor === "string" && navigator.vendor.includes("Apple");
  const hasSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg|Android|CriOS|FxiOS/i.test(ua);
  return hasSafari || (isAppleVendor && typeof window !== "undefined" && !(window as unknown as { chrome?: unknown }).chrome);
}

export function isAppleDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function getRecommendedSpeechRate(rate = 1, voiceName?: string): number {
  if (voiceName && /google/i.test(voiceName)) {
    return rate;
  }
  if (isIosDevice()) {
    // Apple WebKit's SpeechSynthesis on iOS at 1.0 sounds overly fast, mechanical and clipped.
    // 0.89 delivers a substantially clearer, more natural articulation on iOS.
    return Number((rate * 0.89).toFixed(2));
  }
  return rate;
}

export function cleanSpeechText(text: string): string {
  if (!text) return "";
  return text
    // Remove bracketed pronunciation or grammatical annotations like [verb], [adj], (noun)
    .replace(/\[[^\]]*\]/g, "")
    // Remove HTML tags if any
    .replace(/<[^>]*>/g, "")
    // Remove markdown symbols: asterisks, underscores, hashes, backticks
    .replace(/[*_#`~]/g, "")
    // Replace slashes or pipe symbols with commas so they aren't spoken as "slash"
    .replace(/\s*[/|\\]\s*/g, ", ")
    // Collapse duplicate punctuation marks that cause long pauses on iOS
    .replace(/\.{2,}/g, ".")
    .replace(/-{2,}/g, "-")
    // Normalize spaces before commas or punctuation
    .replace(/\s+([,.:;?!])/g, "$1")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();
}

export function edgeAudioUrl(text: string, language: string): string {
  const lang = (language || "en").trim().toLowerCase();
  return `/api/tts?text=${encodeURIComponent(text.trim())}&lang=${encodeURIComponent(lang)}`;
}

export class ReviewAudioCache {
  private entries = new Map<string, {
    promise: Promise<string | null>;
    controller: AbortController;
    url?: string;
    missing?: boolean;
  }>();

  get(
    text: string,
    language: string,
    background = false
  ): Promise<string | null> {
    const key = JSON.stringify([text.trim(), language.trim().toLowerCase()]);
    const existing = this.entries.get(key);
    if (existing) return existing.promise;

    // Bound memory and network work even during long review sessions.
    while (this.entries.size >= 24) {
      const oldest = this.entries.keys().next().value!;
      this.remove(oldest);
    }

    const controller = new AbortController();
    const entry: {
      promise: Promise<string | null>;
      controller: AbortController;
      url?: string;
      missing?: boolean;
    } = {
      controller,
      promise: Promise.resolve(null),
    };

    entry.promise = (async () => {
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const url = await reviewAudioUrl(text, language);
        const response = await fetch(url, {
          signal: controller.signal,
          priority: background ? "low" : "auto",
        });

        if (response.status === 404) {
          entry.missing = true;
          return null;
        }
        if (!response.ok) throw new Error("Audio download failed");
        const blob = await response.blob();
        if (!blob.size || !blob.type.startsWith("audio/")) throw new Error("Invalid audio file");
        if (controller.signal.aborted) return null;
        entry.url = URL.createObjectURL(blob);
        return entry.url;
      } catch {
        // Network failures can be retried; genuine cache misses stay cached.
        if (this.entries.get(key) === entry) this.entries.delete(key);
        return null;
      } finally {
        clearTimeout(timeout);
      }
    })();

    this.entries.set(key, entry);
    return entry.promise;
  }

  getEdge(
    text: string,
    language: string,
    background = false
  ): Promise<string | null> {
    const key = JSON.stringify(["edge", text.trim(), language.trim().toLowerCase()]);
    const existing = this.entries.get(key);
    if (existing) return existing.promise;

    while (this.entries.size >= 24) {
      const oldest = this.entries.keys().next().value!;
      this.remove(oldest);
    }

    const controller = new AbortController();
    const entry: {
      promise: Promise<string | null>;
      controller: AbortController;
      url?: string;
      missing?: boolean;
    } = {
      controller,
      promise: Promise.resolve(null),
    };

    entry.promise = (async () => {
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const url = edgeAudioUrl(text, language);
        const response = await fetch(url, {
          signal: controller.signal,
          priority: background ? "low" : "auto",
        });

        if (!response.ok) {
          entry.missing = true;
          return null;
        }
        const blob = await response.blob();
        if (!blob.size || !blob.type.startsWith("audio/")) throw new Error("Invalid audio file");
        if (controller.signal.aborted) return null;
        entry.url = URL.createObjectURL(blob);
        return entry.url;
      } catch {
        if (this.entries.get(key) === entry) this.entries.delete(key);
        return null;
      } finally {
        clearTimeout(timeout);
      }
    })();

    this.entries.set(key, entry);
    return entry.promise;
  }

  isMissing(text: string, language: string) {
    return this.entries.get(JSON.stringify([text.trim(), language.trim().toLowerCase()]))?.missing === true;
  }

  private remove(key: string) {
    const entry = this.entries.get(key);
    entry?.controller.abort();
    if (entry?.url) URL.revokeObjectURL(entry.url);
    this.entries.delete(key);
  }

  clear() {
    for (const key of this.entries.keys()) this.remove(key);
  }
}

// Selects the absolute best 100% free device voice:
// - In PC / desktop browsers: strictly ONLY voices from Google (never mechanical/system voices)
// - On iPhone / iPad (iOS): prefers Apple Siri > Premium > Enhanced (Zosia Ulepszony, Samantha Enhanced, etc.) > avoids Compact
export function selectReviewVoice<T extends { name: string; lang: string; default: boolean; voiceURI: string }>(
  voices: T[],
  language: string
): T | undefined {
  if (!voices || !voices.length) return undefined;

  const requested = language.replaceAll("_", "-").toLowerCase();
  const base = requested.split("-")[0];

  const matchingVoices = voices.filter(
    (v) => (v.lang || "").replaceAll("_", "-").toLowerCase().split("-")[0] === base
  );
  if (!matchingVoices.length) return undefined;

  const onMobile = isMobileDevice();

  // On PC / desktop browsers: strictly ONLY voices from Google
  if (!onMobile) {
    const googleVoices = matchingVoices.filter((v) =>
      /google/i.test(`${v.name} ${v.voiceURI}`)
    );
    if (!googleVoices.length) {
      // In PC browsers, only Google voices are permitted
      return undefined;
    }
    return googleVoices.sort((a, b) => {
      const aExact = (a.lang || "").replaceAll("_", "-").toLowerCase() === requested ? 1 : 0;
      const bExact = (b.lang || "").replaceAll("_", "-").toLowerCase() === requested ? 1 : 0;
      const aUS = requested === "en" && /us|united states/i.test(`${a.name} ${a.lang}`) ? 1 : 0;
      const bUS = requested === "en" && /us|united states/i.test(`${b.name} ${b.lang}`) ? 1 : 0;
      return (
        bExact - aExact ||
        bUS - aUS ||
        (b.default ? 1 : 0) - (a.default ? 1 : 0) ||
        a.name.localeCompare(b.name)
      );
    })[0];
  }

  // On iOS devices (iPhone / iPad): prioritize Apple Siri > Premium > Enhanced, avoid Compact
  const score = (voice: T) => {
    const fullId = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    const isExactLang = (voice.lang || "").replaceAll("_", "-").toLowerCase() === requested;

    let points = 0;
    if (isExactLang) points += 50;
    if (voice.default) points += 10;

    if (/siri/i.test(fullId)) points += 2500;
    else if (/premium/i.test(fullId)) points += 1800;
    else if (/enhanced|ulepszon/i.test(fullId)) points += 1400;
    else if (/natural|neural/i.test(fullId)) points += 900;
    else if (/ava|nora|zoe|arthur|daniel|oliver|serena|kate|krzysztof|paulina|zosia|zofia|m[oó]nica|jorge|anna|thomas/i.test(fullId)) {
      points += 500;
    }
    if (/compact|kompakt/i.test(fullId)) points -= 2500;

    return points;
  };

  return matchingVoices.sort((a, b) => score(b) - score(a) || a.voiceURI.localeCompare(b.voiceURI))[0];
}
