<template>
  <!-- two fixed-position siblings, not one root — v-show on the component tag
       can't fall through to both, so visibility comes in as a prop instead -->
  <aside v-if="show" class="rail rail--l">
    <ul class="rail__tags">
      <li v-for="(tg, i) in tags" :key="tg" :class="{ 'is-on': active === i }">{{ tg }}</li>
    </ul>
    <div class="rail__ticks">
      <i v-for="n in 22" :key="n" :style="{ opacity: 0.18 + (n % 4 === 0 ? 0.5 : 0) }" />
    </div>
  </aside>

  <aside v-if="show" class="rail rail--r">
    <span class="rail__vert">SCROLL {{ pct }}</span>
    <div class="rail__track"><i :style="{ transform: `scaleY(${p})` }" /></div>
  </aside>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ show?: boolean }>(), { show: true })

const tags = ['AR', '3D', 'AI', 'XR']
const p = ref(0)
const active = ref(0)
const pct = computed(() => String(Math.round(p.value * 100)).padStart(3, '0'))
let raf = 0

onMounted(() => {
  const loop = () => {
    raf = requestAnimationFrame(loop)
    const max = document.documentElement.scrollHeight - window.innerHeight
    const v = max > 0 ? clamp(stage.scroll / max) : 0
    p.value = v
    active.value = Math.min(3, Math.floor(v * 4.0001))
  }
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.rail {
  position: fixed;
  z-index: 80;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--ink-60);
  mix-blend-mode: multiply;
}
.rail--l { left: clamp(8px, 1.2vw, 18px); flex-direction: row; }
.rail--r { right: clamp(8px, 1.2vw, 18px); }

.rail__tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 22px;
}
.rail__tags li {
  transition: color 0.4s, transform 0.4s var(--ease);
  color: var(--ink-30);
}
.rail__tags li.is-on {
  color: var(--ink);
  transform: translateX(2px);
}

.rail__ticks {
  display: grid;
  gap: 7px;
  align-content: center;
}
.rail__ticks i {
  display: block;
  width: 7px;
  height: 1px;
  background: var(--ink);
}

.rail--r { flex-direction: column; gap: 12px; }
.rail__vert {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
.rail__track {
  width: 1px;
  height: clamp(90px, 16vh, 170px);
  background: var(--ink-12);
  position: relative;
}
.rail__track i {
  position: absolute;
  inset: 0;
  background: var(--ink);
  transform-origin: top;
}

@media (max-width: 820px) {
  .rail--l .rail__ticks { display: none; }
}
@media (max-width: 560px) {
  .rail { display: none; }
}
</style>
