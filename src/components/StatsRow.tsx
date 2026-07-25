"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/site";

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <span className="h-1.5 w-6 rounded-full bg-ink/70 block" />
          <p className="mt-3 max-w-[16ch] text-lg font-medium tracking-tight md:text-xl">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
