<template>
  <main class="training">
    <section id="training-top" class="training__hero">
      <div class="training__hero-orb training__hero-orb--a" />
      <div class="training__hero-orb training__hero-orb--b" />

      <div class="training__hero-copy">
        <span class="tag">[ PMI® project management training ]</span>
        <h1 class="display">
          Lead projects<br />
          that <span>deliver.</span>
        </h1>
        <p>
          Build project management excellence with official PMI®-aligned programs,
          experienced trainers and certificates recognized around the world.
        </p>
        <div class="training__hero-actions">
          <button class="training__button training__button--dark" @click="scrollTo('programs')">
            Explore programs <span>↓</span>
          </button>
          <a class="training__button" href="mailto:info@qwertyteck.com">
            Corporate training <span>↗</span>
          </a>
        </div>
      </div>

      <div class="training__hero-aside" aria-hidden="true">
        <span>PMI</span>
        <span>Agile</span>
        <span>Risk</span>
        <span>Leadership</span>
      </div>

      <div class="training__stats" aria-label="Training statistics">
        <div v-for="stat in stats" :key="stat.label" class="training__stat">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="training__section training__reasons">
      <header class="training__section-head">
        <span class="tag">[ Why train with us ]</span>
        <h2 class="display">Knowledge that<br />travels.</h2>
        <p>Official content, practical expertise and recognition you can take anywhere.</p>
      </header>

      <div class="training__reason-grid">
        <article v-for="(reason, index) in reasons" :key="reason.title" class="training__reason">
          <span class="training__index">0{{ index + 1 }}</span>
          <h3>{{ reason.title }}</h3>
          <p>{{ reason.copy }}</p>
        </article>
      </div>
    </section>

    <section id="programs" class="training__section training__programs">
      <header class="training__section-head training__section-head--wide">
        <div>
          <span class="tag">[ Course explorer ]</span>
          <h2 class="display">Find your<br />next move.</h2>
        </div>
        <p>Choose a goal for an instant match, or filter the full program catalogue.</p>
      </header>

      <div class="training__goals" role="group" aria-label="Choose your training goal">
        <button
          v-for="goal in goals"
          :key="goal.label"
          :aria-pressed="selectedGoal === goal.course"
          @click="selectGoal(goal.course)"
        >
          {{ goal.label }}
        </button>
      </div>

      <Transition name="match">
        <article v-if="matchedCourse" class="training__match" aria-live="polite">
          <span class="tag">[ Your best match ]</span>
          <div>
            <h3>{{ matchedCourse.name }}</h3>
            <p>{{ durationLabel(matchedCourse.hours) }} hours · {{ matchedCourse.modes.join(' / ') }}</p>
          </div>
          <button aria-label="Clear course match" @click="selectedGoal = null">×</button>
        </article>
      </Transition>

      <div class="training__filters">
        <div role="group" aria-label="Filter by course type">
          <span class="tag">Type</span>
          <button
            v-for="option in categoryOptions"
            :key="option"
            :aria-pressed="category === option"
            @click="category = option"
          >
            {{ option }}
          </button>
        </div>
        <div role="group" aria-label="Filter by delivery mode">
          <span class="tag">Mode</span>
          <button
            v-for="option in modeOptions"
            :key="option"
            :aria-pressed="mode === option"
            @click="mode = option"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="training__course-grid">
        <article
          v-for="(course, index) in filteredCourses"
          :key="course.name"
          class="training__course"
          :class="{ 'is-match': selectedGoal === courses.indexOf(course) }"
        >
          <div class="training__course-top">
            <span>{{ course.level }}</span>
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
          <div class="training__duration">
            <span :style="{ width: `${(course.hours[course.hours.length - 1] / 40) * 100}%` }" />
          </div>
          <div class="training__course-meta">
            <strong>{{ durationLabel(course.hours) }} hours</strong>
            <span>{{ course.category }}</span>
          </div>
          <ul>
            <li v-for="item in [...course.trainers, ...course.modes]" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>

      <p v-if="!filteredCourses.length" class="training__empty">
        No program matches those filters. Try another delivery mode.
      </p>
    </section>

    <section class="training__section training__trainers">
      <header class="training__section-head training__section-head--wide">
        <div>
          <span class="tag">[ Lead trainers ]</span>
          <h2 class="display">Learn from<br />delivery.</h2>
        </div>
        <p>Decades of real program, PMO and leadership experience brought into the room.</p>
      </header>

      <div class="training__trainer-grid">
        <article v-for="trainer in trainers" :key="trainer.name" class="training__trainer">
          <div class="training__trainer-mark" aria-hidden="true">{{ trainer.initials }}</div>
          <div>
            <span class="tag">[ {{ trainer.role }} ]</span>
            <h3>{{ trainer.name }}</h3>
            <div class="training__credentials">
              <span v-for="credential in trainer.credentials" :key="credential">{{ credential }}</span>
            </div>
            <p>{{ trainer.bio }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="training__section training__journey">
      <header class="training__section-head">
        <span class="tag">[ Your journey ]</span>
        <h2 class="display">From choice<br />to certificate.</h2>
      </header>

      <ol class="training__steps">
        <li v-for="(step, index) in steps" :key="step.title">
          <span>0{{ index + 1 }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </div>
        </li>
      </ol>

      <div class="training__trust">
        <strong>Tier 1</strong>
        <p>
          Hightechino is a proud partner of a Tier 1 Premier Authorized Training Partner of PMI,
          USA. Participants receive certificates issued by the Tier 1 Premier ATP.
        </p>
      </div>
    </section>

    <section class="training__contact">
      <span class="tag">[ Corporate training / customized programs / bulk enrolment ]</span>
      <h2 class="display">Build your team’s<br /><span>excellence.</span></h2>
      <p>Tell us what your team needs. We’ll shape the program around the outcome.</p>
      <a href="mailto:info@qwertyteck.com">info@qwertyteck.com <span>↗</span></a>
    </section>
  </main>
</template>

<script setup lang="ts">
interface Course {
  name: string
  level: string
  category: string
  hours: number[]
  description: string
  trainers: string[]
  modes: string[]
}

useHead({
  title: 'PMI® Project Management Training — Qwerty Teck',
  meta: [
    {
      name: 'description',
      content: 'PMI®-aligned project management certification, leadership and foundation programs from Qwerty Teck.'
    }
  ]
})

const { $lenis } = useNuxtApp() as any
const scrollTo = (id: string) => $lenis?.scrollTo(`#${id}`, { offset: -64, duration: 1.5 })

const stats = [
  { value: '07', label: 'PMI® programs' },
  { value: '02', label: 'Lead trainers' },
  { value: '57', label: 'Combined years' },
  { value: 'T1', label: 'Premier ATP certificates' }
]

const reasons = [
  { title: 'Globally recognized PMI® content', copy: 'Official curriculum aligned with the latest PMI® standards.' },
  { title: 'Experienced trainers', copy: 'Learn directly from industry experts and certified professionals.' },
  { title: 'Real-world examples', copy: 'Case studies and practical examples designed for maximum impact.' },
  { title: 'Certification you can trust', copy: 'Certificates issued by a Tier 1 Premier ATP of PMI, USA.' }
]

const courses: Course[] = [
  {
    name: 'PMP® Exam Preparation', level: 'Popular', category: 'Certification', hours: [35],
    description: 'Comprehensive preparation aligned with the PMBOK® Guide, including mock exams, application support and exam strategies.',
    trainers: ['Furrukh Abbas', 'Asad Kazim'], modes: ['Classroom', 'Live Online', 'In-house']
  },
  {
    name: 'CAPM® Exam Preparation', level: 'Beginner', category: 'Certification', hours: [35],
    description: 'Entry-level certification covering fundamental project management principles and the PMI framework.',
    trainers: ['Furrukh Abbas'], modes: ['Classroom', 'Live Online']
  },
  {
    name: 'PMI-ACP® Agile Certification', level: 'Popular', category: 'Certification', hours: [21],
    description: 'Agile methodologies including Scrum, Kanban and hybrid approaches for modern project environments.',
    trainers: ['Asad Kazim'], modes: ['Classroom', 'Live Online', 'In-house']
  },
  {
    name: 'PMI-RMP® Risk Management', level: 'Advanced', category: 'Certification', hours: [30, 40],
    description: 'Identify, assess and mitigate project risks using PMI risk management frameworks.',
    trainers: ['Furrukh Abbas'], modes: ['Live Online', 'In-house']
  },
  {
    name: 'Project Leadership & Communications', level: 'Leadership', category: 'Leadership', hours: [16],
    description: 'Develop leadership, stakeholder engagement and communication skills for effective project execution.',
    trainers: ['Asad Kazim'], modes: ['Classroom', 'In-house']
  },
  {
    name: 'Plan-Driven Project Management', level: 'Foundations', category: 'Foundations', hours: [16],
    description: 'Traditional methodologies, planning techniques and structured project execution approaches.',
    trainers: ['Furrukh Abbas'], modes: ['Classroom', 'Live Online']
  },
  {
    name: 'PMI Executive Workshops', level: 'Leadership', category: 'Leadership', hours: [8, 16],
    description: 'Short-format, high-impact workshops for senior leaders on strategy, governance and decision-making.',
    trainers: ['Furrukh Abbas', 'Asad Kazim'], modes: ['In-house', 'Executive Sessions']
  }
]

const goals = [
  { label: 'Pass the PMP® exam', course: 0 },
  { label: 'Start my PM career', course: 1 },
  { label: 'Work in Agile', course: 2 },
  { label: 'Master project risk', course: 3 },
  { label: 'Lead my teams', course: 4 },
  { label: 'Learn the fundamentals', course: 5 },
  { label: 'Brief senior leaders', course: 6 }
]

const categoryOptions = ['All', 'Certification', 'Leadership', 'Foundations']
const modeOptions = ['All', 'Classroom', 'Live Online', 'In-house', 'Executive Sessions']
const category = ref('All')
const mode = ref('All')
const selectedGoal = ref<number | null>(null)

const matchedCourse = computed(() => selectedGoal.value === null ? null : courses[selectedGoal.value])
const filteredCourses = computed(() => courses.filter((course) => {
  const categoryMatch = category.value === 'All' || course.category === category.value
  const modeMatch = mode.value === 'All' || course.modes.includes(mode.value)
  return categoryMatch && modeMatch
}))

const selectGoal = (course: number) => {
  selectedGoal.value = selectedGoal.value === course ? null : course
  if (selectedGoal.value !== null) {
    category.value = 'All'
    mode.value = 'All'
  }
}

const durationLabel = (hours: number[]) => hours.length > 1 ? `${hours[0]}–${hours[1]}` : String(hours[0])

const trainers = [
  {
    initials: 'AK', name: 'Mr. Asad Kazim', role: 'Agile / leadership',
    credentials: ['PMP®', 'PMI-ACP', 'PMI-RMP', 'CSSGB', 'CSSBB', 'LMC'],
    bio: 'Real-world experience managing and directing mid and large programs and projects in Defense Electronics, Telecommunications and IT.'
  },
  {
    initials: 'FA', name: 'Mr. Furrukh Abbas', role: 'Programs / PMO',
    credentials: ['PMP®', 'CDCP', 'IGC'],
    bio: 'Specialist in projects, programs and PMO management. Led 4G/5G construction, network expansion, fiber and transport rollout projects.'
  }
]

const steps = [
  { title: 'Choose', copy: 'Pick the program that fits your goal.' },
  { title: 'Learn', copy: 'Work through official PMI®-aligned curriculum.' },
  { title: 'Apply', copy: 'Connect the knowledge to real cases and projects.' },
  { title: 'Get certified', copy: 'Receive a certificate from a Tier 1 Premier ATP.' }
]
</script>

<style scoped>
.training {
  position: relative;
  z-index: 2;
  overflow: hidden;
  background: var(--bg);
}

.training__hero {
  position: relative;
  min-height: 100svh;
  padding: clamp(120px, 17vh, 180px) clamp(20px, 6vw, 90px) 48px;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.55fr);
  align-items: center;
  gap: 5vw;
  isolation: isolate;
}
.training__hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -3;
  background:
    linear-gradient(rgba(236, 234, 242, 0.3), rgba(236, 234, 242, 0.95)),
    repeating-linear-gradient(90deg, transparent 0 79px, rgba(11, 11, 14, 0.045) 79px 80px),
    repeating-linear-gradient(0deg, transparent 0 79px, rgba(11, 11, 14, 0.045) 79px 80px);
}
.training__hero-orb {
  position: absolute;
  z-index: -2;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.72;
}
.training__hero-orb--a {
  width: min(54vw, 780px);
  aspect-ratio: 1;
  top: -18%;
  right: -10%;
  background: radial-gradient(circle at 35% 30%, #fff 0 7%, var(--pink) 26%, var(--violet) 62%, transparent 72%);
  animation: training-float 12s ease-in-out infinite;
}
.training__hero-orb--b {
  width: min(32vw, 460px);
  aspect-ratio: 1;
  left: -9%;
  bottom: -19%;
  background: radial-gradient(circle at 60% 35%, #fff, var(--cyan) 30%, var(--violet) 68%, transparent 72%);
  animation: training-float 15s 2s ease-in-out infinite reverse;
}
@keyframes training-float { 50% { transform: translate(2vw, 3vh) scale(1.05); } }

.training__hero-copy { max-width: 980px; }
.training__hero-copy h1 {
  margin: 22px 0 30px;
  font-size: clamp(76px, 11.2vw, 190px);
  line-height: 0.82;
  text-wrap: balance;
}
.training__hero-copy h1 span {
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
}
.training__hero-copy > p {
  max-width: 660px;
  margin: 0;
  font-size: clamp(15px, 1.35vw, 20px);
  line-height: 1.65;
  text-transform: uppercase;
}
.training__hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.training__button {
  min-height: 50px;
  padding: 0 22px;
  border: 1px solid var(--ink-30);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 24px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.48);
  transition: transform 0.35s var(--ease), background 0.35s, color 0.35s;
}
.training__button--dark { background: var(--ink); color: var(--bg); }
.training__button:hover { transform: translateY(-4px); background: var(--violet); color: #fff; border-color: transparent; }

.training__hero-aside { display: grid; justify-items: end; gap: 12px; }
.training__hero-aside span {
  display: block;
  font-family: var(--display);
  font-size: clamp(42px, 6.3vw, 108px);
  line-height: 0.85;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
  mix-blend-mode: overlay;
}
.training__hero-aside span:nth-child(even) { padding-right: 10vw; color: rgba(11, 11, 14, 0.18); }

.training__stats {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ink-12);
  margin-top: 7vh;
}
.training__stat { padding: 22px 18px 0 0; border-right: 1px solid var(--ink-12); }
.training__stat:last-child { border-right: 0; padding-left: 18px; }
.training__stat strong { display: block; font-family: var(--display); font-size: clamp(34px, 4vw, 66px); font-weight: 400; }
.training__stat span { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-60); }

