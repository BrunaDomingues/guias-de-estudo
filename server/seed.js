import { bddExerciseContent } from './exerciseTemplate.js'

export function seedData(store) {
  const bdd = store.createSubject({
    slug: 'bdd',
    title: 'Behavior-Driven Development',
    subtitle: 'Descreva o comportamento antes de escrever o código — em linguagem que todo o time entende.',
    badge: 'BDD',
    icon: '🥒',
    sort_order: 1
  })

  const cleanCode = store.createSubject({
    slug: 'clean-code-solid',
    title: 'Clean Code & SOLID',
    subtitle: 'Aprenda a escrever código legível, manutenível e bem estruturado.',
    badge: 'Clean Code',
    icon: '✨',
    sort_order: 2
  })

  const sections = [
    {
      subject_id: bdd.id,
      slug: 'conceito',
      label: 'Conceito',
      icon: '💡',
      type: 'concept',
      sort_order: 1,
      content: {
        title: 'Descrever o comportamento antes de escrever o código',
        description: 'BDD é uma forma de desenvolver software começando pela conversa: o que o sistema deve fazer, em linguagem que qualquer pessoa do time entende — incluindo quem não programa. Essa descrição vira um teste executável e só depois você escreve o código que o faz passar.',
        heroCodeLabel: 'BDD — foco no comportamento do produto',
        heroCode: `Dado que tenho R$ 100 na carteira\nQuando eu deposito R$ 50\nEntão meu saldo deve ser R$ 150\n\n// Dev, PM, suporte e cliente leem a mesma frase.`,
        cards: [
          { tag: 'Linguagem comum', title: 'Linguagem comum', description: 'Cenários em frases (Gherkin) que o time inteiro entende. O documento vira a especificação e o teste ao mesmo tempo.' },
          { tag: 'Viva, não morta', title: 'Viva, não morta', description: 'A spec roda no CI. Se o comportamento quebra, o teste falha — nada de documentação desatualizada num Confluence esquecido.' },
          { tag: 'De fora pra dentro', title: 'De fora pra dentro', description: 'Você parte do que o usuário precisa (outside) e só então decide como implementar (inside).' }
        ],
        pillars: [
          { icon: '💬', title: 'Colaboração', description: 'Dev, QA e negócio falam a mesma língua nos cenários.' },
          { icon: '🧪', title: 'Testável', description: 'Cenários Gherkin viram testes automatizados com Cucumber, SpecFlow, etc.' },
          { icon: '📋', title: 'Documentação viva', description: 'A spec é o teste. Atualizou o comportamento, atualizou a doc.' }
        ]
      }
    },
    {
      subject_id: bdd.id,
      slug: 'gherkin',
      label: 'Gherkin',
      icon: '📝',
      type: 'principles',
      sort_order: 2,
      content: {
        intro: 'Gherkin é a linguagem estruturada do BDD. Palavras-chave em português ou inglês definem cenários legíveis.',
        items: [
          { title: 'Dado (Given) — contexto inicial', description: 'Descreve o estado do sistema antes da ação.', example: `Dado que estou logado como "admin"\nE que existe um produto "Notebook" com estoque 5` },
          { title: 'Quando (When) — ação do usuário', description: 'O evento ou interação que dispara o comportamento testado.', example: `Quando eu adiciono 2 unidades ao carrinho\nE clico em "Finalizar compra"` },
          { title: 'Então (Then) — resultado esperado', description: 'O que deve acontecer após a ação.', example: `Então o estoque do produto deve ser 3\nE devo ver a mensagem "Compra realizada com sucesso"` },
          { title: 'E / Mas — encadeamento', description: 'Continua o bloco anterior sem repetir a palavra-chave.', example: `Dado que tenho R$ 100 na carteira\nE que não tenho pendências\nQuando eu solicito um saque de R$ 50\nEntão o saque deve ser aprovado` }
        ]
      }
    },
    {
      subject_id: bdd.id,
      slug: 'exercicio',
      label: 'Exercício',
      icon: '✍️',
      type: 'exercise',
      sort_order: 3,
      content: bddExerciseContent
    },
    {
      subject_id: bdd.id,
      slug: 'ciclo',
      label: 'Ciclo BDD',
      icon: '🔄',
      type: 'concept',
      sort_order: 4,
      content: {
        title: 'O ciclo Red → Green → Refactor com BDD',
        description: 'BDD segue o mesmo ciclo do TDD, mas parte do comportamento descrito em linguagem natural.',
        heroCodeLabel: 'Feature: Saque em conta',
        heroCode: `Cenário: Saque dentro do saldo\n  Dado que tenho R$ 200 na conta\n  Quando eu saco R$ 80\n  Então meu saldo deve ser R$ 120\n\n# 1. RED  — cenário falha\n# 2. GREEN — código mínimo\n# 3. REFACTOR — limpa sem quebrar`,
        cards: [
          { tag: 'Red', title: 'Vermelho', description: 'Escreva o cenário Gherkin e rode. Deve falhar.' },
          { tag: 'Green', title: 'Verde', description: 'Implemente o mínimo para o cenário passar.' },
          { tag: 'Refactor', title: 'Refatorar', description: 'Melhore o código mantendo os cenários verdes.' }
        ],
        pillars: []
      }
    },
    {
      subject_id: bdd.id,
      slug: 'comparativo',
      label: 'Comparativo',
      icon: '⚖️',
      type: 'compare',
      sort_order: 5,
      content: {
        modes: [
          {
            key: 'bdd-vs-tdd',
            label: 'BDD vs TDD',
            bad: `it('should return 150 when deposit 50', () => {\n  const wallet = new Wallet(100)\n  wallet.deposit(50)\n  expect(wallet.balance).toBe(150)\n})`,
            good: `Cenário: Depósito na carteira\n  Dado que tenho R$ 100 na carteira\n  Quando eu deposito R$ 50\n  Então meu saldo deve ser R$ 150`,
            issuesBad: ['Só desenvolvedores leem', 'Foco em implementação', 'PM/QA não participam'],
            issuesGood: ['Linguagem de negócio', 'Especificação = teste', 'Colaboração entre áreas']
          }
        ]
      }
    },
    {
      subject_id: bdd.id,
      slug: 'quiz',
      label: 'Quiz',
      icon: '🎯',
      type: 'quiz',
      sort_order: 6,
      content: {
        questions: [
          { question: 'O que significa BDD?', options: ['Bug Driven Development', 'Behavior-Driven Development', 'Backend-Driven Design', 'Binary Data Definition'], correct: 1, explanation: 'BDD = Behavior-Driven Development.' },
          { question: 'Qual palavra-chave Gherkin define o contexto inicial?', options: ['Quando', 'Então', 'Dado', 'Mas'], correct: 2, explanation: 'Dado (Given) estabelece o estado inicial.' },
          { question: 'No ciclo BDD, o que fazer primeiro após escrever o cenário?', options: ['Refatorar', 'Implementar tudo', 'Rodar e ver falhar (Red)', 'Deploy'], correct: 2, explanation: 'Red primeiro: o cenário deve falhar.' },
          { question: 'BDD usa qual linguagem para cenários?', options: ['JSON', 'Gherkin', 'YAML', 'SQL'], correct: 1, explanation: 'Gherkin usa Dado/Quando/Então.' },
          { question: 'Qual a principal vantagem do BDD sobre specs em documento?', options: ['Mais rápido', 'Spec viva que roda no CI', 'Não precisa de testes', 'Substitui o código'], correct: 1, explanation: 'A spec vira teste executável.' }
        ]
      }
    },
    // Clean Code sections
    {
      subject_id: cleanCode.id,
      slug: 'conceito',
      label: 'Conceito',
      icon: '💡',
      type: 'concept',
      sort_order: 1,
      content: {
        title: 'Descrever a intenção antes de escrever o código',
        description: 'Clean Code e SOLID são formas de escrever software que outras pessoas conseguem ler, entender e mudar sem medo.',
        heroCodeLabel: 'Clean Code — foco na legibilidade',
        heroCode: `Dado um pedido com 3 itens\nQuando calculo o total com desconto de 10%\nEntão o valor final deve ser R$ 270,00`,
        cards: [
          { tag: 'Clean Code', title: 'Código como comunicação', description: 'Legibilidade não é luxo — é requisito.' },
          { tag: 'SOLID', title: 'Arquitetura que escala', description: 'Cinco princípios para código flexível e testável.' },
          { tag: 'Prática', title: 'Refatoração contínua', description: 'Escreve, testa, refatora.' }
        ],
        pillars: [
          { icon: '📖', title: 'Legível', description: 'Nomes claros, funções pequenas.' },
          { icon: '🧪', title: 'Testável', description: 'Responsabilidades separadas.' },
          { icon: '🔧', title: 'Manutenível', description: 'Mudanças localizadas.' }
        ]
      }
    },
    {
      subject_id: cleanCode.id,
      slug: 'clean-code',
      label: 'Clean Code',
      icon: '✨',
      type: 'principles',
      sort_order: 2,
      content: {
        intro: 'Baseado em Robert C. Martin (Uncle Bob).',
        items: [
          { title: 'Nomes que revelam intenção', description: 'Variáveis e funções devem dizer o que fazem.', example: `// ❌ Ruim\nlet d = new Date()\n\n// ✅ Bom\nlet createdAt = new Date()` },
          { title: 'Funções pequenas e focadas', description: 'Uma função, uma responsabilidade.', example: `function processOrder(order) {\n  const valid = validateOrder(order)\n  return finalizeOrder(valid, calculateTotal(valid))\n}` },
          { title: 'DRY', description: 'Extraia lógica repetida.', example: `function isValidEmail(email) {\n  return email.includes('@') && email.includes('.')\n}` }
        ]
      }
    },
    {
      subject_id: cleanCode.id,
      slug: 'solid',
      label: 'SOLID',
      icon: '🏛️',
      type: 'solid',
      sort_order: 3,
      content: {
        intro: 'Selecione um princípio para explorar.',
        items: [
          { letter: 'S', name: 'Single Responsibility', subtitle: 'Responsabilidade Única', description: 'Uma classe, um motivo para mudar.', bad: `class Invoice {\n  calculateTotal() {}\n  saveToDatabase() {}\n}`, good: `class Invoice { calculateTotal() {} }\nclass InvoiceRepository { save() {} }` },
          { letter: 'O', name: 'Open/Closed', subtitle: 'Aberto/Fechado', description: 'Aberto para extensão, fechado para modificação.', bad: `if (type === 'student') return 0.5`, good: `class StudentDiscount { getRate() { return 0.5 } }` },
          { letter: 'L', name: 'Liskov Substitution', subtitle: 'Substituição de Liskov', description: 'Subtipos substituíveis sem quebrar.', bad: `class Penguin extends Bird { fly() { throw Error() } }`, good: `class Penguin { swim() {} }` },
          { letter: 'I', name: 'Interface Segregation', subtitle: 'Segregação de Interface', description: 'Interfaces pequenas e específicas.', bad: `interface Worker { work(); eat(); }`, good: `interface Workable { work() }` },
          { letter: 'D', name: 'Dependency Inversion', subtitle: 'Inversão de Dependência', description: 'Dependa de abstrações.', bad: `this.db = new MySQLDatabase()`, good: `constructor(database) { this.db = database }` }
        ]
      }
    },
    {
      subject_id: cleanCode.id,
      slug: 'comparativo',
      label: 'Comparativo',
      icon: '⚖️',
      type: 'compare',
      sort_order: 4,
      content: {
        modes: [
          {
            key: 'cleanCode',
            label: 'Clean Code',
            bad: `function calc(a, b, t) {\n  if (t == 1) return a + b\n  if (t == 2) return a - b\n}`,
            good: `function add(a, b) { return a + b }\nfunction subtract(a, b) { return a - b }`,
            issuesBad: ['Parâmetro mágico', 'Função faz várias coisas'],
            issuesGood: ['Nomes claros', 'Uma responsabilidade por função']
          }
        ]
      }
    },
    {
      subject_id: cleanCode.id,
      slug: 'quiz',
      label: 'Quiz',
      icon: '🎯',
      type: 'quiz',
      sort_order: 5,
      content: {
        questions: [
          { question: 'Qual princípio SOLID diz que uma classe deve ter apenas um motivo para mudar?', options: ['Open/Closed', 'Single Responsibility', 'Liskov Substitution', 'Dependency Inversion'], correct: 1, explanation: 'SRP: responsabilidade única.' },
          { question: 'Qual é um bom nome de função segundo Clean Code?', options: ['process()', 'doStuff()', 'calculateOrderTotal()', 'handle()'], correct: 2, explanation: 'Nomes revelam intenção.' },
          { question: 'O princípio Open/Closed significa:', options: ['Aberto para modificação', 'Fechado para modificação, aberto para extensão', 'Sempre aberto', 'Fechado'], correct: 1, explanation: 'OCP: estenda sem modificar.' },
          { question: 'Funções devem ser:', options: ['Longas', 'Pequenas e fazer uma coisa', 'Genéricas', 'Sem parâmetros'], correct: 1, explanation: 'Funções pequenas e focadas.' },
          { question: 'Dependency Inversion: alto nível não deve depender de:', options: ['Interfaces', 'Baixo nível diretamente', 'Injeção', 'Abstrações'], correct: 1, explanation: 'DIP: dependa de abstrações.' }
        ]
      }
    }
  ]

  for (const section of sections) {
    store.createSection(section)
  }
}
