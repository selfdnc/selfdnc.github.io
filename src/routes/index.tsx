import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Workflow,
  Sparkles,
  Cpu,
  Puzzle,
  Wrench,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Download,
  Eye,
  Award,
  Rocket,
  Target,
  Compass,
  BookOpen,
  Heart,
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

// GitHub sync trigger: Lovable auto-deploys this project to the connected repo.

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dev Chauhan — AI AGENT & AUTOMATION ARCHITECT" },
      {
        name: "description",
        content:
          "Interactive AI Command Center portfolio: AI agents, workflow automation, LLM apps, and business automation by Dev Chauhan.",
      },
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

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.remove("section-zoom-in");
    // force reflow so the animation can replay if the same node is clicked again
    void el.offsetWidth;
    el.classList.add("section-zoom-in");
    window.setTimeout(() => el.classList.remove("section-zoom-in"), 1000);
  }, []);

  const handleNav = useCallback((id: string) => {
    if (id === "skills") {
      setOpenNode("skills");
      return;
    }
    scrollTo(id);
  }, [scrollTo]);

  const handleNode = useCallback((key: NodeKey) => {
    const sectionMap: Partial<Record<NodeKey, string>> = {
      hero: "hero",
      about: "about",
      projects: "projects",
      experience: "experience",
      education: "education",
      certificates: "certificates",
      services: "services",
      aistack: "aistack",
      resume: "resume",
      contact: "contact",
      achievements: "achievements",
    };
    if (key === "skills") {
      setOpenNode("skills");
      return;
    }
    const id = sectionMap[key];
    if (id) scrollTo(id);
  }, [scrollTo]);

  return (
    <>
      <BootScreen visible={!booted} />
      <ParticleBackground />
      <MouseGlow />

      <main className="relative">
        <TopNav onNav={handleNav} />
        <Hero onNode={handleNode} onNav={scrollTo} />
        <About />
        <ServicesSection />
        <WorkflowSection />
        <ProjectsSection />
        <AIStackSection />
        <ExperienceSection />
        <EducationSection />
        <CertificatesSection onOpen={setOpenNode} />
        <AchievementsSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </main>

      <SectionModal
        open={openNode === "skills"}
        onClose={() => setOpenNode(null)}
        title="Skill Matrix"
      >
        <SkillsPanel />
      </SectionModal>

      <SectionModal
        open={openNode === "certificates"}
        onClose={() => setOpenNode(null)}
        title="Certificate Preview"
      >
        <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/40 flex items-center justify-center">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto text-cyan-300 mb-4" />
            <h3 className="font-display text-2xl text-gradient">Certified AI Practitioner</h3>
            <p className="text-sm text-muted-foreground mt-2">Fullscreen preview placeholder</p>
          </div>
        </div>
      </SectionModal>
    </>
  );
}

