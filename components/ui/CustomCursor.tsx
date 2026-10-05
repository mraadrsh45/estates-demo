"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = 0, y = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      rx = lerp(rx, x, 0.12);
      ry = lerp(ry, y, 0.12);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const expand = () => ring.classList.add("cursor-expanded");
    const collapse = () => ring.classList.remove("cursor-expanded");

    window.addEventListener("mousemove", onMove, { passive: true });
    document
      .querySelectorAll("a, button, [data-cursor-expand]")
      .forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", collapse);
      });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          background: #C6A15B;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed;
          top: -18px;
          left: -18px;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(198,161,91,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          transition: width 0.2s, height 0.2s, top 0.2s, left 0.2s, border-color 0.2s;
        }
        .cursor-ring.cursor-expanded {
          top: -28px;
          left: -28px;
          width: 56px;
          height: 56px;
          border-color: rgba(198,161,91,0.8);
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
