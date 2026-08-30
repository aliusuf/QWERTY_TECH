<template>
  <div v-if="project" class="case" :style="{ '--accent': project.accent, '--accent-wash': accentWash }">
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
  min-height: 100svh;
  overflow: hidden;
}

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
  position: absolute;
  right: clamp(20px, 6vw, 90px);
  bottom: clamp(30px, 6vh, 60px);
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

@media (max-width: 760px) {
  /* everything stays absolutely positioned — only the arrangement changes,
     stacking top-to-bottom instead of the desktop four-corners layout */
  .case__meta { top: 134px; align-items: flex-start; text-align: left; left: 20px; right: auto; }
  .case__cta-disc { width: 84px; font-size: 8px; }
  .case__tags { left: 20px; right: auto; bottom: auto; top: 232px; grid-template-columns: 1fr 1fr; }
  .case__next { left: 20px; right: auto; bottom: 20px; justify-items: start; text-align: left; }
  .case__stage { bottom: 156px; }
  .case__desc { font-size: 12.5px; line-height: 1.5; }
}
</style>
