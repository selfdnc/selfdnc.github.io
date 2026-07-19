import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Rocket,
  Mail,
  Download,
  Terminal,
  Cpu,
  Database,
  Server,
  Network,
  Cog,
  Bot
} from "lucide-react";

import { ParticleBackground, MouseGlow } from "@/components/portfolio/Background";
import { NodeNetwork, type NodeKey } from "@/components/portfolio/NodeNetwork";
import { Typewriter } from "@/components/portfolio/Typewriter";
import { MagneticButton } from "@/components/portfolio/MagneticButton";
import { SectionModal } from "@/components/portfolio/SectionModal";
import { SkillsPanel } from "@/components/portfolio/SkillsPanel";
import { ProjectsPanel } from "@/components/portfolio/ProjectsPanel";
import { WorkflowVisualization } from "@/components/portfolio/WorkflowVisualization";
import { AIStackGraph } from "@/components/portfolio/AIStackGraph";
import { Timeline } from "@/components/portfolio/Timeline";
import { BootScreen } from "@/components/portfolio/BootScreen";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Deva | Industrial AI Automation" },
      { name: "description", content: "Cybernetic AI Command Center: Industrial Automation, Robotics, and Data Pipelines by Deva." },
    ],
  }),
});

function Home() {
  const [booted, setBooted] = useState(false);
  const [openNode, setOpenNode] = useState<NodeKey | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleNode = (key: NodeKey) => {
    if (key === "skills") {
      setOpenNode("skills");
      return;
    }
    const element = document.getElementById(key);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#001f3f] min-h-screen text-white selection:bg-[#00ffff] selection:text-[#001f3f]">
      <BootScreen visible={!booted} />
      <ParticleBackground />
      <MouseGlow />

      <main className="relative z-10">
        <TopNav />
        
        {/* Main Network Core */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
           <NodeNetwork onNodeClick={handleNode} />
        </section>

        {/* Sections follow the same industrial logic */}
        <ProjectsSection />
        <WorkflowSection />
        <AIStackSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>

      <SectionModal open={openNode === "skills"} onClose={() => setOpenNode(null)} title="System Capabilities">
        <SkillsPanel />
      </SectionModal>
    </div>
  );
}

function TopNav() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="glass rounded-sm px-6 py-3 flex items-center gap-8 border border-[#00ffff]/30 bg-[#001f3f]/80 backdrop-blur-md">
        <div className="flex items-center gap-2 font-mono text-[#00ffff]">
          <Terminal size={18} />
          <span className="font-bold tracking-widest">DEVAA_OS</span>
        </div>
        {["Projects", "Workflow", "Stack", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-widest hover:text-[#00ffff] transition-colors">
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 border-t border-[#00ffff]/10">
      <ProjectsPanel />
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 px-4 bg-[#001f3f]/50">
      <div className="max-w-5xl mx-auto mb-12 flex items-center gap-4">
        <Cog className="text-[#00ffff]" size={32} />
        <h2 className="text-3xl font-bold tracking-widest uppercase">Automation Pipeline</h2>
      </div>
      <WorkflowVisualization />
    </section>
  );
}

function AIStackSection() {
  return (
    <section id="stack" className="py-24 px-4">
      <div className="max-w-5xl mx-auto mb-12 flex items-center gap-4">
        <Cpu className="text-[#00ffff]" size={32} />
        <h2 className="text-3xl font-bold tracking-widest uppercase">Core AI Stack</h2>
      </div>
      <AIStackGraph />
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 bg-[#001f3f]/50 border-y border-[#00ffff]/10">
      <div className="max-w-3xl mx-auto">
         <Timeline items={[{ title: "Lead Automation Engineer", sub: "FluxAI", date: "2024-Present", bullets: ["Industrial Scale Agents", "n8n Optimization"] }]} />
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 text-center">
      <h2 className="text-4xl font-bold mb-8 uppercase tracking-[0.2em]">Initialize <span className="text-[#00ffff]">Contact</span></h2>
      <MagneticButton onClick={() => window.location.href = 'mailto:deva@chauhan.ai'}>
        <Mail className="mr-2" /> OPEN CHANNEL
      </MagneticButton>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center border-t border-[#00ffff]/10 font-mono text-[10px] text-[#00ffff]/50">
      © {new Date().getFullYear()} DEVA AUTOMATION · SYSTEM STATUS: NOMINAL
    </footer>
  );
}
