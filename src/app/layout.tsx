import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EigenH Reach — 24/7 AI Receptionist for Dental Clinics",
  description:
    "EigenH Reach is a 24/7 AI receptionist for US dental clinics. It answers calls, books appointments, sends confirmations, and escalates urgent cases — even when your front desk is busy.",
  keywords: [
    "EigenH Reach",
    "AI receptionist",
    "dental clinic",
    "appointment booking",
    "24/7 call answering",
    "dental front desk",
  ],
  metadataBase: new URL("https://eigenh.com"),
  openGraph: {
    title: "EigenH Reach — 24/7 AI Receptionist for Dental Clinics",
    description:
      "Never miss another patient call. EigenH Reach answers calls, books appointments, and escalates emergencies for US dental clinics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
