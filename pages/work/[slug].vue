<template>
  <div v-if="project" class="case" :style="{ '--accent': project.accent, '--accent-wash': accentWash }">
    <section class="case__hero" :aria-label="project.name">
    <!-- the project's own cover shot, tinted with its brand accent so the
         page still reads as one system rather than a bare photo -->
    <div class="case__bg" aria-hidden="true">
      <img class="case__cover" :src="project.cover" :alt="''" loading="eager" />
      <span class="case__scrim" />
      <span class="case__blob case__blob--a" />
      <span class="case__blob case__blob--b" />
    </div>

    <NuxtLink to="/#work" class="case__back">&larr; All work</NuxtLink>

    <div class="case__meta">
      <span class="tag">[ {{ project.client }} ]</span>
      <span class="tag">[ {{ project.date }} ]</span>
      <span class="tag">[ {{ project.timeline }} ]</span>
    </div>

    <div class="case__stage">
      <h1 ref="title" class="case__title display">{{ project.name }}</h1>
      <p ref="desc" class="case__desc">{{ project.summary }}</p>
    </div>

    <a class="case__cta" :href="project.liveUrl" target="_blank" rel="noopener noreferrer">
      <span class="case__cta-bracket">[</span>
      <span class="case__cta-disc">{{ project.liveLabel }}</span>
      <span class="case__cta-bracket">]</span>
    </a>

    <ul class="case__tags">
      <li v-for="t in project.tags" :key="t">{{ t }}</li>
    </ul>

    </section>

    <section class="case__gallery" aria-labelledby="gallery-title">
      <header class="case__gallery-head">
        <div>
          <span class="tag">[ A closer look ]</span>
          <h2 id="gallery-title" class="display">{{ project.name }} in detail</h2>
        </div>
        <img class="case__logo" :src="project.logo" :alt="`${project.name} logo`" loading="lazy" />
      </header>
      <div class="case__gallery-grid">
        <figure v-for="(src, i) in project.gallery" :key="src">
          <img :src="src" :alt="`${project.name} — project image ${i + 1}`" loading="lazy" decoding="async" />
          <figcaption class="tag">{{ project.name }} / 0{{ i + 1 }}</figcaption>
        </figure>
      </div>
    </section>

    <NuxtLink :to="`/work/${next.slug}`" class="case__next">
      <span class="case__next-label">Next work</span>
      <span class="case__next-name">{{ next.name }}</span>
      <span class="case__next-arrow">&rarr;</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const route = useRoute()
const projects = useProjects()
const project = computed(() => useProject(String(route.params.slug)))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found', fatal: false })
}

const next = computed(() => {
  const i = projects.findIndex((p) => p.slug === project.value!.slug)
  return projects[(i + 1) % projects.length]
})

/** a soft rgba wash of the project's accent for the photo scrim — computed
 *  here rather than with CSS color-mix(), which can drop an entire
 *  comma-separated background shorthand in browsers that don't support it */
