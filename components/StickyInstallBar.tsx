"use client";

import React, { useState, useEffect } from "react";

export default function StickyInstallBar() {
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-install-bar ${showStickyBar ? "visible" : ""}`} id="stickyBar">
      <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-white">
        <span className="text-amber-400">★★★★★</span>
        <span>Master languages with Lectoro AI</span>
      </div>
      <a
        href="https://chromewebstore.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition"
      >
        Add to Chrome (Free)
      </a>
    </div>
  );
}
