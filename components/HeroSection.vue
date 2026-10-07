<template>
  <section id="top" ref="root" class="hero">
    <div class="hero__cards" ref="cards">
      <span v-for="c in CARDS" :key="c.i" class="card" :style="cardStyle(c)">
        <i :style="{ background: c.g }" />
      </span>
    </div>

    <h1 ref="title" class="hero__title display">
      <span class="ln"><em v-for="(l, i) in 'QWERTY'" :key="'a' + i">{{ l }}</em></span>
      <span class="ln"><em v-for="(l, i) in 'TECK'" :key="'b' + i">{{ l }}</em></span>
    </h1>

    <div class="hero__foot">
      <span class="hero__bolt">⚡</span>
      <p ref="lede">
        Welcome to a creative space showcasing groundbreaking projects that blend creativity and
        technology. A Product of QWERTY TECK
      </p>
      <span class="hero__scroll mono">↓ scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const lede = ref<HTMLElement | null>(null)
const cards = ref<HTMLElement | null>(null)
const { started } = useExperience()

const GRADS = [
  'linear-gradient(140deg,#8fd0ff,#c9a7ff)',
  'linear-gradient(140deg,#ffb3e6,#ffd9a0)',
  'linear-gradient(140deg,#1d1d22,#6a6a80)',
  'linear-gradient(140deg,#a0ffe0,#7fb2ff)',
  'linear-gradient(140deg,#ff9ec4,#9a6cff)',
  'linear-gradient(140deg,#dfe3ff,#8d93c9)',
  'linear-gradient(140deg,#ffe9a0,#ff9ec4)',
  'linear-gradient(140deg,#0b0b0e,#3d3d55)'
]

const CARDS = [
  { i: 0, x: 8, y: 12, r: -14, s: 0.9, d: 0.7 },
  { i: 1, x: 41, y: 4, r: 9, s: 0.75, d: 1.1 },
  { i: 2, x: 78, y: 15, r: 16, s: 1.05, d: 0.5 },
  { i: 3, x: 90, y: 62, r: -8, s: 0.85, d: 0.9 },
  { i: 4, x: 70, y: 82, r: 12, s: 0.7, d: 1.3 },
  { i: 5, x: 26, y: 86, r: -18, s: 0.95, d: 0.6 },
  { i: 6, x: 3, y: 66, r: 7, s: 0.8, d: 1.15 },
  { i: 7, x: 55, y: 70, r: -5, s: 0.6, d: 1.4 }
].map((c) => ({ ...c, g: GRADS[c.i] }))

const cardStyle = (c: (typeof CARDS)[number]) => ({
  left: c.x + '%',
  top: c.y + '%',
  '--r': c.r + 'deg',
  '--s': String(c.s),
  '--d': String(c.d)
})

let raf = 0

onMounted(() => {
  const letters = title.value!.querySelectorAll('em')
  const words = splitWords(lede.value!)

  gsap.set(letters, { yPercent: 120, rotate: 8, opacity: 0 })
  gsap.set(cards.value!.children, { opacity: 0, scale: 0.6 })

  // intro, gated on the loader
  const intro = () => {
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .to(letters, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.5, stagger: 0.055 })
      .to(words, { y: 0, duration: 1.1, stagger: 0.035 }, '-=1.1')
      .to(cards.value!.children, { opacity: 1, scale: 1, duration: 1.4, stagger: 0.06 }, '-=1.3')
  }
  if (started.value) intro()
  else watch(started, (v) => v && intro(), { once: true })

  // opening pose: the animal is small inside the glass shell until HeroGate
  // breaks it, so only x/spin are pinned here
  gsap.set(stage.jelly, { x: 0, spin: 0 })

  // scroll choreography for this section
  const st = gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6 }
  })
  st.to(letters, { yPercent: -70, opacity: 0, stagger: { each: 0.02, from: 'center' } }, 0)
    .to(cards.value!.children, { yPercent: -160, opacity: 0, stagger: 0.02 }, 0)
    .to('.hero__foot', { opacity: 0, y: -40 }, 0)
    .to(stage.jelly, { y: -0.16, scale: 1.55 }, 0)

  // idle drift + pointer parallax on the floating cards
  const kids = Array.from(cards.value!.children) as HTMLElement[]
  const loop = (ms: number) => {
    raf = requestAnimationFrame(loop)
    const t = ms / 1000
    kids.forEach((el, i) => {
      const d = parseFloat(el.style.getPropertyValue('--d')) || 1
      const fx = stage.pointer.nx * 26 * d
      const fy = stage.pointer.ny * 20 * d
      el.style.setProperty('--fx', (fx + Math.sin(t * 0.6 + i) * 10).toFixed(2) + 'px')
      el.style.setProperty('--fy', (fy + Math.cos(t * 0.5 + i * 1.7) * 12).toFixed(2) + 'px')
    })
  }
  raf = requestAnimationFrame(loop)
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-content: center;
  justify-items: center;
  padding: 12vh clamp(20px, 6vw, 90px) 12vh;
}

