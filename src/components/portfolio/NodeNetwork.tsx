import { motion } from "framer-motion";
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
  // legacy keys kept for compatibility
  | "skills"
  | "education"
  | "achievements";

type NetNode = {
  key: NodeKey;
  label: string;
  icon: LucideIcon;
  /** normalized coordinates 0..1 inside the viewBox */
  nx: number;
  ny: number;
  size?: number;
};

/**
 * Hand-placed at irregular positions so the layout reads as a real
 * network topology, not an evenly-spaced ring.
 */
const NODES: NetNode[] = [
  { key: "about",        label: "About",        icon: User,         nx: 0.18, ny: 0.20, size: 68 },
  { key: "projects",     label: "Projects",     icon: FolderKanban, nx: 0.52, ny: 0.08, size: 72 },
  { key: "aistack",      label: "AI Stack",     icon: Cpu,          nx: 0.86, ny: 0.22, size: 66 },
  { key: "services",     label: "Services",     icon: Wrench,       nx: 0.92, ny: 0.58, size: 64 },
  { key: "experience",   label: "Experience",   icon: Briefcase,    nx: 0.74, ny: 0.88, size: 70 },
  { key: "contact",      label: "Contact",      icon: Mail,         nx: 0.34, ny: 0.92, size: 66 },
  { key: "resume",       label: "Resume",       icon: FileText,     nx: 0.08, ny: 0.72, size: 64 },
  { key: "certificates", label: "Certificates", icon: Award,        nx: 0.06, ny: 0.44, size: 68 },
];

// Optional peer-to-peer links (indices into NODES) that make the diagram
// feel like a mesh rather than a pure star topology.
const MESH_LINKS: [number, number][] = [
  [0, 1], // about ↔ projects
  [1, 2], // projects ↔ aistack
  [2, 3], // aistack ↔ services
  [4, 5], // experience ↔ contact
  [6, 7], // resume ↔ certificates
  [0, 7], // about ↔ certificates
  [3, 4], // services ↔ experience
];

interface Props {
  onNodeClick: (key: NodeKey) => void;
}

