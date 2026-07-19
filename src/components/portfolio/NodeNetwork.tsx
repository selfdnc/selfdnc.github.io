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
    <div className="relative w-full h-screen bg-[#0A1F44] flex items-center justify-center overflow-hidden">
      
      {/* Background Image - High Tech Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: "url('/Screenshot 2026-07-18 115357.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} 
      />

      {/* Futuristic Organic Connection Lines (Tedi-Medi Lines) */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-60">
         {NODES.map((n) => {
            const centerX = 50;
            const centerY = 50;
            // Tedi-medi line ke liye Quadratic Curve (Q) ka use
            const midX = (centerX + (n.nx * 100)) / 2 + (Math.random() * 10 - 5);
            const midY = (centerY + (n.ny * 100)) / 2 + (Math.random() * 10 - 5);
            
            return (
              <path 
                key={n.key}
                d={`M ${centerX} ${centerY} Q ${midX} ${midY} ${n.nx * 100} ${n.ny * 100}`}
                stroke="#4FC3F7" 
                strokeWidth="1.5"
                fill="none"
                className="drop-shadow-[0_0_5px_rgba(79,195,247,0.8)]"
              />
            );
         })}
      </svg>

      {/* Center Profile (Glassmorphism Effect) */}
      <motion.button
          onClick={() => onNodeClick("hero")}
          className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-[2px] bg-gradient-to-br from-[#1E88E5] to-[#B3E5FC] shadow-[0_0_40px_rgba(79,195,247,0.5)]"
      >
          <div className="rounded-full overflow-hidden w-32 h-32 bg-[#0A1F44] backdrop-blur-md border border-white/20">
            <img src={profileImg} className="w-full h-full object-cover" />
          </div>
      </motion.button>

      {/* Glassmorphism Nodes */}
      {NODES.map((n) => (
        <motion.button
          key={n.key}
          onClick={() => onNodeClick(n.key)}
          className="absolute z-20 flex items-center justify-center rounded-full bg-[#1E88E5]/20 backdrop-blur-lg border border-[#4FC3F7]/50 shadow-[0_0_15px_rgba(79,195,247,0.3)] hover:bg-[#4FC3F7]/40 transition-all"
          style={{ left: `${n.nx * 100}%`, top: `${n.ny * 100}%`, width: 50, height: 50, transform: "translate(-50%, -50%)" }}
        >
          <n.icon className="text-[#FFFFFF] drop-shadow-md" size={22} />
        </motion.button>
      ))}
    </div>
  );
}
