import Link from "next/link";
import Image from "next/image";

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
      <Image src="/icon48.png" alt="Lectoro AI" width={34} height={34} />
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
    </Link>
  );
}
