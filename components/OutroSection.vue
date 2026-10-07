<template>
  <section id="contact" ref="root" class="outro" :class="{ 'is-open': open }">
    <h2 ref="title" class="outro__title display">
      <span class="ln"><em v-for="(l, i) in 'QWERTY'" :key="'x' + i">{{ l }}</em></span>
      <span class="ln"><em v-for="(l, i) in 'TECK'" :key="'y' + i">{{ l }}</em></span>
    </h2>

    <div class="outro__hold">
      <span class="tag outro__q">Got something worth building?</span>
      <HoldButton :duration="1600" @complete="open = true" @progress="onProgress">
        Press<br />and hold
      </HoldButton>
      <span class="tag outro__q outro__q--r">Hold to open</span>
    </div>

    <div class="outro__bar"><i :style="{ transform: `scaleX(${hold})` }" /></div>

    <div class="outro__reveal">
      <a class="outro__mail" href="mailto:hello@qwertyteck.com">hello@qwertyteck.com</a>
      <div class="outro__socials">
        <a v-for="s in socials" :key="s" href="#" @click.prevent>[ {{ s }} ]</a>
      </div>
      <p class="tag outro__note">© 2026 Qwerty Teck — built with curiosity</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const open = ref(false)
const hold = ref(0)
const socials = ['Instagram', 'Dribbble', 'LinkedIn', 'Awwwards']
const { blip } = useAmbience()

const onProgress = (v: number) => {
  hold.value = v
  // the wordmark shatters apart as the hold builds
  const letters = title.value?.querySelectorAll('em')
  if (!letters) return
  letters.forEach((el, i) => {
    const dir = i % 2 ? 1 : -1
    gsap.set(el, {
      x: dir * v * (12 + i * 7),
      y: (i % 3 === 0 ? -1 : 1) * v * 26,
      rotate: dir * v * 9,
      opacity: 1 - v * 0.35
    })
  })
}

watch(open, (v) => {
  if (!v) return
  blip(1180, 0.25)
  gsap.to(title.value!.querySelectorAll('em'), {
    y: -160,
    opacity: 0,
    duration: 1,
    stagger: { each: 0.04, from: 'center' },
    ease: 'power3.in'
  })
})

onMounted(() => {
  // jellyfish drifts back in behind the wordmark for the finale
  gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: { trigger: root.value, start: 'top 90%', end: 'top 10%', scrub: 0.8 }
  })
    .to(stage.orbs, { alpha: 0, scale: 1.7, y: -0.5 }, 0)
    .fromTo(stage.jelly, { alpha: 0, scale: 1.5, y: 0.4 }, { alpha: 0.92, scale: 1.05, y: 0.1, x: 0, spin: 0 }, 0)

  gsap.from(title.value!.querySelectorAll('em'), {
    scrollTrigger: { trigger: root.value, start: 'top 70%' },
    yPercent: 110,
    opacity: 0,
    duration: 1.3,
    stagger: 0.05,
    ease: 'expo.out'
  })
})
</script>

<style scoped>
.outro {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-content: center;
  justify-items: center;
  padding: 14vh clamp(20px, 6vw, 90px) 16vh;
  overflow: hidden;
}

.outro__title {
  margin: 0;
  display: grid;
  justify-items: center;
  font-size: clamp(58px, 14vw, 236px);
  line-height: 0.86;
  mix-blend-mode: multiply;
}
.outro__title .ln { display: flex; overflow: visible; }
.outro__title em { font-style: normal; display: inline-block; will-change: transform; }
@media (min-width: 900px) {
  .outro__title { grid-auto-flow: column; gap: 0.2em; }
}

.outro__hold {
  position: relative;
  z-index: 4;
  margin-top: clamp(26px, 5vh, 60px);
  display: flex;
  align-items: center;
  gap: clamp(14px, 4vw, 60px);
}
.outro__q { max-width: 22ch; }
.outro__q--r { text-align: right; }

.outro__bar {
  position: absolute;
  left: clamp(20px, 6vw, 90px);
  right: clamp(20px, 6vw, 90px);
  bottom: clamp(46px, 8vh, 90px);
  height: 2px;
  background: var(--ink-12);
}
.outro__bar i {
  display: block;
  height: 100%;
  background: var(--ink);
  transform-origin: left;
  transform: scaleX(0);
}

.outro__reveal {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: clamp(16px, 3vh, 34px);
  background: var(--bg);
  opacity: 0;
  pointer-events: none;
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 1.1s var(--ease), opacity 0.5s var(--ease);
}
.outro.is-open .outro__reveal {
  opacity: 1;
  pointer-events: auto;
  clip-path: circle(140% at 50% 50%);
}

.outro__mail {
  font-family: var(--display);
  font-size: clamp(26px, 6.2vw, 104px);
  text-transform: uppercase;
  line-height: 1;
  position: relative;
}
.outro__mail::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0.06em;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s var(--ease);
}
.outro__mail:hover::after { transform: scaleX(1); transform-origin: left; }

.outro__socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(10px, 2vw, 30px);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.outro__socials a { transition: opacity 0.3s; }
.outro__socials a:hover { opacity: 0.45; }
.outro__note { opacity: 0.6; }
@media (max-width: 760px) {
  .outro { min-height: max(600px, 100svh); padding: 100px 20px calc(110px + var(--safe-bottom)); }
  .outro__title { font-size: clamp(76px, 23vw, 160px); }
  .outro__hold { flex-direction: column; gap: 16px; margin-top: 36px; text-align: center; }
  .outro__q { max-width: none; }
  .outro__q--r { text-align: center; }
  .outro__bar { bottom: calc(88px + var(--safe-bottom)); }
  .outro__reveal { padding: 90px 20px calc(100px + var(--safe-bottom)); text-align: center; }
  .outro__mail { max-width: 100%; font-size: clamp(22px, 6.7vw, 48px); overflow-wrap: anywhere; }
  .outro__socials { gap: 4px 16px; }
  .outro__socials a { display: inline-flex; align-items: center; min-height: 44px; }
  .outro__note { line-height: 1.8; }
}
</style>
