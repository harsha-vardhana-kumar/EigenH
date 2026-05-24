"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { ClockIcon, PhoneIcon, HeadsetIcon } from "@/components/ui/Icons";

const ITEMS = [
  {
    icon: <PhoneIcon className="h-5 w-5" />,
    title: "Missed calls during busy hours",
    body: "When the front desk is on another line, new and existing patients hit voicemail and don’t call back.",
    stat: { kind: "text" as const, value: "1 in 3" },
    statLabel: "calls missed at peak",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "After-hours patients go unanswered",
    body: "Evenings, weekends, and holidays are when patients have time to call — and when most clinics are closed.",
    stat: { kind: "count" as const, to: 62, suffix: "%" },
    statLabel: "of bookings happen after hours",
  },
  {
    icon: <HeadsetIcon className="h-5 w-5" />,
    title: "Front desk overloaded with repetitive questions",
    body: "Hours are lost to insurance checks, reschedules, and FAQs that don’t need a human to handle.",
    stat: { kind: "count" as const, to: 40, suffix: "%" },
    statLabel: "of front-desk time is repetitive",
  },
];

export function Problem() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const scope = root.current;
      if (!scope) return;

      const trigger = {
        trigger: scope,
        start: "top 78%",
        once: true,
      };

      gsap.from(scope.querySelectorAll('[data-anim^="header-"]'), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: trigger,
      });

      gsap.from(scope.querySelectorAll("[data-problem-card]"), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: { trigger: scope, start: "top 70%", once: true },
      });

      gsap.from(scope.querySelectorAll("[data-problem-icon]"), {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.1,
        scrollTrigger: { trigger: scope, start: "top 70%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="problem"
      className="relative scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="problem-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="The problem"
          title={
            <span id="problem-title">
              Missed calls become{" "}
              <span className="text-clinical-blue">missed patients.</span>
            </span>
          }
          description="Dental clinics lose revenue every week when calls go to voicemail, staff are tied up at the front desk, or after-hours patients can't book an appointment. EigenH Reach keeps every call moving forward."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              data-problem-card
              className="card-soft card-hover relative overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-clinical-blue/8 blur-2xl"
              />
              <div className="relative flex items-start justify-between gap-4">
                <span
                  data-problem-icon
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-blue/10 text-clinical-blue"
                >
                  {item.icon}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-navy">
                    {item.stat.kind === "count" ? (
                      <CountUp
                        to={item.stat.to}
                        suffix={item.stat.suffix}
                        duration={1.5}
                      />
                    ) : (
                      item.stat.value
                    )}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-navy/55">
                    {item.statLabel}
                  </div>
                </div>
              </div>
              <h3 className="relative mt-5 text-lg font-semibold text-navy">
                {item.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-navy/65">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-navy/45">
          Figures shown are illustrative ranges based on common dental
          front-desk patterns. Replace with verified clinic results before
          publishing.
        </p>
      </div>
    </section>
  );
}
