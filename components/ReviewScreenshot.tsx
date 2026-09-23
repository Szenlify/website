"use client";

import { useCallback, useState } from "react";

/** Mounted separately on each face; flipping must never reset a loaded image. */
export default function ReviewScreenshot({ src, alt, pl, active }: {
  src: string;
  alt: string;
  pl: boolean;
  active: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const captureImage = useCallback((image: HTMLImageElement | null) => {
    // A cached image can finish before React attaches its load handler.
    if (image?.complete && image.naturalWidth > 0) setStatus("loaded");
  }, []);

  return <div className="review-screenshot">
    <div className={`review-screenshot-box ${status === "loaded" ? "is-loaded" : ""} ${status === "error" ? "is-error" : ""}`} aria-busy={status === "loading"}>
      {status === "error" ? <div className="review-screenshot-error" role="status">
        <span>{pl ? "Nie udało się wczytać zdjęcia." : "Could not load image."}</span>
        <button type="button" onClick={() => { setStatus("loading"); setAttempt(value => value + 1); }}>
          {pl ? "Spróbuj ponownie" : "Try again"}
        </button>
      </div> : <>
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
      </>}
    </div>
  </div>;
}
