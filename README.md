# QWERTY TECK — interactive scroll experience

A Nuxt 3 build in the Noomo Labs style: hold-to-enter intro, a real 3D octopus
that swims through the whole page, scroll-driven 3D "drums" for the case
studies, a floating sphere cluster, and a hold-to-reveal contact finale.

The octopus is a Sketchfab GLB (Draco-compressed to 1.2 MB); everything else — sphere
cluster, grain, glass tubes, ambient audio — is generated at runtime (canvas 2D, CSS 3D,
WebAudio). No CDN, no image assets, so it runs offline.

## Run

```bash
npm run dev
```

Then open http://localhost:3000. Production: `npm run build` → `node .output/server/index.mjs`.

## How it is put together

| Piece | File | Notes |
| --- | --- | --- |
| Smooth scroll + GSAP wiring | [plugins/smooth-scroll.client.ts](plugins/smooth-scroll.client.ts) | Lenis drives `ScrollTrigger.update()`; page is held still until the intro completes |
| Shared stage state | [composables/useExperience.ts](composables/useExperience.ts) | `stage` is a plain (non-reactive) object written by GSAP at 60fps and read inside the canvas draw loops |
| Octopus | [components/OctopusModel.vue](components/OctopusModel.vue) | Sketchfab GLB, re-centred on the head; ships no sway attribute, so each arm's reach and outward direction are measured from its own geometry at load time and fed to the vertex shader as per-material uniforms |
| Sphere cluster | [components/OrbField.vue](components/OrbField.vue) | 30 points on a jittered shell, spun by scroll, projected and painted back-to-front |
| Case-study drums | [components/WorkSection.vue](components/WorkSection.vue) | A static glass tube with 14 CSS-3D type faces turning inside it; radius measured from a real face so faces meet edge-to-edge |
| Intro / finale gate | [components/HoldButton.vue](components/HoldButton.vue) | Reusable press-and-hold ring with progress, release rewind, and audio blip |
| Generated ambience | [composables/useAmbience.ts](composables/useAmbience.ts) | WebAudio pad built on first toggle — no audio files |
| Grain + grid | [components/TheGrain.vue](components/TheGrain.vue) | Five pre-baked noise tiles cycled at ~14fps |

### Scroll choreography

Each section owns its slice of the timeline and writes to `stage.jelly` / `stage.orbs`:

1. **Hero** — wordmark letters stagger in, cards drift with the pointer, octopus sits behind the type.
2. **Manifesto** — statement reveals word by word while the octopus swims right and grows.
3. **Work** — octopus recedes behind the glass; each drum rolls ±46°, and the type marquees continuously with scroll velocity shoving it along.
4. **Engage** — octopus hands the stage to the sphere cluster, which spins and rises.
5. **Outro** — cluster exits, octopus returns behind the wordmark; holding the button shatters the letters and irises open the contact panel.

All scroll-driven stage tweens use `immediateRender: false` so each one picks up the live
value when its range is entered instead of stamping its start values at creation.

## Content

Project copy lives in the `PROJECTS` array in [components/WorkSection.vue](components/WorkSection.vue);
nav items in [components/TheNav.vue](components/TheNav.vue). Colors and type are tokens at the top of
[assets/css/main.css](assets/css/main.css).
