<template>
  <div class="code-block" :class="variant">
    <div v-if="label" class="code-label">{{ label }}</div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup>
defineProps({
  code: { type: String, required: true },
  label: { type: String, default: '' },
  variant: { type: String, default: 'neutral' }
})
</script>

<style scoped>
.code-block {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.code-block.bad {
  border-color: rgba(248, 113, 113, 0.3);
}

.code-block.good {
  border-color: rgba(74, 222, 128, 0.3);
}

.code-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
}

.bad .code-label {
  color: var(--red);
  background: var(--red-soft);
}

.good .code-label {
  color: var(--green);
  background: var(--green-soft);
}

pre {
  padding: 16px;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.7;
  color: var(--text-muted);
}

code {
  white-space: pre;
}
</style>
