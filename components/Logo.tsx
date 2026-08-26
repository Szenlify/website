import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: "w-7 h-7 rounded-lg",
      svg: "w-3.5 h-3.5",
      text: "text-lg",
    },
    md: {
      icon: "w-9 h-9 rounded-xl",
      svg: "w-5 h-5",
      text: "text-2xl",
    },
    lg: {
      icon: "w-11 h-11 rounded-2xl",
      svg: "w-6 h-6",
      text: "text-3xl",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-transform duration-200 ${className}`}
      aria-label="Lectoro AI Home"
    >
      <div
        className={`${currentSize.icon} bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200 shrink-0`}
      >
        <svg className={`${currentSize.svg} text-white fill-current`} viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
      {showText && (
        <div className="flex items-baseline leading-none select-none">
          <span className={`font-display font-extrabold ${currentSize.text} text-white tracking-tight`}>
            Lectoro
          </span>
          <span className={`font-display font-extrabold ${currentSize.text} text-indigo-400`}>
            .ai
          </span>
        </div>
      )}
    </Link>
  );
}
