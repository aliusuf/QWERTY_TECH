<template>
  <div ref="el" class="cursor" aria-hidden="true">
    <span class="cursor__dot" />
    <span ref="ring" class="cursor__ring" />
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
let raf = 0
let x = 0
let y = 0

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) {
    el.value!.style.display = 'none'
    return
  }
  x = window.innerWidth / 2
  y = window.innerHeight / 2
  stage.pointer.x = x
  stage.pointer.y = y

  // stay invisible until the pointer actually moves, so it never sits at 0,0
  window.addEventListener('pointermove', () => el.value?.classList.add('is-live'), { once: true })

  const loop = () => {
    raf = requestAnimationFrame(loop)
    x = lerp(x, stage.pointer.x, 0.18)
    y = lerp(y, stage.pointer.y, 0.18)
    el.value!.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  raf = requestAnimationFrame(loop)

  const over = (e: PointerEvent) => {
    const hit = (e.target as HTMLElement)?.closest?.('a, button, [data-cursor]')
    el.value!.classList.toggle('is-hot', !!hit)
  }
  window.addEventListener('pointerover', over, { passive: true })
  window.addEventListener('pointerdown', () => el.value!.classList.add('is-down'))
  window.addEventListener('pointerup', () => el.value!.classList.remove('is-down'))
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.cursor {
  opacity: 0;
  transition: opacity 0.4s var(--ease);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  pointer-events: none;
  mix-blend-mode: difference;
}
.cursor.is-live { opacity: 1; }

.cursor__dot,
.cursor__ring {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.35s var(--ease), height 0.35s var(--ease), opacity 0.3s;
}
.cursor__dot {
  width: 7px;
  height: 7px;
  background: #fff;
}
.cursor__ring {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.7);
}
.cursor.is-hot .cursor__ring {
  width: 62px;
  height: 62px;
}
.cursor.is-hot .cursor__dot {
  width: 3px;
  height: 3px;
}
.cursor.is-down .cursor__ring {
  width: 22px;
  height: 22px;
}
</style>
