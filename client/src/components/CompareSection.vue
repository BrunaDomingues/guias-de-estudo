<template>
  <section class="section">
    <h2 class="section-title">Comparativo interativo</h2>
    <p class="section-desc">Alterne entre os modos para ver código ruim vs refatorado lado a lado.</p>

    <div v-if="content.modes?.length > 1" class="toggle-group">
      <button
        v-for="mode in content.modes"
        :key="mode.key"
        :class="['toggle', { active: activeKey === mode.key }]"
        @click="activeKey = mode.key"
      >
        {{ mode.label }}
      </button>
    </div>

    <div v-if="current" class="compare-grid">
      <div class="compare-col">
        <div class="col-header bad-header">
          <span>❌ Antes</span>
          <button class="copy-btn" @click="copy(current.bad)">Copiar</button>
        </div>
        <CodeBlock :code="current.bad" variant="bad" />
        <ul class="issues">
          <li v-for="issue in current.issuesBad" :key="issue">{{ issue }}</li>
        </ul>
      </div>

      <div class="compare-col">
        <div class="col-header good-header">
          <span>✅ Depois</span>
          <button class="copy-btn" @click="copy(current.good)">Copiar</button>
        </div>
        <CodeBlock :code="current.good" variant="good" />
        <ul class="issues good-issues">
          <li v-for="issue in current.issuesGood" :key="issue">{{ issue }}</li>
        </ul>
      </div>
    </div>

    <p v-if="copied" class="toast">Copiado!</p>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps({
  content: { type: Object, required: true }
})

const activeKey = ref('')
const copied = ref(false)

const current = computed(() =>
  props.content.modes?.find(m => m.key === activeKey.value) || props.content.modes?.[0]
)

watch(() => props.content, (c) => {
  if (c.modes?.length) activeKey.value = c.modes[0].key
}, { immediate: true })

async function copy(text) {
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
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

.toggle-group {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.toggle {
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.toggle.active {
  color: var(--blue);
  background: var(--blue-soft);
  border-color: var(--blue);
}

.compare-grid {
  display: grid;
  gap: 24px;
}

@media (min-width: 640px) {
  .compare-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.col-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-weight: 600;
  font-size: 0.875rem;
}

.bad-header { color: var(--red); }
.good-header { color: var(--green); }

.copy-btn {
  font-size: 0.75rem;
  color: var(--text-muted);
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.copy-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.issues {
  list-style: none;
  margin-top: 12px;
}

.issues li {
  font-size: 0.85rem;
  color: var(--red);
  padding: 6px 0 6px 20px;
  position: relative;
}

.issues li::before {
  content: '×';
  position: absolute;
  left: 0;
  font-weight: 700;
}

.good-issues li {
  color: var(--green);
}

.good-issues li::before {
  content: '✓';
}

.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green);
  color: #0f0f11;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
}
</style>
