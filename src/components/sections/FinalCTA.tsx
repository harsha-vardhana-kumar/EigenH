"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";

export function FinalCTA() {
  return (
    <section
      id="book-demo"
      className="relative scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="cta-title"
    >
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 gradient-card-navy p-8 text-white shadow-lift sm:p-12"
        >
          {/* glow accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-accent/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 bottom-[-30%] h-72 w-72 rounded-full bg-clinical-green/30 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-clinical-green" />
                Get started
              </span>
              <h2
                id="cta-title"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                Ready to see EigenH Reach in action?
              </h2>
              <p className="mt-4 max-w-2xl text-white/80">
                Give your dental clinic a 24/7 AI receptionist that answers
                calls, books appointments, and keeps your front desk focused on
                patients in the clinic.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="#book-demo"
                  className="btn-primary bg-white text-navy hover:bg-soft-white hover:text-navy"
                >
                  Book a Demo
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="#workflow"
                  className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                >
                  View Dental Workflow
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-white/65">
                      Your AI receptionist
                    </div>
                    <div className="text-[15px] font-semibold">
                      EigenH Reach is on call
                    </div>
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5 text-[13px] text-white/85">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-clinical-green" />
                    24/7 call coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-accent" />
                    Books cleanings, consults & emergencies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    SMS / WhatsApp confirmations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                    Escalates urgent dental cases
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
