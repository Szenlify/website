// High-quality OpenAI TTS neural voices & Cloudflare R2 cache with Edge TTS fallback.
export type OpenAiVoiceId = "nova" | "onyx";
export const DEFAULT_OPENAI_VOICE: OpenAiVoiceId = "nova";
export const REVIEW_VOICE: OpenAiVoiceId = "nova";

/**
 * Voice loudness compensation gain multipliers.
 * OpenAI "nova" is naturally softer (~ -21 LUFS) compared to Edge TTS (~ -14 LUFS).
 * Boosting Nova by ~1.85x (+5.3 dB) and Onyx by ~1.30x (+2.3 dB) brings them to a balanced, crystal-clear level.
 */
export const OPENAI_VOICE_GAIN: Record<OpenAiVoiceId, number> = {
  nova: 1.85,
  onyx: 1.30,
};

export interface OpenAiVoiceOption {
  id: OpenAiVoiceId;
  name: string;
  gender: "female" | "male";
  avatar: string;
}

export const OPENAI_TTS_VOICES: readonly OpenAiVoiceOption[] = [
  { id: "nova", name: "Nova", gender: "female", avatar: "👩" },
  { id: "onyx", name: "Onyx", gender: "male", avatar: "👨" },
] as const;

const CDN = "https://pub-ee4534784e534bd9af38ba8022bc5e1e.r2.dev";
const GEMINI_PROXY_URL = "https://europe-west1-extension-eng.cloudfunctions.net/geminiProxy";

export function reviewAudioText(word: string, sentence?: string): string {
  return sentence && sentence.trim().toLowerCase() !== word.trim().toLowerCase()
    ? `${word}. ${sentence}`
    : word;
}

export async function openAiAudioR2Url(
  text: string,
  voiceId: string = "nova",
  language: string = "en"
): Promise<string> {
  const lang = (language || "en").trim().toLowerCase();
  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/.test(lang) || lang.length > 35) {
    throw new Error("Invalid audio language");
  }
  const raw = (voiceId || "").toLowerCase();
  const v = raw === "onyx" || raw === "alloy" ? "onyx" : "nova";
  const clean = cleanSpeechText(text).trim();
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(clean));
  const hash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  return `${CDN}/audio/openai/tts-1/v1/${v}/${lang}/${hash}.mp3`;
}

export async function reviewAudioUrl(
  text: string,
  language: string,
  voiceId: string = "nova"
): Promise<string> {
  return openAiAudioR2Url(text, voiceId, language);
}

export async function synthesizeOpenAiSpeech({
  text,
  voiceId = "nova",
  language = "en",
  userToken,
  signal,
}: {
  text: string;
  voiceId?: string;
  language?: string;
  userToken: string;
  signal?: AbortSignal;
}): Promise<Blob> {
  const raw = (voiceId || "").toLowerCase();
  const v = raw === "onyx" || raw === "alloy" ? "onyx" : "nova";
  const lang = (language || "en").trim().toLowerCase();
  const clean = cleanSpeechText(text).trim();

  const response = await fetch(GEMINI_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      action: "synthesizeOpenAiTts",
      context: "review",
      text: clean,
      voiceId: v,
      language: lang,
    }),
    signal,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `TTS synthesis error (${response.status})`);
  }

  // Extract updated character usage from server response header and broadcast to UI
  const usedHeader = response.headers.get("X-Lectoro-TTS-Used");
  if (usedHeader && typeof window !== "undefined") {
    const usedCount = parseInt(usedHeader, 10);
    if (!isNaN(usedCount)) {
      window.dispatchEvent(
        new CustomEvent("lectoro:tts-used", { detail: { used: usedCount } })
      );
    }
  }

  const blob = await response.blob();
  if (!blob.size || !blob.type.startsWith("audio/")) {
    throw new Error("Invalid audio response received from synthesis");
  }
  return blob;
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
    (typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 768px) and (pointer: coarse)").matches)
  );
}

export function isSafariBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isAppleVendor =
    typeof navigator.vendor === "string" && navigator.vendor.includes("Apple");
  const hasSafari =
    /Safari/i.test(ua) && !/Chrome|Chromium|Edg|Android|CriOS|FxiOS/i.test(ua);
  return (
    hasSafari ||
    (isAppleVendor &&
      typeof window !== "undefined" &&
      !(window as unknown as { chrome?: unknown }).chrome)
  );
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
    // Apple WebKit's SpeechSynthesis on iOS at 1.0 sounds overly fast and clipped.
    // 0.89 delivers a substantially clearer articulation.
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