const accentWash = computed(() => {
  const hex = project.value?.accent ?? '#888888'
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, 0.22)`
})

useHead(() => ({
  title: project.value ? `${project.value.name} — Qwerty Teck` : 'Qwerty Teck',
  meta: [{ name: 'description', content: project.value?.desc || '' }]
}))

const title = ref<HTMLElement | null>(null)
const desc = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!title.value || !desc.value) return
  const words = splitWords(desc.value)
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .from(title.value, { yPercent: 60, opacity: 0, duration: 1 })
    .to(words, { y: 0, duration: 0.9, stagger: 0.03 }, '-=0.6')
})
</script>

<style scoped>
.case {
  position: relative;
  z-index: 2;
}
.case__hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
}

.case__gallery {
  padding: clamp(48px, 8vw, 120px) clamp(20px, 6vw, 90px);
  background: var(--bg);
}
.case__gallery-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
}
.case__gallery-head h2 { font-size: clamp(30px, 4vw, 64px); line-height: 1.1; margin: 14px 0 0; }
.case__logo { width: clamp(100px, 18vw, 220px); height: 90px; object-fit: contain; background: #fff; padding: 16px; border-radius: 12px; }
.case__gallery-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(20px, 3vw, 48px); align-items: start; }
.case__gallery-grid figure { margin: 0; }
.case__gallery-grid figure:last-child { grid-column: 1 / -1; }
.case__gallery-grid img { width: 100%; height: auto; border-radius: 16px; }
.case__gallery-grid figcaption { padding-top: 14px; }

/* ---------------------------------------------------------------- backdrop */
.case__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: var(--bg);
}
.case__cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: saturate(1.05);
  transform: scale(1.04);
  animation: cover-drift 30s ease-in-out infinite;
}
@keyframes cover-drift {
  50% { transform: scale(1.09) translate(-1%, 1%); }
}

/* fades the photo out toward the edges so the glass HUD/type stays legible,
   and washes it faintly with the project's own accent */
.case__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(236, 234, 242, 0.15) 0%, rgba(236, 234, 242, 0.06) 30%, rgba(236, 234, 242, 0.55) 78%, rgba(236, 234, 242, 0.92) 100%),
    linear-gradient(90deg, rgba(236, 234, 242, 0.5) 0%, rgba(236, 234, 242, 0) 22%, rgba(236, 234, 242, 0) 78%, rgba(236, 234, 242, 0.5) 100%),
    radial-gradient(120% 90% at 50% 8%, var(--accent-wash), transparent 60%);
}

.case__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.28;
  mix-blend-mode: soft-light;
  background: radial-gradient(circle, var(--accent), transparent 70%);
}
.case__blob--a {
  width: 46vw;
  aspect-ratio: 1;
  top: -16%;
  right: -8%;
  animation: drift-a 22s ease-in-out infinite;
}
.case__blob--b {
  width: 34vw;
  aspect-ratio: 1;
  bottom: -14%;
  left: -6%;
  opacity: 0.22;
  animation: drift-b 26s ease-in-out infinite;
}
@keyframes drift-a {
  50% { transform: translate(-4%, 6%) scale(1.08); }
}
@keyframes drift-b {
  50% { transform: translate(6%, -5%) scale(1.1); }
}

/* ---------------------------------------------------------------- chrome */
.case__back {
  position: absolute;
  top: clamp(90px, 12vh, 140px);
  left: clamp(20px, 6vw, 90px);
  z-index: 2;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-60);
  transition: color 0.3s;
}
.case__back:hover { color: var(--ink); }

.case__meta {
  position: absolute;
  top: clamp(90px, 12vh, 140px);
  right: clamp(20px, 6vw, 90px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
}

/* ---------------------------------------------------------------- title */
.case__stage {
  position: absolute;
  left: clamp(20px, 6vw, 90px);
  right: clamp(20px, 6vw, 90px);
  bottom: clamp(30px, 6vh, 64px);
  z-index: 2;
  display: grid;
  gap: clamp(14px, 2.4vh, 26px);
  max-width: 1100px;
}
.case__title {
  margin: 0;
  font-size: clamp(48px, 9.5vw, 150px);
  line-height: 0.88;
  text-transform: uppercase;
  color: var(--ink);
}
.case__desc {
  margin: 0;
  max-width: 56ch;
  font-family: var(--sans);
  font-size: clamp(13px, 1.35vw, 19px);
  line-height: 1.6;
  font-weight: 600;
  color: rgba(11, 11, 14, 0.78);
}
/* ---------------------------------------------------------------- CTA */
.case__cta {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
}
.case__cta-disc {
  width: clamp(96px, 9vw, 128px);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(6px);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.7),
    0 20px 50px -20px rgba(20, 16, 40, 0.5);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  transition: transform 0.5s var(--ease), background 0.4s;
}
.case__cta:hover .case__cta-disc {
  transform: scale(1.08);
  background: var(--ink);
  color: var(--bg);
}
.case__cta-bracket {
  position: absolute;
  font-family: var(--mono);
  font-size: 13px;
  opacity: 0.5;
  color: var(--ink);
}
.case__cta-bracket:first-child { left: calc(50% - clamp(70px, 6.4vw, 90px)); }
.case__cta-bracket:last-child { right: calc(50% - clamp(70px, 6.4vw, 90px)); }

/* ---------------------------------------------------------------- tags */
.case__tags {
  position: absolute;
  right: clamp(20px, 6vw, 90px);
  bottom: clamp(96px, 14vh, 150px);
  z-index: 2;
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, auto));
  gap: 10px;
}
.case__tags li {
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  box-shadow: inset 0 0 0 1px rgba(11, 11, 14, 0.12);
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  text-align: center;
}

/* ---------------------------------------------------------------- next */
.case__next {
  position: relative;
  padding: 30px clamp(20px, 6vw, 90px) 100px;
  background: var(--bg);
  z-index: 2;
  display: grid;
  justify-items: end;
  gap: 2px;
  text-align: right;
}
.case__next-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-60);
}
.case__next-name {
  font-family: var(--display);
  font-size: clamp(16px, 2vw, 24px);
  text-transform: uppercase;
  line-height: 1.1;
}
.case__next-arrow {
  margin-top: 4px;
  font-size: 18px;
  transition: transform 0.4s var(--ease);
}
.case__next:hover .case__next-arrow { transform: translateX(6px); }

@media (max-width: 900px) {
  .case__hero { display: flex; flex-direction: column; gap: 24px; padding: calc(84px + var(--safe-top)) max(20px, var(--safe-right)) 64px max(20px, var(--safe-left)); }
  .case__back, .case__meta, .case__stage, .case__cta, .case__tags {
    position: relative; inset: auto;
  }
  .case__back { align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-size: 11px; }
  .case__meta { align-items: flex-start; text-align: left; }
  .case__stage { margin-top: auto; }
  .case__title { font-size: clamp(36px, 11vw, 80px); line-height: 1; overflow-wrap: anywhere; }
  .case__cta { align-self: center; transform: none; }
  .case__cta-disc { width: 84px; font-size: 8px; }
  .case__tags { align-self: flex-start; display: flex; flex-wrap: wrap; }
  .case__tags li { white-space: normal; }
  .case__next { justify-items: start; text-align: left; }
  .case__desc { font-size: 15px; line-height: 1.7; }
  .case__scrim { background: linear-gradient(180deg, rgba(236, 234, 242, 0.5), rgba(236, 234, 242, 0.88) 45%, var(--bg)); }
  .case__gallery-head { align-items: flex-start; flex-direction: column; }
  .case__gallery-grid { grid-template-columns: 1fr; }
  .case__gallery { padding: 40px max(20px, var(--safe-right)) 48px max(20px, var(--safe-left)); }
  .case__gallery-head h2 { overflow-wrap: anywhere; }
  .case__next { padding-bottom: calc(110px + var(--safe-bottom)); min-height: 44px; }
}
</style>
