<template>
  <canvas ref="cv" class="octopus" />
</template>

<script setup lang="ts">
import type {
  BufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3 as Vector3T,
  WebGLRenderer
} from 'three'

/**
 * A real Sketchfab octopus GLB (Draco-compressed, 1.2 MB, down from a 13 MB
 * export), driven by the same `stage.jelly` object the scroll timelines
 * already write to.
 *
 * Unlike the jellyfish export this model ships no per-vertex sway attribute,
 * so each arm's sway is derived from its own geometry at load time: the arm's
 * reach (near/far distance from the body centre) and outward direction become
 * per-material shader uniforms, so all four arms flutter independently and in
 * the direction they actually point rather than a single global tentacle sway.
 *
 * three is imported lazily inside onMounted: it never reaches the SSR bundle
 * (which stalls the dev render) and ships as its own client chunk.
 */

/** body width == 1 world unit; the camera frames this many units vertically */
const VISIBLE_H = 2.6
const FOV = 32

const cv = ref<HTMLCanvasElement | null>(null)

let raf = 0
let ro: ResizeObserver | null = null
let renderer: WebGLRenderer | null = null
let dracoLoader: { dispose: () => void } | null = null
let scene: Scene
let camera: PerspectiveCamera
let root: Group // stage-driven transform
let shards: Group // the glass shell that breaks apart on the intro hold
const shardData: { dir: [number, number, number]; spin: [number, number, number]; dist: number }[] = []
let bodyGroup: Group // head + eyes, rigid but breathes with a slow pulse
let armsGroup: Group // 4 arms, swayed in-shader per their own reach/direction
let W = 0
let H = 0
let modelScale = 1

/** shared across every arm material; per-arm reach/direction are separate uniforms */
const swayUniforms = {
  uTime: { value: 0 },
  uBodyCenter: { value: null as unknown as Vector3T }
}
const fadeMats: { mat: MeshStandardMaterial; base: number }[] = []
let ready = false
let reduced = false
let tiltX = 0
let tiltY = 0

/* ---------------------------------------------------------------- sizing */

function resize() {
  const c = cv.value
  if (!c || !renderer) return
  const box = c.getBoundingClientRect()
  W = Math.round(box.width) || document.documentElement.clientWidth || window.innerWidth || 0
  H = Math.round(box.height) || document.documentElement.clientHeight || window.innerHeight || 0
  if (!W || !H) return

  // capping at 1.5 instead of 2 keeps this full-viewport canvas's fill rate in
  // check on retina/4K screens — the softness is invisible at this resolution,
  // the fps difference on a 3x/4x DPR phone is not
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(W, H, false)
  camera.aspect = W / H
  // keep the framed height constant so the animal never resizes with aspect
  camera.position.z = VISIBLE_H / (2 * Math.tan((FOV * Math.PI) / 360))
  camera.updateProjectionMatrix()
}

/* ------------------------------------------------------------- materials */