.training__section { padding: clamp(90px, 13vw, 190px) clamp(20px, 6vw, 90px); }
.training__section-head { max-width: 800px; margin-bottom: clamp(44px, 7vw, 90px); }
.training__section-head--wide { max-width: none; display: flex; justify-content: space-between; align-items: end; gap: 40px; }
.training__section-head h2 { margin: 18px 0 22px; font-size: clamp(54px, 8vw, 132px); line-height: 0.86; }
.training__section-head p { max-width: 550px; margin: 0; line-height: 1.65; font-size: clamp(14px, 1.1vw, 17px); text-transform: uppercase; }

.training__reason-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--ink-12); }
.training__reason { min-height: 330px; padding: 22px clamp(16px, 2.4vw, 38px) 30px 0; border-right: 1px solid var(--ink-12); display: flex; flex-direction: column; }
.training__reason:not(:first-child) { padding-left: clamp(16px, 2.4vw, 38px); }
.training__reason:last-child { border-right: 0; }
.training__index { font-family: var(--mono); font-size: 10px; color: var(--ink-60); }
.training__reason h3 { margin: auto 0 20px; font-size: clamp(20px, 2vw, 30px); line-height: 1.1; text-transform: uppercase; }
.training__reason p { margin: 0; color: var(--ink-60); line-height: 1.6; font-size: 14px; }

