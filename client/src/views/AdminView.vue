<template>
  <div class="admin">
    <header class="admin-header">
      <div>
        <router-link to="/" class="back">← Voltar ao guia</router-link>
        <h1>Painel Admin</h1>
      </div>
      <div v-if="token" class="header-actions">
        <router-link to="/admin/docs" class="btn-outline">📖 Documentação</router-link>
        <button class="btn-outline" @click="logout">Sair</button>
      </div>
    </header>

    <!-- Login -->
    <div v-if="!token" class="login-card">
      <h2>Entrar</h2>
      <p class="hint">Senha padrão: <code>admin123</code> (configure via <code>ADMIN_PASSWORD</code>)</p>
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        @keyup.enter="login"
      />
      <button class="btn primary" :disabled="loggingIn" @click="login">
        {{ loggingIn ? 'Entrando...' : 'Entrar' }}
      </button>
      <p v-if="loginError" class="error">{{ loginError }}</p>
      <router-link to="/admin/docs" class="docs-link">📖 Ver documentação de conteúdo</router-link>
    </div>

    <!-- Dashboard -->
    <div v-else class="dashboard">
      <div class="panel">
        <div class="panel-header">
          <h2>Assuntos</h2>
          <button class="btn primary small" @click="openSubjectForm()">+ Novo</button>
        </div>

        <div v-for="subject in subjects" :key="subject.id" class="list-item">
          <div class="item-info" @click="selectSubject(subject)">
            <span class="item-icon">{{ subject.icon }}</span>
            <div>
              <strong>{{ subject.title }}</strong>
              <span class="item-meta">{{ subject.slug }}</span>
            </div>
          </div>
          <div class="item-actions">
            <button @click="openSubjectForm(subject)">Editar</button>
            <button class="danger" @click="deleteSubject(subject.id)">Excluir</button>
          </div>
        </div>
      </div>

      <div v-if="selectedSubject" class="panel">
        <div class="panel-header">
          <h2>Seções — {{ selectedSubject.title }}</h2>
          <button class="btn primary small" @click="openSectionForm()">+ Nova seção</button>
        </div>

        <div v-for="section in sections" :key="section.id" class="list-item">
          <div class="item-info">
            <span class="item-icon">{{ section.icon }}</span>
            <div>
              <strong>{{ section.label }}</strong>
              <span class="item-meta">{{ section.type }} · {{ section.slug }}</span>
            </div>
          </div>
          <div class="item-actions">
            <button @click="openSectionForm(section)">Editar</button>
            <button class="danger" @click="deleteSection(section.id)">Excluir</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="modal" class="modal-overlay" @click.self="modal = null">
      <div class="modal">
        <h3>{{ modal.title }}</h3>

        <template v-if="modal.type === 'subject'">
          <label>Slug <input v-model="modal.data.slug" /></label>
          <label>Título <input v-model="modal.data.title" /></label>
          <label>Subtítulo <input v-model="modal.data.subtitle" /></label>
          <label>Badge <input v-model="modal.data.badge" /></label>
          <label>Ícone <input v-model="modal.data.icon" /></label>
          <label>Ordem <input v-model.number="modal.data.sort_order" type="number" /></label>
        </template>

        <template v-else>
          <label>Slug <input v-model="modal.data.slug" /></label>
          <label>Label <input v-model="modal.data.label" /></label>
          <label>Ícone <input v-model="modal.data.icon" /></label>
          <label>Tipo
            <select v-model="modal.data.type" @change="onSectionTypeChange">
              <option value="concept">concept</option>
              <option value="principles">principles</option>
              <option value="solid">solid</option>
              <option value="compare">compare</option>
              <option value="quiz">quiz</option>
              <option value="exercise">exercise (textarea + validação)</option>
            </select>
          </label>
          <label>Ordem <input v-model.number="modal.data.sort_order" type="number" /></label>

          <template v-if="modal.data.type === 'exercise'">
            <div class="exercise-form">
              <label>Título do exercício <input v-model="modal.exercise.title" /></label>
              <label>Enunciado (prompt)
                <textarea v-model="modal.exercise.prompt" rows="3" />
              </label>
              <label>Placeholder do textarea
                <textarea v-model="modal.exercise.placeholder" rows="2" />
              </label>
              <label>Texto inicial (opcional)
                <textarea v-model="modal.exercise.starterText" rows="2" />
              </label>
              <label>Botões de atalho (separados por vírgula)
                <input v-model="modal.exercise.helperButtonsText" placeholder="Dado, Quando, Então" />
              </label>
              <label>Mensagem de sucesso
                <textarea v-model="modal.exercise.successMessage" rows="2" />
              </label>

              <div class="rules-block">
                <div class="rules-header">
                  <span>Regras de validação</span>
                  <button type="button" class="btn small" @click="addRule">+ Regra</button>
                </div>
                <div v-for="(rule, i) in modal.exercise.rules" :key="i" class="rule-row">
                  <input v-model="rule.label" placeholder="Texto da regra" />
                  <select v-model="rule.check">
                    <option value="hasScenario">Tem Cenário</option>
                    <option value="hasGiven">Tem Dado</option>
                    <option value="hasOneWhen">Um Quando</option>
                    <option value="hasThen">Tem Então</option>
                    <option value="hasNumbers">Tem números</option>
                    <option value="hasKeyword">Palavra-chave</option>
                    <option value="regex">Regex</option>
                  </select>
                  <input
                    v-if="rule.check === 'hasKeyword'"
                    v-model="rule.keyword"
                    placeholder="palavra"
                  />
                  <input
                    v-if="rule.check === 'regex'"
                    v-model="rule.pattern"
                    placeholder="padrão regex"
                  />
                  <button type="button" class="danger small" @click="removeRule(i)">×</button>
                </div>
              </div>
            </div>
          </template>

          <label v-else>Conteúdo (JSON)
            <textarea v-model="modal.contentJson" rows="14" />
          </label>
        </template>

        <p v-if="modal.error" class="error">{{ modal.error }}</p>

        <div class="modal-actions">
          <button class="btn-outline" @click="modal = null">Cancelar</button>
          <button class="btn primary" @click="saveModal">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { exerciseTemplate } from '../utils/exerciseValidators.js'

