"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CalendarIcon,
  ChartIcon,
  ClockIcon,
  PhoneIcon,
} from "@/components/ui/Icons";

const METRICS = [
  {
    icon: <PhoneIcon className="h-5 w-5" />,
    label: "Reduce missed calls",
    detail:
      "Answer every call, day or night — recover bookings that would have hit voicemail.",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    label: "Save front-desk hours",
    detail:
      "Offload repetitive intake, FAQs, reschedules, and confirmations.",
  },
  {
    icon: <CalendarIcon className="h-5 w-5" />,
    label: "Book more appointments",
    detail:
      "Always-on booking captures evenings, weekends, and holiday demand.",
  },
  {
    icon: <ChartIcon className="h-5 w-5" />,
    label: "Improve patient response time",
    detail: "Sub-second pickup with consistent, on-brand greetings.",
  },
];

export function Proof() {
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

      gsap.from(scope.querySelectorAll("[data-metric-card]"), {
        opacity: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: { trigger: scope, start: "top 72%", once: true },
      });

      gsap.from(scope.querySelectorAll("[data-placeholder]"), {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope.querySelector("[data-placeholder]"),
          start: "top 80%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="proof"
      className="relative scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="proof-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Outcomes"
          title={
            <span id="proof-title">
              Turn missed calls into{" "}
              <span className="text-clinical-green">booked appointments</span>
            </span>
          }
          description="EigenH Reach is designed to lift the metrics that matter to a dental clinic. Add real clinic results and doctor testimonials here after internal approval."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              data-metric-card
              className="card-soft card-hover"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-blue/10 text-clinical-blue">
                {m.icon}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-navy">
                {m.label}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder testimonial / proof blocks */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <div
            data-placeholder
            aria-label="Doctor testimonial placeholder"
            className="relative rounded-2xl border border-dashed border-navy/15 bg-white p-6"
          >
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-clinical-blue" />
              Doctor testimonial
            </span>
            <p className="mt-4 text-sm italic text-navy/60">
              Quote from a verified dentist will appear here once approved
              internally. Do not invent testimonials.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-soft-white" />
              <div className="space-y-1.5">
                <div className="h-2.5 w-28 rounded-full bg-soft-white" />
                <div className="h-2 w-20 rounded-full bg-soft-white/80" />
              </div>
            </div>
          </div>

          <div
            data-placeholder
            aria-label="Clinic result placeholder"
            className="relative rounded-2xl border border-dashed border-navy/15 bg-white p-6"
          >
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-clinical-green" />
              Clinic result
            </span>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Bookings", "Missed calls", "Hours saved", "CSAT"].map((k) => (
                <div key={k} className="rounded-xl bg-soft-white/70 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-navy/50">
                    {k}
                  </div>
                  <div className="mt-1.5 h-3 w-16 rounded-full bg-white" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] text-navy/55">
              Replace with verified clinic outcomes.
            </p>
          </div>

          <div
            data-placeholder
            aria-label="Video testimonial placeholder"
            className="relative rounded-2xl border border-dashed border-navy/15 bg-white p-6"
          >
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Video testimonial
            </span>
            <div className="mt-5 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-soft-white to-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-clinical-blue"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-[12px] text-navy/55">
              Add an approved clinic video here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
