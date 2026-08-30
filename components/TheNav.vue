<template>
  <header class="nav">
    <a class="nav__logo" href="#top" @click.prevent="top">
      Qwerty<em>Teck</em>
    </a>
    <nav class="nav__links">
      <a v-for="l in links" :key="l.id" :href="'#' + l.id" @click.prevent="go(l.id)">
        [<span>{{ l.label }}</span>]
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { $lenis } = useNuxtApp() as any
const route = useRoute()
const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'Qwerty Agency' },
  { id: 'contact', label: 'Contact' }
]

/** off the homepage, an anchor link has to land on "/" first */
const go = (id: string) => {
  if (route.path !== '/') return navigateTo('/#' + id)
  $lenis?.scrollTo('#' + id, { offset: 0, duration: 1.6 })
}
const top = () => {
  if (route.path !== '/') return navigateTo('/')
  $lenis?.scrollTo(0, { duration: 1.6 })
}
</script>

<style scoped>
.nav {
  position: fixed;
  z-index: 80;
  top: 0;
  left: 0;
  width: 100%;
  padding: var(--pad) clamp(16px, 2.4vw, 34px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  mix-blend-mode: multiply;
}

.nav__logo {
  font-family: var(--display);
  font-size: clamp(17px, 1.5vw, 23px);
  letter-spacing: 0.02em;
  text-transform: lowercase;
  line-height: 1;
}
.nav__logo em {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 0.8em;
  margin-left: 0.14em;
}

.nav__links {
  display: flex;
  gap: clamp(10px, 1.6vw, 26px);
  font-family: var(--mono);
  font-size: clamp(8.5px, 0.66vw, 11px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.nav__links a span {
  display: inline-block;
  transition: transform 0.4s var(--ease);
}
.nav__links a:hover span {
  transform: translateY(-2px) skewX(-8deg);
}

@media (max-width: 640px) {
  .nav__links a:nth-child(2) { display: none; }
}
</style>
