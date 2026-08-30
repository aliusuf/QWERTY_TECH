<template>
  <div class="hud hud--br">
    <button class="blob" aria-label="Start a project" @click="go">
      <svg viewBox="0 0 100 100" class="blob__shape">
        <path :d="d" fill="currentColor" />
      </svg>
      <span class="blob__ico">✦</span>
    </button>
  </div>
</template>

<script setup lang="ts">
/** morphing blob: a radius-modulated circle sampled into a closed path */
const d = ref('')
let raf = 0
const { $lenis } = useNuxtApp() as any
const route = useRoute()
const go = () => {
  if (route.path !== '/') return navigateTo('/#contact')
  $lenis?.scrollTo('#contact', { duration: 2 })
}

onMounted(() => {
  const N = 42
  const loop = (ms: number) => {
    raf = requestAnimationFrame(loop)
    const t = ms / 1000
    let path = ''
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2
      const r =
        41 +
        Math.sin(a * 3 + t * 1.1) * 3.4 +
        Math.sin(a * 5 - t * 0.7) * 2.2 +
        Math.sin(a * 2 + t * 1.7) * 1.6
      const x = 50 + Math.cos(a) * r
      const y = 50 + Math.sin(a) * r
      path += (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2)
    }
    d.value = path + 'Z'
  }
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.hud--br {
  position: fixed;
  z-index: 80;
  right: clamp(14px, 2vw, 30px);
  bottom: clamp(14px, 2vw, 26px);
}
.blob {
  position: relative;
  width: clamp(42px, 4vw, 54px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  color: var(--ink);
  transition: transform 0.5s var(--ease);
}
.blob:hover { transform: scale(1.12) rotate(12deg); }
.blob__shape { position: absolute; inset: 0; width: 100%; height: 100%; }
.blob__ico {
  position: relative;
  color: var(--bg);
  font-size: 14px;
  line-height: 1;
}
</style>
