<template>
  <div class="tex" aria-hidden="true">
    <div class="tex__grid" />
    <canvas ref="cv" class="tex__grain" />
  </div>
</template>

<script setup lang="ts">
const cv = ref<HTMLCanvasElement | null>(null)
let raf = 0

onMounted(() => {
  const c = cv.value!
  const ctx = c.getContext('2d')!
  const S = 160
  c.width = S
  c.height = S

  // pre-bake a handful of noise tiles and cycle them: cheap 35mm shimmer
  const frames: ImageData[] = []
  for (let f = 0; f < 5; f++) {
    const img = ctx.createImageData(S, S)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 160 + Math.random() * 95
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = Math.random() * 26
    }
    frames.push(img)
  }

  let i = 0
  let last = 0
  const loop = (t: number) => {
    if (t - last > 70) {
      ctx.putImageData(frames[i++ % frames.length], 0, 0)
      last = t
    }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.tex {
  position: fixed;
  inset: 0;
  z-index: 90;
  pointer-events: none;
}

.tex__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(11, 11, 14, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11, 11, 14, 0.045) 1px, transparent 1px);
  background-size: 4px 4px;
  mix-blend-mode: multiply;
  opacity: 0.22;
}

.tex__grain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  mix-blend-mode: overlay;
  image-rendering: pixelated;
}
</style>
