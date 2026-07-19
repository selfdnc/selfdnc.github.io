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
  | "hero" | "about" | "projects" | "aistack" | "services"
  | "experience" | "contact" | "resume" | "certificates"
  | "skills" | "education" | "achievements";

type NetNode = {
  key: NodeKey;
  label: string;
  icon: LucideIcon;
  nx: number;
  ny: number;
  size?: number;
};

const NODES: NetNode[] = [
  { key: "about",        label: "About",        icon: User,         nx: 0.10, ny: 0.15, size: 68 },
  { key: "projects",     label: "Projects",     icon: FolderKanban, nx: 0.40, ny: 0.05, size: 72 },
  { key: "aistack",      label: "AI Stack",     icon: Cpu,          nx: 0.80, ny: 0.18, size: 66 },
  { key: "services",     label: "Services",     icon: Wrench,       nx: 0.90, ny: 0.50, size: 64 },
  { key: "experience",   label: "Experience",   icon: Briefcase,    nx: 0.75, ny: 0.85, size: 70 },
  { key: "contact",      label: "Contact",      icon: Mail,         nx: 0.30, ny: 0.90, size: 66 },
  { key: "resume",       label: "Resume",       icon: FileText,     nx: 0.05, ny: 0.65, size: 64 },
  { key: "certificates", label: "Certificates", icon: Award,        nx: 0.15, ny: 0.40, size: 68 },
];

interface Props {
  onNodeClick: (key: NodeKey) => void;
}

export function NodeNetwork({ onNodeClick }: Props) {
  // Size chhota kiya taaki viewport mein fit aaye
  const size = 600; 
  const cx = size / 2;
  const cy = size / 2;

  const positioned = NODES.map((n) => ({
    ...n,
    x: n.nx * size,
    y: n.ny * size,
  }));

  return (
    // Max-width 600px aur margin auto se ye screen par center aur fit rahega
    <div className="relative mx-auto w-full max-w-[600px]" style={{ aspectRatio: "1/1" }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="circuit" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M0 24 H16 M32 24 H48 M24 0 V16 M24 32 V48" stroke="rgba(94,200,255,0.1)" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={size} height={size} fill="url(#circuit)" opacity="0.4" />

        {positioned.map((n) => (
          <line key={n.key} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="rgba(125,249,255,0.15)" strokeWidth="1" />
        ))}
      </svg>

      {/* Core Profile: Size 180 se kam karke 120 kiya */}
      <motion.button
        onClick={() => onNodeClick("hero")}
        className="absolute rounded-full overflow-hidden border-2 border-cyan-500/30"
        style={{ left: "50%", top: "50%", width: 120, height: 120, transform: "translate(-50%,-50%)" }}
      >
        <img src={profileImg} className="h-full w-full object-cover" />
      </motion.button>

      {/* Nodes: Size 60 se kam karke 45 kiya */}
      {positioned.map((n) => {
        const Icon = n.icon;
        return (
          <motion.button
            key={n.key}
            onClick={() => onNodeClick(n.key)}
            className="absolute flex items-center justify-center rounded-full bg-slate-900 border border-cyan-500/50 hover:border-cyan-300 transition-colors"
            style={{
              left: `${n.nx * 100}%`,
              top: `${n.ny * 100}%`,
              width: 45,
              height: 45,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Icon className="text-cyan-400" size={20} />
          </motion.button>
        );
      })}
    </div>
  );
}
