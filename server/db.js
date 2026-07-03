import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { seedData, migrateSplitCleanCodeSubjects } from './seed.js'
import { bddExerciseContent } from './exerciseTemplate.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'data')
mkdirSync(dataDir, { recursive: true })

const dbPath = join(dataDir, 'guides.json')

function load() {
  if (!existsSync(dbPath)) {
    return { subjects: [], sections: [], _nextId: { subjects: 1, sections: 1 } }
  }
  return JSON.parse(readFileSync(dbPath, 'utf-8'))
}

function save(data) {
  writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8')
}

let data = load()

function nextId(table) {
  const id = data._nextId[table]++
  save(data)
  return id
}

const store = {
  getSubjects() {
    return [...data.subjects].sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
  },

  getSubjectBySlug(slug) {
    return data.subjects.find(s => s.slug === slug)
  },

  getSubjectById(id) {
    return data.subjects.find(s => s.id === Number(id))
  },

  getSectionsBySubjectId(subjectId) {
    return data.sections
      .filter(s => s.subject_id === Number(subjectId))
      .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
  },

  getSection(subjectSlug, sectionSlug) {
    const subject = this.getSubjectBySlug(subjectSlug)
    if (!subject) return null
    return data.sections.find(s => s.subject_id === subject.id && s.slug === sectionSlug)
  },

  getSectionById(id) {
    return data.sections.find(s => s.id === Number(id))
  },

  createSubject(row) {
    const subject = {
      id: nextId('subjects'),
      ...row,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    data.subjects.push(subject)
    save(data)
    return subject
  },

  updateSubject(id, row) {
    const idx = data.subjects.findIndex(s => s.id === Number(id))
    if (idx === -1) return null
    data.subjects[idx] = { ...data.subjects[idx], ...row, updated_at: new Date().toISOString() }
    save(data)
    return data.subjects[idx]
  },

  deleteSubject(id) {
    const n = Number(id)
    data.subjects = data.subjects.filter(s => s.id !== n)
    data.sections = data.sections.filter(s => s.subject_id !== n)
    save(data)
    return true
  },

  createSection(row) {
    const content = typeof row.content === 'string' ? row.content : JSON.stringify(row.content || {})
    const section = {
      id: nextId('sections'),
      subject_id: row.subject_id,
      slug: row.slug,
      label: row.label,
      icon: row.icon || '📄',
      type: row.type,
      content,
      sort_order: row.sort_order ?? 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    data.sections.push(section)
    save(data)
    return section
  },

  updateSection(id, row) {
    const idx = data.sections.findIndex(s => s.id === Number(id))
    if (idx === -1) return null
    const content = row.content !== undefined
      ? (typeof row.content === 'string' ? row.content : JSON.stringify(row.content))
      : data.sections[idx].content
    data.sections[idx] = {
      ...data.sections[idx],
      ...row,
      content,
      updated_at: new Date().toISOString()
    }
    save(data)
    return data.sections[idx]
  },

  deleteSection(id) {
    data.sections = data.sections.filter(s => s.id !== Number(id))
    save(data)
    return true
  }
}

if (data.subjects.length === 0) {
  seedData(store)
} else {
  migrateSplitCleanCodeSubjects(store)

  const bdd = data.subjects.find(s => s.slug === 'bdd')
  if (bdd && !data.sections.some(s => s.subject_id === bdd.id && s.slug === 'exercicio')) {
    store.createSection({
      subject_id: bdd.id,
      slug: 'exercicio',
      label: 'Exercício',
      icon: '✍️',
      type: 'exercise',
      sort_order: 3,
      content: bddExerciseContent
    })
    for (const sec of data.sections.filter(s => s.subject_id === bdd.id && s.sort_order >= 3)) {
      store.updateSection(sec.id, { sort_order: sec.sort_order + 1 })
    }
  }
}

export default store
