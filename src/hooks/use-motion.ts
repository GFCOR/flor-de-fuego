import { useEffect, useRef } from "react";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ParallaxItem = { el: HTMLElement; speed: number };

const items: ParallaxItem[] = [];
let rafId: number | null = null;
let listening = false;

function update() {
  rafId = null;
  const vh = window.innerHeight;
  for (const { el, speed } of items) {
    const rect = el.getBoundingClientRect();
    // progress: -1 (below viewport) .. 1 (above viewport)
    const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
    el.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0)`;
  }
}

function schedule() {
  if (rafId === null) rafId = window.requestAnimationFrame(update);
}

/** Transform-based scroll parallax. speed: positive moves slower than scroll. */
export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const item: ParallaxItem = { el, speed };
    items.push(item);

    if (!listening) {
      listening = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    }
    schedule();

    return () => {
      const i = items.indexOf(item);
      if (i >= 0) items.splice(i, 1);
      el.style.transform = "";
      if (items.length === 0 && listening) {
        listening = false;
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
  }, [speed]);

  return ref;
}

/** Adds .is-visible when the element scrolls into view. */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-visible");
      return;
    }
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}

