import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  sub?: string;
  date?: string;
  bullets: string[];
}

interface Props {
  items: TimelineItem[];
}

export function Timeline({ items }: Props) {
  return (
    <div className="relative pl-6 sm:pl-10">
      <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent" />
      <div className="space-y-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative glass rounded-xl p-5 hover:glow-border transition-shadow"
          >
            <div className="absolute -left-[26px] sm:-left-[34px] top-6 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_15px_#7df9ff] ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display font-bold text-cyan-50">{it.title}</h4>
              {it.date && <span className="font-mono text-xs text-cyan-300">{it.date}</span>}
            </div>
            {it.sub && <p className="mt-1 text-sm text-cyan-200/80">{it.sub}</p>}
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {it.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-cyan-300 mt-1">▹</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
