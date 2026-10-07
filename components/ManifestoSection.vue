<template>
  <section id="about" ref="root" class="mani">
    <div class="mani__pin">
      <span class="tag mani__kicker">[ Qwerty Agency / Labs division ]</span>
      <h2 ref="head" class="mani__head">
        Each project at Qwerty Teck serves as a testament to our commitment to innovation and
        excellence
      </h2>
      <ul class="mani__meta">
        <li v-for="m in meta" :key="m" class="tag">{{ m }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const head = ref<HTMLElement | null>(null)
const meta = ['[ est. 2014 ]', '[ 86 awards ]', '[ 12 countries ]', '[ 40 makers ]']

onMounted(() => {
  const words = splitWords(head.value!)

  gsap.timeline({
    scrollTrigger: { trigger: root.value, start: 'top 78%', end: 'top 18%', scrub: 0.5 }
  }).to(words, { y: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' })

  gsap.from('.mani__meta li', {
    scrollTrigger: { trigger: '.mani__meta', start: 'top 88%' },
    y: 18,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power3.out'
  })

  // jelly swims right and grows while the statement is on screen
  gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
  })
    .to(stage.jelly, { x: 0.18, y: -0.1, scale: 1.15, spin: 0.35 }, 0)
    .to(stage.jelly, { x: 0.26, y: 0.02, scale: 1.28, spin: 0.75 }, 0.55)
})
</script>

<style scoped>
.mani {
  position: relative;
  min-height: 170svh;
  padding: 0 clamp(20px, 6vw, 90px);
}
.mani__pin {
  position: sticky;
  top: 0;
  min-height: 100svh;
  display: grid;
  align-content: center;
  gap: clamp(18px, 3vw, 40px);
  max-width: 1500px;
  margin: 0 auto;
}
.mani__kicker { display: block; }
.mani__head {
  margin: 0;
  max-width: 15ch;
  font-size: clamp(26px, 3.9vw, 62px);
  line-height: 1.02;
  letter-spacing: -0.015em;
  text-transform: uppercase;
  font-weight: 700;
  mix-blend-mode: multiply;
}
.mani__meta {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(12px, 2vw, 34px);
  list-style: none;
  margin: 0;
  padding: 0;
}
@media (max-width: 760px) {
  .mani { min-height: 130svh; }
  .mani__pin { padding: calc(90px + var(--safe-top)) 0 calc(90px + var(--safe-bottom)); }
  .mani__head { max-width: 17ch; font-size: clamp(26px, 6.8vw, 42px); line-height: 1.12; }
  .mani__meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
}
@media (max-height: 500px) and (orientation: landscape) {
  .mani__pin { position: relative; padding: 90px 0; }
}
</style>
