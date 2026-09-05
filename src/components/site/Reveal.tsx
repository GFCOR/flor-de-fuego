import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "h2";
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    // @ts-expect-error -- polymorphic tag with a shared HTMLElement ref
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

