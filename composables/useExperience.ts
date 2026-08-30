const INTRO_KEY = 'qwerty:intro-seen'

/**
 * Global experience state (intro gate + audio) and the mutable "stage" object
 * the canvas layers read every frame. The stage is deliberately NOT reactive:
 * it is written from GSAP/rAF at 60fps and only ever read inside draw loops.
 */
export const useExperience = () => {
  /** the loader is done and the hero is on screen */
  const started = useState('exp:started', () => false)
  /** the sphere has been shattered and the page is scrollable */
  const entered = useState('exp:entered', () => false)
  const soundOn = useState('exp:sound', () => false)
  const progress = useState('exp:progress', () => 0)
  return { started, entered, soundOn, progress }
}

/**
 * A page reload resets the state above to false in memory — correct for SSR
 * (starting `true` there would render mismatched HTML and trip a hydration
 * warning) — but the browser keeps your scroll position regardless, so
 * refreshing mid-scroll replayed the whole hold-to-enter ritual on top of
 * the page you were already reading. Call this from a mounted hook (after
 * hydration, never during setup) to skip the replay once it's been cleared
 * before in this tab. Setting `entered` is enough: HeroGate's `v-if` reacts
 * to it immediately regardless of which component's onMounted runs first.
 */
export function skipIntroIfAlreadySeen() {
  const { started, entered } = useExperience()
  if (sessionStorage.getItem(INTRO_KEY) === '1') {
    started.value = true
    entered.value = true
    // TheLoader's `enter()` and HeroGate's `open()` normally drive these —
    // skipping both gates means nobody ever does, so the octopus and its
    // shell would stay at their initial (invisible) values forever. Jump
    // straight to the state those two timelines end on.
    stage.jelly.alpha = 1
    stage.jelly.inner = 1
    stage.shatter = 1
    // HeroGate's `open()` is also the only place that restarts Lenis (the
    // plugin calls `lenis.stop()` on init and leaves the page still until
    // then) — skip it and the page is stuck unscrollable forever.
    const { $lenis } = useNuxtApp() as any
    $lenis?.start()
  }
  watch(entered, (v) => {
    if (v) sessionStorage.setItem(INTRO_KEY, '1')
  })
}

export interface StageLayer {
  x: number
  y: number
  scale: number
  alpha: number
  spin: number
  /** extra multiplier applied inside the group — the jellyfish shrinks into
   *  the glass shell for the intro gate without shrinking the shell itself */
  inner: number
}

export const stage: {
  jelly: StageLayer
  orbs: StageLayer
  pointer: { x: number; y: number; nx: number; ny: number }
  scroll: number
  velocity: number
  /** 0 = sphere intact around the jellyfish, 1 = fully blown apart */
  shatter: number
} = {
  jelly: { x: 0, y: 0, scale: 1, alpha: 0, spin: 0, inner: 0.42 },
  orbs: { x: 0, y: 0, scale: 1, alpha: 0, spin: 0, inner: 1 },
  pointer: { x: 0.5, y: 0.5, nx: 0, ny: 0 },
  scroll: 0,
  velocity: 0,
  shatter: 0
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
