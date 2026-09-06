"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function Noise() {
  return <div className="noise w-screen" aria-hidden="true" />;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-90 h-0.5 w-full origin-left bg-[#d6ff3f]"
        style={{ scaleX }}
      />
      {children}
    </>
  );
}

export function CursorFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
      if (ring.current) {
        ring.current.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 180, fill: "forwards" },
        );
      }
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button")) {
        ring.current?.classList.remove("border-purple-600","border");
        ring.current?.classList.add("border-green-600","border-2");
      } else {
        ring.current?.classList.remove("border-green-600","border-2");
        ring.current?.classList.add("border-purple-600","border");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring border border-purple-600" />
    </>
  );
}
