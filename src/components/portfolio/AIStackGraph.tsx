import { motion } from "framer-motion";
import { useMemo } from "react";

const stack = ["Docker", "n8n", "Agents", "Ollama", "Qdrant", "Groq", "Webhooks", "Gemini"];

export function AIStackGraph() {
  const size = 480;
  const cx = size / 2;
  const cy = size / 2;
  const r = 180;

  const nodes = useMemo(
    () =>
      stack.map((label, i) => {
        const a = (i / stack.length) * Math.PI * 2 - Math.PI / 2;
        return { label, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      }),
    [cx, cy, r],
  );

  return (
    <div className="relative mx-auto" style={{ width: size, height: size, maxWidth: "90vw", aspectRatio: "1/1" }}>
      <div className="absolute inset-0 rounded-full border border-cyan-400/10 animate-spin-slow" />
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="stackGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5ec8ff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5ec8ff" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {nodes.map((n) => (
          <line
            key={n.label}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke="url(#stackGrad)"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            className="animate-dash-flow"
          />
        ))}
      </svg>

      <div
        className="absolute flex items-center justify-center rounded-full glass-strong glow-border animate-pulse-glow"
        style={{ left: cx - 60, top: cy - 60, width: 120, height: 120 }}
      >
        <span className="font-display font-black text-2xl text-gradient tracking-widest">ME</span>
      </div>

      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06, type: "spring" }}
          className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass animate-pulse-glow"
          style={{ left: n.x, top: n.y, animationDelay: `${i * 0.2}s` }}
        >
          <span className="text-[10px] font-display font-bold text-cyan-100 text-center px-1">
            {n.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
