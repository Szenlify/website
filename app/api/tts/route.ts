import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_NEURAL_VOICES: Record<string, string> = {
  pl: "pl-PL-MarekNeural",
  en: "en-US-JennyNeural",
  es: "es-ES-AlvaroNeural",
  de: "de-DE-ConradNeural",
  fr: "fr-FR-HenriNeural",
  it: "it-IT-DiegoNeural",
  pt: "pt-BR-AntonioNeural",
  nl: "nl-NL-MaartenNeural",
  ru: "ru-RU-DmitryNeural",
  ja: "ja-JP-KeitaNeural",
  ko: "ko-KR-InJoonNeural",
  zh: "zh-CN-YunxiNeural",
  cs: "cs-CZ-AntoninNeural",
  sk: "sk-SK-LukasNeural",
  uk: "uk-UA-OstapNeural",
  tr: "tr-TR-AhmetNeural",
  ar: "ar-SA-HamedNeural",
  hi: "hi-IN-MadhurNeural",
};

// In-memory LRU cache: holds up to 500 rendered MP3 clips (~8-12 MB RAM total)
const AUDIO_CACHE = new Map<string, Buffer>();
const MAX_CACHE_SIZE = 500;

function cleanTextForSpeech(text: string): string {
  if (!text) return "";
  return text
    .replace(/\[[^\]]*\]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[*_#`~]/g, "")
    .replace(/\s*[/|\\]\s*/g, ", ")
    .replace(/\.{2,}/g, ".")
    .replace(/-{2,}/g, "-")
    .replace(/\s+([,.:;?!])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

async function synthesizeEdgeSpeech(text: string, voiceName: string): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  try {
    await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(text);
    const chunks: Buffer[] = [];

    return await new Promise<Buffer>((resolve, reject) => {
      const timer = setTimeout(() => {
        try { tts.close(); } catch {}
        reject(new Error("Edge TTS synthesis timed out"));
      }, 10000);

      audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      audioStream.on("end", () => {
        clearTimeout(timer);
        try { tts.close(); } catch {}
        resolve(Buffer.concat(chunks));
      });
      audioStream.on("error", (err: Error) => {
        clearTimeout(timer);
        try { tts.close(); } catch {}
        reject(err);
      });
    });
  } catch (error) {
    try { tts.close(); } catch {}
    throw error;
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
  try {
    let rawText = "";
    let rawLang = "en";
    let rawVoice = "";

    if (request.method === "POST") {
      try {
        const body = await request.json();
        rawText = String(body.text || "");
        rawLang = String(body.lang || "en");
        rawVoice = String(body.voice || "");
      } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
      }
    } else {
      const { searchParams } = new URL(request.url);
      rawText = searchParams.get("text") || "";
      rawLang = searchParams.get("lang") || "en";
      rawVoice = searchParams.get("voice") || "";
    }

    const clean = cleanTextForSpeech(rawText);
    if (!clean) {
      return NextResponse.json({ error: "Empty speech text" }, { status: 400 });
    }
    if (clean.length > 600) {
      return NextResponse.json({ error: "Text exceeds maximum 600 characters limit" }, { status: 400 });
    }

    const baseLang = rawLang.toLowerCase().replaceAll("_", "-").split("-")[0];
    const voiceName = rawVoice.trim() || DEFAULT_NEURAL_VOICES[baseLang] || "en-US-JennyNeural";

    const cacheKey = crypto
      .createHash("sha256")
      .update(`${voiceName}:${clean}`)
      .digest("hex");

    const cachedBuffer = AUDIO_CACHE.get(cacheKey);
    if (cachedBuffer) {
      return new NextResponse(new Uint8Array(cachedBuffer), {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-TTS-Cache": "HIT",
          "X-TTS-Voice": voiceName,
        },
      });
    }

    const audioBuffer = await synthesizeEdgeSpeech(clean, voiceName);

    // Store in LRU cache
    if (AUDIO_CACHE.size >= MAX_CACHE_SIZE) {
      const oldestKey = AUDIO_CACHE.keys().next().value;
      if (oldestKey) AUDIO_CACHE.delete(oldestKey);
    }
    AUDIO_CACHE.set(cacheKey, audioBuffer);

    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-TTS-Cache": "MISS",
        "X-TTS-Voice": voiceName,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TTS generation failed";
    console.error("[/api/tts] Error generating speech:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
