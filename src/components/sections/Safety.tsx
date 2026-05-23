"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AlertIcon,
  CheckIcon,
  HeadsetIcon,
  ShieldIcon,
  TransferIcon,
  UserIcon,
} from "@/components/ui/Icons";

const STEPS = [
  {
    icon: <AlertIcon className="h-4 w-4" />,
    title: "Urgent pain / trauma detected",
    desc: "EigenH Reach listens for urgency cues like severe pain, swelling, bleeding, or trauma.",
    tone: "amber",
  },
  {
    icon: <UserIcon className="h-4 w-4" />,
    title: "AI collects basic details",
    desc: "Captures patient name, callback number, onset, and key safety information.",
    tone: "blue",
  },
  {
    icon: <HeadsetIcon className="h-4 w-4" />,
    title: "Notifies clinic staff",
    desc: "Instant alert to on-call staff with summary, intent and recording link.",
    tone: "blue",
  },
  {
    icon: <TransferIcon className="h-4 w-4" />,
    title: "Routes call or sends alert",
    desc: "Live transfer when available, or SMS/email alert with callback within minutes.",
    tone: "green",
  },
] as const;

const TONE_BG: Record<(typeof STEPS)[number]["tone"], string> = {
  blue: "bg-clinical-blue/10 text-clinical-blue",
  green: "bg-clinical-green/10 text-clinical-green",
  amber: "bg-amber-100 text-amber-700",
};

export function Safety() {
  return (
    <section
      id="safety"
      className="relative scroll-mt-24 bg-soft-white/50 py-20 sm:py-24"
      aria-labelledby="safety-title"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Safety & escalation"
              title={
                <span id="safety-title">
                  Designed for{" "}
                  <span className="text-clinical-green">healthcare-safe</span>{" "}
                  handoff
                </span>
              }
              description={
                <>
                  EigenH Reach does not replace clinical judgment. It handles
                  front-desk workflows and escalates urgent or sensitive cases
                  to your staff — with full context attached.
                </>
              }
            />

            <ul className="mt-7 space-y-3 text-sm">
              {[
                "No medical advice — front-desk workflows only",
                "Configurable urgency triggers per clinic",
                "Privacy-aware capture of patient details",
                "Audit-ready transcripts and recordings",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clinical-green/12 text-clinical-green">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-navy/75">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2 rounded-2xl border border-navy/8 bg-white p-3 shadow-soft">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-clinical-blue/10 text-clinical-blue">
                <ShieldIcon className="h-4 w-4" />
              </span>
              <div className="text-[12.5px] text-navy/70">
                Built with HIPAA-aware practices for US dental clinics. Final
                compliance posture is configured per deployment.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-navy/8 bg-white p-5 shadow-lift sm:p-6">
              {/* Vertical timeline / flow */}
              <ol className="relative space-y-4">
                {STEPS.map((s, i) => (
                  <motion.li
                    key={s.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${TONE_BG[s.tone]}`}
                      >
                        {s.icon}
                      </span>
                      {i < STEPS.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="mt-1 w-px flex-1 bg-gradient-to-b from-clinical-blue/30 to-clinical-green/30"
                        />
                      ) : null}
                    </div>
                    <div className="-mt-0.5 flex-1 rounded-2xl border border-navy/8 bg-soft-white/50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[14px] font-semibold text-navy">
                          {s.title}
                        </h3>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy/55 ring-1 ring-navy/10">
                          Step {i + 1}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
                        {s.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
