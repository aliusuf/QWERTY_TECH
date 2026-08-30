<template>
  <div ref="root" class="loader" :class="{ 'is-ready': ready, 'is-gone': gone }">
    <!-- loading: a knob travels the track while the percentage counts up -->
    <div class="loader__row loader__row--load">
      <span class="loader__word">Loading</span>
      <span class="loader__track">
        <i class="loader__knob" :style="{ left: `calc(${pct}% - ${pct * 0.84}px)` }" />
      </span>
      <span class="loader__pct">{{ pct }}<em>%</em></span>
    </div>

    <!-- ready: the knob has become the START control -->
    <div class="loader__row loader__row--go">
      <span class="loader__word">Immerse</span>
      <button class="loader__start" @click="enter">
        <span class="loader__bracket">[</span>
        <span class="loader__disc">start</span>
        <span class="loader__bracket">]</span>
      </button>
      <span class="loader__word">me in</span>
      <span class="loader__arrow">&rarr;</span>
    </div>

    <p class="loader__hint">To make this experience more<br />immersive we use sound effects</p>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const load = ref(0)
const ready = ref(false)
const gone = ref(false)
const pct = computed(() => Math.round(load.value * 100))
const { started } = useExperience()

onMounted(() => {
  // a client-side nav back to "/" keeps started=true in memory already;
  // a page reload resets it, so also check sessionStorage before deciding
  // this is genuinely the first visit this tab has seen
  skipIntroIfAlreadySeen()
  if (started.value) {
    gone.value = true
    return
  }

  document.body.classList.add('is-locked')

  // simulated boot: eases to 1 while fonts, model and canvas warm up
  gsap.to(load, {
    value: 1,
    duration: 2.6,
    ease: 'power2.inOut',
    onComplete: () => (ready.value = true)
  })
})

/** hands over to HeroGate — the page stays locked until the shell is broken */
function enter() {
  if (!ready.value) return
  gsap
    .timeline()
    .to(root.value, { opacity: 0, duration: 0.7, ease: 'power2.inOut' })
    .add(() => {
      gone.value = true
      started.value = true
    })
    .fromTo(
      stage.jelly,
      { alpha: 0, scale: 1.5 },
      { alpha: 1, scale: 0.95, duration: 1.8, ease: 'power3.out' },
      '<'
    )
}
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 110;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f6f6fb 0%, #dfe3f7 52%, #ccd6f4 100%);
}
.loader.is-gone { display: none; }

.loader__row {
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  gap: clamp(8px, 1.4vw, 22px);
  width: min(1380px, 92vw);
  font-family: var(--display);
  font-size: clamp(30px, 6.6vw, 92px);
  line-height: 1;
  text-transform: uppercase;
  transition: opacity 0.6s var(--ease);
}
.loader__row--load { justify-content: space-between; }
.loader__row--go {
  justify-content: center;
  opacity: 0;
  pointer-events: none;
}
.loader.is-ready .loader__row--load { opacity: 0; }
.loader.is-ready .loader__row--go { opacity: 1; pointer-events: auto; }

/* --- loading state --- */
.loader__track {
  position: relative;
  flex: 1;
  height: clamp(58px, 6vw, 84px);
}
.loader__knob {
  position: absolute;
  top: 50%;
  width: clamp(58px, 6vw, 84px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, #fff, rgba(255, 255, 255, 0.55) 70%);
  box-shadow: 0 10px 30px rgba(88, 96, 160, 0.28);
  transform: translateY(-50%);
  transition: left 0.25s linear;
}
.loader__pct em { font-style: normal; font-size: 0.5em; vertical-align: super; }

/* --- ready state --- */
.loader__start {
  position: relative;
  display: grid;
  place-items: center;
  padding: 0 clamp(6px, 1vw, 14px);
}
.loader__disc {
  width: clamp(64px, 6.6vw, 92px);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 38% 34%, #fff, rgba(255, 255, 255, 0.6) 72%);
  box-shadow: 0 10px 30px rgba(88, 96, 160, 0.26);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.45s var(--ease);
}
.loader__start:hover .loader__disc { transform: scale(1.08); }
.loader__bracket {
  position: absolute;
  font-family: var(--mono);
  font-size: 12px;
  opacity: 0.55;
}
.loader__bracket:first-child { left: -2px; }
.loader__bracket:last-child { right: -2px; }
.loader__arrow { font-family: var(--sans); font-weight: 700; }

.loader__hint {
  position: absolute;
  bottom: clamp(24px, 6vh, 60px);
  margin: 0;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.8;
  color: var(--ink-60);
}
</style>
