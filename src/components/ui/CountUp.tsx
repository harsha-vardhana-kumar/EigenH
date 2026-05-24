"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  /** Target numeric value to count up to */
  to: number;
  /** Optional prefix text (e.g. "$") */
  prefix?: string;
  /** Optional suffix text (e.g. "%") */
  suffix?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Number of decimals to show */
  decimals?: number;
  className?: string;
  /** Format the number with thousands separators */
  separator?: boolean;
};

/**
 * Counts up to a numeric target when scrolled into view.
 * Honors prefers-reduced-motion and is fully SSR-safe (renders the final
 * value on first paint and lets GSAP override on the client when supported).
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  decimals = 0,
  separator = false,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const format = (n: number) => {
        const fixed = n.toFixed(decimals);
        if (!separator) return fixed;
        const [intPart, decPart] = fixed.split(".");
        const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return decPart ? `${grouped}.${decPart}` : grouped;
      };

      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${format(to)}${suffix}`;
        return;
      }

      const obj = { v: 0 };
      el.textContent = `${prefix}${format(0)}${suffix}`;

      gsap.to(obj, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${format(obj.v)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [to, decimals, duration, prefix, suffix] }
  );

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>
      {`${prefix}${to.toFixed(decimals)}${suffix}`}
    </span>
  );
}
