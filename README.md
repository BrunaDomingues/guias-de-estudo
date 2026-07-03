# Guias de Estudo

Plataforma de guias interativos para desenvolvimento — BDD, Clean Code, SOLID e mais. Menu lateral, exercícios com validação em tempo real e painel admin.

## Assuntos incluídos

- **BDD** — conceito, Gherkin, exercício, ciclo, comparativo e quiz
- **Clean Code** — conceito, princípios, comparativo e quiz
- **SOLID** — conceito, princípios S/O/L/I/D, comparativo e quiz
- **Clean Code + SOLID na Prática** — como os dois se complementam

## Como rodar

```powershell
cd guias-de-estudo
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
