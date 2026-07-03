import { Router } from 'express'
import store from '../db.js'

const router = Router()

function parseSection(row, subject) {
  const content = typeof row.content === 'string' ? JSON.parse(row.content) : row.content
  const section = {
    id: row.id,
    slug: row.slug,
    label: row.label,
    icon: row.icon,
    type: row.type,
    sort_order: row.sort_order,
    content
  }

  if (section.type === 'quiz') {
    section.content = {
      questions: content.questions.map(({ correct, explanation, ...q }) => q)
    }
  }

  if (subject) {
    section.subject_slug = subject.slug
    section.subject_title = subject.title
  }

  return section
}

router.get('/', (_, res) => {
  res.json(store.getSubjects().map(({ created_at, updated_at, ...s }) => s))
})

router.get('/:slug', (req, res) => {
  const subject = store.getSubjectBySlug(req.params.slug)
  if (!subject) return res.status(404).json({ error: 'Assunto não encontrado' })

  const sections = store.getSectionsBySubjectId(subject.id).map(s => ({
    id: s.id,
    slug: s.slug,
    label: s.label,
    icon: s.icon,
    type: s.type,
    sort_order: s.sort_order
  }))

  const { created_at, updated_at, ...meta } = subject
  res.json({ ...meta, sections })
})

router.get('/:slug/sections/:sectionSlug', (req, res) => {
  const subject = store.getSubjectBySlug(req.params.slug)
  const row = store.getSection(req.params.slug, req.params.sectionSlug)
  if (!row) return res.status(404).json({ error: 'Seção não encontrada' })
  res.json(parseSection(row, subject))
})

export default router
