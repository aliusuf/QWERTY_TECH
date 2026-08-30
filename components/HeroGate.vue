<template>
  <div v-if="!entered" class="gate" :class="{ 'is-open': opening }">
    <HoldButton class="gate__btn" :duration="1900" @progress="onProgress" @complete="open">
      Click<br />and hold
    </HoldButton>

    <div class="gate__bar">
      <span class="gate__q">Are you ready to step into the future?</span>
      <span class="gate__q gate__q--r">Click and hold</span>
      <i class="gate__track"><b :style="{ transform: `scaleX(${p})` }" /></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

/**
 * Second gate of the intro: the jellyfish sits inside a faceted glass shell
 * over the wordmark. Holding cracks the shell open — releasing early lets it
 * pull itself back together — and completing it unlocks the page.
 */
const { entered } = useExperience()
const { $lenis } = useNuxtApp() as any
const { blip } = useAmbience()

const p = ref(0)
const opening = ref(false)

const onProgress = (v: number) => {
  p.value = v
  if (opening.value) return
  // the shell answers the hold directly, so releasing rewinds it
  stage.shatter = v * 0.55
  stage.jelly.inner = 0.42 + v * 0.12
}

function open() {
  opening.value = true
  blip(920, 0.3)

  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .to(stage, { shatter: 1, duration: 1.9, ease: 'power2.out' }, 0)
    .to(stage.jelly, { inner: 1, scale: 1.42, y: -0.12, duration: 2.1 }, 0)
    .add(() => {
      entered.value = true
      document.body.classList.remove('is-locked')
      $lenis?.start()
    }, 0.35)
}
</script>

<style scoped>
.gate {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  pointer-events: none;
  transition: opacity 0.8s var(--ease);
}
.gate.is-open {
  opacity: 0;
}

.gate__btn {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 50%;
  backdrop-filter: blur(3px);
}

.gate__bar {
  position: absolute;
  left: clamp(20px, 6vw, 90px);
  right: clamp(20px, 6vw, 90px);
  bottom: clamp(40px, 7vh, 78px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}
.gate__q {
  font-family: var(--display);
  font-size: clamp(13px, 1.5vw, 22px);
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 1;
}
.gate__q--r {
  text-align: right;
}
.gate__track {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -14px;
  height: 2px;
  background: rgba(11, 11, 14, 0.16);
  border-radius: 2px;
  overflow: hidden;
}
.gate__track b {
  display: block;
  height: 100%;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
}

@media (max-width: 640px) {
  .gate__q { font-size: 12px; max-width: 46%; line-height: 1.15; }
}
</style>
