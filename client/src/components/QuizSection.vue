<template>
  <section class="section">
    <h2 class="section-title">Quiz — teste seu conhecimento</h2>
    <p class="section-desc">
      {{ answered ? 'Veja seus resultados abaixo.' : 'Responda as perguntas e clique em verificar.' }}
    </p>

    <div class="questions">
      <article
        v-for="(q, i) in content.questions"
        :key="i"
        :class="['question', resultClass(i)]"
      >
        <p class="q-text">{{ i + 1 }}. {{ q.question }}</p>
        <div class="options">
          <label
            v-for="(opt, j) in q.options"
            :key="j"
            :class="['option', { selected: answers[i] === j, disabled: answered }]"
          >
            <input
              type="radio"
              :name="'q' + i"
              :value="j"
              :checked="answers[i] === j"
              :disabled="answered"
              @change="answers[i] = j"
            />
            <span>{{ opt }}</span>
          </label>
        </div>
        <p v-if="answered && results[i]" class="explanation">
          {{ results[i].explanation }}
        </p>
      </article>
    </div>

    <div class="actions">
      <button
        v-if="!answered"
        class="btn primary"
        :disabled="!allAnswered"
        @click="submit"
      >
        Verificar respostas
      </button>
      <button v-else class="btn secondary" @click="reset">
        Tentar novamente
      </button>
    </div>

    <div v-if="answered" class="score-card">
      <span class="score-num">{{ score }}/{{ total }}</span>
      <p class="score-msg">{{ scoreMessage }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: { type: Object, required: true },
  sectionId: { type: Number, required: true }
})

const answers = ref([])
const results = ref([])
const answered = ref(false)
const score = ref(0)
const total = ref(0)

const allAnswered = computed(() =>
  answers.value.length === props.content.questions?.length &&
  answers.value.every(a => a !== undefined && a !== null)
)

const scoreMessage = computed(() => {
  const pct = total.value ? score.value / total.value : 0
  if (pct === 1) return 'Perfeito! Você dominou o assunto.'
  if (pct >= 0.8) return 'Muito bom! Revise os pontos que errou.'
  if (pct >= 0.6) return 'Bom começo. Releia as seções anteriores.'
  return 'Continue estudando — prática leva à maestria.'
})

function resultClass(i) {
  if (!answered.value) return ''
  return results.value[i]?.correct ? 'correct' : 'wrong'
}

function initAnswers() {
  answers.value = new Array(props.content.questions?.length || 0).fill(null)
}

async function submit() {
  const res = await fetch(`/api/admin/sections/${props.sectionId}/quiz/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers: answers.value })
  })
  const data = await res.json()
  results.value = data.results
  score.value = data.score
  total.value = data.total
  answered.value = true
}

function reset() {
  initAnswers()
  results.value = []
  answered.value = false
  score.value = 0
}

initAnswers()
</script>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.section-desc {
  color: var(--text-muted);
  margin-bottom: 28px;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.question {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
}

.question.correct { border-color: rgba(74, 222, 128, 0.4); }
.question.wrong { border-color: rgba(248, 113, 113, 0.4); }

.q-text {
  font-weight: 500;
  margin-bottom: 14px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 0.9rem;
}

.option:hover:not(.disabled) {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.option.selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.option.disabled { cursor: default; }

.option input { accent-color: var(--accent); }

.explanation {
  margin-top: 12px;
  padding: 10px 14px;
  background: var(--bg-elevated);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--text-muted);
  border-left: 3px solid var(--accent);
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.btn {
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn.primary {
  background: var(--accent);
  color: #0f0f11;
}

.btn.primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn.secondary {
  background: var(--bg-card);
  color: var(--text);
  border: 1px solid var(--border);
}

.score-card {
  text-align: center;
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.score-num {
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent);
  display: block;
  margin-bottom: 8px;
}

.score-msg {
  color: var(--text-muted);
}
</style>
