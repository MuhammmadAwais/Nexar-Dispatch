"use client";
import { useState, useEffect, RefObject } from "react";

interface UseInViewOptions {
  triggerOnce?: boolean;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = { triggerOnce: true }
) {
  const [isInView, setIsInView] = useState(false);
  const { triggerOnce = true, root, rootMargin, threshold } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && triggerOnce) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, triggerOnce, root, rootMargin, threshold]);

  return isInView;
}
