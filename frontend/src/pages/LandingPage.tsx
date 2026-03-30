import { motion } from "motion/react";
import Hero from "../sections/Hero";
import TrustBar from "../sections/TrustBar";
import PainPoints from "../sections/PainPoints";
import FeaturedCourses from "../sections/FeaturedCourses";
import PlacementSupport from "../sections/PlacementSupport";
import FAQ from "../sections/FAQ";
import FinalCTA from "../sections/FinalCTA";

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full overflow-hidden bg-slate-50 min-h-screen selection:bg-blue-100 selection:text-blue-900"
    >
      <Hero />
      <TrustBar />
      <PainPoints />
      <FeaturedCourses />
      <PlacementSupport />
      <FAQ />
      <FinalCTA />
    </motion.div>
  );
}
