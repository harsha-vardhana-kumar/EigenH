"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
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
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const scope = root.current;
      if (!scope) return;

      gsap.from(scope.querySelectorAll('[data-anim^="header-"]'), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: { trigger: scope, start: "top 78%", once: true },
      });

      gsap.from(scope.querySelectorAll("[data-dental-card]"), {
        opacity: 0,
        y: 24,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.07,
        scrollTrigger: { trigger: scope, start: "top 72%", once: true },
      });

      // Hover micro-interaction (skip on touch / reduced)
      const cards = scope.querySelectorAll<HTMLElement>("[data-dental-card]");
      cards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>("[data-dental-icon]");
        const enter = () => {
          gsap.to(card, { y: -4, duration: 0.3, ease: "power2.out" });
          if (icon)
            gsap.to(icon, {
              scale: 1.06,
              duration: 0.3,
              ease: "power2.out",
            });
        };
        const leave = () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
          if (icon) gsap.to(icon, { scale: 1, duration: 0.4 });
        };
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
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
          {WORKFLOWS.map((w) => (
            <article
              key={w.title}
              data-dental-card
              className="card-soft group relative overflow-hidden border-navy/8 transition-colors duration-300 hover:border-sky-accent/60"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-accent/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between gap-3">
                <span
                  data-dental-icon
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${TONE_BG[w.tone]}`}
                >
                  {w.icon}
                </span>
                <HeadsetIcon className="h-5 w-5 text-navy/15" />
              </div>
              <h3 className="relative mt-5 text-[15px] font-semibold text-navy">
                {w.title}
              </h3>
              <p className="relative mt-1.5 text-[13px] leading-relaxed text-navy/65">
                {w.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
