<template>
  <section class="section">
    <h2 class="section-title">Os 5 princípios SOLID</h2>
    <p v-if="content.intro" class="section-desc">{{ content.intro }}</p>

    <div class="solid-tabs">
      <button
        v-for="(p, i) in content.items"
        :key="p.letter"
        :class="['solid-tab', { active: active === i }]"
        @click="active = i"
      >
        <span class="letter">{{ p.letter }}</span>
        <span class="tab-name">{{ p.name.split(' ')[0] }}</span>
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <article :key="active" class="solid-detail">
        <div class="solid-header">
          <span class="big-letter">{{ current.letter }}</span>
          <div>
            <h3>{{ current.name }}</h3>
            <span class="subtitle">{{ current.subtitle }}</span>
          </div>
        </div>
        <p class="solid-desc">{{ current.description }}</p>
        <div class="compare-grid">
          <CodeBlock :code="current.bad" label="❌ Violando" variant="bad" />
          <CodeBlock :code="current.good" label="✅ Aplicando" variant="good" />
        </div>
      </article>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps({
  content: { type: Object, required: true }
})

const active = ref(0)
const current = computed(() => props.content.items[active.value])
</script>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.section-desc {
  color: var(--text-muted);
  margin-bottom: 24px;
}

.solid-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.solid-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  min-width: 72px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-muted);
  transition: all 0.2s;
}

.solid-tab:hover {
  border-color: var(--purple);
  color: var(--text);
}

.solid-tab.active {
  background: rgba(167, 139, 250, 0.12);
  border-color: var(--purple);
  color: var(--purple);
}

.letter {
  font-size: 1.25rem;
  font-weight: 700;
}

.tab-name {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.solid-detail {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}

.solid-header {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.big-letter {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--purple);
  background: rgba(167, 139, 250, 0.12);
  border-radius: 12px;
}

.solid-header h3 {
  font-size: 1.15rem;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.solid-desc {
  color: var(--text-muted);
  margin-bottom: 24px;
  font-size: 0.95rem;
}

.compare-grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 640px) {
  .compare-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
