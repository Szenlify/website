import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lectoro AI",
    short_name: "Lectoro",
    description:
      "Learn languages while watching Netflix and YouTube with dual subtitles, AI explanations, and SRS flashcards.",
    start_url: "/",
    display: "standalone",
    background_color: "#070913",
    theme_color: "#070913",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
