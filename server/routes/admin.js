import { Router } from 'express'
import store from '../db.js'

const router = Router()

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const tokens = new Set()

function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token || !tokens.has(token)) {
    return res.status(401).json({ error: 'Não autorizado' })
  }
  next()
}

function parseContent(section) {
  return {
    ...section,
    content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content
  }
}

router.post('/login', (req, res) => {
  const { password } = req.body
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' })
  }
  const token = crypto.randomUUID()
  tokens.add(token)
  res.json({ token })
})

router.post('/logout', auth, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  tokens.delete(token)
  res.json({ ok: true })
})

router.get('/subjects', auth, (_, res) => {
  res.json(store.getSubjects())
})

router.post('/subjects', auth, (req, res) => {
  const { slug, title, subtitle, badge, icon, sort_order } = req.body
  if (!slug || !title) return res.status(400).json({ error: 'slug e title são obrigatórios' })
  const subject = store.createSubject({
    slug, title, subtitle: subtitle || '', badge: badge || '', icon: icon || '📚', sort_order: sort_order ?? 0
  })
  res.status(201).json(subject)
})

router.put('/subjects/:id', auth, (req, res) => {
  const { slug, title, subtitle, badge, icon, sort_order } = req.body
  const subject = store.updateSubject(req.params.id, { slug, title, subtitle, badge, icon, sort_order })
  if (!subject) return res.status(404).json({ error: 'Assunto não encontrado' })
  res.json(subject)
})

router.delete('/subjects/:id', auth, (req, res) => {
  const existing = store.getSubjectById(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Assunto não encontrado' })
  store.deleteSubject(req.params.id)
  res.json({ ok: true })
})

router.get('/subjects/:subjectId/sections', auth, (req, res) => {
  const sections = store.getSectionsBySubjectId(req.params.subjectId).map(parseContent)
  res.json(sections)
})

router.post('/subjects/:subjectId/sections', auth, (req, res) => {
  const { slug, label, icon, type, content, sort_order } = req.body
  if (!slug || !label || !type) {
    return res.status(400).json({ error: 'slug, label e type são obrigatórios' })
  }
  const section = store.createSection({
    subject_id: Number(req.params.subjectId),
    slug, label, icon: icon || '📄', type, content: content || {}, sort_order: sort_order ?? 0
  })
  res.status(201).json(parseContent(section))
})

router.put('/sections/:id', auth, (req, res) => {
  const { slug, label, icon, type, content, sort_order } = req.body
  const section = store.updateSection(req.params.id, { slug, label, icon, type, content, sort_order })
  if (!section) return res.status(404).json({ error: 'Seção não encontrada' })
  res.json(parseContent(section))
})

router.delete('/sections/:id', auth, (req, res) => {
  const existing = store.getSectionById(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Seção não encontrada' })
  store.deleteSection(req.params.id)
  res.json({ ok: true })
})

router.post('/sections/:id/quiz/check', (req, res) => {
  const section = store.getSectionById(req.params.id)
  if (!section || section.type !== 'quiz') {
    return res.status(404).json({ error: 'Quiz não encontrado' })
  }
  const { questions } = JSON.parse(section.content)
  const { answers } = req.body
  if (!Array.isArray(answers)) return res.status(400).json({ error: 'answers deve ser um array' })

  const results = questions.map((q, i) => ({
    id: i,
    correct: answers[i] === q.correct,
    explanation: q.explanation,
    correctIndex: q.correct
  }))

  res.json({
    score: results.filter(r => r.correct).length,
    total: questions.length,
    results
  })
})

export default router
