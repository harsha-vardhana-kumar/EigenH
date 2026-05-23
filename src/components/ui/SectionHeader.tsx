"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="eyebrow"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-clinical-green" />
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`section-title ${eyebrow ? "mt-4" : ""}`}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className={`section-sub ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