.training__programs { background: var(--ink); color: var(--bg); }
.training__programs .tag { color: rgba(236, 234, 242, 0.58); }
.training__goals { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px; }
.training__goals button,
.training__filters button {
  min-height: 44px;
  border: 1px solid rgba(236, 234, 242, 0.25);
  border-radius: 999px;
  padding: 0 18px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--bg);
  transition: 0.3s var(--ease);
}
.training__goals button:hover,
.training__filters button:hover,
.training__goals button[aria-pressed='true'],
.training__filters button[aria-pressed='true'] { background: var(--bg); color: var(--ink); border-color: var(--bg); transform: translateY(-2px); }

.training__match {
  margin: 0 0 30px;
  padding: clamp(22px, 3vw, 42px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: clamp(20px, 4vw, 70px);
  border-radius: 28px;
  color: var(--ink);
  background: linear-gradient(110deg, var(--cyan), #fff 46%, var(--pink));
}
.training__match h3 { margin: 0 0 6px; font-size: clamp(24px, 3vw, 48px); text-transform: uppercase; }
.training__match p { margin: 0; font-family: var(--mono); font-size: 10px; text-transform: uppercase; }
.training__match button { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--ink-30); font-size: 24px; }
.match-enter-active, .match-leave-active { transition: 0.5s var(--ease); }
.match-enter-from, .match-leave-to { opacity: 0; transform: translateY(-20px); }

.training__filters { display: grid; gap: 14px; padding: 24px 0 34px; border-top: 1px solid rgba(236, 234, 242, 0.18); }
.training__filters > div { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.training__filters .tag { width: 70px; }
.training__course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.training__course {
  min-height: 440px;
  padding: clamp(22px, 2.5vw, 36px);
  border: 1px solid rgba(236, 234, 242, 0.2);
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.35s, transform 0.35s var(--ease), background 0.35s;
}
.training__course:hover,
.training__course.is-match { transform: translateY(-6px); border-color: var(--cyan); background: rgba(103, 215, 255, 0.07); }
.training__course-top { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(236, 234, 242, 0.55); }
.training__course h3 { margin: 32px 0 18px; font-size: clamp(24px, 2.3vw, 36px); line-height: 1.03; text-transform: uppercase; }
.training__course > p { margin: 0; color: rgba(236, 234, 242, 0.62); font-size: 14px; line-height: 1.6; }
.training__duration { height: 3px; margin: auto 0 12px; background: rgba(236, 234, 242, 0.16); }
.training__duration span { display: block; height: 100%; background: linear-gradient(90deg, var(--cyan), var(--pink)); }
.training__course-meta { display: flex; justify-content: space-between; gap: 12px; font-family: var(--mono); font-size: 9px; text-transform: uppercase; }
.training__course ul { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 20px 0 0; margin: 20px 0 0; border-top: 1px solid rgba(236, 234, 242, 0.12); }
.training__course li { padding: 5px 9px; border: 1px solid rgba(236, 234, 242, 0.18); border-radius: 999px; font-family: var(--mono); font-size: 8px; text-transform: uppercase; }
.training__empty { padding: 50px; text-align: center; color: rgba(236, 234, 242, 0.6); }

.training__trainer-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.training__trainer { min-height: 480px; padding: clamp(24px, 4vw, 60px); border-radius: 30px; display: grid; grid-template-columns: 0.55fr 1fr; align-items: end; gap: clamp(24px, 4vw, 70px); background: rgba(255, 255, 255, 0.48); border: 1px solid var(--ink-12); }
.training__trainer:nth-child(2) { background: var(--bg-deep); }
.training__trainer-mark { aspect-ratio: 1; border-radius: 50%; display: grid; place-items: center; font-family: var(--display); font-size: clamp(54px, 8vw, 130px); color: #fff; background: radial-gradient(circle at 30% 25%, var(--cyan), var(--violet) 48%, var(--pink)); }
.training__trainer h3 { margin: 14px 0 16px; font-size: clamp(30px, 3.4vw, 56px); line-height: 1; text-transform: uppercase; }
.training__trainer p { margin: 24px 0 0; color: var(--ink-60); line-height: 1.65; font-size: 14px; }
.training__credentials { display: flex; flex-wrap: wrap; gap: 6px; }
.training__credentials span { padding: 6px 10px; border-radius: 999px; border: 1px solid var(--ink-12); font-family: var(--mono); font-size: 8px; }

.training__journey { background: linear-gradient(150deg, var(--bg-deep), var(--bg)); }
.training__steps { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--ink-12); }
.training__steps li { min-height: 280px; padding: 22px clamp(16px, 2.2vw, 34px); border-right: 1px solid var(--ink-12); display: flex; flex-direction: column; }
.training__steps li:first-child { padding-left: 0; }
.training__steps li:last-child { border-right: 0; }
.training__steps > li > span { font-family: var(--display); font-size: 44px; color: var(--violet); }
.training__steps div { margin-top: auto; }
.training__steps h3 { margin: 0 0 10px; font-size: 24px; text-transform: uppercase; }
.training__steps p { margin: 0; color: var(--ink-60); font-size: 14px; line-height: 1.55; }
.training__trust { margin-top: clamp(50px, 8vw, 100px); padding: clamp(28px, 4vw, 58px); display: grid; grid-template-columns: auto minmax(0, 700px); align-items: center; gap: clamp(30px, 7vw, 100px); border: 1px solid var(--ink-12); border-radius: 30px; }
.training__trust strong { font-family: var(--display); font-size: clamp(72px, 11vw, 170px); line-height: 0.8; color: transparent; -webkit-text-stroke: 2px var(--violet); }
.training__trust p { margin: 0; line-height: 1.7; text-transform: uppercase; }

.training__contact { min-height: 88svh; padding: clamp(110px, 14vw, 190px) clamp(20px, 6vw, 90px) calc(110px + var(--safe-bottom)); display: grid; align-content: center; justify-items: center; text-align: center; background: var(--ink); color: var(--bg); }
.training__contact .tag { color: rgba(236, 234, 242, 0.55); }
.training__contact h2 { margin: 30px 0; font-size: clamp(64px, 11vw, 180px); line-height: 0.84; }
.training__contact h2 span { color: var(--pink); }
.training__contact p { margin: 0 0 38px; max-width: 580px; line-height: 1.7; text-transform: uppercase; }
.training__contact > a { display: inline-flex; align-items: center; gap: 28px; min-height: 56px; padding: 0 24px; border-radius: 999px; color: var(--ink); background: var(--bg); font-family: var(--mono); font-size: clamp(11px, 1.2vw, 16px); text-transform: uppercase; transition: 0.35s var(--ease); }
.training__contact > a:hover { transform: scale(1.05); background: var(--cyan); }

@media (max-width: 980px) {
  .training__hero { grid-template-columns: 1fr; }
  .training__hero-aside { display: none; }
  .training__reason-grid, .training__steps { grid-template-columns: repeat(2, 1fr); }
  .training__reason:nth-child(2), .training__steps li:nth-child(2) { border-right: 0; }
  .training__reason:nth-child(n + 3), .training__steps li:nth-child(n + 3) { border-top: 1px solid var(--ink-12); }
  .training__course-grid { grid-template-columns: repeat(2, 1fr); }
  .training__trainer-grid { grid-template-columns: 1fr; }
}

@media (max-width: 700px) {
  .training__hero { min-height: auto; padding-top: calc(105px + var(--safe-top)); }
  .training__hero-copy h1 { font-size: clamp(62px, 21vw, 108px); }
  .training__hero-copy h1 span { -webkit-text-stroke-width: 1px; }
  .training__stats { grid-template-columns: repeat(2, 1fr); }
  .training__stat { min-height: 120px; border-bottom: 1px solid var(--ink-12); }
  .training__stat:nth-child(2) { border-right: 0; padding-left: 14px; }
  .training__stat:last-child { padding-left: 14px; }
  .training__section-head--wide { display: block; }
  .training__section-head--wide > p { margin-top: 24px; }
  .training__section-head h2 { font-size: clamp(52px, 17vw, 92px); }
  .training__reason-grid, .training__course-grid, .training__steps { grid-template-columns: 1fr; }
  .training__reason { min-height: 240px; padding: 22px 0 28px !important; border-right: 0; border-top: 1px solid var(--ink-12); }
  .training__reason:first-child { border-top: 0; }
  .training__match { grid-template-columns: 1fr auto; }
  .training__match > .tag { grid-column: 1 / -1; }
  .training__filters .tag { width: 100%; }
  .training__course { min-height: 410px; }
  .training__trainer { min-height: 0; grid-template-columns: 1fr; }
  .training__trainer-mark { width: min(58vw, 220px); }
  .training__steps li { min-height: 190px; padding: 22px 0; border-right: 0; border-top: 1px solid var(--ink-12); }
  .training__steps li:first-child { border-top: 0; }
  .training__trust { grid-template-columns: 1fr; }
  .training__contact h2 { font-size: clamp(58px, 17vw, 96px); }
}

@media (prefers-reduced-motion: reduce) {
  .training__hero-orb { animation: none; }
}
</style>
