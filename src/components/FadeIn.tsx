"use client";
import { useInView } from "@/hooks/useInView";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const { ref, inView } = useInView();

  const translate = {
    up: inView ? "translate-y-0" : "translate-y-8",
    left: inView ? "translate-x-0" : "-translate-x-8",
    right: inView ? "translate-x-0" : "translate-x-8",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100" : "opacity-0"
      } ${translate} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
