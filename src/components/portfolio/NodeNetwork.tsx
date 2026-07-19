import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Node {
  key: string;
  icon: LucideIcon;
  nx: number;
  ny: number;
}

interface Props {
  onNodeClick: (key: string) => void;
}

// Ye aapke nodes ka definition hai
const NODES: Node[] = [
  // Apne existing nodes yahan rehne dein
];

export function NodeNetwork({ onNodeClick }: Props) {
  return (
    <div className="relative w-full h-screen bg-[#0a0f1c] flex items-center justify-center overflow-hidden">
      
      {/* Background container */}
      <div className="relative w-[900px] h-[900px]">
        
        {/* Connections (Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {NODES.map((n) => (
            <line
              key={n.key}
              x1="50%"
              y1="50%"
              x2={`${n.nx * 100}%`}
              y2={`${n.ny * 100}%`}
              stroke="#22d3ee"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="opacity-40"
            />
          ))}
        </svg>

        {/* Center Profile */}
        <motion.button
          onClick={() => onNodeClick("hero")}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden w-24 h-24 border-2 border-cyan-400 bg-black"
        >
          <img src="/placeholder.svg" className="w-full h-full object-cover" />
        </motion.button>

        {/* Nodes */}
        {NODES.map((n) => (
          <motion.button
            key={n.key}
            onClick={() => onNodeClick(n.key)}
            className="absolute flex items-center justify-center rounded-full bg-slate-900 border border-cyan-500 hover:scale-110 transition-transform"
            style={{ 
              left: `${n.nx * 100}%`, 
              top: `${n.ny * 100}%`, 
              width: 45, 
              height: 45, 
              transform: "translate(-50%, -50%)" 
            }}
          >
            <n.icon className="text-cyan-400" size={20} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