const token = ref(localStorage.getItem('admin_token') || '')
const password = ref('')
const loginError = ref('')
const loggingIn = ref(false)
const subjects = ref([])
const sections = ref([])
const selectedSubject = ref(null)
const modal = ref(null)

function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.value}`
  }
}

async function login() {
  loggingIn.value = true
  loginError.value = ''
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })
    if (!res.ok) throw new Error('Senha incorreta')
    const data = await res.json()
    token.value = data.token
    localStorage.setItem('admin_token', data.token)
    await loadSubjects()
  } catch (e) {
    loginError.value = e.message
  } finally {
    loggingIn.value = false
  }
}

async function logout() {
  await fetch('/api/admin/logout', { method: 'POST', headers: headers() })
  token.value = ''
  localStorage.removeItem('admin_token')
}

async function loadSubjects() {
  const res = await fetch('/api/admin/subjects', { headers: headers() })
  if (res.status === 401) { logout(); return }
  subjects.value = await res.json()
}

async function selectSubject(subject) {
  selectedSubject.value = subject
  const res = await fetch(`/api/admin/subjects/${subject.id}/sections`, { headers: headers() })
  sections.value = await res.json()
}

function openSubjectForm(subject = null) {
  modal.value = {
    type: 'subject',
    title: subject ? 'Editar assunto' : 'Novo assunto',
    id: subject?.id,
    data: subject ? { ...subject } : { slug: '', title: '', subtitle: '', badge: '', icon: '📚', sort_order: 0 },
    error: ''
  }
}

function buildExerciseFromContent(content) {
  return {
    title: content.title || '',
    prompt: content.prompt || '',
    placeholder: content.placeholder || '',
    starterText: content.starterText || '',
    helperButtonsText: (content.helperButtons || []).join(', '),
    successMessage: content.successMessage || '',
    rules: (content.rules || []).map(r => ({ ...r }))
  }
}

function exerciseToContent(exercise) {
  return {
    title: exercise.title,
    prompt: exercise.prompt,
    placeholder: exercise.placeholder,
    starterText: exercise.starterText,
    helperButtons: exercise.helperButtonsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
    successMessage: exercise.successMessage,
    rules: exercise.rules.map((r, i) => ({
      id: r.id || `rule-${i}`,
      label: r.label,
      check: r.check,
      ...(r.keyword ? { keyword: r.keyword } : {}),
      ...(r.pattern ? { pattern: r.pattern } : {})
    }))
  }
}

function openSectionForm(section = null) {
  const isExercise = section?.type === 'exercise' || false
  modal.value = {
    type: 'section',
    title: section ? 'Editar seção' : 'Nova seção',
    id: section?.id,
    data: section
      ? { ...section, content: undefined }
      : { slug: '', label: '', icon: '📄', type: 'concept', sort_order: 0 },
    contentJson: JSON.stringify(section?.content || { title: '', description: '' }, null, 2),
    exercise: isExercise
      ? buildExerciseFromContent(section.content)
      : buildExerciseFromContent(exerciseTemplate),
    error: ''
  }
}

function onSectionTypeChange() {
  if (modal.value.data.type === 'exercise' && !modal.value.id) {
    modal.value.exercise = buildExerciseFromContent(exerciseTemplate)
  }
}

function addRule() {
  modal.value.exercise.rules.push({
    id: `rule-${Date.now()}`,
    label: 'Nova regra',
    check: 'hasGiven'
  })
}

function removeRule(index) {
  modal.value.exercise.rules.splice(index, 1)
}

async function saveModal() {
  try {
    if (modal.value.type === 'subject') {
      const url = modal.value.id
        ? `/api/admin/subjects/${modal.value.id}`
        : '/api/admin/subjects'
      const res = await fetch(url, {
        method: modal.value.id ? 'PUT' : 'POST',
        headers: headers(),
        body: JSON.stringify(modal.value.data)
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Erro ao salvar')
      modal.value = null
      await loadSubjects()
    } else {
      let content
      if (modal.value.data.type === 'exercise') {
        content = exerciseToContent(modal.value.exercise)
      } else {
        try {
          content = JSON.parse(modal.value.contentJson)
        } catch {
          throw new Error('JSON inválido no conteúdo')
        }
      }

      const url = modal.value.id
        ? `/api/admin/sections/${modal.value.id}`
        : `/api/admin/subjects/${selectedSubject.value.id}/sections`

      const res = await fetch(url, {
        method: modal.value.id ? 'PUT' : 'POST',
        headers: headers(),
        body: JSON.stringify({ ...modal.value.data, content })
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Erro ao salvar')
      modal.value = null
      await selectSubject(selectedSubject.value)
    }
  } catch (e) {
    modal.value.error = e.message
  }
}

async function deleteSubject(id) {
  if (!confirm('Excluir assunto e todas as seções?')) return
  await fetch(`/api/admin/subjects/${id}`, { method: 'DELETE', headers: headers() })
  selectedSubject.value = null
  sections.value = []
  await loadSubjects()
}

async function deleteSection(id) {
  if (!confirm('Excluir seção?')) return
  await fetch(`/api/admin/sections/${id}`, { method: 'DELETE', headers: headers() })
  await selectSubject(selectedSubject.value)
}

onMounted(() => {
  if (token.value) loadSubjects()
})
</script>

<style scoped>
.admin {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.header-actions .btn-outline {
  text-decoration: none;
}

.back {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  display: block;
  margin-bottom: 8px;
}

.back:hover { color: var(--accent); }

.admin-header h1 {
  font-size: 1.75rem;
}

.login-card {
  max-width: 400px;
  margin: 48px auto;
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.login-card h2 {
  margin-bottom: 8px;
}

.hint {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 20px;
}

.hint code {
  background: var(--bg-elevated);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.login-card input {
  width: 100%;
  padding: 12px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  margin-bottom: 16px;
  font-size: 1rem;
}

.docs-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  text-decoration: none;
}

.docs-link:hover {
  color: var(--accent);
}

.dashboard {
  display: grid;
  gap: 24px;
}

@media (min-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr 1fr;
  }
}

.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h2 {
  font-size: 1.1rem;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background 0.15s;
}

.list-item:hover {
  background: var(--bg-elevated);
}

.item-info {
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  flex: 1;
  min-width: 0;
}

.item-icon {
  font-size: 1.25rem;
}

.item-meta {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.item-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.item-actions button {
  padding: 6px 10px;
  font-size: 0.75rem;
  border-radius: 6px;
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.item-actions button:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.item-actions button.danger:hover {
  color: var(--red);
  border-color: var(--red);
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
}

.btn.primary {
  background: var(--accent);
  color: #0f0f11;
}

.btn.small {
  padding: 6px 14px;
  font-size: 0.8rem;
}

.btn-outline {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.error {
  color: var(--red);
  font-size: 0.85rem;
  margin-top: 8px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
}

.modal {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal h3 {
  margin-bottom: 20px;
}

.modal label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.modal input,
.modal select,
.modal textarea {
  display: block;
  width: 100%;
  margin-top: 4px;
  padding: 10px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--mono);
  font-size: 0.85rem;
}

.modal textarea {
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

.exercise-form {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}

.rules-block {
  margin-top: 8px;
}

.rules-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.rule-row {
  display: grid;
  grid-template-columns: 1fr 140px auto auto;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.rule-row input,
.rule-row select {
  font-family: var(--font);
  font-size: 0.8rem;
  padding: 8px 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
}

.rule-row button.danger.small {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 1rem;
}

.rule-row button.danger.small:hover {
  color: var(--red);
  border-color: var(--red);
}
</style>
