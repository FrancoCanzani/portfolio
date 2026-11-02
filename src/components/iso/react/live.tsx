"use client";

import * as React from "react";

const STILLNESS = "(prefers-reduced-motion: reduce)";
const MARGIN = "120px 0px";
const LONGEST_FRAME = 1 / 30;

export const asksForStillness = () => typeof window !== "undefined" && window.matchMedia(STILLNESS).matches;

export function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = React.useState(false);
  const watched = React.useRef<Element | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);
  React.useEffect(() => {
    const node = ref.current;
    if (node === watched.current) return;
    observer.current?.disconnect();
    observer.current = null;
    watched.current = node;
    setInView(false);
    if (!node) return;
    const binding = new IntersectionObserver((entries) => {
      if (watched.current === node && observer.current === binding) setInView(Boolean(entries.at(-1)?.isIntersecting));
    }, { rootMargin: MARGIN });
    observer.current = binding;
    binding.observe(node);
  });
  React.useEffect(() => () => {
    observer.current?.disconnect();
    observer.current = null;
    watched.current = null;
  }, []);
  return inView;
}

export function useLoop(tick: (dt: number, calm: boolean) => boolean, running: boolean) {
  const latest = React.useRef(tick);
  React.useLayoutEffect(() => {
    latest.current = tick;
  });
  const frame = React.useRef(0);
  const last = React.useRef(0);
  const kick = React.useCallback(() => {
    if (frame.current) return;
    last.current = 0;
    const step = (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, LONGEST_FRAME) : 1 / 60;
      last.current = now;
      const more = latest.current(dt, asksForStillness());
      frame.current = more ? requestAnimationFrame(step) : 0;
    };
    frame.current = requestAnimationFrame(step);
  }, []);
  React.useEffect(() => {
    if (running) kick();
    else {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [running, kick]);
  return kick;
}