/** injects a per-arm sway: amplitude grows from the body out to the arm's own tip */
function makeSwayable(
  mat: MeshStandardMaterial,
  arm: { near: number; far: number; dir: [number, number, number]; phase: number; amp: number }
) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = swayUniforms.uTime
    shader.uniforms.uBodyCenter = swayUniforms.uBodyCenter
    shader.uniforms.uNear = { value: arm.near }
    shader.uniforms.uFar = { value: arm.far }
    shader.uniforms.uDir = { value: arm.dir }
    shader.uniforms.uPhase = { value: arm.phase }
    shader.uniforms.uAmpWorld = { value: arm.amp }
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uTime;
         uniform vec3 uBodyCenter;
         uniform float uNear;
         uniform float uFar;
         uniform vec3 uDir;
         uniform float uPhase;
         uniform float uAmpWorld;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         // 0 at the body, 1 at the tip — sway grows the further out along the arm
         float dist = length(position - uBodyCenter);
         float drop = clamp((dist - uNear) / max(uFar - uNear, 0.0001), 0.0, 1.0);
         float k = pow(drop, 1.3) * uAmpWorld;

         // flutter in the plane perpendicular to the arm's own outward direction,
         // so each arm waves sideways to *itself* instead of in fixed world axes
         vec3 upGuess = abs(uDir.y) > 0.9 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
         vec3 axis1 = normalize(cross(uDir, upGuess));
         vec3 axis2 = normalize(cross(uDir, axis1));
         float w1 = sin(uTime * 0.9 + uPhase + drop * 3.2) + sin(uTime * 1.7 + uPhase * 1.6 + drop * 5.8) * 0.3;
         float w2 = cos(uTime * 0.8 + uPhase * 1.3 + drop * 2.6) * 0.85 + cos(uTime * 1.5 + uPhase * 2.1 + drop * 4.9) * 0.25;
         transformed += (axis1 * w1 + axis2 * w2) * k;`
      )
  }
  mat.needsUpdate = true
}

/* ------------------------------------------------------------------ init */

async function init() {
  const THREE = await import('three')
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
  const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
  const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js')
  const { mergeGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils.js')

  swayUniforms.uBodyCenter.value = new THREE.Vector3()
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // MSAA is mostly redundant once the canvas is already supersampled by a
  // >=1.5x pixel ratio — skip the extra GPU pass there and keep it only for
  // the 1x-DPR screens that actually need it to avoid jagged edges
  const antialias = (window.devicePixelRatio || 1) < 1.5
  renderer = new THREE.WebGLRenderer({ canvas: cv.value!, alpha: true, antialias })
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.02

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)

  root = new THREE.Group()
  bodyGroup = new THREE.Group()
  armsGroup = new THREE.Group()
  shards = new THREE.Group()
  root.add(bodyGroup, armsGroup, shards)
  scene.add(root)

  // ---- faceted shell: one mesh per icosahedron face, chrome and jet black
  const ico = new THREE.IcosahedronGeometry(0.82, 1)
  const pos = ico.getAttribute('position')
  const chrome = new THREE.MeshStandardMaterial({
    color: 0xffffff, metalness: 1, roughness: 0.045, envMapIntensity: 1.6, side: THREE.DoubleSide,
    transparent: true, opacity: 0.5, depthWrite: false
  })
  chrome.userData.base = 0.5
  const jet = new THREE.MeshStandardMaterial({
    color: 0x0d0d12, metalness: 1, roughness: 0.14, envMapIntensity: 1.2, side: THREE.DoubleSide,
    transparent: true, opacity: 0.72, depthWrite: false
  })
  jet.userData.base = 0.72
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  const mid = new THREE.Vector3()
  for (let f = 0; f < pos.count; f += 3) {
    a.fromBufferAttribute(pos, f)
    b.fromBufferAttribute(pos, f + 1)
    c.fromBufferAttribute(pos, f + 2)
    mid.copy(a).add(b).add(c).divideScalar(3)

    // shrink each facet a touch so the seams read as cracks
    const k = 0.82
    const tri = new Float32Array([
      ...a.clone().sub(mid).multiplyScalar(k).toArray(),
      ...b.clone().sub(mid).multiplyScalar(k).toArray(),
      ...c.clone().sub(mid).multiplyScalar(k).toArray()
    ])
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(tri, 3))
    g.computeVertexNormals()

    const m = new THREE.Mesh(g, Math.random() < 0.34 ? jet : chrome)
    m.position.copy(mid)
    shards.add(m)
    const d = mid.clone().normalize()
    shardData.push({
      dir: [d.x, d.y, d.z],
      spin: [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5],
      dist: 1.1 + Math.random() * 2.4
    })
  }
  ico.dispose()

  // soft studio light so the PBR skin reads on a pale page
  scene.add(new THREE.HemisphereLight(0xdfe2ff, 0xffffff, 1.1))
  scene.add(new THREE.AmbientLight(0xffffff, 0.4))

  const key = new THREE.DirectionalLight(0xffffff, 1.9)
  key.position.set(-2.4, 3.2, 2.6)
  scene.add(key)

  const rim = new THREE.DirectionalLight(0xffb3e2, 1.0)
  rim.position.set(2.2, -1.4, -2.8)
  scene.add(rim)

  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.65
  pmrem.dispose()

  resize()
  window.addEventListener('resize', resize)
  ro = new ResizeObserver(() => resize())
  ro.observe(cv.value!)

  /** bake this mesh's world transform into its geometry, in the shared root frame */
  const bake = (m: Mesh): BufferGeometry => {
    m.updateWorldMatrix(true, false)
    const g = m.geometry.clone()
    g.applyMatrix4(m.matrixWorld)
    return g
  }

  const draco = new DRACOLoader()
  draco.setDecoderPath('/draco/')
  dracoLoader = draco
  const loader = new GLTFLoader()
  loader.setDRACOLoader(draco)
  loader.load(
    '/models/octopus.glb',
    (gltf) => {
      gltf.scene.updateMatrixWorld(true)

      // bucket every mesh by material name
      const buckets = new Map<string, Mesh[]>()
      gltf.scene.traverse((o) => {
        const m = o as Mesh
        if (!m.isMesh) return
        const name = (m.material as MeshStandardMaterial).name || 'unnamed'
        buckets.set(name, [...(buckets.get(name) || []), m])
      })

      // head + eyes: rigid, merged where they share a material
      const BODY_MATS = ['Body', 'material', 'eye_2']
      for (const name of BODY_MATS) {
        const meshes = buckets.get(name)
        if (!meshes) continue
        const geos = meshes.map(bake)
        // mergeGeometries needs one identical attribute set across the batch
        let shared = Object.keys(geos[0].attributes)
        for (const g of geos) shared = shared.filter((n) => !!g.attributes[n])
        for (const g of geos) {
          for (const n of Object.keys(g.attributes)) if (!shared.includes(n)) g.deleteAttribute(n)
        }
        const merged = geos.length === 1 ? geos[0] : mergeGeometries(geos, false)!
        const mesh = new THREE.Mesh(merged, meshes[0].material as MeshStandardMaterial)
        mesh.frustumCulled = false
        bodyGroup.add(mesh)
      }

      const bodyBox = new THREE.Box3().setFromObject(bodyGroup)
      const bodyCentre = bodyBox.getCenter(new THREE.Vector3())
      // the sway shader reads the raw (pre-transform) `position` attribute, so
      // uBodyCenter must stay in this same baked-world frame — mesh.position
      // and the group scale below are Object3D transforms applied afterward,
      // via modelViewMatrix, and never touch what the shader sees as `position`
      swayUniforms.uBodyCenter.value.copy(bodyCentre)

      // arms: each is a Body.00N + Suckers.00N pair, still two draw calls (the
      // suckers are a different material) but sharing one reach/direction/phase
      for (let i = 1; i <= 4; i++) {
        const pad = String(i).padStart(3, '0')
        const parts = [`Body.${pad}`, `Suckers.${pad}`]
          .map((n) => buckets.get(n)?.[0])
          .filter((m): m is Mesh => !!m)
        if (!parts.length) continue

        const meshes = parts.map((m) => new THREE.Mesh(bake(m), m.material as MeshStandardMaterial))
        const armBox = new THREE.Box3()
        for (const m of meshes) armBox.union(new THREE.Box3().setFromBufferAttribute(
          m.geometry.getAttribute('position') as any
        ))

        // approximate reach from the bbox corners' distance to the body centre —
        // cheap, and accurate enough to drive a sway envelope
        let near = Infinity
        let far = 0
        const corner = new THREE.Vector3()
        for (let cx = 0; cx < 2; cx++)
          for (let cy = 0; cy < 2; cy++)
            for (let cz = 0; cz < 2; cz++) {
              corner.set(
                cx ? armBox.max.x : armBox.min.x,
                cy ? armBox.max.y : armBox.min.y,
                cz ? armBox.max.z : armBox.min.z
              )
              const d = corner.distanceTo(bodyCentre)
              near = Math.min(near, d)
              far = Math.max(far, d)
            }

        const centre = armBox.getCenter(new THREE.Vector3())
        const dir = centre.clone().sub(bodyCentre)
        if (dir.lengthSq() < 1e-6) dir.set(0, -1, 0)
        dir.normalize()

        const arm = {
          near,
          far,
          dir: [dir.x, dir.y, dir.z] as [number, number, number],
          phase: i * 1.7,
          amp: (far - near) * 0.15
        }

        for (const mesh of meshes) {
          mesh.frustumCulled = false
          const mat = mesh.material as MeshStandardMaterial
          makeSwayable(mat, arm)
          armsGroup.add(mesh)
        }
      }

      // centre the whole creature on the body, so stage.jelly.x/y keep meaning
      // what they meant for the jellyfish
      const offset = bodyCentre.clone().negate()
      for (const g of [bodyGroup, armsGroup]) {
        for (const child of g.children) (child as Mesh).position.copy(offset)
      }

      // fade support: every material gets an alpha budget stage.jelly.alpha can scale
      root.traverse((o) => {
        const m = o as Mesh
        if (!m.isMesh) return
        const mat = m.material as MeshStandardMaterial
        if (shards.children.includes(m)) return // shards manage their own opacity
        mat.transparent = true
        fadeMats.push({ mat, base: mat.opacity })
      })

      // normalize on the body's own width — arms are allowed to reach beyond
      // the unit frame the way the jellyfish's tentacles trailed past its bell
      const bodySize = bodyBox.getSize(new THREE.Vector3())
      modelScale = 1 / (bodySize.x || 1)
      bodyGroup.scale.setScalar(modelScale)
      armsGroup.scale.setScalar(modelScale)
      ready = true
      resize()
    },
    undefined,
    (err) => console.error('[octopus] model failed to load', err)
  )

  raf = requestAnimationFrame(frame)
}

/* ------------------------------------------------------------------ loop */

function frame(ms: number) {
  raf = requestAnimationFrame(frame)
  if (!ready || !renderer || !W || !H) return

  const j = stage.jelly
  const alpha = clamp(j.alpha)
  for (const f of fadeMats) f.mat.opacity = f.base * alpha
  if (alpha <= 0.002) return

  const t = reduced ? 0 : ms / 1000
  swayUniforms.uTime.value = t
  const pulse = Math.sin(t * 0.9) // slow mantle breathing, not a swimming pulse

  tiltX = lerp(tiltX, stage.pointer.nx, 0.035)
  tiltY = lerp(tiltY, stage.pointer.ny, 0.035)

  // narrow screens need the animal proportionally larger to keep presence
  const boost = 1 + clamp((760 - W) / 760) * 0.45
  const visibleW = VISIBLE_H * (W / H)

  root.position.set(
    j.x * visibleW + tiltX * 0.06,
    -j.y * VISIBLE_H - tiltY * 0.04 + Math.sin(t * 0.5) * 0.02,
    0
  )
  root.scale.setScalar(j.scale * boost)
  root.rotation.set(tiltY * 0.12, j.spin + tiltX * 0.28 + Math.sin(t * 0.24) * 0.05, tiltX * 0.05)

  // the shell: intact at shatter 0, flung outward and faded by 1
  const sh = clamp(stage.shatter)
  shards.visible = sh < 0.995
  if (shards.visible) {
    const ease = sh * sh
    shards.children.forEach((m, i) => {
      const d = shardData[i]
      const push = 1 + ease * d.dist
      m.position.set(d.dir[0] * 0.82 * push, d.dir[1] * 0.82 * push, d.dir[2] * 0.82 * push)
      m.rotation.set(d.spin[0] * ease, d.spin[1] * ease, d.spin[2] * ease)
      const mat = m.material as MeshStandardMaterial
      mat.opacity = (mat.userData.base ?? 1) * (1 - Math.pow(sh, 1.6)) * alpha
    })
    shards.rotation.y = t * 0.12
  }

  // mantle breathes; arms scale with it so they stay attached to the body
  const inner = modelScale * j.inner
  bodyGroup.scale.setScalar(inner * (1 + pulse * 0.025))
  armsGroup.scale.setScalar(inner)

  renderer.render(scene, camera)
}

/* ----------------------------------------------------------- lifecycle */

onMounted(() => {
  init().catch((e) => console.error('[octopus] init failed', e))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  window.removeEventListener('resize', resize)
  scene?.traverse((o) => {
    const m = o as Mesh
    if (!m.isMesh) return
    m.geometry.dispose()
    ;(Array.isArray(m.material) ? m.material : [m.material]).forEach((mm) => mm.dispose())
  })
  renderer?.dispose()
  dracoLoader?.dispose() // terminates the decoder's worker pool
})
</script>

<style scoped>
.octopus {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
