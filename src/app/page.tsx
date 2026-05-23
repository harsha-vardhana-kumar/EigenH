import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Workflow } from "@/components/sections/Workflow";
import { DentalWorkflows } from "@/components/sections/DentalWorkflows";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Features } from "@/components/sections/Features";
import { Safety } from "@/components/sections/Safety";
import { Proof } from "@/components/sections/Proof";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Workflow />
      <DentalWorkflows />
      <LiveDemo />
      <Features />
      <Safety />
      <Proof />
      <FinalCTA />
    </>
  );
}
