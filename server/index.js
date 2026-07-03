import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'
import subjectsRouter from './routes/subjects.js'
import adminRouter from './routes/admin.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', app: 'Guia Interativo de Estudos' })
})

app.use('/api/subjects', subjectsRouter)
app.use('/api/admin', adminRouter)

const clientDist = join(__dirname, '../client/dist')
if (existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get('*', (_, res) => {
    res.sendFile(join(clientDist, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
