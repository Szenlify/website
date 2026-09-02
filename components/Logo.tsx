import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/types";
import { getLocalizedHref } from "@/lib/routing";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  locale?: Locale;
  linked?: boolean;
}

export default function Logo({ className = "", showText = true, size = "md", locale = "en", linked = true }: LogoProps) {
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

  const content = (
    <>
      <Image src="/icon48.png" alt="" width={34} height={34} sizes="34px" />
      {showText && (
        <div className="flex items-baseline leading-none select-none">
          <span className={`font-display font-extrabold ${currentSize.text} text-white tracking-tight`}>
            Lectoro
          </span>
          <span className={`font-display font-extrabold ${currentSize.text} text-teal-400`}>
            AI
          </span>
        </div>
      )}
    </>
  );

  if (!linked) {
    return <div className={`inline-flex items-center gap-3 ${className}`}>{content}</div>;
  }

  return (
    <Link
      href={getLocalizedHref("/", locale)}
      className={`inline-flex items-center gap-3 group transition-transform duration-200 ${className}`}
      aria-label="Lectoro AI Home"
    >
      {content}
    </Link>
  );
}
