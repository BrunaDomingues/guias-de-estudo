<template>
  <section class="section">
    <h2 v-if="content.intro" class="section-title">Princípios</h2>
    <p v-if="content.intro" class="section-desc">{{ content.intro }}</p>

    <div class="principle-list">
      <article
        v-for="(item, index) in content.items"
        :key="item.title"
        :class="['principle', { expanded: expanded === index }]"
        @click="expanded = expanded === index ? -1 : index"
      >
        <div class="principle-header">
          <span class="principle-num">{{ index + 1 }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <span class="chevron">{{ expanded === index ? '▲' : '▼' }}</span>
        </div>
        <Transition name="slide">
          <CodeBlock
            v-if="expanded === index && item.example"
            :code="item.example"
            variant="good"
          />
        </Transition>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

defineProps({
  content: { type: Object, required: true }
})

const expanded = ref(0)
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

.principle-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.principle {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s;
}

.principle:hover,
.principle.expanded {
  border-color: var(--accent);
}

.principle-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 24px;
}

.principle-num {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 8px;
}

.principle-header h3 {
  font-size: 1rem;
  margin-bottom: 4px;
}

.principle-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.chevron {
  margin-left: auto;
  color: var(--text-muted);
  font-size: 0.75rem;
  padding-top: 4px;
}

.principle :deep(.code-block) {
  margin: 0 24px 20px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 400px;
}
</style>
