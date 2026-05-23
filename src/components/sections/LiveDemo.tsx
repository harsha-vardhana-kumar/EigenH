"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CalendarIcon,
  CheckIcon,
  FileIcon,
  HeadsetIcon,
  MessageIcon,
  PhoneIcon,
  SparkleIcon,
  UserIcon,
} from "@/components/ui/Icons";

type Turn = { speaker: "patient" | "ai"; text: string };

const TRANSCRIPT: Turn[] = [
  { speaker: "patient", text: "Hi, I need to book a cleaning appointment." },
  {
    speaker: "ai",
    text: "Sure, I can help with that. Are you a new or existing patient?",
  },
  { speaker: "patient", text: "New patient." },
  {
    speaker: "ai",
    text: "Great. I found an available slot tomorrow at 10:30 AM. Would you like me to book it?",
  },
  { speaker: "patient", text: "Yes." },
  {
    speaker: "ai",
    text: "Done. I’ve sent a confirmation to your phone.",
  },
];

const OUTCOMES = [
  {
    icon: <CalendarIcon className="h-4 w-4" />,
    title: "Appointment booked",
    detail: "Tomorrow · 10:30 AM · Cleaning",
    tone: "green",
  },
  {
    icon: <MessageIcon className="h-4 w-4" />,
    title: "SMS confirmation sent",
    detail: "To +1 (415) 555-0142",
    tone: "blue",
  },
  {
    icon: <UserIcon className="h-4 w-4" />,
    title: "Patient details captured",
    detail: "Name · Phone · Insurance",
    tone: "blue",
  },
  {
    icon: <FileIcon className="h-4 w-4" />,
    title: "Call summary saved",
    detail: "Synced to PMS · 32 sec",
    tone: "navy",
  },
] as const;

const OUTCOME_TONE: Record<(typeof OUTCOMES)[number]["tone"], string> = {
  blue: "bg-clinical-blue/10 text-clinical-blue",
  green: "bg-clinical-green/10 text-clinical-green",
  navy: "bg-navy/10 text-navy",
};

function useStaggeredReveal(count: number, intervalMs = 1100) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setVisible(count);
      return;
    }
    setVisible(1);
    const id = setInterval(() => {
      setVisible((v) => {
        if (v >= count) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  return visible;
}

export function LiveDemo() {
  const visible = useStaggeredReveal(TRANSCRIPT.length, 950);

  return (
    <section
      id="live-demo"
      className="relative scroll-mt-24 bg-soft-white/50 py-20 sm:py-24"
      aria-labelledby="live-demo-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Live call simulation"
          title={
            <span id="live-demo-title">
              Hear how EigenH Reach handles a real booking
            </span>
          }
          description="A short, real-world example of how a new-patient cleaning request is handled — from greeting to booked, in under a minute."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Phone / transcript card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-navy/8 bg-white p-5 shadow-lift sm:p-6">
              <div className="flex items-center justify-between border-b border-navy/8 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-navy">
                      Bright Smile Dental
                    </div>
                    <div className="text-[11px] text-navy/55">
                      Live call · +1 (415) 555-0142
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-clinical-green/10 px-2.5 py-1 text-[11px] font-semibold text-clinical-green">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-clinical-green" />
                  On call
                </div>
              </div>

              <ul
                aria-live="polite"
                className="mt-5 space-y-3"
              >
                {TRANSCRIPT.map((t, i) => {
                  const show = i < visible;
                  const isAI = t.speaker === "ai";
                  return (
                    <motion.li
                      key={i}
                      initial={false}
                      animate={
                        show
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 8 }
                      }
                      transition={{ duration: 0.35 }}
                      className={`flex items-start gap-2.5 ${
                        isAI ? "" : "flex-row-reverse"
                      }`}
                    >
                      <span
                        className={`inline-flex h-8 w-8 flex-none items-center justify-center rounded-full ${
                          isAI
                            ? "bg-clinical-blue/10 text-clinical-blue"
                            : "bg-soft-white text-navy/70"
                        }`}
                      >
                        {isAI ? (
                          <SparkleIcon className="h-4 w-4" />
                        ) : (
                          <UserIcon className="h-4 w-4" />
                        )}
                      </span>
                      <div
                        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-soft ${
                          isAI
                            ? "rounded-tl-sm bg-white text-navy ring-1 ring-clinical-blue/10"
                            : "rounded-tr-sm bg-navy text-white"
                        }`}
                      >
                        <div
                          className={`mb-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            isAI ? "text-clinical-blue/80" : "text-white/65"
                          }`}
                        >
                          {isAI ? "EigenH Reach" : "Patient"}
                        </div>
                        {t.text}
                      </div>
                    </motion.li>
                  );
                })}
                {visible < TRANSCRIPT.length ? (
                  <li
                    aria-hidden="true"
                    className="flex items-center gap-2 pl-11 text-[12px] text-navy/50"
                  >
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-clinical-blue" />
                      <span
                        className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-clinical-blue"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-clinical-blue"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </span>
                    transcribing…
                  </li>
                ) : null}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-navy/8 pt-4">
                <div className="flex items-center gap-2 text-[12px] text-navy/55">
                  <HeadsetIcon className="h-4 w-4" />
                  Real-time transcript · synced to PMS
                </div>
                <Link href="#book-demo" className="btn-primary">
                  Try Live Demo
                </Link>
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="lg:col-span-5">
            <div className="grid gap-3">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                  className="card-soft card-hover flex items-start gap-3"
                >
                  <span
                    className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl ${OUTCOME_TONE[o.tone]}`}
                  >
                    {o.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-navy">
                      {o.title}
                    </div>
                    <div className="mt-0.5 text-[12px] text-navy/60">
                      {o.detail}
                    </div>
                  </div>
                  <span className="ml-auto inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-clinical-green/12 text-clinical-green">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              ))}

              <div className="mt-2 rounded-2xl border border-dashed border-navy/15 bg-white/60 p-4 text-[12px] text-navy/55">
                This is a sample interaction. Real calls handle insurance,
                emergencies, reschedules, and warm transfers using your clinic’s
                policies and PMS data.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
