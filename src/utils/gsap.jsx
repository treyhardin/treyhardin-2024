import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* The following plugin is a Club GSAP perk */
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

export * from "gsap";
export * from "gsap/ScrollTrigger";
// export * from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother, ScrambleTextPlugin);

export const mediaZoom = (element, timeline, timing) => {
  timeline.from(element, {
    // opacity: 0,
    scale: 1.5,
    duration: 3,
  }, timing)
}

export const mediaScroll = ( element ) => {
  gsap.fromTo(element, 
    {
      y: "-10%",
      scale: 1.2
    },
    {
      y: "10%",
      scale: 1.2,
      scrollTrigger: {
        trigger: element,
        scrub: true
      }
    }
)
}

export const rotateIn = ( element, timeline, timing ) => {
  timeline.from(element, {
    opacity: 0,
    rotate: 3,
    transformOrigin: "-200% 0"
  }, timing)
}

export const fadeUp = ( element, timeline, duration, timing ) => {
  timeline.from(element, {
    opacity: 0,
    y: 40,
    duration: duration
  }, timing)
}

export const scrambleIn = ( element, timeline, timing) => {
  timeline.to(element, {
    autoAlpha: 1,
    scrambleText: {
      text: "{original}",
      chars: "!@#$%^&*()TREY",
      revealDelay: 0.4,
      speed: 0.7,
    },
    duration: 0.6,
  }, timing)
}