export function NodeNetwork({ onNodeClick }: Props) {
  const size = 900;
  const cx = size / 2;
  const cy = size / 2;

  const positioned = NODES.map((n) => ({
    ...n,
    x: n.nx * size,
    y: n.ny * size,
  }));

  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: 900, aspectRatio: "1/1" }}
    >
      {/* Circuit-board backdrop for the section */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern id="circuit" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M0 24 H16 M32 24 H48 M24 0 V16 M24 32 V48 M8 8 L16 16 M40 40 L32 32"
              stroke="rgba(94,200,255,0.22)"
              strokeWidth="0.7"
              fill="none"
            />
            <circle cx="24" cy="24" r="1.4" fill="rgba(125,249,255,0.55)" />
            <circle cx="0" cy="0" r="1" fill="rgba(94,200,255,0.4)" />
            <rect x="22" y="6" width="4" height="4" fill="none" stroke="rgba(94,200,255,0.35)" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="hubFade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(6,15,35,0)" />
            <stop offset="70%" stopColor="rgba(6,15,35,0.55)" />
            <stop offset="100%" stopColor="rgba(6,15,35,0.95)" />
          </radialGradient>
          <linearGradient id="dataLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5ec8ff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#a8f0ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#5ec8ff" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="meshLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5ec8ff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5ec8ff" stopOpacity="0.05" />
          </linearGradient>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* circuit background rectangle */}
        <rect x="0" y="0" width={size} height={size} fill="url(#circuit)" opacity="0.65" />
        <rect x="0" y="0" width={size} height={size} fill="url(#hubFade)" />

        {/* soft concentric halos around the core */}
        <circle cx={cx} cy={cy} r="110" fill="none" stroke="rgba(125,249,255,0.10)" />
        <circle cx={cx} cy={cy} r="170" fill="none" stroke="rgba(125,249,255,0.08)" strokeDasharray="2 8" />
        <circle cx={cx} cy={cy} r="240" fill="none" stroke="rgba(125,249,255,0.05)" />

        {/* Mesh peer-to-peer links (drawn under the primary data pathways) */}
        {MESH_LINKS.map(([a, b], i) => {
          const A = positioned[a];
          const B = positioned[b];
          return (
            <line
              key={`m-${i}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#meshLine)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          );
        })}

        {/* Primary data pathways: hub → each node */}
        {positioned.map((n) => (
          <g key={`p-${n.key}`}>
            {/* faint static rail for readability */}
            <line
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke="rgba(125,249,255,0.22)"
              strokeWidth="1"
            />
            {/* animated data flow on top */}
            <line
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke="url(#dataLine)"
              strokeWidth="1.6"
              strokeDasharray="6 10"
              className="animate-dash-flow"
              filter="url(#lineGlow)"
            />
          </g>
        ))}

        {/* Traveling packets along each pathway */}
        {positioned.map((n, i) => (
          <circle key={`pk-${n.key}`} r="2.4" fill="#a8f0ff">
            <animateMotion
              dur={`${3 + (i % 4) * 0.7}s`}
              repeatCount="indefinite"
              path={`M ${cx} ${cy} L ${n.x} ${n.y}`}
              begin={`${i * 0.35}s`}
            />
          </circle>
        ))}

        {/* ambient circuit sparks */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = (i * 137.5) % size;
          const y = (i * 89.3) % size;
          return <circle key={`s-${i}`} cx={x} cy={y} r="1.2" fill="#7df9ff" opacity={0.25 + (i % 5) * 0.08} />;
        })}
      </svg>

      {/* Slow rotating rings on top of svg */}
      <div
        className="absolute rounded-full border border-cyan-400/15 animate-spin-slow pointer-events-none"
        style={{ left: "50%", top: "50%", width: 300, height: 300, transform: "translate(-50%,-50%)" }}
      />
      <div
        className="absolute rounded-full border border-dashed border-cyan-400/20 pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: 220,
          height: 220,
          transform: "translate(-50%,-50%)",
          animation: "spin-slow 55s linear infinite reverse",
        }}
      />

      {/* Core: profile picture as the network hub */}
      <motion.button
        onClick={() => onNodeClick("hero")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="absolute rounded-full overflow-hidden glow-border animate-pulse-glow"
        style={{
          left: "50%",
          top: "50%",
          width: 200,
          height: 200,
          transform: "translate(-50%,-50%)",
        }}
        aria-label="Dev Chauhan — network core"
      >
        <img
          src={profileImg}
          alt="Dev Chauhan, AI Automation Engineer"
          className="h-full w-full object-cover"
          width={200}
          height={200}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-full ring-2 ring-cyan-300/70 shadow-[inset_0_0_50px_rgba(125,249,255,0.4)]" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.35em] text-cyan-100">
          CORE
        </div>
      </motion.button>

      {/* Module nodes at irregular network positions */}
      {positioned.map((n, i) => {
        const Icon = n.icon;
        const s = n.size ?? 64;
        return (
          <motion.button
            key={n.key}
            onClick={() => onNodeClick(n.key)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 220, damping: 18 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.94 }}
            className="group absolute"
            style={{
              left: `${n.nx * 100}%`,
              top: `${n.ny * 100}%`,
              transform: "translate(-50%, -50%)",
              willChange: "transform",
            }}
            aria-label={`Go to ${n.label}`}
          >
            <div className="relative" style={{ width: s, height: s }}>
              <div className="absolute inset-0 rounded-full bg-cyan-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-cyan-50 ring-2 ring-cyan-300/70 shadow-[0_0_25px_rgba(125,249,255,0.55)] animate-pulse-glow"
                style={{ animationDelay: `${i * 0.28}s` }}
              >
                <Icon className="text-slate-900" size={Math.round(s * 0.42)} strokeWidth={2.2} />
              </div>
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-display text-[10px] font-bold tracking-[0.28em] text-cyan-100/90 group-hover:text-cyan-50 transition-colors">
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
