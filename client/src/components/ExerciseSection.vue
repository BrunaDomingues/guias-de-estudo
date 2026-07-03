<template>
  <section class="section">
    <h2 class="section-title">{{ content.title }}</h2>
    <p class="section-desc">{{ content.prompt }}</p>

    <div class="editor-wrap">
      <div class="toolbar">
        <button
          v-for="btn in content.helperButtons"
          :key="btn"
          type="button"
          class="kw-btn"
          @click="insertKeyword(btn)"
        >
          {{ btn }}
        </button>
      </div>

      <textarea
        ref="textareaRef"
        v-model="code"
        class="editor"
        :placeholder="content.placeholder || 'Escreva seu cenário Gherkin aqui...'"
        spellcheck="false"
        @input="onInput"
      />
    </div>

    <div class="validation">
      <div class="validation-header">
        <span class="validation-title">Validação</span>
        <span :class="['score', { complete: allPassed }]">
          {{ passedCount }}/{{ results.length }}
        </span>
      </div>

      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }" />
      </div>

      <ul class="checklist">
        <li
          v-for="item in results"
          :key="item.id"
          :class="['check-item', { passed: item.passed }]"
        >
          <span class="check-icon">{{ item.passed ? '✓' : '○' }}</span>
          {{ item.label }}
        </li>
      </ul>
    </div>

    <Transition name="fade">
      <div v-if="allPassed" class="success-box">
        {{ content.successMessage }}
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { validateExercise } from '../utils/exerciseValidators.js'

const props = defineProps({
  content: { type: Object, required: true }
})

const textareaRef = ref(null)
const code = ref(props.content.starterText || '')

const results = computed(() =>
  validateExercise(code.value, props.content.rules || [])
)

const passedCount = computed(() => results.value.filter(r => r.passed).length)
const allPassed = computed(() =>
  results.value.length > 0 && passedCount.value === results.value.length
)
const progressPercent = computed(() =>
  results.value.length ? (passedCount.value / results.value.length) * 100 : 0
)

function insertKeyword(keyword) {
  const el = textareaRef.value
  if (!el) {
    code.value += (code.value ? '\n' : '') + keyword + ' '
    return
  }

  const start = el.selectionStart
  const end = el.selectionEnd
  const before = code.value.slice(0, start)
  const after = code.value.slice(end)
  const prefix = before && !before.endsWith('\n') ? '\n' : ''
  const insertion = `${prefix}${keyword} `
  code.value = before + insertion + after

  requestAnimationFrame(() => {
    const pos = start + insertion.length
    el.focus()
    el.setSelectionRange(pos, pos)
  })
}

function onInput() {
  // reactive via v-model
}

watch(() => props.content.starterText, (val) => {
  code.value = val || ''
})
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
  font-size: 1.05rem;
  line-height: 1.7;
}

.editor-wrap {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 24px;
}

.toolbar {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-elevated);
}

.kw-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #5eead4;
  background: rgba(94, 234, 212, 0.1);
  border: 1px solid rgba(94, 234, 212, 0.25);
  transition: all 0.15s;
}

.kw-btn:hover {
  background: rgba(94, 234, 212, 0.18);
  border-color: #5eead4;
}

.editor {
  width: 100%;
  min-height: 200px;
  padding: 20px;
  background: transparent;
  border: none;
  color: var(--text);
  font-family: var(--mono);
  font-size: 0.9rem;
  line-height: 1.8;
  resize: vertical;
  outline: none;
}

.editor::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.validation {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 20px;
}

.validation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.validation-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.score {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.score.complete {
  color: #5eead4;
}

.progress-track {
  height: 4px;
  background: var(--bg-elevated);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2dd4bf, #5eead4);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.check-item.passed {
  color: #5eead4;
}

.check-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 50%;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.check-item.passed .check-icon {
  background: rgba(94, 234, 212, 0.15);
  border-color: #5eead4;
  color: #5eead4;
}

.success-box {
  padding: 16px 20px;
  border-radius: var(--radius);
  border: 1px solid rgba(94, 234, 212, 0.4);
  background: rgba(94, 234, 212, 0.08);
  color: #99f6e4;
  font-size: 0.95rem;
  line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
