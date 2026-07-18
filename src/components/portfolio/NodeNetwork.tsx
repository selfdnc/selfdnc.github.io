import { motion } from "framer-motion";
import { useMemo } from "react";
import profileImg from "@/assets/profile.jpg";

export type NodeKey =
  | "hero" | "about" | "skills" | "projects" | "education"
  | "experience" | "certificates" | "resume" | "contact"
  | "services" | "aistack" | "achievements";

const NODES: { key: NodeKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "certificates", label: "Certificates" },
  { key: "resume", label: "Resume" },
  { key: "contact", label: "Contact" },
  { key: "services", label: "Services" },
  { key: "aistack", label: "AI Stack" },
  { key: "achievements", label: "Achievements" },
];

interface Props {
  onNodeClick: (key: NodeKey) => void;
}

export function NodeNetwork({ onNodeClick }: Props) {
  const size = 560;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 230;

  const positioned = useMemo(
    () =>
      NODES.map((n, i) => {
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...n,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          angle,
        };
      }),
    [cx, cy, radius],
  );

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size, maxWidth: "92vw", aspectRatio: "1/1" }}
    >
      {/* Rotating rings */}
      <div className="absolute inset-0 rounded-full border border-cyan-400/10 animate-spin-slow" />
      <div
        className="absolute inset-8 rounded-full border border-cyan-400/10"
        style={{ animation: "spin-slow 40s linear infinite reverse" }}
      />
      <div className="absolute inset-16 rounded-full border border-dashed border-cyan-400/15 animate-spin-slow" />

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5ec8ff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5ec8ff" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {positioned.map((n) => (
          <line
            key={`l-${n.key}`}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke="url(#lineGrad)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            className="animate-dash-flow"
            filter="url(#glowF)"
          />
        ))}
        {positioned.map((n, i) => {
          const next = positioned[(i + 1) % positioned.length];
          return (
            <line
              key={`p-${n.key}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(125, 249, 255, 0.15)"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Center profile */}
      <motion.button
        onClick={() => onNodeClick("hero")}
        whileHover={{ scale: 1.05 }}
        className="absolute rounded-full overflow-hidden glow-border animate-pulse-glow group"
        style={{
          left: cx - 90,
          top: cy - 90,
          width: 180,
          height: 180,
        }}
        aria-label="Dev Chauhan profile"
      >
        <img
          src={profileImg}
          alt="Dev Chauhan, AI Automation Engineer"
          className="h-full w-full object-cover"
          width={180}
          height={180}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/60" />
      </motion.button>

      {/* Nodes */}
      {positioned.map((n, i) => (
        <motion.button
          key={n.key}
          onClick={() => onNodeClick(n.key)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
          whileHover={{ scale: 1.15 }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: n.x, top: n.y }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-400/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full glass animate-pulse-glow"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <span className="text-[10px] font-display font-bold tracking-wider text-cyan-100 text-center leading-tight px-1">
                {n.label.toUpperCase()}
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
