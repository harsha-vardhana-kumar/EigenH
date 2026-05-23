import Link from "next/link";
import { Logo } from "./Logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#features" },
      { label: "Workflows", href: "#workflow" },
      { label: "Live Demo", href: "#live-demo" },
      { label: "Safety & Escalation", href: "#safety" },
    ],
  },
  {
    title: "For Dental Clinics",
    links: [
      { label: "Solo practices", href: "#dental-workflows" },
      { label: "DSOs & multi-location", href: "#dental-workflows" },
      { label: "Specialty clinics", href: "#dental-workflows" },
      { label: "ROI", href: "#proof" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Demo", href: "#live-demo" },
      { label: "Contact", href: "#book-demo" },
      { label: "Privacy", href: "#privacy" },
      { label: "Security", href: "#security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-navy/8 bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-navy/65">
              A 24/7 AI receptionist purpose-built for US dental clinics.
              Answer every call, book more appointments, and escalate urgent
              cases — without adding to front-desk workload.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Link href="#book-demo" className="btn-primary">
                Book a Demo
              </Link>
              <Link href="#live-demo" className="btn-secondary">
                Try Live Call Demo
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/55">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-navy/75 transition-colors hover:text-clinical-blue"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-navy/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-navy/55">
            &copy; {new Date().getFullYear()} EigenH. All rights reserved.
            EigenH Reach supports front-desk workflows and is not a substitute
            for clinical judgment.
          </p>
          <div className="flex items-center gap-4 text-xs text-navy/55">
            <Link href="#privacy" className="hover:text-clinical-blue">
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="#security" className="hover:text-clinical-blue">
              Security
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="#contact" className="hover:text-clinical-blue">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
