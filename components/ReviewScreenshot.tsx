"use client";

import { useCallback, useState } from "react";
import type { Locale } from "@/lib/i18n/types";

const SCREENSHOT_COPY: Record<Locale, { error: string; retry: string }> = {
  pl: { error: "Nie udało się wczytać zdjęcia.", retry: "Spróbuj ponownie" },
  en: { error: "Could not load image.", retry: "Try again" },
  de: { error: "Bild konnte nicht geladen werden.", retry: "Erneut versuchen" },
  es: { error: "No se pudo cargar la imagen.", retry: "Reintentar" },
  fr: { error: "Impossible de charger l'image.", retry: "Réessayer" },
  it: { error: "Impossibile caricare l'immagine.", retry: "Riprova" },
  cs: { error: "Obrázek se nepodařilo načíst.", retry: "Zkusit znovu" },
  nl: { error: "Kan afbeelding niet laden.", retry: "Opnieuw proberen" },
  pt: { error: "Não foi possível carregar a imagem.", retry: "Tentar novamente" },
  ja: { error: "画像を読み込めませんでした。", retry: "再試行" },
  ko: { error: "이미지를 불러올 수 없습니다.", retry: "다시 시도" },
};

/** Mounted separately on each face; flipping must never reset a loaded image. */
export default function ReviewScreenshot({
  src,
  alt,
  locale = "en",
  active,
}: {
  src: string;
  alt: string;
  locale?: Locale;
  active: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const copy = SCREENSHOT_COPY[locale] || SCREENSHOT_COPY.en;

  const captureImage = useCallback((image: HTMLImageElement | null) => {
    // A cached image can finish before React attaches its load handler.
    if (image?.complete && image.naturalWidth > 0) setStatus("loaded");
  }, []);

  return (
    <div className="review-screenshot">
      <div
        className={`review-screenshot-box ${status === "loaded" ? "is-loaded" : ""} ${status === "error" ? "is-error" : ""}`}
        aria-busy={status === "loading"}
      >
        {status === "error" ? (
          <div className="review-screenshot-error" role="status">
            <span>{copy.error}</span>
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                setAttempt((value) => value + 1);
              }}
            >
              {copy.retry}
            </button>
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={attempt}
              ref={captureImage}
              className="review-screenshot-img"
              src={src}
              alt={alt}
              loading="eager"
              fetchPriority={active ? "high" : "low"}
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
            />
          </>
        )}
      </div>
    </div>
  );
}
