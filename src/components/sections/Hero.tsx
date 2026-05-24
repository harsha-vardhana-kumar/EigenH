"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { CallFlowDiagram } from "./CallFlowDiagram";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/ui/Icons";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from('[data-hero="badge"]', { opacity: 0, y: 12, duration: 0.55 })
        .from(
          '[data-hero="title-line"]',
          {
            opacity: 0,
            y: 22,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.25"
        )
        .from(
          '[data-hero="sub"]',
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.45"
        )
        .from(
          '[data-hero="cta"]',
          {
            opacity: 0,
            y: 14,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.35"
        )
        .from(
          '[data-hero="trust"]',
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.3"
        )
        .from(
          '[data-hero="meta"]',
          { opacity: 0, y: 10, duration: 0.5 },
          "-=0.2"
        )
        .from(
          '[data-hero="visual"]',
          {
            opacity: 0,
            x: 32,
            scale: 0.96,
            duration: 0.95,
            ease: "power3.out",
          },
          "-=0.7"
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="hero"
      className="relative overflow-hidden gradient-bg-soft pt-10 sm:pt-14 lg:pt-20"
    >
      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-soft [background-size:48px_48px] opacity-40 mask-fade-y"
      />
      {/* soft radial accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-clinical-green/12 blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <span className="eyebrow" data-hero="badge">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clinical-green" />
              </span>
              24/7 AI Receptionist · Built for US Dental Clinics
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy text-balance sm:text-5xl lg:text-[3.4rem]">
              <span className="block" data-hero="title-line">
                Never miss another
              </span>
              <span className="relative block" data-hero="title-line">
                <span className="bg-gradient-to-r from-clinical-blue to-clinical-green bg-clip-text text-transparent">
                  patient call.
                </span>
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-clinical-blue/30 to-clinical-green/30" />
              </span>
            </h1>

            <p
              className="mt-5 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg"
              data-hero="sub"
            >
              EigenH Reach is a 24/7 AI receptionist for dental clinics. It
              answers calls, books appointments, sends confirmations, and
              escalates urgent cases — even when your front desk is busy.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#book-demo" className="btn-primary" data-hero="cta">
                Book a Demo
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="#workflow" className="btn-secondary" data-hero="cta">
                See How It Works
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-2 text-sm text-navy/70 sm:grid-cols-2">
              {[
                "Answers every call, day or night",
                "Books, reschedules & confirms",
                "Escalates dental emergencies",
                "Sends SMS/WhatsApp confirmations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                  data-hero="trust"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clinical-green/12 text-clinical-green">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 flex items-center gap-3 text-xs text-navy/55"
              data-hero="meta"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft">
                <PhoneIcon className="h-4 w-4 text-clinical-blue" />
              </span>
              <span>
                Trusted approach for dental front-desk teams · HIPAA-aware
                handoff
              </span>
            </div>
          </div>

          <div className="lg:col-span-7" data-hero="visual">
            <CallFlowDiagram />
          </div>
        </div>

        <div className="h-16 sm:h-20 lg:h-24" />
      </div>
    </section>
  );
}
