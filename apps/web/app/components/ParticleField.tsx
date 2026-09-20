"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive constellation canvas.
 *
 * Drifting particles link to nearby neighbours and shy away from the cursor.
 * The link pass is O(n^2), so density is capped and scaled down on small
 * screens, distances are compared squared (no sqrt in the hot loop), and the
 * loop stops entirely while the canvas is off-screen or the tab is hidden.
 * Renders nothing when the visitor prefers reduced motion.
 */
export default function ParticleField({ className = "hero-canvas" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number };

    const LINK_DIST = 120;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const MOUSE_DIST = 160;
    const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;
    const PUSH_DIST = 130;
    const PUSH_DIST_SQ = PUSH_DIST * PUSH_DIST;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let onScreen = true;
    let mouseActive = false;
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Phones get a sparser field: the link pass grows with the square of
      // the count, and it is the single most expensive thing on the page.
      const isCompact = width < 720;
      const divisor = isCompact ? 26000 : 14000;
      const ceiling = isCompact ? 34 : 80;
      const count = Math.max(12, Math.min(Math.floor((width * height) / divisor), ceiling));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouseActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < PUSH_DIST_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            p.x += (dx / dist) * 0.8;
            p.y += (dy / dist) * 0.8;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250,0.7)";
        ctx.fill();
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= LINK_DIST_SQ) continue;

          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(96,165,250,${0.16 * (1 - dist / LINK_DIST)})`;
          ctx.stroke();

          if (!mouseActive) continue;
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const mouseSq = mx * mx + my * my;
          if (mouseSq >= MOUSE_DIST_SQ) continue;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(167,139,250,${0.22 * (1 - Math.sqrt(mouseSq) / MOUSE_DIST)})`;
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame) return;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouseActive =
        mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onPointerLeave = () => {
      mouseActive = false;
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    visibility.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    resize();
    sync();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
