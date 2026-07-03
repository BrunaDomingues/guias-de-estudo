<template>
  <component
    :is="componentMap[section.type]"
    v-if="section"
    :content="section.content"
    :section-id="section.id"
  />
  <p v-else class="empty">Selecione uma seção.</p>
</template>

<script setup>
import ConceptSection from './ConceptSection.vue'
import CleanCodeSection from './CleanCodeSection.vue'
import SolidSection from './SolidSection.vue'
import CompareSection from './CompareSection.vue'
import QuizSection from './QuizSection.vue'
import ExerciseSection from './ExerciseSection.vue'

defineProps({
  section: { type: Object, default: null }
})

const componentMap = {
  concept: ConceptSection,
  principles: CleanCodeSection,
  solid: SolidSection,
  compare: CompareSection,
  quiz: QuizSection,
  exercise: ExerciseSection
}
</script>

<style scoped>
.empty {
  color: var(--text-muted);
  text-align: center;
  padding: 48px;
}
</style>