.hero__title {
  position: relative;
  z-index: 3;
  margin: 0;
  display: grid;
  justify-items: center;
  font-size: clamp(64px, 15.5vw, 260px);
  line-height: 0.84;
  /* glass letterforms: a translucent sheen instead of solid ink, so the
     octopus swimming behind shows straight through the type */
  color: transparent;
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.82) 0%,
    rgba(255, 255, 255, 0.22) 22%,
    rgba(255, 255, 255, 0.04) 45%,
    rgba(255, 255, 255, 0.02) 62%,
    rgba(255, 255, 255, 0.32) 82%,
    rgba(255, 255, 255, 0.7) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1.5px rgba(11, 11, 14, 0.5);
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.4));
}
.hero__title .ln {
  display: flex;
  overflow: hidden;
  padding: 0 0.02em;
}
.hero__title em {
  font-style: normal;
  display: inline-block;
  will-change: transform;
}

/* NOOMO / LABS sit on one line on wide screens, like the reference */
@media (min-width: 900px) {
  .hero__title { grid-auto-flow: column; gap: 0.22em; }
}

.hero__cards {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
.card {
  position: absolute;
  width: clamp(52px, 5.6vw, 96px);
  transform: translate(-50%, -50%) translate(var(--fx, 0), var(--fy, 0)) rotate(var(--r))
    scale(var(--s));
  padding: 5px 5px 16px;
  background: #fff;
  box-shadow: 0 14px 34px rgba(40, 30, 70, 0.16);
  will-change: transform;
}
.card i {
  display: block;
  aspect-ratio: 1.25;
  filter: saturate(1.1);
}

.hero__foot {
  position: absolute;
  bottom: clamp(56px, 9vh, 96px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: grid;
  justify-items: center;
  gap: 8px;
  width: min(560px, 84vw);
  text-align: center;
}
.hero__bolt { font-size: 15px; }
.hero__foot p {
  margin: 0;
  font-size: clamp(11px, 1.05vw, 15px);
  line-height: 1.45;
  letter-spacing: 0.005em;
  text-transform: uppercase;
  font-weight: 700;
}
.hero__scroll { opacity: 0.5; margin-top: 4px; }

@media (max-width: 640px) {
  .card:nth-child(4),
  .card:nth-child(5),
  .card:nth-child(8) { display: none; }
}
@media (max-width: 760px) {
  .hero { padding: calc(90px + var(--safe-top)) 20px calc(180px + var(--safe-bottom)); min-height: max(620px, 100svh); }
  .hero__title { font-size: clamp(76px, 24vw, 160px); }
  .hero__foot { bottom: calc(90px + var(--safe-bottom)); width: calc(100% - 48px); max-width: 480px; }
  .hero__foot p { font-size: 13px; line-height: 1.6; }
}
@media (max-height: 500px) and (orientation: landscape) {
  .hero { min-height: 620px; }
  .hero__title { font-size: clamp(76px, 12vw, 110px); }
}
</style>
