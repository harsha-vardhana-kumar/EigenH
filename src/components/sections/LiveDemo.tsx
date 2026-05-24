"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
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
  { speaker: "ai", text: "Done. I’ve sent a confirmation to your phone." },
];

const OUTCOMES = [
  {
    icon: <CalendarIcon className="h-4 w-4" />,
    title: "Appointment booked",
    detail: "Tomorrow · 10:30 AM · Cleaning",
    tone: "green",
    /** index of transcript turn to anchor reveal to */
    afterTurn: 3,
  },
  {
    icon: <MessageIcon className="h-4 w-4" />,
    title: "SMS confirmation sent",
    detail: "To +1 (415) 555-0142",
    tone: "blue",
    afterTurn: 5,
  },
  {
    icon: <UserIcon className="h-4 w-4" />,
    title: "Patient details captured",
    detail: "Name · Phone · Insurance",
    tone: "blue",
    afterTurn: 2,
  },
  {
    icon: <FileIcon className="h-4 w-4" />,
    title: "Call summary saved",
    detail: "Synced to PMS · 32 sec",
    tone: "navy",
    afterTurn: 5,
  },
] as const;

const OUTCOME_TONE: Record<(typeof OUTCOMES)[number]["tone"], string> = {
  blue: "bg-clinical-blue/10 text-clinical-blue",
  green: "bg-clinical-green/10 text-clinical-green",
  navy: "bg-navy/10 text-navy",
};

export function LiveDemo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const reduce = prefersReducedMotion();

      const turns = scope.querySelectorAll<HTMLElement>("[data-chat-turn]");
      const typing = scope.querySelector<HTMLElement>("[data-chat-typing]");
      const outcomes =
        scope.querySelectorAll<HTMLElement>("[data-outcome-card]");
      const finalOutcome = scope.querySelector<HTMLElement>(
        "[data-outcome-final]"
      );

      if (reduce) {
        gsap.set(turns, { opacity: 1, y: 0 });
        gsap.set(outcomes, { opacity: 1, y: 0 });
        if (typing) gsap.set(typing, { opacity: 0, display: "none" });
        return;
      }

      // Initial states
      gsap.set(turns, { opacity: 0, y: 12 });
      gsap.set(outcomes, { opacity: 0, y: 14 });
      if (typing) gsap.set(typing, { opacity: 0 });

      // Header reveal
      gsap.from(scope.querySelectorAll('[data-anim^="header-"]'), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: { trigger: scope, start: "top 78%", once: true },
      });

      // Build the chat sequence inside a master timeline.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 65%", once: true },
        defaults: { ease: "power2.out" },
      });

      turns.forEach((turn, idx) => {
        const isAI = turn.dataset.speaker === "ai";

        if (isAI && typing) {
          tl.set(typing, { opacity: 1 }).to(typing, {
            opacity: 1,
            duration: 0.7, // dwell while "typing"
          });
        }

        tl.to(turn, { opacity: 1, y: 0, duration: 0.45 }, ">");

        if (isAI && typing) {
          tl.set(typing, { opacity: 0 });
        }

        // Reveal outcome cards anchored to this turn
        outcomes.forEach((card) => {
          if (Number(card.dataset.afterTurn) === idx) {
            tl.to(
              card,
              { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
              "<+0.1"
            );
          }
        });

        // small idle gap between turns
        tl.to({}, { duration: 0.35 });
      });

      // Final outcome highlight (Call summary saved)
      if (finalOutcome) {
        tl.to(
          finalOutcome,
          {
            keyframes: [
              { boxShadow: "0 0 0 6px rgba(29,158,117,0.18)", duration: 0.55 },
              { boxShadow: "0 0 0 0 rgba(29,158,117,0)", duration: 0.7 },
            ],
            ease: "power2.out",
          },
          ">"
        );
      }
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
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

              <ul aria-live="polite" className="mt-5 space-y-3">
                {TRANSCRIPT.map((t, i) => {
                  const isAI = t.speaker === "ai";
                  return (
                    <li
                      key={i}
                      data-chat-turn
                      data-speaker={t.speaker}
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
                    </li>
                  );
                })}
                {/* Typing indicator (shown by GSAP between turns) */}
                <li
                  data-chat-typing
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
                  EigenH is responding…
                </li>
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
              {OUTCOMES.map((o, idx) => (
                <div
                  key={o.title}
                  data-outcome-card
                  data-after-turn={o.afterTurn}
                  {...(idx === OUTCOMES.length - 1
                    ? { "data-outcome-final": true }
                    : {})}
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
                </div>
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
