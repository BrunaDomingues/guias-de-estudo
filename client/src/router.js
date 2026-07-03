import { createRouter, createWebHistory } from 'vue-router'
import GuideView from './views/GuideView.vue'
import AdminView from './views/AdminView.vue'
import AdminDocsView from './views/AdminDocsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'guide', component: GuideView },
    { path: '/admin', name: 'admin', component: AdminView },
    { path: '/admin/docs', name: 'admin-docs', component: AdminDocsView }
  ]
})

export default router
