"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AlertIcon,
  CalendarIcon,
  CardIcon,
  CheckIcon,
  ClockIcon,
  HeadsetIcon,
  MessageIcon,
  RefreshIcon,
  ToothIcon,
  TransferIcon,
  UserIcon,
} from "@/components/ui/Icons";

const WORKFLOWS = [
  {
    icon: <UserIcon className="h-5 w-5" />,
    title: "New patient appointment booking",
    desc: "Capture details, suggest slots, confirm with insurance basics — all hands-free.",
    tone: "blue",
  },
  {
    icon: <ToothIcon className="h-5 w-5" />,
    title: "Cleaning & routine checkups",
    desc: "Default cadence, recall reminders, and easy rebooking from a single voice flow.",
    tone: "blue",
  },
  {
    icon: <AlertIcon className="h-5 w-5" />,
    title: "Emergency tooth pain calls",
    desc: "Detect urgency, capture safety basics, escalate to staff with full context.",
    tone: "amber",
  },
  {
    icon: <CheckIcon className="h-5 w-5" />,
    title: "Implant & high-value consults",
    desc: "Qualify intent, set expectations, route to the right specialist on your team.",
    tone: "green",
  },
  {
    icon: <RefreshIcon className="h-5 w-5" />,
    title: "Reschedule & cancellation handling",
    desc: "Verify the patient, free up the slot, and offer alternatives instantly.",
    tone: "blue",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "Waitlist filling",
    desc: "Auto-fill openings from the waitlist when patients cancel — no manual chasing.",
    tone: "green",
  },
  {
    icon: <CardIcon className="h-5 w-5" />,
    title: "Insurance questions",
    desc: "Pre-approved answers from your knowledge base, with smart escalation when needed.",
    tone: "blue",
  },
  {
    icon: <MessageIcon className="h-5 w-5" />,
    title: "Payment link after booking",
    desc: "SMS or WhatsApp a Stripe/Square payment link for deposits or balances.",
    tone: "green",
  },
  {
    icon: <TransferIcon className="h-5 w-5" />,
    title: "Staff handoff when needed",
    desc: "Warm transfers with caller name, intent, and conversation summary attached.",
    tone: "navy",
  },
] as const;

const TONE_BG: Record<(typeof WORKFLOWS)[number]["tone"], string> = {
  blue: "bg-clinical-blue/10 text-clinical-blue",
  green: "bg-clinical-green/10 text-clinical-green",
  amber: "bg-amber-100 text-amber-700",
  navy: "bg-navy/10 text-navy",
};

export function DentalWorkflows() {
  return (
    <section
      id="dental-workflows"
      className="relative scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="dental-workflows-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="For dental clinics"
          title={
            <span id="dental-workflows-title">
              Built for real dental{" "}
              <span className="text-clinical-blue">front-desk workflows</span>
            </span>
          }
          description="Each workflow is shaped around what dental clinics actually deal with — not generic call-center scripts."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOWS.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card-soft card-hover group"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${TONE_BG[w.tone]}`}
                >
                  {w.icon}
                </span>
                <HeadsetIcon className="h-5 w-5 text-navy/15" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold text-navy">
                {w.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
                {w.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
