<template>
  <div class="hud hud--bl">
    <button class="sound" :class="{ 'is-on': soundOn }" :aria-pressed="soundOn" aria-label="Ambient sound" @click="toggle">
      <span class="sound__wave">
        <i v-for="n in 9" :key="n" :style="{ animationDelay: n * 0.09 + 's' }" />
      </span>
      <span class="sound__state">{{ soundOn ? 'ON' : 'OFF' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { toggle, soundOn } = useAmbience()
</script>

<style scoped>
.hud--bl {
  position: fixed;
  z-index: 80;
  left: max(clamp(14px, 2vw, 30px), var(--safe-left));
  bottom: calc(clamp(14px, 2vw, 26px) + var(--safe-bottom));
}
.sound {
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 14px 7px 12px;
  border-radius: 100px;
  background: var(--ink);
  color: #fff;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
}
.sound__wave {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 12px;
}
.sound__wave i {
  width: 2px;
  height: 3px;
  background: #fff;
  border-radius: 2px;
}
.sound.is-on .sound__wave i {
  animation: eq 0.9s ease-in-out infinite alternate;
}
@keyframes eq {
  from { height: 2px; }
  to { height: 12px; }
}
</style>
