"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { label: "Product", href: "#features" },
  { label: "Workflows", href: "#workflow" },
  { label: "For Dental Clinics", href: "#dental-workflows" },
  { label: "Demo", href: "#live-demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-navy/8 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-white/60 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-navy/75 transition-colors hover:bg-soft-white/60 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="#live-demo" className="btn-secondary">
            Try Live Call Demo
          </Link>
          <Link href="#book-demo" className="btn-primary">
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${mobileOpen ? "block" : "hidden"} border-t border-navy/8 bg-white`}
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-navy/85 hover:bg-soft-white/70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="#live-demo"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary w-full"
            >
              Try Live Call Demo
            </Link>
            <Link
              href="#book-demo"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full"
            >
              Book a Demo
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
