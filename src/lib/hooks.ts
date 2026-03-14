"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type MousePosition = { x: number; y: number };

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const latestPosition = useRef<MousePosition>({ x: 0, y: 0 });

  const update = useCallback(() => {
    setPosition({ ...latestPosition.current });
    rafId.current = 0;
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      latestPosition.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return position;
};
