"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AlertIcon,
  CalendarIcon,
  CardIcon,
  CheckIcon,
  FileIcon,
  HeadsetIcon,
  MessageIcon,
  PhoneIcon,
  RefreshIcon,
  SparkleIcon,
  TransferIcon,
  UserIcon,
} from "@/components/ui/Icons";

type Step = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "navy";
};

const MAIN_FLOW: Step[] = [
  {
    title: "Patient calls clinic",
    desc: "Inbound call, any time of day, including after hours.",
    icon: <PhoneIcon className="h-4 w-4" />,
    tone: "navy",
  },
  {
    title: "AI answers in natural voice",
    desc: "Branded greeting tuned to your clinic’s tone.",
    icon: <SparkleIcon className="h-4 w-4" />,
    tone: "blue",
  },
  {
    title: "Captures patient name & reason",
    desc: "New or existing, reason for visit, contact details.",
    icon: <UserIcon className="h-4 w-4" />,
    tone: "blue",
  },
  {
    title: "Checks appointment type",
    desc: "Cleaning, consult, emergency, follow-up, etc.",
    icon: <CalendarIcon className="h-4 w-4" />,
    tone: "blue",
  },
  {
    title: "Books or routes the call",
    desc: "Auto-book to PMS or transfer to the right staff.",
    icon: <CheckIcon className="h-4 w-4" />,
    tone: "green",
  },
  {
    title: "Sends confirmation",
    desc: "SMS / WhatsApp confirmation with details and policies.",
    icon: <MessageIcon className="h-4 w-4" />,
    tone: "green",
  },
  {
    title: "Logs summary for clinic team",
    desc: "Transcript, intent, outcome — ready for review.",
    icon: <FileIcon className="h-4 w-4" />,
    tone: "navy",
  },
];

type Branch = {
  id: string;
  label: string;
  tone: "blue" | "green" | "amber" | "navy";
  icon: React.ReactNode;
  steps: { title: string; desc: string }[];
};

const BRANCHES: Branch[] = [
  {
    id: "A",
    label: "New Patient Booking",
    tone: "blue",
    icon: <UserIcon className="h-4 w-4" />,
    steps: [
      { title: "Collect patient details", desc: "Name, DOB, insurance, reason for visit." },
      { title: "Suggest open slots", desc: "Match cleaning/consult to provider availability." },
      { title: "Confirm & book", desc: "Auto-write to PMS, send SMS confirmation." },
    ],
  },
  {
    id: "B",
    label: "Existing Patient Reschedule",
    tone: "blue",
    icon: <RefreshIcon className="h-4 w-4" />,
    steps: [
      { title: "Verify identity", desc: "Match by phone or DOB to existing record." },
      { title: "Find a better slot", desc: "Offer next 3 available windows." },
      { title: "Update calendar", desc: "Cancel old, create new, notify patient." },
    ],
  },
  {
    id: "C",
    label: "Emergency Dental Call",
    tone: "amber",
    icon: <AlertIcon className="h-4 w-4" />,
    steps: [
      { title: "Detect urgency cues", desc: "Severe pain, swelling, trauma, bleeding." },
      { title: "Capture safety basics", desc: "Onset, location, last meal, allergies." },
      { title: "Escalate to staff", desc: "Live transfer or instant alert with summary." },
    ],
  },
  {
    id: "D",
    label: "Insurance / Payment Question",
    tone: "green",
    icon: <CardIcon className="h-4 w-4" />,
    steps: [
      { title: "Identify the question", desc: "Coverage, copay, balance, financing." },
      { title: "Share clinic policy", desc: "Pre-approved answers from your knowledge base." },
      { title: "Send payment link", desc: "Optional Stripe/Square link via SMS." },
    ],
  },
  {
    id: "E",
    label: "Transfer to Human Staff",
    tone: "navy",
    icon: <TransferIcon className="h-4 w-4" />,
    steps: [
      { title: "Detect complexity", desc: "Custom requests, sensitive topics, VIP." },
      { title: "Brief the staff", desc: "Pass call with name, intent and notes." },
      { title: "Warm handoff", desc: "Live transfer or callback within minutes." },
    ],
  },
];

