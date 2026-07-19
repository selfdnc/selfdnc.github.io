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
  // Center point
  const cx = 50;
  const cy = 50;

  return (
    <div className="relative w-full h-screen bg-[var(--color-primary)] flex items-center justify-center overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: "url('/Screenshot 2026-07-18 115357.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />

      {/* Organic Connections (All to All) */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40">
         {NODES.map((n1, i) => (
            NODES.map((n2, j) => {
              if (i >= j) return null; // Duplicate lines rokne ke liye
              const midX = (n1.nx * 100 + n2.nx * 100) / 2 + (Math.random() * 5);
              const midY = (n1.ny * 100 + n2.ny * 100) / 2 + (Math.random() * 5);
              return (
                <path 
                  key={`${n1.key}-${n2.key}`}
                  d={`M ${n1.nx * 100} ${n1.ny * 100} Q ${midX} ${midY} ${n2.nx * 100} ${n2.ny * 100}`}
                  stroke="var(--color-accent)" 
                  strokeWidth="1"
                  fill="none"
                  className="drop-shadow-[0_0_8px_var(--color-glow)]"
                />
              );
            })
         ))}
      </svg>

      {/* Central Main Node (Aapki Image) */}
      <motion.button
          onClick={() => onNodeClick("hero")}
          className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-glow)] p-1 bg-[var(--color-primary)] shadow-[0_0_20px_var(--color-glow)]"
          style={{ width: 80, height: 80 }} // Small size
      >
          <img src={profileImg} className="w-full h-full rounded-full object-cover" />
      </motion.button>

      {/* Surrounding Nodes */}
      {NODES.map((n) => (
        <motion.button
          key={n.key}
          onClick={() => onNodeClick(n.key)}
          className="absolute z-20 flex items-center justify-center rounded-full bg-[var(--color-primary)]/50 backdrop-blur-md border border-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
          style={{ left: `${n.nx * 100}%`, top: `${n.ny * 100}%`, width: 40, height: 40, transform: "translate(-50%, -50%)" }}
        >
          <n.icon className="text-[var(--color-white)]" size={18} />
        </motion.button>
      ))}
    </div>
  );
}