// Persistent local memory (IndexedDB) for audio blobs.
// Audio stored here was already charged once and will NEVER count characters again.
const DB_NAME = "LectoroAudioDB";
const STORE_NAME = "audioBlobs";
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getAudioDB(): Promise<IDBDatabase> | null {
  if (typeof window === "undefined" || !window.indexedDB) return null;
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      try {
        const req = window.indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } catch (err) {
        reject(err);
      }
    });
  }
  return dbPromise;
}

export async function getLocalAudioBlob(key: string): Promise<Blob | null> {
  const dbP = getAudioDB();
  if (!dbP) return null;
  try {
    const db = await dbP;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result instanceof Blob ? req.result : null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveLocalAudioBlob(key: string, blob: Blob): Promise<void> {
  const dbP = getAudioDB();
  if (!dbP) return;
  try {
    const db = await dbP;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore quota errors
  }
}

export class ReviewAudioCache {
  private entries = new Map<
    string,
    {
      promise: Promise<string | null>;
      controller: AbortController;
      url?: string;
      missing?: boolean;
    }
  >();

  get(
    text: string,
    language: string,
    background = false
  ): Promise<string | null> {
    const key = JSON.stringify([text.trim(), language.trim().toLowerCase()]);
    const existing = this.entries.get(key);
    if (existing) return existing.promise;

    while (this.entries.size >= 32) {
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
        if (!blob.size || !blob.type.startsWith("audio/")) {
          throw new Error("Invalid audio file");
        }
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

  getOpenAi(
    text: string,
    language: string,
    voiceId: OpenAiVoiceId = "nova",
    userToken?: string | null,
    background = false
  ): Promise<string | null> {
    const raw = String(voiceId || "").toLowerCase();
    const v: OpenAiVoiceId = raw === "onyx" || raw === "alloy" ? "onyx" : "nova";
    const lang = (language || "en").trim().toLowerCase();
    const clean = cleanSpeechText(text).trim();
    if (!clean) return Promise.resolve(null);

    const key = JSON.stringify(["openai", v, clean, lang]);
    const existing = this.entries.get(key);
    if (existing) return existing.promise;

    while (this.entries.size >= 32) {
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
        let blob: Blob | null = null;

        // 1. PAMIĘĆ LOKALNA: Sprawdź persistent local IndexedDB najpierw (0 naliczonych znaków)
        try {
          const localBlob = await getLocalAudioBlob(key);
          if (localBlob && localBlob.size > 0 && localBlob.type.startsWith("audio/")) {
            blob = localBlob;
          }
        } catch {
          // Błąd odczytu lokalnej bazy; przejdź do backendu
        }

        // 2. Brak w pamięci lokalnej: ZAWSZE pobieraj przez geminiProxy, aby naliczyć znaki
        // (geminiProxy nalicza znaki w Firestore zarówno dla CDN cache HIT jak i MISS)
        if (!blob && userToken && !controller.signal.aborted) {
          try {
            blob = await synthesizeOpenAiSpeech({
              text: clean,
              voiceId: v,
              language: lang,
              userToken,
              signal: controller.signal,
            });
            // Zapisz do pamięci lokalnej, aby kolejne odtworzenia tej fiszki już nigdy nie naliczały znaków
            if (blob) {
              void saveLocalAudioBlob(key, blob);
            }
          } catch (err) {
            console.warn("[ReviewAudioCache] Backend synthesis failed:", err);
          }
        }

        if (!blob) {
          entry.missing = true;
          return null;
        }

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

  getEdge(
    text: string,
    language: string,
    background = false
  ): Promise<string | null> {
    const key = JSON.stringify(["edge", text.trim(), language.trim().toLowerCase()]);
    const existing = this.entries.get(key);
    if (existing) return existing.promise;

    while (this.entries.size >= 32) {
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
        if (!blob.size || !blob.type.startsWith("audio/")) {
          throw new Error("Invalid audio file");
        }
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
    return (
      this.entries.get(JSON.stringify([text.trim(), language.trim().toLowerCase()]))
        ?.missing === true
    );
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
// - On iPhone / iPad (iOS): prefers Apple Siri > Premium > Enhanced > avoids Compact
export function selectReviewVoice<
  T extends { name: string; lang: string; default: boolean; voiceURI: string }
>(voices: T[], language: string): T | undefined {
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
      return undefined;
    }
    return googleVoices.sort((a, b) => {
      const aExact =
        (a.lang || "").replaceAll("_", "-").toLowerCase() === requested ? 1 : 0;
      const bExact =
        (b.lang || "").replaceAll("_", "-").toLowerCase() === requested ? 1 : 0;
      const aUS =
        requested === "en" && /us|united states/i.test(`${a.name} ${a.lang}`)
          ? 1
          : 0;
      const bUS =
        requested === "en" && /us|united states/i.test(`${b.name} ${b.lang}`)
          ? 1
          : 0;
      return (
        bExact - aExact ||
        bUS - aUS ||
        (b.default ? 1 : 0) - (a.default ? 1 : 0) ||
        a.name.localeCompare(b.name)
      );
    })[0];
  }

  // On iOS devices: prioritize Apple Siri > Premium > Enhanced, avoid Compact
  const score = (voice: T) => {
    const fullId = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    const isExactLang =
      (voice.lang || "").replaceAll("_", "-").toLowerCase() === requested;

    let points = 0;
    if (isExactLang) points += 50;
    if (voice.default) points += 10;

    if (/siri/i.test(fullId)) points += 2500;
    else if (/premium/i.test(fullId)) points += 1800;
    else if (/enhanced|ulepszon/i.test(fullId)) points += 1400;
    else if (/natural|neural/i.test(fullId)) points += 900;
    else if (
      /ava|nora|zoe|arthur|daniel|oliver|serena|kate|krzysztof|paulina|zosia|zofia|m[oƈ]nica|jorge|anna|thomas/i.test(
        fullId
      )
    ) {
      points += 500;
    }
    if (/compact|kompakt/i.test(fullId)) points -= 2500;

    return points;
  };

  return matchingVoices.sort(
    (a, b) => score(b) - score(a) || a.voiceURI.localeCompare(b.voiceURI)
  )[0];
}

let sharedAudioContext: AudioContext | null = null;
let activeSourceNode: AudioBufferSourceNode | null = null;
let activeAudioElement: HTMLAudioElement | null = null;

export function stopActiveAudio(): void {
  if (typeof window === "undefined") return;
  if (activeSourceNode) {
    try {
      activeSourceNode.stop();
    } catch {}
    activeSourceNode = null;
  }
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {}
    activeAudioElement = null;
  }
}

export async function playBoostedAudioUrl(
  audioUrl: string,
  options: {
    gain?: number;
    rate?: number;
    signal?: AbortSignal;
    onEnded?: () => void;
    onError?: (err?: unknown) => void;
  } = {}
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const { gain = 1.0, rate = 1.0, signal, onEnded, onError } = options;
  stopActiveAudio();

  if (signal?.aborted) return false;

  // 1. Try Web Audio API for gain boosting + transparent dynamic limiter
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (AudioCtx) {
      if (!sharedAudioContext || sharedAudioContext.state === "closed") {
        sharedAudioContext = new AudioCtx();
      }
      if (sharedAudioContext.state === "suspended") {
        await sharedAudioContext.resume();
      }

      const response = await fetch(audioUrl, { signal });
      const arrayBuffer = await response.arrayBuffer();
      if (signal?.aborted) return false;

      const audioBuffer = await sharedAudioContext.decodeAudioData(arrayBuffer);
      if (signal?.aborted) return false;

      const ctx = sharedAudioContext;
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = rate;

      // Dynamics compressor acts as a transparent peak limiter to prevent clipping
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-3, ctx.currentTime);
      compressor.knee.setValueAtTime(6, ctx.currentTime);
      compressor.ratio.setValueAtTime(12, ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      compressor.release.setValueAtTime(0.05, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(gain, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(ctx.destination);

      activeSourceNode = source;

      let ended = false;
      const finish = () => {
        if (!ended) {
          ended = true;
          if (activeSourceNode === source) {
            activeSourceNode = null;
          }
          onEnded?.();
        }
      };

      source.onended = finish;
      if (signal) {
        signal.addEventListener(
          "abort",
          () => {
            try {
              source.stop();
            } catch {}
            finish();
          },
          { once: true }
        );
      }

      source.start(0);
      return true;
    }
  } catch (audioCtxError) {
    console.warn(
      "[playBoostedAudioUrl] Web Audio API failed, falling back to HTMLAudioElement:",
      audioCtxError
    );
  }

  // 2. Graceful fallback to HTMLAudioElement
  if (signal?.aborted) return false;
  try {
    const audio = new Audio(audioUrl);
    activeAudioElement = audio;
    audio.playbackRate = rate;
    audio.volume = 1.0;

    let ended = false;
    const finish = () => {
      if (!ended) {
        ended = true;
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        onEnded?.();
      }
    };

    audio.onended = finish;
    audio.onerror = (e) => {
      finish();
      onError?.(e);
    };

    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          audio.pause();
          finish();
        },
        { once: true }
      );
    }

    await audio.play();
    return true;
  } catch (elemError) {
    if (activeAudioElement) activeAudioElement = null;
    onError?.(elemError);
    return false;
  }
}
