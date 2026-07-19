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
      
      {/* 1. Wahi Background Image jo apne reference mein di hai */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ 
          backgroundImage: "url('/Screenshot 2026-07-18 115357.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)" // Image ko thoda dark kiya taaki white icons clear dikhein
        }} 
      />

      {/* 2. Wahi sare interconnected nodes (lekin main icon hatakar) */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-70">
         {NODES.map((n) => {
            // Agar node 'skills' hai (jahan gears the), toh hum line nahi khichenge 
            // ya line wahan par khatam kar denge jahan pic aayegi.
            const isTarget = n.key === "skills"; 
            
            return (
                <line 
                    key={n.key}
                    x1="50%" y1="50%" // Sab lines center se shuru hon
                    x2={`${n.nx * 100}%`} y2={`${n.ny * 100}%`} 
                    stroke="white"
                    strokeWidth="1"
                    className="opacity-50"
                    strokeDasharray={isTarget ? "none" : "4 4"} // Pic wali line solid rahegi
                />
            );
         })}
      </svg>

      {/* 3. Center Profile Pic (Yahan humne 'skills' node ko hata diya hai) */}
      {NODES.map((n) => {
        // Agar node 'skills' nahi hai, toh normal node dikhao
        if (n.key !== "skills") {
          return (
            <motion.button
              key={n.key}
              onClick={() => onNodeClick(n.key)}
              className="absolute z-20 flex items-center justify-center rounded-full bg-white border border-blue-400 shadow-lg hover:scale-110 transition-transform"
              style={{ left: `${n.nx * 100}%`, top: `${n.ny * 100}%`, width: 45, height: 45, transform: "translate(-50%, -50%)" }}
            >
              <n.icon className="text-blue-900" size={20} />
            </motion.button>
          );
        }
        // Agar node 'skills' hai, toh wahan profile pic dikhao
        return null; 
      })}

      {/* 4. AUTOMATION text (Wahi position par) */}
      <div className="absolute z-30 text-white text-4xl font-bold tracking-wider font-mono opacity-90">
        AUTOMATION
      </div>

      {/* 5. Aapki Profile Pic - Geode/Settings wali position par */}
      <motion.button
          onClick={() => onNodeClick("skills")} // Skills node par click karne wala action
          className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-[2px] bg-white shadow-[0_0_20px_white] hover:shadow-[0_0_30px_cyan] transition-all"
          style={{ width: 160, height: 160, top: "55%" }} // Pic ki size aur position adjust ki
      >
          <div className="rounded-full overflow-hidden w-full h-full border-4 border-white">
            <img src={profileImg} className="w-full h-full object-cover" />
          </div>
      </motion.button>
    </div>
  );
}
