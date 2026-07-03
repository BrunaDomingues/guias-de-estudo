<template>
  <div class="guide-layout">
    <Sidebar
      :subjects="subjects"
      :active-slug="activeSlug"
      @select-subject="selectSubject"
    />

    <div class="content-area">
      <header v-if="currentSubject" class="header">
        <div class="badge">{{ currentSubject.badge }}</div>
        <h1>{{ currentSubject.title }}</h1>
        <p class="subtitle">{{ currentSubject.subtitle }}</p>
      </header>

      <nav v-if="sections.length" class="section-nav">
        <button
          v-for="sec in sections"
          :key="sec.slug"
          :class="['nav-btn', { active: activeSectionSlug === sec.slug }]"
          @click="selectSection(sec.slug)"
        >
          <span class="nav-icon">{{ sec.icon }}</span>
          {{ sec.label }}
        </button>
      </nav>

      <main class="main">
        <div v-if="loading" class="loading">Carregando...</div>
        <Transition v-else name="fade" mode="out-in">
          <SectionRenderer :key="activeSectionSlug" :section="activeSection" />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import SectionRenderer from '../components/SectionRenderer.vue'

const subjects = ref([])
const currentSubject = ref(null)
const sections = ref([])
const activeSlug = ref('')
const activeSectionSlug = ref('')
const activeSection = ref(null)
const loading = ref(false)

async function loadSubjects() {
  const res = await fetch('/api/subjects')
  subjects.value = await res.json()
  if (subjects.value.length && !activeSlug.value) {
    selectSubject(subjects.value[0].slug)
  }
}

async function selectSubject(slug) {
  activeSlug.value = slug
  const res = await fetch(`/api/subjects/${slug}`)
  currentSubject.value = await res.json()
  sections.value = currentSubject.value.sections || []
  if (sections.value.length) {
    selectSection(sections.value[0].slug)
  }
}

async function selectSection(sectionSlug) {
  activeSectionSlug.value = sectionSlug
  loading.value = true
  try {
    const res = await fetch(`/api/subjects/${activeSlug.value}/sections/${sectionSlug}`)
    activeSection.value = await res.json()
  } finally {
    loading.value = false
  }
}

onMounted(loadSubjects)
</script>

<style scoped>
.guide-layout {
  display: flex;
  min-height: 100vh;
}

.content-area {
  flex: 1;
  min-width: 0;
  padding: 0 32px 48px;
  max-width: 960px;
}

.header {
  padding: 40px 0 24px;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 600px;
}

.section-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 16px 0 28px;
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 5;
  border-bottom: 1px solid var(--border);
  margin-bottom: 28px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.nav-btn:hover {
  color: var(--text);
  border-color: var(--accent);
}

.nav-btn.active {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: var(--accent);
}

.nav-icon {
  font-size: 0.95rem;
}

.main {
  min-height: 400px;
}

.loading {
  text-align: center;
  color: var(--text-muted);
  padding: 48px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
