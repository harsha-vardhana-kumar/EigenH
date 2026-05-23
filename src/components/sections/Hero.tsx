"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CallFlowDiagram } from "./CallFlowDiagram";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden gradient-bg-soft pt-10 sm:pt-14 lg:pt-20"
    >
      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-soft [background-size:48px_48px] opacity-40 mask-fade-y"
      />
      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="eyebrow"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clinical-green" />
              </span>
              24/7 AI Receptionist · Built for US Dental Clinics
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy text-balance sm:text-5xl lg:text-[3.4rem]"
            >
              Never miss another{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-clinical-blue to-clinical-green bg-clip-text text-transparent">
                  patient call.
                </span>
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-clinical-blue/30 to-clinical-green/30" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg"
            >
              EigenH Reach is a 24/7 AI receptionist for dental clinics. It
              answers calls, books appointments, sends confirmations, and
              escalates urgent cases — even when your front desk is busy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link href="#book-demo" className="btn-primary">
                Book a Demo
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="#workflow" className="btn-secondary">
                See How It Works
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 gap-2 text-sm text-navy/70 sm:grid-cols-2"
            >
              {[
                "Answers every call, day or night",
                "Books, reschedules & confirms",
                "Escalates dental emergencies",
                "Sends SMS/WhatsApp confirmations",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clinical-green/12 text-clinical-green">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex items-center gap-3 text-xs text-navy/55"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft">
                <PhoneIcon className="h-4 w-4 text-clinical-blue" />
              </span>
              <span>
                Trusted approach for dental front-desk teams · HIPAA-aware
                handoff
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <CallFlowDiagram />
          </div>
        </div>

        <div className="h-16 sm:h-20 lg:h-24" />
      </div>
    </section>
  );
}
