export const adminDocs = {
  intro: {
    title: 'Como criar conteúdo para o guia',
    description: 'Cada assunto agrupa seções. O tipo da seção define como o conteúdo é renderizado no site. Use slug único por assunto (ex: conceito, gherkin, quiz).'
  },
  subject: {
    title: 'Assunto',
    fields: [
      { name: 'slug', desc: 'Identificador na URL. Só letras minúsculas, números e hífen. Ex: bdd, clean-code-solid' },
      { name: 'title', desc: 'Título grande no topo da página do assunto' },
      { name: 'subtitle', desc: 'Texto descritivo abaixo do título' },
      { name: 'badge', desc: 'Etiqueta pequena acima do título. Ex: BDD, Clean Code' },
      { name: 'icon', desc: 'Emoji exibido na sidebar. Ex: 🥒, ✨' },
      { name: 'sort_order', desc: 'Ordem na sidebar. Menor número aparece primeiro' }
    ]
  },
  sectionCommon: {
    title: 'Campos comuns da seção',
    fields: [
      { name: 'slug', desc: 'Identificador único dentro do assunto. Ex: conceito, exercicio' },
      { name: 'label', desc: 'Nome na aba de navegação. Ex: Conceito, Exercício' },
      { name: 'icon', desc: 'Emoji na aba. Ex: 💡, ✍️' },
      { name: 'type', desc: 'Define o layout da página — veja os tipos abaixo' },
      { name: 'sort_order', desc: 'Ordem das abas. Menor = mais à esquerda' }
    ]
  },
  types: [
    {
      id: 'concept',
      name: 'concept',
      label: 'Conceito',
      when: 'Página introdutória com texto, bloco de código hero, cards e pilares.',
      fields: [
        'title — título da seção',
        'description — parágrafo explicativo',
        'heroCodeLabel — rótulo do bloco de código (opcional)',
        'heroCode — código ou cenário Gherkin em destaque',
        'cards[] — { tag, title, description }',
        'pillars[] — { icon, title, description } (opcional)'
      ],
      example: `{
  "title": "Descrever o comportamento antes de escrever o código",
  "description": "BDD começa pela conversa sobre o que o sistema deve fazer...",
  "heroCodeLabel": "BDD — foco no comportamento",
  "heroCode": "Dado que tenho R$ 100\\nQuando eu deposito R$ 50\\nEntão meu saldo deve ser R$ 150",
  "cards": [
    { "tag": "Linguagem comum", "title": "Linguagem comum", "description": "..." }
  ],
  "pillars": [
    { "icon": "💬", "title": "Colaboração", "description": "..." }
  ]
}`
    },
    {
      id: 'principles',
      name: 'principles',
      label: 'Princípios',
      when: 'Lista expansível de itens com exemplo de código (Clean Code, Gherkin, etc.).',
      fields: [
        'intro — texto acima da lista (opcional)',
        'items[] — cada item: { title, description, example }'
      ],
      example: `{
  "intro": "Clique em cada princípio para ver o exemplo.",
  "items": [
    {
      "title": "Nomes que revelam intenção",
      "description": "Variáveis e funções devem dizer o que fazem.",
      "example": "// ❌ Ruim\\nlet d = new Date()\\n\\n// ✅ Bom\\nlet createdAt = new Date()"
    }
  ]
}`
    },
    {
      id: 'solid',
      name: 'solid',
      label: 'SOLID',
      when: 'Abas S/O/L/I/D com comparativo ruim vs bom.',
      fields: [
        'intro — texto introdutório (opcional)',
        'items[] — { letter, name, subtitle, description, bad, good }'
      ],
      example: `{
  "intro": "Selecione um princípio para explorar.",
  "items": [
    {
      "letter": "S",
      "name": "Single Responsibility",
      "subtitle": "Responsabilidade Única",
      "description": "Uma classe, um motivo para mudar.",
      "bad": "class Invoice { save() {} sendEmail() {} }",
      "good": "class Invoice { }\\nclass EmailService { }"
    }
  ]
}`
    },
    {
      id: 'compare',
      name: 'compare',
      label: 'Comparativo',
      when: 'Antes/depois lado a lado com lista de problemas e benefícios.',
      fields: [
        'modes[] — cada modo: { key, label, bad, good, issuesBad[], issuesGood[] }'
      ],
      example: `{
  "modes": [
    {
      "key": "bdd-vs-tdd",
      "label": "BDD vs TDD",
      "bad": "it('should return 150', () => { ... })",
      "good": "Cenário: Depósito\\n  Dado que tenho R$ 100...",
      "issuesBad": ["Só dev entende", "Foco em implementação"],
      "issuesGood": ["Linguagem de negócio", "Spec = teste"]
    }
  ]
}`
    },
    {
      id: 'quiz',
      name: 'quiz',
      label: 'Quiz',
      when: 'Perguntas de múltipla escolha com correção automática.',
      fields: [
        'questions[] — { question, options[], correct, explanation }',
        'correct — índice da opção correta (0 = primeira)'
      ],
      example: `{
  "questions": [
    {
      "question": "O que significa BDD?",
      "options": ["Bug Driven", "Behavior-Driven Development", "Backend Design"],
      "correct": 1,
      "explanation": "BDD = Behavior-Driven Development."
    }
  ]
}`
    },
    {
      id: 'exercise',
      name: 'exercise',
      label: 'Exercício interativo',
      when: 'Textarea com validação em tempo real. Ideal para praticar Gherkin/BDD.',
      fields: [
        'title — título da página',
        'prompt — enunciado do desafio',
        'placeholder — dica dentro do textarea vazio',
        'starterText — texto pré-preenchido ao abrir',
        'helperButtons[] — botões de atalho. Ex: ["Dado", "Quando", "Então"]',
        'successMessage — mensagem quando todas as regras passam',
        'rules[] — { id, label, check, keyword?, pattern? }'
      ],
      checks: [
        { check: 'hasScenario', desc: 'Texto contém "Cenário:"' },
        { check: 'hasGiven', desc: 'Contém Dado ou Given' },
        { check: 'hasOneWhen', desc: 'Exatamente um Quando/When' },
        { check: 'hasThen', desc: 'Contém Então ou Then' },
        { check: 'hasNumbers', desc: 'Contém algum número' },
        { check: 'hasKeyword', desc: 'Contém palavra em rule.keyword' },
        { check: 'regex', desc: 'Combina com rule.pattern (regex)' }
      ],
      example: `{
  "title": "Escreva seu primeiro cenário",
  "prompt": "Escreva um cenário para: sacar mais que o saldo deve ser negado...",
  "placeholder": "Cenário:\\n  Dado que...",
  "starterText": "Cenário:\\n  Dado que\\n  Quando eu\\n  Então ",
  "helperButtons": ["Dado", "Quando", "Então"],
  "successMessage": "Cenário bem formado. Você fez BDD. 🎯",
  "rules": [
    { "id": "scenario", "label": "Tem um título de Cenário", "check": "hasScenario" },
    { "id": "given", "label": "Tem um Dado", "check": "hasGiven" }
  ]
}`
    }
  ],
  workflow: [
    'Crie o assunto na sidebar (slug, título, ícone)',
    'Adicione seções na ordem desejada (conceito → conteúdo → exercício → quiz)',
    'Para exercise, use o formulário visual no admin — não precisa editar JSON',
    'Para outros tipos, cole o JSON de exemplo e adapte os campos',
    'Abra o guia no site e confira se a aba renderiza corretamente'
  ]
}
