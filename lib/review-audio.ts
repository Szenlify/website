// Must match the existing R2 audio keys. This module never generates speech.
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

export class ReviewAudioCache {
  private entries = new Map<string, { promise: Promise<string | null>; controller: AbortController; url?: string; missing?: boolean }>();

  get(text: string, language: string, background = false): Promise<string | null> {
    const key = JSON.stringify([text.trim(), language.trim().toLowerCase()]);
    const existing = this.entries.get(key);
    if (existing) return existing.promise;
    // Bound memory and network work even during long review sessions.
    while (this.entries.size >= 12) {
      const oldest = this.entries.keys().next().value!;
      this.remove(oldest);
    }
    const controller = new AbortController();
    const entry: { promise: Promise<string | null>; controller: AbortController; url?: string; missing?: boolean } = {
      controller, promise: Promise.resolve(null),
    };
    entry.promise = (async () => {
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const url = await reviewAudioUrl(text, language);
        const response = await fetch(url, {
          signal: controller.signal, priority: background ? "low" : "auto",
        });
        if (response.status === 404) { entry.missing = true; return null; }
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
      } finally { clearTimeout(timeout); }
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

  clear() { for (const key of this.entries.keys()) this.remove(key); }
}

// Voice quality is not standardized; prefer Google, then explicitly named
// natural/enhanced voices, always within the requested language.
export function selectReviewVoice<T extends { name: string; lang: string; default: boolean; voiceURI: string }>(voices: T[], language: string): T | undefined {
  const requested = language.replaceAll('_', '-').toLowerCase();
  const base = requested.split('-')[0];
  const score = (voice: T) => {
    const name = `${voice.name} ${voice.voiceURI}`;
    return (/google/i.test(name) ? 1000 : 0)
      + (/premium|enhanced|natural|neural/i.test(name) ? 100 : 0)
      + (voice.lang.replaceAll('_', '-').toLowerCase() === requested ? 20 : 0)
      + (voice.default ? 5 : 0)
      - (/compact|espeak/i.test(name) ? 50 : 0);
  };
  return voices.filter(v => v.lang.replaceAll('_', '-').toLowerCase().split('-')[0] === base)
    .sort((a, b) => score(b) - score(a) || a.voiceURI.localeCompare(b.voiceURI))[0];
}
