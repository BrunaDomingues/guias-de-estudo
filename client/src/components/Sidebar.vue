<template>
  <div class="layout">
    <aside :class="['sidebar', { collapsed: collapsed }]">
      <div class="sidebar-header">
        <span class="logo">📖</span>
        <span v-if="!collapsed" class="logo-text">Guias de Estudo</span>
        <button class="collapse-btn" :title="collapsed ? 'Expandir' : 'Recolher'" @click="collapsed = !collapsed">
          {{ collapsed ? '»' : '«' }}
        </button>
      </div>

      <nav class="subject-list">
        <p v-if="!collapsed" class="nav-label">Assuntos</p>
        <button
          v-for="subject in subjects"
          :key="subject.slug"
          :class="['subject-btn', { active: activeSlug === subject.slug }]"
          :title="subject.title"
          @click="$emit('select-subject', subject.slug)"
        >
          <span class="subject-icon">{{ subject.icon }}</span>
          <span v-if="!collapsed" class="subject-info">
            <span class="subject-title">{{ subject.title }}</span>
            <span class="subject-badge">{{ subject.badge }}</span>
          </span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/admin" class="admin-link" :title="collapsed ? 'Admin' : ''">
          <span>⚙️</span>
          <span v-if="!collapsed">Painel Admin</span>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  subjects: { type: Array, default: () => [] },
  activeSlug: { type: String, default: '' }
})

defineEmits(['select-subject'])

const collapsed = ref(false)
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-height: 100vh;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.2s;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border);
}

.logo {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.logo-text {
  font-weight: 700;
  font-size: 0.95rem;
  flex: 1;
  white-space: nowrap;
}

.collapse-btn {
  color: var(--text-muted);
  font-size: 1rem;
  padding: 4px 6px;
  border-radius: 6px;
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: var(--bg-elevated);
  color: var(--text);
}

.subject-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  padding: 8px 12px 4px;
}

.subject-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--text-muted);
  text-align: left;
  transition: all 0.15s;
  margin-bottom: 4px;
}

.subject-btn:hover {
  background: var(--bg-elevated);
  color: var(--text);
}

.subject-btn.active {
  background: var(--accent-soft);
  color: var(--accent);
}

.subject-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  width: 28px;
  text-align: center;
}

.subject-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.subject-title {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subject-badge {
  font-size: 0.7rem;
  opacity: 0.7;
}

.sidebar-footer {
  padding: 12px 8px;
  border-top: 1px solid var(--border);
}

.admin-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.15s;
}

.admin-link:hover {
  background: var(--bg-elevated);
  color: var(--text);
}
</style>
