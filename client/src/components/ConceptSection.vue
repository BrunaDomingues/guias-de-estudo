<template>
  <section class="section">
    <h2 class="section-title">{{ content.title }}</h2>
    <p class="section-desc">{{ content.description }}</p>

    <div v-if="content.heroCode" class="hero-code">
      <CodeBlock
        :label="content.heroCodeLabel || ''"
        :code="content.heroCode"
      />
    </div>

    <div v-if="content.cards?.length" class="cards">
      <article v-for="card in content.cards" :key="card.title" class="card">
        <span class="card-tag">{{ card.tag }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </article>
    </div>

    <div v-if="content.pillars?.length" class="pillars">
      <div v-for="pillar in content.pillars" :key="pillar.title" class="pillar">
        <span class="pillar-icon">{{ pillar.icon }}</span>
        <div>
          <strong>{{ pillar.title }}</strong>
          <p>{{ pillar.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CodeBlock from './CodeBlock.vue'

defineProps({
  content: { type: Object, required: true }
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
  margin-bottom: 28px;
  font-size: 1.05rem;
}

.hero-code {
  margin-bottom: 32px;
}

.cards {
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
}

.card-tag {
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

.card h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.card p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.pillars {
  display: grid;
  gap: 12px;
}

.pillar {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.pillar-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.pillar strong {
  display: block;
  margin-bottom: 4px;
}

.pillar p {
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