/* ---------- Nav ---------- */
function TopNav({ onNav }: { onNav: (id: string) => void }) {
  const links = [
    ["about", "About"],
    ["projects", "Projects"],
    ["skills", "Skills"],
    ["aistack", "Stack"],
    ["experience", "Experience"],
    ["contact", "Contact"],
  ] as const;
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <nav className="glass rounded-full px-2 py-2 flex items-center gap-1">
        <div className="flex items-center gap-2 px-4">
          <div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_#7df9ff]" />
          <span className="font-display font-black text-sm tracking-widest text-gradient">DEV.OS</span>
        </div>
        {links.map(([id, label]) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className="px-3 py-1.5 rounded-full text-xs font-display font-medium tracking-widest text-cyan-100/80 hover:text-cyan-50 hover:bg-cyan-500/10 transition-colors"
          >
            {label.toUpperCase()}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ onNode, onNav }: { onNode: (k: NodeKey) => void; onNav: (id: string) => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-cyan-100">
            SYSTEM ONLINE · AI COMMAND CENTER v2.6
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-gradient text-glow">
          DEV CHAUHAN
        </h1>
        <div className="mt-3 font-display text-lg sm:text-xl text-cyan-100/90 tracking-widest">
          AI AGENT & AUTOMATION ARCHITECT
        </div>
        <div className="mt-4 font-mono text-sm sm:text-base text-cyan-200 min-h-[1.5em]">
          <span className="text-muted-foreground">$&nbsp;</span>
          <Typewriter
            words={[
              "Building AI Agents",
              "Workflow Automation",
              "LLM Applications",
              "Business Automation",
            ]}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="my-4"
      >
        <NodeNetwork onNodeClick={onNode} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <MagneticButton onClick={() => onNav("projects")}>
          <Rocket className="h-4 w-4" /> View Projects
        </MagneticButton>
        <MagneticButton as="a" href="/resume.pdf" download variant="ghost">
          <Download className="h-4 w-4" /> Download Resume
        </MagneticButton>
        <MagneticButton onClick={() => onNav("contact")} variant="ghost">
          <Mail className="h-4 w-4" /> Contact Me
        </MagneticButton>
      </motion.div>
    </section>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  id,
  eyebrow,
  title,
  children,
  subtitle,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id={id} ref={ref} className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-4">
          <span className="h-1 w-1 rounded-full bg-cyan-300" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-200">
            {eyebrow.toUpperCase()}
          </span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-gradient">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const cards = [
    { icon: Target, title: "Career Goal", body: "Ship AI systems that quietly remove entire categories of manual work for teams." },
    { icon: Heart, title: "Passion", body: "Building agents that reason, act, and improve — end-to-end automation with real business impact." },
    { icon: BookOpen, title: "Currently Learning", body: "Multi-agent orchestration, evals-first LLM engineering, and event-driven automation." },
    { icon: Compass, title: "Mission", body: "Make AI automation approachable for founders, ops teams, and non-technical builders." },
    { icon: Sparkles, title: "Future Vision", body: "A world where every operator has a personal AI copilot wired into their workflow." },
  ];
  return (
    <Section
      id="about"
      eyebrow="Module · 01"
      title="About the Operator"
      subtitle="Five signals that describe how I approach AI, automation and product."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 hover:glow-border transition-shadow"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/10 border border-cyan-400/30">
              <c.icon className="h-5 w-5 text-cyan-200" />
            </div>
            <h3 className="font-display font-bold text-lg text-cyan-50">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Services ---------- */
function ServicesSection() {
  const services = [
    { icon: Bot, title: "AI Chatbots & RAG", body: "Knowledge bots with RAG architecture and Qdrant vector search." },
    { icon: Workflow, title: "Workflow Automation", body: "n8n / Make pipelines that connect every SaaS your team uses." },
    { icon: Cpu, title: "Autonomous AI Agents", body: "Smart agents powered by Ollama and Groq to execute complex tasks." },
    { icon: Puzzle, title: "Business Automation", body: "End-to-end automation of sales, support, and daily operations." },
    { icon: Sparkles, title: "API Integration", body: "Seamlessly bridging REST APIs, webhooks, and custom LLM endpoints." },
    { icon: Wrench, title: "Custom AI Solutions", body: "Self-hosted, cost-effective AI setups using Docker and local LLMs." },
  ];
  return (
    <Section id="services" eyebrow="Module · 02" title="Services">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:glow-border transition-all"
          >
            <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <s.icon className="h-8 w-8 text-cyan-300 mb-4" />
            <h3 className="font-display font-bold text-lg text-cyan-50">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Workflow ---------- */
function WorkflowSection() {
  return (
    <Section
      id="workflow"
      eyebrow="Module · 03"
      title="AI Automation Pipeline"
      subtitle="A live visualization of how data flows through a typical automation I build."
    >
      <WorkflowVisualization />
    </Section>
  );
}

/* ---------- Projects ---------- */
function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Module · 04"
      title="Projects"
      subtitle="Click any card to expand architecture, workflow and tech details."
    >
      <ProjectsPanel />
    </Section>
  );
}

/* ---------- AI Stack ---------- */
function AIStackSection() {
  return (
    <Section
      id="aistack"
      eyebrow="Module · 05"
      title="AI Stack"
      subtitle="The tools I orchestrate every day."
    >
      <AIStackGraph />
    </Section>
  );
}

/* ---------- Experience ---------- */
function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Module · 06" title="Experience">
      <Timeline
        items={[
          {
            title: "AI & Automation Developer",
            sub: "Self-Employed · Independent",
            date: "Present",
            bullets: [
              "Designed and deployed autonomous AI Sales & Support Agents using n8n and custom LLM workflows.",
              "Built RAG architectures with Qdrant vector database and Ollama/Groq for intelligent data retrieval.",
              "Integrated webhooks, REST APIs, and third-party tools (CRM, Email, Messaging) to automate business operations.",
            ],
          },
          {
            title: "AI Systems & Open Source Developer",
            sub: "Building in Public · Projects",
            date: "Present",
            bullets: [
              "Containerized local LLM environments using Docker, Ollama, and Qdrant for cost-effective execution.",
              "Wrote custom JavaScript and JSON data-parsing scripts inside n8n nodes for complex workflow routing.",
              "Optimized API latency and payload structures for high-performance agent responses.",
            ],
          },
        ]}
      />
    </Section>
  );
}

/* ---------- Education ---------- */
function EducationSection() {
  return (
    <Section id="education" eyebrow="Module · 07" title="Education">
      <Timeline
        items={[
          {
            title: "Computer Science",
            bullets: [
              "Focus: Operating Systems, Software Engineering, Cyber Security, FCO.",
              "Practicals: C, C++, java, Web Dev, DBMS, PHP, PL-SQL, .NET.",
            ],
          },
          {
            title: "Higher Secondary — Science",
            bullets: ["Physics, Chemistry, Math, Computer Science.",
                      "Practicals: Electricity & Measurement, Volumetric & Qualitative Analysis."],
          },
          {
            title: "Secondary School",
            bullets: [
              "Focus: Mathematics, Science, English, and Foundational Computer Education.",
              "Key Strengths: Built core logical reasoning, problem-solving skills, and academic consistency.",
            ],
          },
        ]}
      />
    </Section>
  );
}

/* ---------- Certificates ---------- */
function CertificatesSection({ onOpen }: { onOpen: (k: NodeKey) => void }) {
  const certs = [
    "OpenAI Certified Engineer",
    "n8n Advanced Workflow",
    "Google Cloud AI",
    "LangChain Academy",
    "Make Automation Pro",
    "AWS AI Practitioner",
  ];
  return (
    <Section id="certificates" eyebrow="Module · 08" title="Certificates">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <motion.button
            key={c}
            onClick={() => onOpen("certificates")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, rotate: -0.5 }}
            className="glass rounded-2xl p-6 text-left hover:glow-border transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <Award className="h-8 w-8 text-cyan-300" />
              <span className="font-mono text-[10px] text-muted-foreground">ID · 2024-{100 + i}</span>
            </div>
            <h3 className="font-display font-bold text-cyan-50">{c}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Verified · Click to preview</p>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Achievements ---------- */
function AchievementsSection() {
  const stats = [
    { n: 10, suffix: "+", label: "Workflows & Agents Built" },
    { n: 0, suffix: "$", label: "Cloud Cost (Local Ollama)" },
    { n: 2, suffix: "s", label: "Avg Latency (Groq LPU)" },
    { n: 100, suffix: "%", label: "Self-Hosted Architecture" },
  ];
  return (
    <Section id="achievements" eyebrow="Module · 09" title="Achievements">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Counter key={s.label} target={s.n} suffix={s.suffix} label={s.label} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  );
}

function Counter({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / dur));
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay]);
  return (
    <div ref={ref} className="glass rounded-2xl p-6 text-center hover:glow-border transition-shadow">
      <div className="font-display font-black text-4xl sm:text-5xl text-gradient">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------- Resume ---------- */
function ResumeSection() {
  return (
    <Section id="resume" eyebrow="Module · 10" title="Resume">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl text-cyan-50">Full CV — Dev Chauhan</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Public data-scraping protection active. Verified recruiters & clients can request full CV & credentials via email.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton 
                    as="a" 
                    href="mailto:oneselfdnc@gmail.com?subject=Request%20for%20Full%20CV%20%26%20Credentials">
                <Mail className="h-4 w-4" /> Request Full CV
            </MagneticButton>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/5 border border-cyan-400/30 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative text-center">
              <div className="font-display font-black text-4xl text-gradient">CV</div>
              <div className="mt-2 font-mono text-xs text-cyan-200">DEV_CHAUHAN.pdf</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function ContactSection() {
  const items = [
    { icon: Mail, label: "Email", value: "oneselfdnc@gmail.com", href: "mailto:oneselfdnc@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/devchauhan", href: "#" },
    { icon: Github, label: "GitHub", value: "@devchauhan", href: "https://github.com/selfdnc" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 · on request", href: "#" },
    { icon: MapPin, label: "Location", value: "India", href: "#" },
  ];
  return (
    <Section
      id="contact"
      eyebrow="Module · 11"
      title="Open a Channel"
      subtitle="I usually respond within 24 hours."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.a
            key={it.label}
            href={it.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-border transition-all"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-500/5 border border-cyan-400/30 flex items-center justify-center">
              <it.icon className="h-5 w-5 text-cyan-200" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                {it.label}
              </div>
              <div className="font-display text-cyan-50">{it.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative py-10 text-center border-t border-cyan-400/10">
      <div className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} DEV CHAUHAN · AI COMMAND CENTER · ALL SYSTEMS NOMINAL
      </div>
    </footer>
  );
}
