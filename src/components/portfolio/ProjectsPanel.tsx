import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal, ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    title: "AI CRM Automation",
    tech: ["n8n", "OpenAI", "Node.js"],
    desc: "Automated customer support system reducing response time by 80% through intelligent workflow integration.",
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio OS",
    tech: ["React", "Tailwind", "Framer"],
    desc: "A high-performance, modular portfolio shell built with advanced animation and data-node visualization.",
    link: "#",
    github: "#"
  },
];

export function ProjectsPanel() {
  return (
    <div className="p-8 w-full max-w-5xl mx-auto font-sans">
      {/* Header with Decorative Terminal Icon */}
      <div className="flex items-center gap-3 mb-10">
        <Terminal className="text-[#00ffff]" size={28} />
        <h2 className="text-4xl font-bold text-white tracking-[0.2em] uppercase">
          Project <span className="text-[#00ffff]">Archive</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="group relative p-8 rounded-sm bg-[#001f3f]/40 backdrop-blur-md border border-[#00ffff]/30 overflow-hidden hover:border-[#00ffff]/80 transition-all duration-300"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-[#00ffff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4 flex justify-between items-center">
                {project.title}
                <ArrowRight className="text-[#00ffff] opacity-0 group-hover:opacity-100 transition-all" />
              </h3>
              
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1 rounded-sm bg-[#00ffff]/10 text-[#00ffff] font-mono border border-[#00ffff]/20">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a href={project.link} className="flex items-center gap-2 text-[12px] text-white hover:text-[#00ffff] transition-colors">
                  <ExternalLink size={14} /> LIVE
                </a>
                <a href={project.github} className="flex items-center gap-2 text-[12px] text-white hover:text-[#00ffff] transition-colors">
                  <Github size={14} /> REPO
                </a>
              </div>
            </div>

            {/* Corner Decorative Element */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#00ffff]/50 opacity-0 group-hover:opacity-100 transition-all" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
