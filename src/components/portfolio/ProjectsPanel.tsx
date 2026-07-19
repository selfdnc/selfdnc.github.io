import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    title: "AI CRM Automation",
    tech: ["n8n", "OpenAI", "Node.js"],
    desc: "Automated customer support system reducing response time by 80%.",
  },
  {
    title: "Portfolio OS",
    tech: ["React", "Tailwind", "Framer"],
    desc: "The very site you are looking at—a high-performance, modular portfolio.",
  },
];

export function ProjectsPanel() {
  return (
    <div className="p-8 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 font-mono tracking-widest">
        // PROJECTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/60 transition-all group"
          >
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
            <div className="flex gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-1 rounded bg-cyan-900/30 text-cyan-200 font-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
