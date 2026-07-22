import { useEffect, useRef } from "react";

/** GPU-accelerated particle + mesh background with mouse parallax. */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let running = true;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 70;
    const LINK_DIST = 140;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const mx = (mouse.current.x - 0.5) * 30;
      const my = (mouse.current.y - 0.5) * 30;
      const ox = mx * 0.4;
      const oy = my * 0.4;

      // update + connections in a single pass
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const alpha = 1 - Math.sqrt(d2) / LINK_DIST;
            ctx.strokeStyle = `rgba(94, 200, 255, ${alpha * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(a.x + ox, a.y + oy);
            ctx.lineTo(b.x + ox, b.y + oy);
            ctx.stroke();
          }
        }
      }
      // dots
      ctx.fillStyle = "rgba(140, 220, 255, 0.85)";
      ctx.shadowColor = "rgba(80, 200, 255, 0.9)";
      ctx.shadowBlur = 10;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    // Throttle mousemove to animation frame
    let pendingMouse = false;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (pendingMouse) return;
      pendingMouse = true;
      requestAnimationFrame(() => {
        mouse.current.x = x;
        mouse.current.y = y;
        pendingMouse = false;
      });
    };

    const onResize = () => { resize(); init(); };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    resize(); init(); draw();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ transform: "translateZ(0)" }}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" style={{ willChange: "opacity, transform" }} />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl animate-pulse-glow" style={{ willChange: "opacity, transform" }} />
    </div>
  );
}

/** Cursor glow that follows mouse. */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let pending = false;
    let tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX - 200;
      ty = e.clientY - 200;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }
        pending = false;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-[5] h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl mix-blend-screen"
      style={{ willChange: "transform" }}
    />
  );
}
