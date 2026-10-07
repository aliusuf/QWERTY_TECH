<template>
  <section id="engage" ref="root" class="engage">
    <div class="engage__pin">
      <span class="engage__spark">✦</span>
      <p ref="copy" class="engage__copy">
        Engage with us at Qwerty Teck, where technology meets creativity, and every interaction is an
        opportunity for innovation
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const copy = ref<HTMLElement | null>(null)

onMounted(() => {
  const words = splitWords(copy.value!)

  gsap.to(words, {
    y: 0,
    duration: 0.95,
    stagger: 0.045,
    ease: 'expo.out',
    scrollTrigger: { trigger: root.value, start: 'top 55%' }
  })

  // hand the stage over: jellyfish out, sphere cluster in
  gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'top 20%', scrub: 0.7 }
  })
    .to(stage.jelly, { alpha: 0, scale: 2.1, y: 0.55 }, 0)
    .fromTo(stage.orbs, { alpha: 0, scale: 0.55, y: -0.1 }, { alpha: 1, scale: 1, y: -0.06 }, 0)

  gsap.to(stage.orbs, {
    immediateRender: false,
    spin: Math.PI * 0.9,
    y: -0.22,
    scale: 1.25,
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top 20%', end: 'bottom top', scrub: 0.9 }
  })
})
</script>

<style scoped>
.engage {
  position: relative;
  min-height: 190svh;
  padding: 0 clamp(20px, 6vw, 90px);
}
.engage__pin {
  position: sticky;
  top: 0;
  min-height: 100svh;
  display: grid;
  align-content: end;
  justify-items: center;
  gap: 10px;
  padding-bottom: clamp(70px, 14vh, 150px);
  text-align: center;
}
.engage__spark { font-size: 18px; }
.engage__copy {
  margin: 0;
  max-width: 62ch;
  font-size: clamp(12px, 1.15vw, 17px);
  line-height: 1.45;
  text-transform: uppercase;
  font-weight: 700;
}
@media (max-width: 760px) {
  .engage { min-height: 140svh; }
  .engage__pin { padding-bottom: calc(100px + var(--safe-bottom)); }
  .engage__copy { font-size: 14px; line-height: 1.6; }
}
</style>
