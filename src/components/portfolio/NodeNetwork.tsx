import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  User,
  FolderKanban,
  Cpu,
  Wrench,
  Briefcase,
  Mail,
  FileText,
  Award,
  type LucideIcon,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export type NodeKey =
  | "hero"
  | "about"
  | "projects"
  | "aistack"
  | "services"
  | "experience"
  | "contact"
  | "resume"
  | "certificates"
  // legacy keys kept for compatibility with existing handlers
  | "skills"
  | "education"
  | "achievements";

type NetNode = { key: NodeKey; label: string; icon: LucideIcon };

const NODES: NetNode[] = [
  { key: "about",        label: "About",        icon: User },
  { key: "projects",     label: "Projects",     icon: FolderKanban },
  { key: "aistack",      label: "AI Stack",     icon: Cpu },
  { key: "services",     label: "Services",     icon: Wrench },
  { key: "experience",   label: "Experience",   icon: Briefcase },
  { key: "contact",      label: "Contact",      icon: Mail },
  { key: "resume",       label: "Resume",       icon: FileText },
  { key: "certificates", label: "Certificates", icon: Award },
];

interface Props {
  onNodeClick: (key: NodeKey) => void;
}

/**
 * Central hub with the operator's photo, surrounded by 8 icon nodes.
 * Rendered with a circuit-board SVG backdrop plus glowing radial links
 * that mimic the AUTOMATION reference image.
 */
export function NodeNetwork({ onNodeClick }: Props) {
  const size = 620;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 250;

  const positioned = useMemo(
    () =>
      NODES.map((n, i) => {
        // stagger so nodes don't sit on the exact cardinal axes
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / NODES.length;
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
      style={{ width: size, height: size, maxWidth: "94vw", aspectRatio: "1/1" }}
    >
      {/* Circuit-board backdrop */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <defs>
          {/* subtle blue circuit grid */}
          <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M0 20 H14 M26 20 H40 M20 0 V14 M20 26 V40"
              stroke="rgba(94,200,255,0.18)"
              strokeWidth="0.6"
              fill="none"
            />
            <circle cx="20" cy="20" r="1.1" fill="rgba(125,249,255,0.45)" />
            <circle cx="0" cy="0" r="0.8" fill="rgba(94,200,255,0.35)" />
          </pattern>
          <radialGradient id="hubFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(10,25,55,0)" />
            <stop offset="70%" stopColor="rgba(10,25,55,0.55)" />
            <stop offset="100%" stopColor="rgba(6,15,35,0.9)" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5ec8ff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#a8f0ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5ec8ff" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* circuit backdrop masked into a big circle */}
        <circle cx={cx} cy={cy} r={size / 2 - 4} fill="url(#circuit)" opacity="0.55" />
        <circle cx={cx} cy={cy} r={size / 2 - 4} fill="url(#hubFade)" />

        {/* concentric orbits */}
        <circle cx={cx} cy={cy} r={radius - 40} fill="none" stroke="rgba(125,249,255,0.12)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(125,249,255,0.16)" strokeDasharray="2 6" />
        <circle cx={cx} cy={cy} r={radius + 30} fill="none" stroke="rgba(94,200,255,0.08)" />

        {/* radial links hub → nodes */}
        {positioned.map((n) => (
          <g key={`l-${n.key}`}>
            <line
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke="url(#lineGrad)"
              strokeWidth="1.4"
              strokeDasharray="5 7"
              className="animate-dash-flow"
              filter="url(#glowF)"
            />
          </g>
        ))}

        {/* outer polygon connecting neighboring nodes (mesh feel) */}
        {positioned.map((n, i) => {
          const next = positioned[(i + 1) % positioned.length];
          return (
            <line
              key={`p-${n.key}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(125,249,255,0.18)"
              strokeWidth="1"
            />
          );
        })}

        {/* small floating circuit dots */}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const r = radius + 55 + (i % 3) * 8;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          return <circle key={`d-${i}`} cx={x} cy={y} r="1.6" fill="#7df9ff" opacity="0.5" />;
        })}
      </svg>

      {/* Rotating rings on top of svg */}
      <div className="absolute inset-6 rounded-full border border-cyan-400/10 animate-spin-slow pointer-events-none" />
      <div
        className="absolute inset-20 rounded-full border border-dashed border-cyan-400/15 pointer-events-none"
        style={{ animation: "spin-slow 50s linear infinite reverse" }}
      />

      {/* Center profile hub */}
      <motion.button
        onClick={() => onNodeClick("hero")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="absolute rounded-full overflow-hidden glow-border animate-pulse-glow group"
        style={{
          left: cx - 96,
          top: cy - 96,
          width: 192,
          height: 192,
        }}
        aria-label="Dev Chauhan — central hub"
      >
        <img
          src={profileImg}
          alt="Dev Chauhan, AI Automation Engineer"
          className="h-full w-full object-cover"
          width={192}
          height={192}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-full ring-2 ring-cyan-300/70 shadow-[inset_0_0_40px_rgba(125,249,255,0.35)]" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] text-cyan-100/90">
          AUTOMATION
        </div>
      </motion.button>

      {/* Icon nodes */}
      {positioned.map((n, i) => {
        const Icon = n.icon;
        return (
          <motion.button
            key={n.key}
            onClick={() => onNodeClick(n.key)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 220, damping: 18 }}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.94 }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: n.x, top: n.y, willChange: "transform" }}
            aria-label={`Go to ${n.label}`}
          >
            <div className="relative">
              {/* halo */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* icon disc — white circle with dark icon like the reference */}
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white to-cyan-50 ring-2 ring-cyan-300/70 shadow-[0_0_25px_rgba(125,249,255,0.55)] animate-pulse-glow"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <Icon className="h-7 w-7 text-slate-900" strokeWidth={2.2} />
              </div>
              {/* label */}
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-display text-[10px] font-bold tracking-[0.25em] text-cyan-100/90 group-hover:text-cyan-50 transition-colors">
                  {n.label.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
