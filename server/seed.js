import { bddExerciseContent } from './exerciseTemplate.js'

export function seedCleanCodeSubjects(store, startOrder = 2) {
  const cleanCode = store.createSubject({
    slug: 'clean-code',
    title: 'Clean Code',
    subtitle: 'Código legível, funções claras e intenção explícita — o que Uncle Bob defende.',
    badge: 'Clean Code',
    icon: '✨',
    sort_order: startOrder
  })

  const solid = store.createSubject({
    slug: 'solid',
    title: 'SOLID',
    subtitle: 'Cinco princípios para classes e módulos flexíveis, testáveis e fáceis de evoluir.',
    badge: 'SOLID',
    icon: '🏛️',
    sort_order: startOrder + 1
  })

  const pratica = store.createSubject({
    slug: 'na-pratica',
    title: 'Clean Code + SOLID na Prática',
    subtitle: 'Como os dois se complementam no dia a dia — refatoração com propósito.',
    badge: 'Na prática',
    icon: '🔗',
    sort_order: startOrder + 2
  })

  const sections = [
    // ── Clean Code ──
    {
      subject_id: cleanCode.id,
      slug: 'conceito',
      label: 'Conceito',
      icon: '💡',
      type: 'concept',
      sort_order: 1,
      content: {
        title: 'Código como comunicação',
        description: 'Clean Code trata código como texto que humanos leem todo dia. Legibilidade não é luxo — é requisito. Você escreve para o próximo dev (que pode ser você daqui a 6 meses).',
        heroCodeLabel: 'O que o código deve comunicar',
        heroCode: `// ❌ O que isso faz?\nfunction p(o) { return o.q * o.p - o.d }\n\n// ✅ Intenção clara\nfunction calculateOrderTotal(order) {\n  return order.quantity * order.price - order.discount\n}`,
        cards: [
          { tag: 'Legibilidade', title: 'Nomes que revelam intenção', description: 'Variáveis, funções e classes devem dizer o que fazem sem comentário.' },
          { tag: 'Simplicidade', title: 'Funções pequenas', description: 'Uma função, uma responsabilidade. Se precisa de comentário para explicar, provavelmente faz demais.' },
          { tag: 'DRY', title: 'Don\'t Repeat Yourself', description: 'Duplicação é a raiz de muitos bugs. Extraia lógica repetida.' }
        ],
        pillars: [
          { icon: '📖', title: 'Legível', description: 'Qualquer dev entende em minutos.' },
          { icon: '🔧', title: 'Manutenível', description: 'Mudanças localizadas, sem medo.' },
          { icon: '🧪', title: 'Testável', description: 'Funções pequenas são fáceis de testar.' }
        ]
      }
    },
    {
      subject_id: cleanCode.id,
      slug: 'principios',
      label: 'Princípios',
      icon: '✨',
      type: 'principles',
      sort_order: 2,
      content: {
        intro: 'Baseado em Robert C. Martin (Uncle Bob). Clique em cada princípio para ver o exemplo.',
        items: [
          { title: 'Nomes que revelam intenção', description: 'Evite abreviações obscuras e nomes genéricos como data, info, temp.', example: `// ❌ Ruim\nlet d = new Date()\nlet u = getU()\n\n// ✅ Bom\nlet createdAt = new Date()\nlet activeUser = getActiveUser()` },
          { title: 'Funções pequenas e focadas', description: 'Uma função, uma responsabilidade.', example: `// ❌ Ruim\nfunction processOrder(order) {\n  validate(order)\n  calculateTotal(order)\n  saveToDb(order)\n  sendEmail(order)\n}\n\n// ✅ Bom\nfunction processOrder(order) {\n  const valid = validateOrder(order)\n  return finalizeOrder(valid, calculateTotal(valid))\n}` },
          { title: 'Comentários só quando necessário', description: 'Código limpo se explica sozinho.', example: `// ❌ Ruim\n// incrementa i\ni++\n\n// ✅ Bom\nremainingAttempts--` },
          { title: 'Tratamento de erros explícito', description: 'Use exceções em vez de códigos de retorno mágicos.', example: `// ❌ Ruim\nif (result === -1) return null\n\n// ✅ Bom\ntry {\n  return repository.findById(id)\n} catch {\n  throw new UserNotFoundError(id)\n}` },
          { title: 'DRY', description: 'Extraia lógica repetida.', example: `function isValidEmail(email) {\n  return email.includes('@') && email.includes('.')\n}` }
        ]
      }
    },
    {
      subject_id: cleanCode.id,
      slug: 'comparativo',
      label: 'Comparativo',
      icon: '⚖️',
      type: 'compare',
      sort_order: 3,
      content: {
        modes: [
          {
            key: 'funcoes',
            label: 'Funções',
            bad: `function calc(a, b, t) {\n  if (t == 1) return a + b\n  if (t == 2) return a - b\n  if (t == 3) return a * b\n  return a / b\n}`,
            good: `function add(a, b) { return a + b }\nfunction subtract(a, b) { return a - b }\nfunction multiply(a, b) { return a * b }\nfunction divide(a, b) { return a / b }`,
            issuesBad: ['Parâmetro mágico (t)', 'Função faz 4 coisas', 'Impossível testar isoladamente'],
            issuesGood: ['Nome e propósito claros', 'Uma responsabilidade', 'Fácil de testar']
          },
          {
            key: 'nomes',
            label: 'Nomenclatura',
            bad: `const d = users.filter(u => u.a)\nconst t = d.reduce((s, x) => s + x.p, 0)`,
            good: `const activeUsers = users.filter(user => user.isActive)\nconst totalPrice = activeUsers.reduce((sum, user) => sum + user.price, 0)`,
            issuesBad: ['Variáveis de uma letra', 'Abreviações obscuras'],
            issuesGood: ['Nomes revelam intenção', 'Código autoexplicativo']
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
      sort_order: 4,
      content: {
        questions: [
          { question: 'Qual é um bom nome de função segundo Clean Code?', options: ['process()', 'doStuff()', 'calculateOrderTotal()', 'handle()'], correct: 2, explanation: 'Nomes devem revelar intenção.' },
          { question: 'Segundo Clean Code, funções devem ser:', options: ['Longas e completas', 'Pequenas e fazer uma coisa', 'Sempre genéricas', 'Evitar parâmetros'], correct: 1, explanation: 'Funções pequenas e focadas.' },
          { question: 'DRY significa:', options: ['Delete Repeated YAML', 'Don\'t Repeat Yourself', 'Do Run Yearly', 'Design Ready Yesterday'], correct: 1, explanation: 'Evite duplicação de lógica.' },
          { question: 'Comentários em código limpo devem:', options: ['Explicar tudo', 'Substituir bons nomes', 'Compensar código confuso', 'Ser raros — o código se explica'], correct: 3, explanation: 'Comentários não substituem nomenclatura clara.' }
        ]
      }
    },

    // ── SOLID ──
    {
      subject_id: solid.id,
      slug: 'conceito',
      label: 'Conceito',
      icon: '💡',
      type: 'concept',
      sort_order: 1,
      content: {
        title: 'Arquitetura que escala com mudanças',
        description: 'SOLID são cinco princípios de design orientado a objetos para estruturar classes e módulos de forma flexível. Cada letra resolve um problema comum de acoplamento e rigidez.',
        heroCodeLabel: 'As cinco letras',
        heroCode: `S — Single Responsibility\nO — Open/Closed\nL — Liskov Substitution\nI — Interface Segregation\nD — Dependency Inversion`,
        cards: [
          { tag: 'S', title: 'Responsabilidade Única', description: 'Uma classe, um motivo para mudar.' },
          { tag: 'O', title: 'Aberto/Fechado', description: 'Estenda sem modificar código existente.' },
          { tag: 'D', title: 'Inversão de Dependência', description: 'Dependa de abstrações, não de implementações.' }
        ],
        pillars: [
          { icon: '🧩', title: 'Baixo acoplamento', description: 'Módulos independentes.' },
          { icon: '🎯', title: 'Alta coesão', description: 'Cada parte faz uma coisa bem.' },
          { icon: '🧪', title: 'Testável', description: 'Injeção de dependência facilita mocks.' }
        ]
      }
    },
    {
      subject_id: solid.id,
      slug: 'principios',
      label: 'Princípios',
      icon: '🏛️',
      type: 'solid',
      sort_order: 2,
      content: {
        intro: 'Selecione um princípio para explorar a definição e comparar código ruim vs bom.',
        items: [
          { letter: 'S', name: 'Single Responsibility', subtitle: 'Responsabilidade Única', description: 'Uma classe deve ter apenas um motivo para mudar.', bad: `class Invoice {\n  calculateTotal() {}\n  saveToDatabase() {}\n  generatePDF() {}\n  sendByEmail() {}\n}`, good: `class Invoice { calculateTotal() {} }\nclass InvoiceRepository { save() {} }\nclass InvoicePDFGenerator { generate() {} }\nclass EmailService { send() {} }` },
          { letter: 'O', name: 'Open/Closed', subtitle: 'Aberto/Fechado', description: 'Aberto para extensão, fechado para modificação.', bad: `function getDiscount(type) {\n  if (type === 'student') return 0.5\n  if (type === 'senior') return 0.3\n}`, good: `interface DiscountStrategy {\n  getRate(): number\n}\nclass StudentDiscount implements DiscountStrategy {\n  getRate() { return 0.5 }\n}` },
          { letter: 'L', name: 'Liskov Substitution', subtitle: 'Substituição de Liskov', description: 'Subtipos substituíveis sem quebrar o programa.', bad: `class Bird { fly() {} }\nclass Penguin extends Bird {\n  fly() { throw Error('Cannot fly!') }\n}`, good: `interface Flyable { fly() }\nclass Sparrow implements Flyable { fly() {} }\nclass Penguin { swim() {} }` },
          { letter: 'I', name: 'Interface Segregation', subtitle: 'Segregação de Interface', description: 'Interfaces pequenas e específicas.', bad: `interface Worker {\n  work()\n  eat()\n  sleep()\n}\nclass Robot implements Worker {\n  eat() { /* ??? */ }\n}`, good: `interface Workable { work() }\nclass Robot implements Workable {\n  work() {}\n}` },
          { letter: 'D', name: 'Dependency Inversion', subtitle: 'Inversão de Dependência', description: 'Dependa de abstrações, não de implementações.', bad: `class OrderService {\n  constructor() {\n    this.db = new MySQLDatabase()\n  }\n}`, good: `class OrderService {\n  constructor(database) {\n    this.db = database\n  }\n}` }
        ]
      }
    },
    {
      subject_id: solid.id,
      slug: 'comparativo',
      label: 'Comparativo',
      icon: '⚖️',
      type: 'compare',
      sort_order: 3,
      content: {
        modes: [
          {
            key: 'srp',
            label: 'SRP violado',
            bad: `class UserService {\n  saveToDatabase(user) { /* SQL */ }\n  sendWelcomeEmail(user) { /* SMTP */ }\n  generatePDFReport(user) { /* PDF */ }\n  validateCPF(cpf) { /* regex */ }\n}`,
            good: `class UserRepository { save(user) { /* SQL */ } }\nclass EmailService { sendWelcome(user) { /* SMTP */ } }\nclass UserValidator { validateCPF(cpf) { /* regex */ } }`,
            issuesBad: ['4 responsabilidades', 'Mudança no email quebra tudo', 'Difícil mockar'],
            issuesGood: ['Uma responsabilidade por classe', 'Mudanças isoladas', 'Fácil testar']
          },
          {
            key: 'dip',
            label: 'DIP violado',
            bad: `class ReportService {\n  constructor() {\n    this.exporter = new PdfExporter()\n  }\n}`,
            good: `class ReportService {\n  constructor(exporter) {\n    this.exporter = exporter\n  }\n}\n// PdfExporter, CsvExporter, MockExporter...`,
            issuesBad: ['Acoplado a PDF', 'Impossível trocar formato'],
            issuesGood: ['Depende de abstração', 'Extensível sem modificar']
          }
        ]
      }
    },
    {
      subject_id: solid.id,
      slug: 'quiz',
      label: 'Quiz',
      icon: '🎯',
      type: 'quiz',
      sort_order: 4,
      content: {
        questions: [
          { question: 'Qual princípio diz que uma classe deve ter apenas um motivo para mudar?', options: ['Open/Closed', 'Single Responsibility', 'Liskov Substitution', 'Dependency Inversion'], correct: 1, explanation: 'SRP: responsabilidade única.' },
          { question: 'Open/Closed significa:', options: ['Aberto para modificação', 'Fechado para modificação, aberto para extensão', 'Sempre aberto', 'Fechado'], correct: 1, explanation: 'OCP: estenda sem modificar.' },
          { question: 'Liskov Substitution diz que subtipos devem:', options: ['Ser maiores que a base', 'Ser substituíveis sem quebrar', 'Nunca herdar', 'Sempre sobrescrever'], correct: 1, explanation: 'Subtipos substituíveis pela base.' },
          { question: 'Dependency Inversion: alto nível não deve depender de:', options: ['Interfaces', 'Baixo nível diretamente', 'Injeção', 'Abstrações'], correct: 1, explanation: 'DIP: dependa de abstrações.' },
          { question: 'Interface Segregation evita:', options: ['Herança', 'Interfaces que o cliente não usa', 'Composição', 'Polimorfismo'], correct: 1, explanation: 'ISP: interfaces pequenas e específicas.' }
        ]
      }
    },

    // ── Na prática (junção) ──
    {
      subject_id: pratica.id,
      slug: 'conceito',
      label: 'Conceito',
      icon: '💡',
      type: 'concept',
      sort_order: 1,
      content: {
        title: 'Quando Clean Code encontra SOLID',
        description: 'Clean Code cuida da legibilidade linha a linha. SOLID cuida da estrutura de classes e módulos. Juntos, você refatora com propósito: nomes claros dentro de responsabilidades bem separadas.',
        heroCodeLabel: 'Refatoração em duas camadas',
        heroCode: `// 1. Clean Code — nomes e funções pequenas\nfunction calculateDiscountedTotal(items, rate) {\n  return items.reduce((sum, item) => sum + item.price, 0) * (1 - rate)\n}\n\n// 2. SOLID — SRP + DIP\nclass OrderCalculator {\n  constructor(discountPolicy) {\n    this.discountPolicy = discountPolicy\n  }\n  calculateTotal(items) { /* ... */ }\n}`,
        cards: [
          { tag: 'Clean Code', title: 'Micro — legibilidade', description: 'Nomes, funções pequenas, sem duplicação.' },
          { tag: 'SOLID', title: 'Macro — arquitetura', description: 'Responsabilidades, extensão, dependências.' },
          { tag: 'Refatorar', title: 'Ciclo contínuo', description: 'Primeiro faz funcionar, depois limpa, depois estrutura.' }
        ],
        pillars: [
          { icon: '🔄', title: 'Red → Green → Refactor', description: 'Testes verdes, depois melhore estrutura.' },
          { icon: '📐', title: 'SRP + funções pequenas', description: 'Mesma ideia em escala diferente.' },
          { icon: '🧪', title: 'DIP + testabilidade', description: 'Abstrações permitem mocks limpos.' }
        ]
      }
    },
    {
      subject_id: pratica.id,
      slug: 'complementam',
      label: 'Como se complementam',
      icon: '🤝',
      type: 'principles',
      sort_order: 2,
      content: {
        intro: 'Cada princípio SOLID ganha força quando o código ao redor é limpo.',
        items: [
          { title: 'SRP + funções pequenas', description: 'SRP separa classes; Clean Code separa funções. Mesma filosofia, escalas diferentes.', example: `// Classe com SRP\nclass PaymentProcessor { process() {} }\nclass ReceiptSender { send() {} }\n\n// Funções pequenas dentro delas\nfunction validatePayment(payment) { /* uma coisa */ }\nfunction chargeCard(payment) { /* uma coisa */ }` },
          { title: 'OCP + código legível', description: 'Extensão via novas classes só funciona se os nomes e interfaces forem claros.', example: `// Nova estratégia sem modificar existente\nclass BlackFridayDiscount implements DiscountStrategy {\n  getRate() { return 0.3 }\n}` },
          { title: 'DIP + testes limpos', description: 'Injetar dependências permite mocks. Funções pequenas tornam os testes legíveis.', example: `const service = new OrderService(mockDatabase)\n// teste focado, sem infra real` },
          { title: 'Refatoração segura', description: 'Clean Code primeiro (renomear, extrair). Depois SOLID (separar classes, injetar).', example: `// Passo 1: extrair função com nome claro\n// Passo 2: mover para classe com responsabilidade única\n// Passo 3: injetar dependência` }
        ]
      }
    },
    {
      subject_id: pratica.id,
      slug: 'comparativo',
      label: 'Comparativo',
      icon: '⚖️',
      type: 'compare',
      sort_order: 3,
      content: {
        modes: [
          {
            key: 'antes',
            label: 'Antes (sem nenhum)',
            bad: `class App {\n  run(d, u, t) {\n    if (t == 1) { /* SQL */ }\n    if (t == 2) { /* email */ }\n    if (t == 3) { /* pdf */ }\n  }\n}`,
            good: `class CreateOrderUseCase {\n  constructor(repo, notifier) {\n    this.repo = repo\n    this.notifier = notifier\n  }\n  execute(order) {\n    const valid = validateOrder(order)\n    this.repo.save(valid)\n    this.notifier.sendConfirmation(valid)\n  }\n}`,
            issuesBad: ['Parâmetros mágicos', 'Tudo numa classe', 'Impossível testar'],
            issuesGood: ['Nomes claros', 'SRP + DIP', 'Testável e extensível']
          },
          {
            key: 'clean-code',
            label: 'Só Clean Code',
            bad: `function handle(data) {\n  // 200 linhas...\n}`,
            good: `function validateUser(user) { /* ... */ }\nfunction saveUser(user) { /* ... */ }\nfunction notifyUser(user) { /* ... */ }`,
            issuesBad: ['Ainda tudo acoplado num módulo', 'Sem separação de camadas'],
            issuesGood: ['Legível', 'Mas falta estrutura de classes/módulos']
          }
        ]
      }
    },
    {
      subject_id: pratica.id,
      slug: 'quiz',
      label: 'Quiz',
      icon: '🎯',
      type: 'quiz',
      sort_order: 4,
      content: {
        questions: [
          { question: 'Clean Code foca principalmente em:', options: ['Herança', 'Legibilidade e clareza', 'Banco de dados', 'Deploy'], correct: 1, explanation: 'Clean Code = código legível.' },
          { question: 'SOLID foca principalmente em:', options: ['Design de classes e módulos', 'Sintaxe da linguagem', 'CSS', 'Git'], correct: 0, explanation: 'SOLID = princípios de design OOP.' },
          { question: 'Qual combinação faz mais sentido?', options: ['SRP + funções gigantes', 'SRP + funções pequenas', 'DIP + acoplamento forte', 'OCP + modificar tudo'], correct: 1, explanation: 'SRP e funções pequenas são a mesma ideia em escalas diferentes.' },
          { question: 'Ordem ideal de refatoração:', options: ['SOLID antes de funcionar', 'Faz funcionar → Clean Code → SOLID', 'Nunca refatorar', 'Só comentários'], correct: 1, explanation: 'Primeiro verde, depois limpa, depois estrutura.' },
          { question: 'DIP ajuda testes porque:', options: ['Elimina testes', 'Permite injetar mocks', 'Usa mais SQL', 'Remove interfaces'], correct: 1, explanation: 'Abstrações permitem substituir implementações.' }
        ]
      }
    }
  ]

  for (const section of sections) {
    store.createSection(section)
  }

  return { cleanCode, solid, pratica }
}

export function seedData(store) {
  const bdd = store.createSubject({
    slug: 'bdd',
    title: 'Behavior-Driven Development',
    subtitle: 'Descreva o comportamento antes de escrever o código — em linguagem que todo o time entende.',
    badge: 'BDD',
    icon: '🥒',
    sort_order: 1
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
    }
  ]

  for (const section of sections) {
    store.createSection(section)
  }

  seedCleanCodeSubjects(store, 2)
}

export function migrateSplitCleanCodeSubjects(store) {
  const legacy = store.getSubjectBySlug('clean-code-solid')
  const hasCleanCode = store.getSubjectBySlug('clean-code')
  if (!legacy || hasCleanCode) return false

  store.deleteSubject(legacy.id)
  seedCleanCodeSubjects(store, 2)
  return true
}
