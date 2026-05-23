"use client";

import { motion } from "framer-motion";
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
} from "@/components/ui/Icons";

type NodeProps = {
  title: string;
  subtitle?: string;
  tone?: "navy" | "blue" | "green" | "amber" | "neutral";
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
  pulse?: boolean;
};

const TONES: Record<NonNullable<NodeProps["tone"]>, string> = {
  navy: "bg-navy text-white border-navy",
  blue: "bg-white text-navy border-clinical-blue/25 ring-1 ring-clinical-blue/10",
  green:
    "bg-white text-navy border-clinical-green/25 ring-1 ring-clinical-green/10",
  amber:
    "bg-white text-navy border-amber-300/60 ring-1 ring-amber-200/50",
  neutral: "bg-white text-navy border-navy/10",
};

function FlowNode({
  title,
  subtitle,
  tone = "neutral",
  icon,
  delay = 0,
  className = "",
  pulse,
}: NodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl border px-3.5 py-3 shadow-soft backdrop-blur ${TONES[tone]} ${className}`}
    >
      {pulse ? (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 inline-flex h-3 w-3"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-green opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-clinical-green ring-2 ring-white" />
        </span>
      ) : null}
      <div className="flex items-center gap-2.5">
        {icon ? (
          <span
            className={`inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg ${
              tone === "navy"
                ? "bg-white/10 text-white"
                : tone === "amber"
                  ? "bg-amber-100 text-amber-700"
                  : tone === "green"
                    ? "bg-clinical-green/10 text-clinical-green"
                    : "bg-clinical-blue/10 text-clinical-blue"
            }`}
          >
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <div
            className={`truncate text-[13px] font-semibold leading-tight ${
              tone === "navy" ? "text-white" : "text-navy"
            }`}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              className={`mt-0.5 truncate text-[11px] ${
                tone === "navy" ? "text-white/75" : "text-navy/60"
              }`}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function Tag({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "neutral";
}) {
  const map = {
    blue: "bg-clinical-blue/10 text-clinical-blue",
    green: "bg-clinical-green/10 text-clinical-green",
    amber: "bg-amber-100 text-amber-700",
    neutral: "bg-navy/8 text-navy/70",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}

/**
 * SVG path of the animated call flow.
 * Coordinate system: 760 x 520 viewBox.
 * Lines fade in as you scroll, then a moving dash gives motion.
 */
function FlowLines() {
  const paths = [
    // Incoming -> AI Greeting
    "M 80 80 C 160 80, 200 130, 280 130",
    // AI Greeting -> Identify need
    "M 480 130 C 560 130, 600 200, 680 200",
    // Identify need -> 5 branches (left side back to outputs)
    "M 680 230 C 600 280, 540 280, 460 280", // book
    "M 680 250 C 600 320, 540 340, 460 350", // emergency
    "M 680 260 C 600 360, 540 410, 460 420", // insurance
    // Outputs -> finals
    "M 280 280 C 200 280, 160 200, 80 200", // book -> appointment booked
    "M 280 350 C 200 350, 160 280, 80 280", // emergency -> escalated
    "M 280 420 C 200 420, 160 360, 80 360", // insurance -> sms confirmation
  ];

  return (
    <svg
      viewBox="0 0 760 520"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flow-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#185FA5" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#185FA5" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1D9E75" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="flow-grad-2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#85B7EB" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#85B7EB" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#185FA5" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {paths.map((d, i) => (
        <g key={i}>
          {/* base translucent line */}
          <motion.path
            d={d}
            fill="none"
            stroke="#85B7EB"
            strokeOpacity={0.35}
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, delay: 0.15 + i * 0.08 }}
          />
          {/* animated dash overlay */}
          <path
            d={d}
            fill="none"
            stroke={i % 2 === 0 ? "url(#flow-grad)" : "url(#flow-grad-2)"}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray="6 10"
            className="animate-dash-flow"
            opacity={0.9}
          />
        </g>
      ))}
    </svg>
  );
}

export function CallFlowDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative"
    >
      <div className="relative rounded-[28px] border border-navy/8 bg-white/80 p-3 shadow-lift backdrop-blur sm:p-5">
        {/* Top status bar */}
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-soft-white/70 px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clinical-blue/10 text-clinical-blue">
              <HeadsetIcon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[12px] font-semibold text-navy">
              EigenH Reach · Live Call
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-navy/60">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-clinical-green" />
            00:14
          </div>
        </div>

        {/* Mobile stacked view */}
        <div className="grid gap-2.5 sm:hidden">
          <FlowNode
            title="Incoming Patient Call"
            subtitle="+1 (415) 555-0142"
            tone="navy"
            icon={<PhoneIcon className="h-4 w-4" />}
            delay={0.05}
            pulse
          />
          <FlowNode
            title="AI Greeting"
            subtitle="“Thanks for calling Bright Smile Dental.”"
            tone="blue"
            icon={<SparkleIcon className="h-4 w-4" />}
            delay={0.12}
          />
          <FlowNode
            title="Identify Patient Need"
            subtitle="Tooth pain · Cleaning · Insurance"
            tone="green"
            icon={<HeadsetIcon className="h-4 w-4" />}
            delay={0.18}
          />
          <div className="my-1 grid grid-cols-2 gap-2">
            <FlowNode
              title="Book Appointment"
              subtitle="Cleaning · New patient"
              tone="blue"
              icon={<CalendarIcon className="h-4 w-4" />}
              delay={0.22}
            />
            <FlowNode
              title="Emergency Escalation"
              subtitle="Severe tooth pain"
              tone="amber"
              icon={<AlertIcon className="h-4 w-4" />}
              delay={0.28}
            />
            <FlowNode
              title="Insurance"
              subtitle="Coverage check"
              tone="neutral"
              icon={<CardIcon className="h-4 w-4" />}
              delay={0.34}
            />
            <FlowNode
              title="Reschedule"
              subtitle="Existing patient"
              tone="neutral"
              icon={<RefreshIcon className="h-4 w-4" />}
              delay={0.4}
            />
          </div>
          <FlowNode
            title="Appointment booked"
            subtitle="Tomorrow · 10:30 AM"
            tone="green"
            icon={<CheckIcon className="h-4 w-4" />}
            delay={0.46}
          />
          <FlowNode
            title="SMS confirmation sent"
            subtitle="To +1 (415) 555-0142"
            tone="blue"
            icon={<MessageIcon className="h-4 w-4" />}
            delay={0.52}
          />
          <FlowNode
            title="Call summary saved"
            subtitle="Synced to PMS"
            tone="neutral"
            icon={<FileIcon className="h-4 w-4" />}
            delay={0.58}
          />
        </div>

        {/* The diagram canvas (sm+) */}
        <div className="relative hidden h-[460px] w-full sm:block lg:h-[520px]">
          <FlowLines />

          {/* Incoming Patient Call */}
          <FlowNode
            title="Incoming Patient Call"
            subtitle="+1 (415) 555-0142"
            tone="navy"
            icon={<PhoneIcon className="h-4 w-4" />}
            delay={0.05}
            pulse
            className="absolute left-[1%] top-[12%] w-[36%]"
          />

          {/* AI Greeting */}
          <FlowNode
            title="AI Greeting"
            subtitle="“Thanks for calling Bright Smile Dental.”"
            tone="blue"
            icon={<SparkleIcon className="h-4 w-4" />}
            delay={0.2}
            className="absolute left-[34%] top-[20%] w-[34%]"
          />

          {/* Identify Patient Need */}
          <FlowNode
            title="Identify Patient Need"
            subtitle="Tooth pain · Cleaning · Insurance"
            tone="green"
            icon={<HeadsetIcon className="h-4 w-4" />}
            delay={0.35}
            className="absolute right-[2%] top-[34%] w-[36%]"
          />

          {/* Branches */}
          <div className="absolute right-[2%] top-[52%] flex w-[36%] flex-col gap-2">
            <FlowNode
              title="Book Appointment"
              subtitle="Cleaning · New patient"
              tone="blue"
              icon={<CalendarIcon className="h-4 w-4" />}
              delay={0.5}
            />
            <FlowNode
              title="Emergency Escalation"
              subtitle="Severe tooth pain"
              tone="amber"
              icon={<AlertIcon className="h-4 w-4" />}
              delay={0.6}
            />
            <FlowNode
              title="Insurance Question"
              subtitle="Coverage check"
              tone="neutral"
              icon={<CardIcon className="h-4 w-4" />}
              delay={0.7}
            />
            <FlowNode
              title="Reschedule / Cancel"
              subtitle="Existing patient"
              tone="neutral"
              icon={<RefreshIcon className="h-4 w-4" />}
              delay={0.78}
            />
            <FlowNode
              title="Transfer to Staff"
              subtitle="Complex request"
              tone="neutral"
              icon={<TransferIcon className="h-4 w-4" />}
              delay={0.86}
            />
          </div>

          {/* Outputs */}
          <FlowNode
            title="Appointment booked"
            subtitle="Tomorrow · 10:30 AM"
            tone="green"
            icon={<CheckIcon className="h-4 w-4" />}
            delay={0.95}
            className="absolute left-[1%] top-[36%] w-[36%]"
          />
          <FlowNode
            title="SMS confirmation sent"
            subtitle="To +1 (415) 555-0142"
            tone="blue"
            icon={<MessageIcon className="h-4 w-4" />}
            delay={1.05}
            className="absolute left-[1%] top-[54%] w-[36%]"
          />
          <FlowNode
            title="Call summary saved"
            subtitle="Synced to PMS"
            tone="neutral"
            icon={<FileIcon className="h-4 w-4" />}
            delay={1.15}
            className="absolute left-[1%] top-[72%] w-[36%]"
          />
          <FlowNode
            title="Emergency escalated"
            subtitle="Notified Dr. Patel · 2 min"
            tone="amber"
            icon={<AlertIcon className="h-4 w-4" />}
            delay={1.25}
            className="absolute left-[1%] top-[88%] w-[36%]"
          />
        </div>

        {/* Caller intent tags */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-navy/50">
            Caller intents detected
          </span>
          <Tag tone="amber">Tooth pain</Tag>
          <Tag tone="blue">Cleaning appointment</Tag>
          <Tag tone="green">New patient</Tag>
          <Tag tone="neutral">Insurance question</Tag>
          <Tag tone="amber">After-hours call</Tag>
        </div>
      </div>

      {/* Floating side bubbles */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute -left-3 -top-4 hidden rounded-2xl border border-navy/8 bg-white px-3.5 py-2 shadow-lift sm:block"
      >
        <div className="flex items-center gap-2 text-[12px] text-navy/80">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-clinical-green" />
          Live call answered in 0.6s
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="absolute -bottom-4 right-2 hidden rounded-2xl border border-navy/8 bg-white px-3.5 py-2 shadow-lift sm:block"
      >
        <div className="flex items-center gap-2 text-[12px] text-navy/80">
          <CheckIcon className="h-3.5 w-3.5 text-clinical-green" />
          Booking complete · summary saved
        </div>
      </motion.div>
    </motion.div>
  );
}
