"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
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
  className?: string;
  pulse?: boolean;
  /** Sequence index used by GSAP for ordered reveal */
  seq?: number;
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
  className = "",
  pulse,
  seq,
}: NodeProps) {
  return (
    <div
      data-flow-node
      data-flow-seq={seq}
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
    </div>
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
 * SVG connectors. Coordinate system: 760 x 520 viewBox.
 * Each <path> has data-flow-line for GSAP line-draw animation,
 * plus a sibling dashed overlay that "flows" continuously via CSS
 * once the line has been drawn.
 */
function FlowLines() {
  const paths: { d: string; key: string }[] = [
    { key: "in-greet", d: "M 80 80 C 160 80, 200 130, 280 130" },
    { key: "greet-need", d: "M 480 130 C 560 130, 600 200, 680 200" },
    { key: "need-book", d: "M 680 230 C 600 280, 540 280, 460 280" },
    { key: "need-emerg", d: "M 680 250 C 600 320, 540 340, 460 350" },
    { key: "need-ins", d: "M 680 260 C 600 360, 540 410, 460 420" },
    { key: "book-out1", d: "M 280 280 C 200 280, 160 200, 80 200" },
    { key: "emerg-out2", d: "M 280 350 C 200 350, 160 280, 80 280" },
    { key: "ins-out3", d: "M 280 420 C 200 420, 160 360, 80 360" },
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

      {paths.map((p, i) => (
        <g key={p.key}>
          {/* base line — drawn by GSAP via stroke-dashoffset */}
          <path
            data-flow-line
            d={p.d}
            fill="none"
            stroke="#85B7EB"
            strokeOpacity={0.55}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* animated dash overlay — gives the "moving call" feel */}
          <path
            d={p.d}
            fill="none"
            stroke={i % 2 === 0 ? "url(#flow-grad)" : "url(#flow-grad-2)"}
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray="6 10"
            className="animate-dash-flow"
            opacity={0.85}
          />
        </g>
      ))}
    </svg>
  );
}

export function CallFlowDiagram() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const scope = root.current;
      if (!scope) return;

      const lines = scope.querySelectorAll<SVGPathElement>("[data-flow-line]");
      const nodes = scope.querySelectorAll<HTMLElement>("[data-flow-node]");

      // Initialize line stroke-dash for line-draw effect
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      if (reduce) {
        // Show everything immediately for reduced motion
        gsap.set(lines, { strokeDashoffset: 0 });
        gsap.set(nodes, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Initial states
      gsap.set(nodes, { opacity: 0, y: 14, scale: 0.94 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: scope,
          start: "top 80%",
          once: true,
        },
      });

      // Reveal nodes in workflow order
      const ordered = Array.from(nodes).sort(
        (a, b) =>
          Number(a.dataset.flowSeq ?? 0) - Number(b.dataset.flowSeq ?? 0)
      );

      tl.to(ordered, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.11,
      })
        // Draw connector lines slightly behind the nodes
        .to(
          lines,
          {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.08,
          },
          0.2
        );

      // Subtle floating motion on the whole card
      const card = scope.querySelector('[data-flow-card]');
      if (card) {
        gsap.to(card, {
          y: -6,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <div
        data-flow-card
        className="relative rounded-[28px] border border-navy/8 bg-white/80 p-3 shadow-lift backdrop-blur sm:p-5"
      >
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
            seq={1}
            title="Incoming Patient Call"
            subtitle="+1 (415) 555-0142"
            tone="navy"
            icon={<PhoneIcon className="h-4 w-4" />}
            pulse
          />
          <FlowNode
            seq={2}
            title="AI Greeting"
            subtitle="“Thanks for calling Bright Smile Dental.”"
            tone="blue"
            icon={<SparkleIcon className="h-4 w-4" />}
          />
          <FlowNode
            seq={3}
            title="Identify Patient Need"
            subtitle="Tooth pain · Cleaning · Insurance"
            tone="green"
            icon={<HeadsetIcon className="h-4 w-4" />}
          />
          <div className="my-1 grid grid-cols-2 gap-2">
            <FlowNode
              seq={4}
              title="Book Appointment"
              subtitle="Cleaning · New patient"
              tone="blue"
              icon={<CalendarIcon className="h-4 w-4" />}
            />
            <FlowNode
              seq={5}
              title="Emergency Escalation"
              subtitle="Severe tooth pain"
              tone="amber"
              icon={<AlertIcon className="h-4 w-4" />}
            />
            <FlowNode
              seq={6}
              title="Insurance"
              subtitle="Coverage check"
              tone="neutral"
              icon={<CardIcon className="h-4 w-4" />}
            />
            <FlowNode
              seq={7}
              title="Reschedule"
              subtitle="Existing patient"
              tone="neutral"
              icon={<RefreshIcon className="h-4 w-4" />}
            />
          </div>
          <FlowNode
            seq={9}
            title="Appointment booked"
            subtitle="Tomorrow · 10:30 AM"
            tone="green"
            icon={<CheckIcon className="h-4 w-4" />}
            pulse
          />
          <FlowNode
            seq={8}
            title="SMS confirmation sent"
            subtitle="To +1 (415) 555-0142"
            tone="blue"
            icon={<MessageIcon className="h-4 w-4" />}
          />
          <FlowNode
            seq={10}
            title="Call summary saved"
            subtitle="Synced to PMS"
            tone="neutral"
            icon={<FileIcon className="h-4 w-4" />}
          />
        </div>

        {/* The diagram canvas (sm+) */}
        <div className="relative hidden h-[460px] w-full sm:block lg:h-[520px]">
          <FlowLines />

          {/* Incoming Patient Call */}
          <FlowNode
            seq={1}
            title="Incoming Patient Call"
            subtitle="+1 (415) 555-0142"
            tone="navy"
            icon={<PhoneIcon className="h-4 w-4" />}
            pulse
            className="absolute left-[1%] top-[12%] w-[36%]"
          />

          {/* AI Greeting */}
          <FlowNode
            seq={2}
            title="AI Greeting"
            subtitle="“Thanks for calling Bright Smile Dental.”"
            tone="blue"
            icon={<SparkleIcon className="h-4 w-4" />}
            className="absolute left-[34%] top-[20%] w-[34%]"
          />

          {/* Identify Patient Need */}
          <FlowNode
            seq={3}
            title="Identify Patient Need"
            subtitle="Tooth pain · Cleaning · Insurance"
            tone="green"
            icon={<HeadsetIcon className="h-4 w-4" />}
            className="absolute right-[2%] top-[34%] w-[36%]"
          />

          {/* Branches */}
          <div className="absolute right-[2%] top-[52%] flex w-[36%] flex-col gap-2">
            <FlowNode
              seq={4}
              title="Book Appointment"
              subtitle="Cleaning · New patient"
              tone="blue"
              icon={<CalendarIcon className="h-4 w-4" />}
            />
            <FlowNode
              seq={5}
              title="Emergency Escalation"
              subtitle="Severe tooth pain"
              tone="amber"
              icon={<AlertIcon className="h-4 w-4" />}
              pulse
            />
            <FlowNode
              seq={6}
              title="Insurance Question"
              subtitle="Coverage check"
              tone="neutral"
              icon={<CardIcon className="h-4 w-4" />}
            />
            <FlowNode
              seq={7}
              title="Reschedule / Cancel"
              subtitle="Existing patient"
              tone="neutral"
              icon={<RefreshIcon className="h-4 w-4" />}
            />
            <FlowNode
              seq={8}
              title="Transfer to Staff"
              subtitle="Complex request"
              tone="neutral"
              icon={<TransferIcon className="h-4 w-4" />}
            />
          </div>

          {/* Outputs */}
          <FlowNode
            seq={9}
            title="Appointment booked"
            subtitle="Tomorrow · 10:30 AM"
            tone="green"
            icon={<CheckIcon className="h-4 w-4" />}
            pulse
            className="absolute left-[1%] top-[36%] w-[36%]"
          />
          <FlowNode
            seq={10}
            title="SMS confirmation sent"
            subtitle="To +1 (415) 555-0142"
            tone="blue"
            icon={<MessageIcon className="h-4 w-4" />}
            pulse
            className="absolute left-[1%] top-[54%] w-[36%]"
          />
          <FlowNode
            seq={11}
            title="Call summary saved"
            subtitle="Synced to PMS"
            tone="neutral"
            icon={<FileIcon className="h-4 w-4" />}
            className="absolute left-[1%] top-[72%] w-[36%]"
          />
          <FlowNode
            seq={12}
            title="Emergency escalated"
            subtitle="Notified Dr. Patel · 2 min"
            tone="amber"
            icon={<AlertIcon className="h-4 w-4" />}
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
      <div
        data-flow-bubble
        className="absolute -left-3 -top-4 hidden rounded-2xl border border-navy/8 bg-white px-3.5 py-2 shadow-lift sm:block"
      >
        <div className="flex items-center gap-2 text-[12px] text-navy/80">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-clinical-green" />
          Live call answered in 0.6s
        </div>
      </div>
      <div
        data-flow-bubble
        className="absolute -bottom-4 right-2 hidden rounded-2xl border border-navy/8 bg-white px-3.5 py-2 shadow-lift sm:block"
      >
        <div className="flex items-center gap-2 text-[12px] text-navy/80">
          <CheckIcon className="h-3.5 w-3.5 text-clinical-green" />
          Booking complete · summary saved
        </div>
      </div>
    </div>
  );
}
