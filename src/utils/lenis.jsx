import Lenis from '@studio-freight/lenis'

export let lenis = new Lenis()

document.addEventListener("astro:before-preparation", (e) => {
  lenis.stop()
})

document.addEventListener("astro:page-load", (e) => {
  lenis.resize()
  lenis.start()
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

// lenis.on("scroll", (e) => {
//   console.log(lenis)
// })

requestAnimationFrame(raf)