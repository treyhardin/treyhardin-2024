import Lenis from '@studio-freight/lenis'

export let lenis = new Lenis()

document.addEventListener("astro:before-preparation", (e) => {
  lenis.stop()
})

document.addEventListener("astro:page-load", (e) => {
  lenis.start()
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)