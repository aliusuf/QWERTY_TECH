<template>
  <section id="work" ref="root" class="work">
    <header class="work__head">
      <span class="tag">[ selected work ]</span>
      <span class="tag work__count">{{ counter }} / 0{{ PROJECTS.length }}</span>
    </header>

    <article
      v-for="(p, i) in PROJECTS"
      :key="p.name"
      class="drum"
      :ref="(el) => setDrum(el as HTMLElement, i)"
      @pointermove="track"
      @pointerleave="untrack"
    >
      <NuxtLink class="drum__preview" :to="`/work/${p.slug}`" :aria-label="`View ${p.name} case study`">
        <img class="drum__cover" :src="p.cover" :alt="`${p.name} project preview`" loading="lazy" decoding="async" width="1600" height="1000" />
        <span class="drum__brand">
          <img :src="p.logo" alt="" loading="lazy" decoding="async" />
        </span>
      </NuxtLink>
      <!-- the glass tube itself: static, so its highlights never rotate -->
      <div class="drum__tube">
        <div class="drum__type">
          <div class="drum__cyl">
            <div v-for="f in FACES" :key="f" class="face" :style="faceTf(f)">
              <span class="face__txt">
                <b v-for="n in 2" :key="n">{{ p.name }}<i>/</i></b>
              </span>
            </div>
          </div>
        </div>

        <span class="drum__sheen" />
        <span class="drum__bed" />

        <div class="drum__meta">
          <ul class="drum__tags">
            <li v-for="t in p.tags" :key="t">{{ t }}</li>
          </ul>
          <p class="drum__desc">{{ p.desc }}</p>
        </div>

        <NuxtLink class="drum__cta" :to="`/work/${p.slug}`">
          <span>view<br />case</span>
        </NuxtLink>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const drums: HTMLElement[] = []
const setDrum = (el: HTMLElement | null, i: number) => {
  if (el) drums[i] = el
}

const FACES = 14
const STEP = 360 / FACES
const counter = ref('01')

const PROJECTS = useProjects()

const faceTf = (f: number) => ({
  transform: `rotateX(${(f - 1) * STEP}deg) translateZ(var(--r))`
})

/** the CTA drifts toward the cursor while it is over a band */
const track = (e: PointerEvent) => {
  const el = e.currentTarget as HTMLElement
  const box = el.getBoundingClientRect()
  el.style.setProperty('--cx', ((e.clientX - box.left) / box.width - 0.5).toFixed(3))
}
const untrack = (e: PointerEvent) => (e.currentTarget as HTMLElement).style.setProperty('--cx', '0')

let raf = 0

onMounted(() => {
  const sizeDrums = () => {
    for (const d of drums) {
      if (!d) continue
      // measure a real face — --fh is a clamp() and never resolves via getPropertyValue
      const face = d.querySelector('.face') as HTMLElement | null
      const fh = face?.getBoundingClientRect().height || 96
      // radius that makes N flat faces meet edge-to-edge
      d.style.setProperty('--r', (fh / (2 * Math.tan(Math.PI / FACES))).toFixed(2) + 'px')
    }
  }
  sizeDrums()
  window.addEventListener('resize', sizeDrums)

  drums.forEach((d, i) => {
    const cyl = d.querySelector('.drum__cyl') as HTMLElement

    // the drum rolls as the band crosses the viewport
    gsap.fromTo(
      cyl,
      { rotateX: -46 },
      {
        rotateX: 46,
        ease: 'none',
        scrollTrigger: {
          trigger: d,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
          onEnter: () => (counter.value = String(i + 1).padStart(2, '0')),
          onEnterBack: () => (counter.value = String(i + 1).padStart(2, '0'))
        }
      }
    )

    // the tube grows into place rather than popping in
    gsap.from(d, {
      scrollTrigger: { trigger: d, start: 'top 88%' },
      scaleX: 0.86,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out'
    })

    gsap.from([d.querySelector('.drum__meta'), d.querySelector('.drum__cta')], {
      scrollTrigger: { trigger: d, start: 'top 78%' },
      y: 20,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    })
  })

  // the type never stops travelling; scrolling shoves it along
  const marquee = drums.map((_, i) => ({ x: i % 2 ? 240 : -240, dir: i % 2 ? -1 : 1 }))
  let last = performance.now()
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop)
    const dt = Math.min(64, t - last) / 1000
    last = t
    drums.forEach((d, i) => {
      if (!d) return
      const m = marquee[i]
      m.x -= m.dir * (26 * dt + stage.velocity * 0.06)
      // wrap on the repeat width so the loop is seamless
      const span = d.querySelector('.face__txt b')?.getBoundingClientRect().width || 600
      if (m.x < -span) m.x += span
      if (m.x > span) m.x -= span
      d.style.setProperty('--mx', m.x.toFixed(1) + 'px')
    })
  }
  raf = requestAnimationFrame(loop)

  // jellyfish recedes behind the work reel — it fills a phone screen at the
  // desktop size, so it sits smaller and fainter there
  const narrow = window.innerWidth < 760
  gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: { trigger: root.value, start: 'top 80%', end: 'top 20%', scrub: 0.8 }
  }).to(stage.jelly, {
    alpha: narrow ? 0.16 : 0.3,
    scale: narrow ? 0.95 : 1.5,
    y: 0.3,
    x: -0.04,
    spin: 1.1
  })
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.work {
  position: relative;
  z-index: 3;
  padding: 14vh clamp(20px, 6vw, 90px) 18vh;
  display: grid;
  gap: clamp(52px, 10vh, 130px);
}

.work__head {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--ink-12);
  padding-top: 12px;
  margin-bottom: clamp(10px, 3vh, 40px);
}
.work__count { font-variant-numeric: tabular-nums; }

