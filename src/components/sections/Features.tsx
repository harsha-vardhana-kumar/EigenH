"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AlertIcon,
  CalendarIcon,
  CardIcon,
  ChartIcon,
  ClockIcon,
  FileIcon,
  GlobeIcon,
  MessageIcon,
  PhoneIcon,
  UserIcon,
} from "@/components/ui/Icons";

const FEATURES = [
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "24/7 call answering",
    desc: "Pick up every call — including evenings, weekends, and holidays.",
  },
  {
    icon: <CalendarIcon className="h-5 w-5" />,
    title: "Appointment booking",
    desc: "Auto-book, reschedule, and cancel directly into your PMS-style flow.",
  },
  {
    icon: <MessageIcon className="h-5 w-5" />,
    title: "SMS & WhatsApp confirmations",
    desc: "Confirmations, reminders, and pre-visit instructions delivered instantly.",
  },
  {
    icon: <AlertIcon className="h-5 w-5" />,
    title: "Emergency escalation",
    desc: "Detect urgent dental cases and route them to staff in seconds.",
  },
  {
    icon: <GlobeIcon className="h-5 w-5" />,
    title: "Multilingual support",
    desc: "Respond naturally in English and Spanish, with more languages on request.",
  },
  {
    icon: <FileIcon className="h-5 w-5" />,
    title: "Call recordings & transcripts",
    desc: "Searchable transcripts and audio for every call — safe for review and QA.",
  },
  {
    icon: <UserIcon className="h-5 w-5" />,
    title: "Patient intake capture",
    desc: "Name, phone, insurance, and reason captured cleanly for your front desk.",
  },
  {
    icon: <PhoneIcon className="h-5 w-5" />,
    title: "PMS-ready workflow",
    desc: "Designed to plug into common dental PMS tools and calendar systems.",
  },
  {
    icon: <CardIcon className="h-5 w-5" />,
    title: "Payment link support",
    desc: "Send deposits or balance links via SMS during or after the call.",
  },
  {
    icon: <ChartIcon className="h-5 w-5" />,
    title: "Analytics & missed-call recovery",
    desc: "Dashboards on volume, intent, conversion, and recovered missed calls.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="features-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Capabilities"
          title={
            <span id="features-title">
              Everything your dental front desk needs — after hours and during
              peak hours
            </span>
          }
          description="A clinical-grade voice receptionist with the tools your team already wishes they had."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="card-soft card-hover"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-blue/10 text-clinical-blue">
                {f.icon}
              </span>
              <h3 className="mt-4 text-[14px] font-semibold text-navy">
                {f.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy/65">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
