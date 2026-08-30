<template>
  <div class="app" :class="{ 'app--live': isLive }">
    <TheGrain />
    <TheCursor />

    <!-- fixed WebGL-free canvas stage, driven by scroll — kept mounted across
         routes so the octopus never re-initializes; just hidden off the
         homepage, where it has nothing to react to -->
    <div class="stage" :class="{ 'stage--hidden': !isHome }" aria-hidden="true">
      <OctopusModel />
      <OrbField />
    </div>

    <TheNav />
    <TheRails :show="isHome" />
    <SoundToggle />
    <BlobButton />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { started } = useExperience()
const route = useRoute()
const isHome = computed(() => route.path === '/')
// nav/rails/blob wait on the homepage's intro; everywhere else they're just there
const isLive = computed(() => !isHome.value || started.value)
</script>

<style>
.stage {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.6s var(--ease);
}
.stage--hidden {
  opacity: 0;
}

.page {
  position: relative;
  z-index: 2;
}

/* nav/rails/blob wait for the intro gate on the homepage only */
.app .nav,
.app .rail,
.app .hud {
  opacity: 0;
  transition: opacity 0.9s var(--ease);
}
.app--live .nav,
.app--live .rail,
.app--live .hud {
  opacity: 1;
}

/* the homepage sections themselves stay hidden until the loader hands off */
.app .page {
  opacity: 0;
  transition: opacity 0.9s var(--ease);
}
.app--live .page {
  opacity: 1;
}
</style>
