import { motion } from "framer-motion";

export const skillCategories = [
  {
    name: "AI",
    skills: [
      { name: "OpenAI", level: 92, exp: "2y", projects: 14 },
      { name: "Gemini", level: 85, exp: "1y", projects: 8 },
      { name: "Claude", level: 88, exp: "1.5y", projects: 10 },
      { name: "Prompt Engineering", level: 95, exp: "2y", projects: 20 },
      { name: "LLMs", level: 90, exp: "2y", projects: 15 },
    ],
  },
  {
    name: "Automation",
    skills: [
      { name: "n8n", level: 94, exp: "2y", projects: 18 },
      { name: "Make", level: 82, exp: "1.5y", projects: 10 },
      { name: "Zapier", level: 78, exp: "2y", projects: 12 },
      { name: "Python", level: 90, exp: "3y", projects: 22 },
      { name: "FastAPI", level: 85, exp: "1.5y", projects: 9 },
      { name: "Docker", level: 80, exp: "2y", projects: 11 },
      { name: "Git", level: 88, exp: "3y", projects: 30 },
      { name: "Linux", level: 82, exp: "3y", projects: 25 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90, exp: "3y", projects: 20 },
      { name: "Next.js", level: 85, exp: "2y", projects: 12 },
      { name: "Tailwind", level: 92, exp: "3y", projects: 25 },
      { name: "JavaScript", level: 90, exp: "4y", projects: 35 },
    ],
  },
];

export function SkillsPanel() {
  return (
    <div className="space-y-8">
      {skillCategories.map((cat, ci) => (
        <div key={cat.name}>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/60 to-transparent" />
            <h3 className="font-display text-lg font-bold text-cyan-200 tracking-widest">
              {cat.name.toUpperCase()}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-cyan-400/60 to-transparent" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cat.skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 + i * 0.04 }}
                className="glass rounded-xl p-4 hover:glow-border transition-shadow group"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-display font-semibold text-cyan-50">{s.name}</span>
                  <span className="font-mono text-xs text-cyan-300">{s.level}%</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-cyan-950/60 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_10px_#7df9ff]"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[11px] font-mono text-muted-foreground">
                  <span>EXP: {s.exp}</span>
                  <span>{s.projects} projects</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
