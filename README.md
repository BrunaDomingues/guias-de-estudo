# Guia Interativo de Estudos

Plataforma educacional com guias interativos (estilo Claude Artifact), menu lateral para trocar de assunto, e painel admin com persistência em JSON.

## Assuntos incluídos

- **BDD** — conceito, Gherkin, ciclo Red/Green/Refactor, comparativo e quiz
- **Clean Code & SOLID** — conceito, princípios, comparativo e quiz

## Como rodar

```powershell
cd clean-code-solid-guide
npm install
cd server; npm install; cd ..
cd client; npm install; cd ..
npm run dev
```

- Guia: **http://localhost:5173**
- API: **http://localhost:3001**
- Admin: **http://localhost:5173/admin**
- Docs: **http://localhost:5173/admin/docs**

## Admin

Senha padrão: `admin123`

Para alterar, defina a variável de ambiente:

```powershell
$env:ADMIN_PASSWORD = "sua-senha"
npm run dev
```

No admin você pode criar, editar e excluir assuntos e seções. Seções do tipo **exercise** têm formulário visual para editar enunciado, botões de atalho (Dado/Quando/Então) e regras de validação — sem precisar editar JSON manualmente.

## Tipos de seção

| Tipo | Uso |
|------|-----|
| `concept` | Título, descrição, código hero, cards e pillars |
| `principles` | Lista expansível com exemplos de código |
| `solid` | Abas S/O/L/I/D com comparativo |
| `compare` | Antes/depois com modos alternáveis |
| `quiz` | Perguntas com correção automática |
| `exercise` | Textarea interativo com validação em tempo real (BDD/Gherkin) |

## Stack

- Vue 3 + Vue Router + Vite
- Express + armazenamento JSON (`server/data/guides.json`)

## Produção

```powershell
npm run build
npm start
```

Servidor em **http://localhost:3001** servindo o build estático.
