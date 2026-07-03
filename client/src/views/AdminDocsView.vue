<template>
  <div class="docs">
    <header class="docs-header">
      <div>
        <router-link to="/admin" class="back">← Voltar ao admin</router-link>
        <h1>Documentação de conteúdo</h1>
        <p class="subtitle">{{ docs.intro.description }}</p>
      </div>
      <router-link to="/" class="btn-outline">Ver guia</router-link>
    </header>

    <div class="docs-layout">
      <nav class="docs-nav">
        <a href="#assunto" class="nav-link">Assunto</a>
        <a href="#secao" class="nav-link">Seção</a>
        <a
          v-for="t in docs.types"
          :key="t.id"
          :href="'#' + t.id"
          class="nav-link"
        >
          {{ t.label }}
        </a>
        <a href="#fluxo" class="nav-link">Fluxo</a>
      </nav>

      <main class="docs-main">
        <section id="assunto" class="doc-section">
          <h2>{{ docs.subject.title }}</h2>
          <table class="field-table">
            <thead>
              <tr><th>Campo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr v-for="f in docs.subject.fields" :key="f.name">
                <td><code>{{ f.name }}</code></td>
                <td>{{ f.desc }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="secao" class="doc-section">
          <h2>{{ docs.sectionCommon.title }}</h2>
          <table class="field-table">
            <thead>
              <tr><th>Campo</th><th>Descrição</th></tr>
            </thead>
            <tbody>
              <tr v-for="f in docs.sectionCommon.fields" :key="f.name">
                <td><code>{{ f.name }}</code></td>
                <td>{{ f.desc }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section
          v-for="t in docs.types"
          :id="t.id"
          :key="t.id"
          class="doc-section"
        >
          <div class="type-badge">{{ t.name }}</div>
          <h2>{{ t.label }}</h2>
          <p class="when">{{ t.when }}</p>

          <h3>Campos do conteúdo</h3>
          <ul class="field-list">
            <li v-for="(field, i) in t.fields" :key="i">{{ field }}</li>
          </ul>

          <template v-if="t.checks">
            <h3>Tipos de validação (exercise)</h3>
            <table class="field-table">
              <thead>
                <tr><th>check</th><th>O que valida</th></tr>
              </thead>
              <tbody>
                <tr v-for="c in t.checks" :key="c.check">
                  <td><code>{{ c.check }}</code></td>
                  <td>{{ c.desc }}</td>
                </tr>
              </tbody>
            </table>
          </template>

          <h3>Exemplo JSON</h3>
          <pre class="code-sample"><code>{{ t.example }}</code></pre>
        </section>

        <section id="fluxo" class="doc-section">
          <h2>Fluxo recomendado</h2>
          <ol class="workflow">
            <li v-for="(step, i) in docs.workflow" :key="i">{{ step }}</li>
          </ol>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { adminDocs as docs } from '../data/adminDocs.js'
</script>

<style scoped>
.docs {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.docs-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
}

.back {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  display: block;
  margin-bottom: 8px;
}

.back:hover { color: var(--accent); }

.docs-header h1 {
  font-size: 1.75rem;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-muted);
  max-width: 560px;
  line-height: 1.6;
}

.btn-outline {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  white-space: nowrap;
}

.btn-outline:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.docs-layout {
  display: grid;
  gap: 32px;
}

@media (min-width: 900px) {
  .docs-layout {
    grid-template-columns: 200px 1fr;
    align-items: start;
  }
}

.docs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  position: sticky;
  top: 16px;
}

@media (min-width: 900px) {
  .docs-nav {
    flex-direction: column;
    flex-wrap: nowrap;
  }
}

.nav-link {
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.15s;
}

.nav-link:hover {
  background: var(--bg-card);
  color: var(--accent);
}

.doc-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 28px;
  margin-bottom: 20px;
  scroll-margin-top: 24px;
}

.doc-section h2 {
  font-size: 1.25rem;
  margin-bottom: 12px;
}

.doc-section h3 {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 20px 0 10px;
  font-weight: 600;
}

.type-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
}

.when {
  color: var(--text-muted);
  margin-bottom: 16px;
  line-height: 1.6;
}

.field-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.field-table th,
.field-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

.field-table th {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.8rem;
}

.field-table code {
  background: var(--bg-elevated);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.field-list {
  padding-left: 20px;
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 0.9rem;
}

.code-sample {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-size: 0.78rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.workflow {
  padding-left: 20px;
  line-height: 2;
  color: var(--text-muted);
}
</style>