.drum {
  --fh: clamp(52px, 5.6vw, 92px);
  --cx: 0;
  position: relative;
}

.drum__preview {
  position: relative;
  display: block;
  overflow: hidden;
  margin-bottom: 24px;
  border-radius: clamp(18px, 3vw, 40px);
  background: var(--bg-deep);
}
.drum__cover {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}
.drum__preview:hover .drum__cover { transform: scale(1.025); }
.drum__preview:focus-visible { outline: 3px solid var(--ink); outline-offset: 5px; }
.drum__brand {
  position: absolute;
  left: clamp(14px, 3vw, 40px);
  bottom: clamp(14px, 3vw, 40px);
  width: clamp(110px, 17vw, 220px);
  height: clamp(48px, 6vw, 80px);
  display: grid;
  place-items: center;
  padding: 12px 18px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(11, 11, 14, 0.1);
}
.drum__brand img { width: 100%; height: 100%; min-height: 0; object-fit: contain; }

/* a single piece of glass; the type turns inside it */
.drum__tube {
  position: relative;
  height: calc(var(--fh) * 2);
  border-radius: 999px;
  overflow: hidden;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(244, 243, 250, 0.7) 34%,
      rgba(228, 226, 241, 0.52) 52%,
      rgba(250, 249, 253, 0.78) 74%,
      rgba(255, 255, 255, 0.92) 100%
    ),
    radial-gradient(130% 90% at 18% 0%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 62%);
  backdrop-filter: blur(7px) saturate(1.15);
  box-shadow:
    0 34px 60px -38px rgba(64, 52, 104, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -14px 26px rgba(126, 116, 168, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.55);
  transition: box-shadow 0.6s var(--ease);
}
.drum:hover .drum__tube {
  box-shadow:
    0 40px 70px -36px rgba(64, 52, 104, 0.68),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -14px 26px rgba(126, 116, 168, 0.16),
    inset 0 0 0 1px rgba(255, 255, 255, 0.75);
}

/* specular streak along the upper third, like light on a cylinder */
.drum__sheen {
  position: absolute;
  left: 4%;
  right: 4%;
  top: 12%;
  height: 22%;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0));
  filter: blur(6px);
  opacity: 0.75;
  pointer-events: none;
}

/* the rotating type, masked so it dissolves at the curve of the tube */
.drum__type {
  position: absolute;
  inset: 0;
  perspective: 900px;
  perspective-origin: 50% 50%;
  -webkit-mask-image: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 30%,
    #000 70%,
    rgba(0, 0, 0, 0.35) 88%,
    transparent 100%
  );
  mask-image: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 30%,
    #000 70%,
    rgba(0, 0, 0, 0.35) 88%,
    transparent 100%
  );
}

.drum__cyl {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

.face {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: var(--fh);
  margin-top: calc(var(--fh) / -2);
  display: grid;
  align-items: center;
  backface-visibility: hidden;
}

.face__txt {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: var(--display);
  font-size: calc(var(--fh) * 0.72);
  line-height: 1;
  text-transform: uppercase;
  color: rgba(11, 11, 14, 0.92);
  transform: translateX(var(--mx, 0px));
  will-change: transform;
}
.face__txt b { font-weight: 400; display: inline-flex; align-items: center; }
.face__txt i {
  font-style: normal;
  padding: 0 0.34em;
  opacity: 0.22;
}

/* light pools on the left of the tube so the copy always has a clean bed */
.drum__bed {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 68%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.72) 44%,
    rgba(255, 255, 255, 0.42) 74%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}

/* copy sits straight on the glass — a white halo keeps it legible */
.drum__meta {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(96px, auto) minmax(0, 1fr);
  align-items: center;
  gap: clamp(16px, 3.4vw, 52px);
  padding: 0 clamp(20px, 5vw, 78px);
  padding-right: 34%;
  pointer-events: none;
  font-family: var(--mono);
  font-size: clamp(8.5px, 0.7vw, 11px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow:
    0 0 7px #fff,
    0 0 14px #fff,
    0 0 22px rgba(255, 255, 255, 0.9);
}
.drum__tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
  color: var(--ink);
}
.drum__tags li::before {
  content: '• ';
  opacity: 0.45;
}
.drum__desc {
  margin: 0;
  max-width: 42ch;
  line-height: 1.75;
  color: rgba(11, 11, 14, 0.78);
}

.drum__cta {
  position: absolute;
  top: 50%;
  right: clamp(20px, 5vw, 78px);
  width: clamp(64px, 6.4vw, 92px);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  line-height: 1.6;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 0 0 0 1px rgba(11, 11, 14, 0.14),
    0 10px 24px -14px rgba(64, 52, 104, 0.6);
  backdrop-filter: blur(4px);
  /* drifts toward the pointer, then settles back */
  transform: translate(calc(var(--cx) * 26px), -50%);
  transition:
    transform 0.5s var(--ease),
    background 0.4s var(--ease),
    color 0.4s var(--ease);
}
.drum__cta:hover {
  background: var(--ink);
  color: var(--bg);
}

@media (max-width: 900px) {
  .drum__meta { grid-template-columns: 1fr; padding-right: 30%; }
  .drum__bed { width: 78%; }
  .drum__desc { display: none; }
  .drum__cta { width: 62px; }
}
@media (max-width: 560px) {
  .drum__tube { height: calc(var(--fh) * 2.2); }
  .drum__meta {
    padding: 0 18px;
    /* keep the tag column clear of the CTA disc */
    padding-right: 92px;
    font-size: 8px;
  }
  .drum__cta {
    width: 58px;
    right: 14px;
    font-size: 7px;
    letter-spacing: 0.12em;
  }
  .drum__bed { width: 88%; }
}
</style>
