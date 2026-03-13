import { motion } from "motion/react";
import Hero from "../sections/Hero";
import TrustBar from "../sections/TrustBar";
import PainPoints from "../sections/PainPoints";
import Solution from "../sections/Solution";
import CourseOutcome from "../sections/CourseOutcome";
import Curriculum from "../sections/Curriculum";
import Projects from "../sections/Projects";
import Trainer from "../sections/Trainer";
import Testimonials from "../sections/Testimonials";
import PlacementSupport from "../sections/PlacementSupport";
import BatchDetails from "../sections/BatchDetails";
import FAQ from "../sections/FAQ";
import FinalCTA from "../sections/FinalCTA";

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full overflow-hidden scanlines matrix-bg min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200"
    >
      <Hero />
      <TrustBar />
      <PainPoints />
      <Solution />
      <Curriculum />
      <Projects />
      <CourseOutcome />
      <Trainer />
      <Testimonials />
      <PlacementSupport />
      <BatchDetails />
      <FAQ />
      <FinalCTA />
    </motion.div>
  );
}
