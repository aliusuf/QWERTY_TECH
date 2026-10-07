<template>
  <button
    type="button"
    class="hold"
    :class="{ 'is-holding': holding, 'is-done': done }"
    :style="{ '--p': p }"
    @pointerdown.prevent="start"
    @pointerup="stop"
    @pointerleave="stop"
    @pointercancel="stop"
    @contextmenu.prevent
    @click="activate"
  >
    <svg viewBox="0 0 100 100" class="hold__ring">
      <circle cx="50" cy="50" r="47" class="hold__bg" />
      <circle cx="50" cy="50" r="47" class="hold__fg" :stroke-dashoffset="295.3 - 295.3 * p" />
    </svg>
    <span class="hold__core" />
    <span class="hold__label"><slot>START</slot></span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ duration?: number }>(), { duration: 1100 })
const emit = defineEmits<{ (e: 'complete'): void; (e: 'progress', v: number): void }>()

const p = ref(0)
const holding = ref(false)
const done = ref(false)
let raf = 0
let t0 = 0
const { blip } = useAmbience()

const complete = () => {
  if (done.value) return
  cancelAnimationFrame(raf)
  p.value = 1
  done.value = true
  holding.value = false
  emit('progress', 1)
  blip(880)
  emit('complete')
}

// Keyboard and assistive-technology activation do not emit a pointer hold.
const activate = (e: MouseEvent) => {
  if (e.detail === 0) complete()
}

const tick = (t: number) => {
  const v = clamp((t - t0) / props.duration)
  p.value = v
  emit('progress', v)
  if (v >= 1) {
    complete()
    return
  }
  raf = requestAnimationFrame(tick)
}

const start = (e: PointerEvent) => {
  if (done.value) return
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  } catch {
    /* pointer already released / synthetic event */
  }
  holding.value = true
  blip(420, 0.06)
  t0 = performance.now() - p.value * props.duration
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(tick)
}

const release = () => {
  cancelAnimationFrame(raf)
  const from = p.value
  const t1 = performance.now()
  const back = (t: number) => {
    const k = clamp((t - t1) / 420)
    p.value = from * (1 - k)
    emit('progress', p.value)
    if (k < 1) raf = requestAnimationFrame(back)
  }
  raf = requestAnimationFrame(back)
}

const stop = () => {
  if (!holding.value || done.value) return
  holding.value = false
  release()
}

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.hold {
  flex-shrink: 0;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  position: relative;
  width: clamp(72px, 7vw, 96px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  isolation: isolate;
}
.hold > * { pointer-events: none; }
.hold__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  fill: none;
}
.hold__bg { stroke: var(--ink-12); stroke-width: 1.4; }
.hold__fg {
  stroke: var(--ink);
  stroke-width: 1.8;
  stroke-dasharray: 295.3;
  stroke-linecap: round;
}
.hold__core {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #fff, rgba(255, 255, 255, 0.35) 60%, rgba(255,255,255,0) 72%);
  box-shadow: 0 0 30px rgba(154, 108, 255, calc(0.25 + var(--p) * 0.6));
  transform: scale(calc(0.86 + var(--p) * 0.2));
  transition: transform 0.2s linear;
  z-index: -1;
}
.hold__label {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.16em;
  text-align: center;
  line-height: 1.35;
  text-transform: uppercase;
}
.hold.is-holding { animation: hpulse 1.2s ease-in-out infinite; }
@keyframes hpulse {
  50% { transform: scale(1.05); }
}
</style>
