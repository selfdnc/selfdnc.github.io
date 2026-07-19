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
    // Poori screen cover karne ke liye fixed height aur background
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1c]">
      
      {/* BACKGROUND IMAGE - Full screen fit */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('/Screenshot 2026-07-18 115357.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }} 
      />
      {/* Dark overlay taaki nodes clear dikhein */}
      <div className="absolute inset-0 z-0 bg-black/60" />

      {/* NODES AREA */}
      <div className="relative z-10 w-full h-full max-w-[1200px]">
        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {NODES.map((n) => (
              <line 
                  key={n.key}
                  x1="50%" y1="50%" 
                  x2={`${n.nx * 100}%`} y2={`${n.ny * 100}%`} 
                  stroke="#ffffff" 
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-40"
              />
           ))}
        </svg>

        {/* Center Profile */}
        <motion.button
            onClick={() => onNodeClick("hero")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white p-1 bg-black"
        >
            <img src={profileImg} className="w-24 h-24 rounded-full object-cover" />
        </motion.button>

        {/* Nodes */}
        {NODES.map((n) => (
          <motion.button
            key={n.key}
            onClick={() => onNodeClick(n.key)}
            className="absolute flex items-center justify-center rounded-full bg-white border-2 border-blue-400 shadow-[0_0_10px_white]"
            style={{ left: `${n.nx * 100}%`, top: `${n.ny * 100}%`, width: 45, height: 45, transform: "translate(-50%, -50%)" }}
          >
            <n.icon className="text-blue-900" size={20} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
