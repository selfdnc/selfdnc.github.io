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
  Server,
  Network,
  Database,
  Cog,
  type LucideIcon,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export type NodeKey =
  | "hero" | "about" | "projects" | "aistack" | "services"
  | "experience" | "contact" | "resume" | "certificates"
  | "skills" | "education" | "achievements" | "cloud" | "database" | "robotics" | "iot" | "automation";

type NetNode = {
  key: NodeKey;
  label: string;
  icon: LucideIcon;
  nx: number;
  ny: number;
  size?: number;
  isMain?: boolean;
};

const NODES: NetNode[] = [
  // Main Industrial Core Nodes (Based on image_0.png)
  { key: "automation", label: "AUTOMATION", icon: Cog, nx: 0.5, ny: 0.5, size: 180, isMain: true },
  { key: "cloud", label: "Cloud Services", icon: Server, nx: 0.65, ny: 0.40, size: 90 },
  { key: "database", label: "Data Lakes", icon: Database, nx: 0.35, ny: 0.68, size: 90 },
  { key: "robotics", label: "Robotic Systems", icon: Briefcase, nx: 0.78, ny: 0.70, size: 80 }, // Icon changed to represent robotics
  { key: "iot", label: "IoT Network", icon: Network, nx: 0.20, ny: 0.25, size: 80 },

  // Secondary Support Nodes
  { key: "about", label: "About", icon: User, nx: 0.12, ny: 0.15, size: 50 },
  { key: "projects", label: "Projects", icon: FolderKanban, nx: 0.38, ny: 0.08, size: 55 },
  { key: "aistack", label: "AI Stack", icon: Cpu, nx: 0.82, ny: 0.18, size: 50 },
  { key: "services", label: "Services", icon: Wrench, nx: 0.92, ny: 0.50, size: 50 },
  { key: "experience", label: "Experience", icon: Briefcase, nx: 0.75, ny: 0.88, size: 55 },
  { key: "contact", label: "Contact", icon: Mail, nx: 0.32, ny: 0.92, size: 50 },
  { key: "resume", label: "Resume", icon: FileText, nx: 0.08, ny: 0.65, size: 50 },
  { key: "certificates", label: "Certificates", icon: Award, nx: 0.18, ny: 0.42, size: 55 },
];

interface Props {
  onNodeClick: (key: NodeKey) => void;
}

export function NodeNetwork({ onNodeClick }: Props) {
  return (
    <div className="relative w-full h-screen bg-[#001f3f] flex items-center justify-center overflow-hidden">

      {/* Background Layer: Industrial Automation Network */}
      <div
        className="absolute inset-0 z-0 opacity-60 scale-105"
        style={{
          backgroundImage: "url('/Screenshot 2026-07-18 115357.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7) contrast(1.2)",
        }}
      />

      {/* Radial Overlay for Focus */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-transparent to-[#001f3f]" />

      {/* Organic Connections (All-to-All) with Enhanced Glow */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-50">
        {NODES.map((n1, i) => (
          NODES.map((n2, j) => {
            if (i >= j) return null;
            // Control points for curved lines, add slight randomness for organic feel
            const cp1x = n1.nx * 100 + (Math.random() - 0.5) * 20;
            const cp1y = n1.ny * 100 + (Math.random() - 0.5) * 20;
            const cp2x = n2.nx * 100 + (Math.random() - 0.5) * 20;
            const cp2y = n2.ny * 100 + (Math.random() - 0.5) * 20;
            return (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.05, ease: "easeInOut" }}
                key={`${n1.key}-${n2.key}`}
                d={`M ${n1.nx * 100} ${n1.ny * 100} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${n2.nx * 100} ${n2.ny * 100}`}
                stroke="#00ffff" // Cyan color from image
                strokeWidth="0.8"
                fill="none"
                className="drop-shadow-[0_0_6px_#00ffff]"
              />
            );
          })
        ))}
      </svg>

      {/* All Nodes, including Main Industrial Core and Standard Portfolio Nodes */}
      {NODES.map((n) => {
        const isMainNode = n.key === "automation" || n.isMain;
        const iconSize = isMainNode ? 64 : 20;
        const baseClasses = "absolute z-20 flex flex-col items-center justify-center rounded-full transition-all duration-300";
        const mainClasses = "bg-transparent backdrop-blur-sm border-2 border-[#00ffff] shadow-[0_0_40px_#00ffff]";
        const standardClasses = "bg-[#001f3f]/50 backdrop-blur-md border border-[#00ffff] hover:shadow-[0_0_25px_#00ffff] hover:border-[#00ffff]/80";

        return (
          <motion.button
            key={n.key}
            onClick={() => onNodeClick(n.key)}
            className={`${baseClasses} ${isMainNode ? mainClasses : standardClasses}`}
            style={{
              left: `${n.nx * 100}%`,
              top: `${n.ny * 100}%`,
              width: n.size,
              height: n.size,
              transform: "translate(-50%, -50%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <n.icon
              className={`text-[#00ffff] drop-shadow-[0_0_6px_#00ffff] ${isMainNode ? "opacity-100" : "opacity-90"}`}
              size={iconSize}
            />
            {!isMainNode && (
              <span className="absolute -bottom-6 text-[10px] text-[#00ffff] font-semibold tracking-wider opacity-80 whitespace-nowrap">
                {n.label}
              </span>
            )}
            {isMainNode && (
              <span className="mt-2 text-xl text-[#00ffff] font-bold tracking-widest opacity-90 drop-shadow-[0_0_10px_#00ffff]">
                {n.label}
              </span>
            )}
          </motion.button>
        );
      })}

      {/* Optional: Central profile image node, if still needed.
           If not, remove this block.
      <motion.button
        onClick={() => onNodeClick("hero")}
        className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-glow)] p-1 bg-[var(--color-primary)] shadow-[0_0_20px_var(--color-glow)]"
        style={{ width: 80, height: 80 }}
      >
        <img src={profileImg} className="w-full h-full rounded-full object-cover" alt="Profile" />
      </motion.button>
      */}
    </div>
  );
}
