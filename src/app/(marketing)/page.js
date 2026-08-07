// Marketing home page.
// Authenticated users are redirected to /app by the middleware before this
// page renders — no client-side cookie check needed (and the httpOnly session
// cookie cannot be read from JavaScript anyway).
import Hero from "./layouts/hero";
import Trusted from "./layouts/trusted";
import Tour from "./layouts/tour";
import Solutions from "./layouts/solutions";
import BlackBoard from "./layouts/blackboard";
import Community from "./layouts/community";
import FAQ from "./layouts/faq";
import LenzroDemo from "./layouts/lenzrodemo";

export default function Home() {
  return (
    <div className="pt-10 flex flex-col gap-10 md:gap-14">
      <Hero />
      <Trusted />
      <Tour />
      <Solutions />
      {/* 
      <BlackBoard /> */}
      {/* <Community />
      <FAQ /> */}
      {/* <LenzroDemo /> */}
    </div>
  );
}
