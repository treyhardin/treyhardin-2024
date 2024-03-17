import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* The following plugin is a Club GSAP perk */
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

export * from "gsap";
export * from "gsap/ScrollTrigger";
export * from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother, ScrambleTextPlugin);