const TONE_BG: Record<Branch["tone"], string> = {
  blue: "bg-clinical-blue/10 text-clinical-blue",
  green: "bg-clinical-green/10 text-clinical-green",
  amber: "bg-amber-100 text-amber-700",
  navy: "bg-navy/10 text-navy",
};

function ConnectorDots() {
  return (
    <div
      aria-hidden="true"
      className="hidden h-6 items-center justify-center gap-1.5 lg:flex"
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-clinical-blue/30 animate-pulse-dot"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}

export function Workflow() {
  return (
    <section
      id="workflow"
      className="relative scroll-mt-24 bg-soft-white/50 py-20 sm:py-24"
      aria-labelledby="workflow-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="How it works"
          title={
            <span id="workflow-title">
              How EigenH Reach handles every patient call
            </span>
          }
          description="A single intelligent workflow listens, captures, books, confirms, and escalates — with branching paths for the calls dental clinics actually receive."
        />

        {/* Main vertical / horizontal flow */}
        <div className="relative mt-12 rounded-3xl border border-navy/8 bg-white p-5 shadow-soft sm:p-8">
          <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {/* Row 1: 4 nodes */}
            {MAIN_FLOW.slice(0, 4).map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="contents"
              >
                <div
                  className={`rounded-2xl border border-navy/8 bg-white p-4 shadow-soft ${
                    s.tone === "navy" ? "gradient-card-navy text-white" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                        s.tone === "navy"
                          ? "bg-white/15 text-white"
                          : "bg-clinical-blue/10 text-clinical-blue"
                      }`}
                    >
                      {s.icon}
                    </span>
                    <div
                      className={`text-[13px] font-semibold ${
                        s.tone === "navy" ? "text-white" : "text-navy"
                      }`}
                    >
                      {s.title}
                    </div>
                  </div>
                  <p
                    className={`mt-2 text-[12px] leading-relaxed ${
                      s.tone === "navy" ? "text-white/80" : "text-navy/60"
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>
                {i < 3 ? <ConnectorDots /> : null}
              </motion.div>
            ))}
          </div>

          {/* vertical connector */}
          <div
            aria-hidden="true"
            className="mx-auto my-3 hidden h-8 w-px bg-gradient-to-b from-clinical-blue/30 to-clinical-green/30 lg:block"
          />

          <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {MAIN_FLOW.slice(4).map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="contents"
              >
                <div
                  className={`rounded-2xl border border-navy/8 bg-white p-4 shadow-soft ${
                    s.tone === "navy" ? "gradient-card-navy text-white" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                        s.tone === "navy"
                          ? "bg-white/15 text-white"
                          : s.tone === "green"
                            ? "bg-clinical-green/10 text-clinical-green"
                            : "bg-clinical-blue/10 text-clinical-blue"
                      }`}
                    >
                      {s.icon}
                    </span>
                    <div
                      className={`text-[13px] font-semibold ${
                        s.tone === "navy" ? "text-white" : "text-navy"
                      }`}
                    >
                      {s.title}
                    </div>
                  </div>
                  <p
                    className={`mt-2 text-[12px] leading-relaxed ${
                      s.tone === "navy" ? "text-white/80" : "text-navy/60"
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>
                {i < 2 ? <ConnectorDots /> : null}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branches */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
              Branching call workflows
            </h3>
            <span className="hidden text-sm text-navy/55 sm:inline">
              Five real paths your front desk handles every day
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BRANCHES.map((b, idx) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="card-soft card-hover relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${TONE_BG[b.tone]}`}
                    >
                      {b.icon}
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-navy/50">
                        Path {b.id}
                      </div>
                      <div className="text-[15px] font-semibold text-navy">
                        {b.label}
                      </div>
                    </div>
                  </div>
                  <HeadsetIcon className="h-5 w-5 text-navy/30" />
                </div>

                <ol className="relative mt-5 space-y-3 border-l border-clinical-blue/15 pl-5">
                  {b.steps.map((s, i) => (
                    <li key={s.title} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[27px] top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white"
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            b.tone === "amber"
                              ? "bg-amber-500"
                              : b.tone === "green"
                                ? "bg-clinical-green"
                                : "bg-clinical-blue"
                          }`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      </span>
                      <div className="text-[13px] font-semibold text-navy">
                        {s.title}
                      </div>
                      <div className="text-[12px] text-navy/60">
                        {s.desc}
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
