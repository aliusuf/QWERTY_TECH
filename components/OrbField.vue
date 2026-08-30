<template>
  <canvas ref="cv" class="orbs" />
</template>

<script setup lang="ts">
/**
 * Cluster of glossy white spheres. Points live in 3D, get spun around Y by
 * scroll, projected with a simple perspective divide and painted back-to-front.
 */
const cv = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ctx: CanvasRenderingContext2D
let W = 0
let H = 0
let dpr = 1
let ro: ResizeObserver | null = null

const rnd = (i: number) => {
  const s = Math.sin(i * 91.7) * 24634.6345
  return s - Math.floor(s)
}

const COUNT = 30
const ORBS = Array.from({ length: COUNT }, (_, i) => {
  // fibonacci-ish shell with jitter so the cluster reads as a loose ball
  const gr = (1 + Math.sqrt(5)) / 2
  const theta = (2 * Math.PI * i) / gr
  const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
  const rad = 160 + rnd(i) * 190
  return {
    x: Math.cos(theta) * Math.sin(phi) * rad,
    y: (Math.cos(phi) * rad + (rnd(i + 50) - 0.5) * 120) * 0.9,
    z: Math.sin(theta) * Math.sin(phi) * rad,
    r: 34 + rnd(i + 90) * 58,
    bob: rnd(i + 130) * Math.PI * 2,
    speed: 0.35 + rnd(i + 170) * 0.5
  }
})

let tiltX = 0
let tiltY = 0

function resize() {
  const c = cv.value!
  const box = c.getBoundingClientRect()
  // capped below the OctopusModel canvas's own true max (2) for the same
  // reason: invisible softness cost, real fps cost on high-DPR screens
  dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  // fall back through every source: a backgrounded tab reports 0 for innerWidth
  W = Math.round(box.width) || document.documentElement.clientWidth || window.innerWidth || 0
  H = Math.round(box.height) || document.documentElement.clientHeight || window.innerHeight || 0
  if (!W || !H) return
  c.width = W * dpr
  c.height = H * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function sphere(x: number, y: number, r: number, depth: number) {
  // drop shadow onto whatever sits behind — a radial gradient gives the same
  // soft falloff as a blurred fill without the cost of a live `ctx.filter`
  // blur pass (expensive, and this runs for all 30 orbs every frame)
  const sx = x + r * 0.18
  const sy = y + r * 0.3
  const shadow = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 1.3)
  shadow.addColorStop(0, 'rgba(104, 98, 138, 0.16)')
  shadow.addColorStop(0.7, 'rgba(104, 98, 138, 0.08)')
  shadow.addColorStop(1, 'rgba(104, 98, 138, 0)')
  ctx.beginPath()
  ctx.ellipse(sx, sy, r * 1.3, r * 1.24, 0, 0, Math.PI * 2)
  ctx.fillStyle = shadow
  ctx.fill()

  // body: opaque, depth only tints it so the far side of the cluster recedes
  const k = 0.84 + depth * 0.16
  const g = ctx.createRadialGradient(x - r * 0.4, y - r * 0.46, r * 0.05, x, y, r * 1.02)
  g.addColorStop(0, 'rgb(255,255,255)')
  g.addColorStop(0.38, 'rgb(' + [250, 249, 254].map((c) => Math.round(c * k)).join(',') + ')')
  g.addColorStop(0.78, 'rgb(' + [216, 214, 232].map((c) => Math.round(c * k)).join(',') + ')')
  g.addColorStop(0.94, 'rgb(' + [172, 169, 196].map((c) => Math.round(c * k)).join(',') + ')')
  g.addColorStop(1, 'rgb(' + [198, 196, 218].map((c) => Math.round(c * k)).join(',') + ')')

  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = g
  ctx.fill()

  // specular highlight
  ctx.beginPath()
  ctx.ellipse(x - r * 0.36, y - r * 0.44, r * 0.2, r * 0.13, -0.6, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,' + (0.9 * depth).toFixed(2) + ')'
  ctx.fill()

  // bounce light from the floor, clipped so it never draws a hard seam
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.clip()
  const b = ctx.createRadialGradient(x, y + r * 0.92, r * 0.05, x, y + r * 0.92, r * 0.85)
  b.addColorStop(0, 'rgba(255,255,255,' + (0.55 * depth).toFixed(2) + ')')
  b.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = b
  ctx.fillRect(x - r, y - r, r * 2, r * 2)
  ctx.restore()
}

function frame(ms: number) {
  raf = requestAnimationFrame(frame)
  const o = stage.orbs
  if (!W || !H) return
  ctx.clearRect(0, 0, W, H)
  if (o.alpha <= 0.001) return

  const t = ms / 1000
  tiltX = lerp(tiltX, stage.pointer.nx, 0.03)
  tiltY = lerp(tiltY, stage.pointer.ny, 0.03)

  const cx = W * 0.5 + o.x * W + tiltX * 40
  const cy = H * 0.5 + o.y * H + tiltY * 30
  const boost = 1 + clamp((760 - W) / 760) * 0.5
  const fit = clamp(W / 1440, 0.6, 1.2) * boost * o.scale
  const rotY = o.spin + t * 0.06 + tiltX * 0.18
  const rotX = tiltY * 0.12
  const FOCAL = 900

  const drawn = ORBS.map((p) => {
    const bobY = Math.sin(t * p.speed + p.bob) * 26
    let x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY)
    let z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY)
    let y = p.y + bobY
    const y2 = y * Math.cos(rotX) - z * Math.sin(rotX)
    z = y * Math.sin(rotX) + z * Math.cos(rotX)
    y = y2

    const k = FOCAL / (FOCAL - z * 0.65)
    return {
      sx: cx + x * k * fit,
      sy: cy + y * k * fit,
      sr: p.r * k * fit,
      z
    }
  }).sort((a, b) => a.z - b.z)

  ctx.save()
  ctx.globalAlpha = clamp(o.alpha)
  for (const d of drawn) {
    const depth = clamp(0.6 + (d.z + 380) / 1100, 0.55, 1)
    sphere(d.sx, d.sy, d.sr, depth)
  }
  ctx.restore()
}

onMounted(() => {
  ctx = cv.value!.getContext('2d')!
  resize()
  window.addEventListener('resize', resize)
  ro = new ResizeObserver(() => resize())
  ro.observe(cv.value!)
  raf = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.orbs {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
