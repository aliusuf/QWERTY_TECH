import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lenis = new Lenis({
    duration: reduced ? 0 : 1.45,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reduced,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.6
  })

  lenis.on('scroll', (e: any) => {
    ScrollTrigger.update()
    stage.scroll = e.scroll
    stage.velocity = e.velocity
  })

  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // pointer, shared by cursor + canvas layers
  window.addEventListener(
    'pointermove',
    (e) => {
      stage.pointer.x = e.clientX
      stage.pointer.y = e.clientY
      stage.pointer.nx = (e.clientX / window.innerWidth) * 2 - 1
      stage.pointer.ny = (e.clientY / window.innerHeight) * 2 - 1
    },
    { passive: true }
  )

  // Only the homepage intro holds scrolling; case galleries scroll on direct visits too.
  const route = useRoute()
  const { entered } = useExperience()
  watch([() => route.path, entered], ([path, hasEntered]) => {
    if (path === '/' && !hasEntered) {
      lenis.stop()
    } else {
      document.body.classList.remove('is-locked')
      lenis.start()
    }
  }, { immediate: true })

  return {
    provide: { lenis }
  }
})
