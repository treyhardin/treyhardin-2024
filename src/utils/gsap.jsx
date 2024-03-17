import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* The following plugin is a Club GSAP perk */
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

export * from "gsap";
export * from "gsap/ScrollTrigger";
export * from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother, ScrambleTextPlugin);

export const mediaZoom = (element, timeline, timing) => {
  timeline.from(element, {
    scale: 1.4,
    duration: 3
  }, timing)
}

export const scrambleIn = ( element, timeline, timing) => {
  timeline.to(element, {
    autoAlpha: 1,
    scrambleText: {
      text: "{original}",
      chars: "!@#$%^&*()TREY",
      revealDelay: 0.6,
      speed: 0.8,
    },
  }, timing)
}