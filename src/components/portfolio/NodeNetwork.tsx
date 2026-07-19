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
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1c]">
      
      {/* 1. Tech Background: Image ko cover kiya aur blue tint diya */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-center bg-cover"
        style={{ backgroundImage: "url('/Screenshot 2026-07-18 115357.jpg')" }} 
      />
      {/* Subtle overlay for better readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0f1c]/80 via-transparent to-[#0a0f1c]/80" />

      {/* 2. Automation Lines (Circuit Connection Look) */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-60">
         <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
         </defs>
         {NODES.map((n) => (
            <motion.line 
                key={n.key}
                x1="50%" y1="50%" 
                x2={`${n.nx * 100}%`} y2={`${n.ny * 100}%`} 
                stroke="url(#lineGrad)" 
                strokeWidth="1.5"
                strokeDasharray="4 4" // Circuit wire jaisa look
            />
         ))}
      </svg>

      {/* 3. Center Profile */}
      <motion.button
          onClick={() => onNodeClick("hero")}
          className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
      >
          <div className="rounded-full overflow-hidden w-28 h-28 bg-black">
            <img src={profileImg} className="w-full h-full object-cover" />
          </div>
      </motion.button>

      {/* 4. Nodes (Tech Icon Style) */}
      {NODES.map((n) => (
        <motion.button
          key={n.key}
          onClick={() => onNodeClick(n.key)}
          className="absolute z-20 flex items-center justify-center rounded-full bg-[#0d1829] border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all"
          style={{ left: `${n.nx * 100}%`, top: `${n.ny * 100}%`, width: 50, height: 50, transform: "translate(-50%, -50%)" }}
        >
          <n.icon className="text-cyan-400" size={22} />
        </motion.button>
      ))}
    </div>
  );
}
