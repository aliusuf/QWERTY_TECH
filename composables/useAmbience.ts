/**
 * Generated ambient pad — no audio assets. Two detuned saws through a slow
 * filter sweep, plus a breathing sub. Created lazily on first enable so we
 * never touch AudioContext before a user gesture.
 */
let ctx: AudioContext | null = null
let master: GainNode | null = null
let nodes: OscillatorNode[] = []

export function useAmbience() {
  const { soundOn } = useExperience()

  const build = () => {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    filter.Q.value = 6
    filter.connect(master)

    // slow filter drift
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.045
    lfoGain.gain.value = 260
    lfo.connect(lfoGain).connect(filter.frequency)
    lfo.start()

    const freqs = [55, 82.4, 110, 164.8]
    nodes = freqs.map((f, i) => {
      const osc = ctx!.createOscillator()
      osc.type = i % 2 ? 'sine' : 'sawtooth'
      osc.frequency.value = f
      osc.detune.value = (i - 1.5) * 7

      const g = ctx!.createGain()
      g.gain.value = i === 0 ? 0.24 : 0.075
      osc.connect(g).connect(filter)
      osc.start()
      return osc
    })
    nodes.push(lfo)
  }

  const toggle = async () => {
    if (!ctx) build()
    if (ctx!.state === 'suspended') await ctx!.resume()

    const next = !soundOn.value
    soundOn.value = next
    const now = ctx!.currentTime
    master!.gain.cancelScheduledValues(now)
    master!.gain.setValueAtTime(master!.gain.value, now)
    master!.gain.linearRampToValueAtTime(next ? 0.16 : 0, now + (next ? 2.2 : 0.7))
  }

  /** short UI blip, respects the sound toggle */
  const blip = (freq = 660, dur = 0.09) => {
    if (!ctx || !soundOn.value) return
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    g.gain.value = 0.0001
    osc.connect(g).connect(ctx.destination)
    const t = ctx.currentTime
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  }

  return { toggle, blip, soundOn }
}
