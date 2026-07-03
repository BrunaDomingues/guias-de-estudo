const checks = {
  hasScenario(text) {
    return /cen[aá]rio\s*:/i.test(text)
  },
  hasGiven(text) {
    return /\b(dado|given)\b/i.test(text)
  },
  hasOneWhen(text) {
    const matches = text.match(/\b(quando|when)\b/gi)
    return matches?.length === 1
  },
  hasThen(text) {
    return /\b(ent[aã]o|then)\b/i.test(text)
  },
  hasNumbers(text) {
    return /\d/.test(text)
  },
  hasKeyword(text, rule) {
    if (!rule.keyword) return false
    return text.toLowerCase().includes(rule.keyword.toLowerCase())
  },
  regex(text, rule) {
    if (!rule.pattern) return false
    try {
      return new RegExp(rule.pattern, 'i').test(text)
    } catch {
      return false
    }
  }
}

export function validateExercise(text, rules = []) {
  return rules.map(rule => ({
    id: rule.id,
    label: rule.label,
    passed: (checks[rule.check] || (() => false))(text, rule)
  }))
}

export const exerciseTemplate = {
  title: 'Escreva seu primeiro cenário',
  prompt: 'Escreva um cenário para: sacar mais que o saldo deve ser negado. A carteira tem R$ 50.',
  placeholder: 'Cenário:\n  Dado que...\n  Quando eu...\n  Então...',
  starterText: `Cenário: 
  Dado que 
  Quando eu 
  Então `,
  helperButtons: ['Dado', 'Quando', 'Então'],
  rules: [
    { id: 'scenario', label: 'Tem um título de Cenário', check: 'hasScenario' },
    { id: 'given', label: 'Tem um Dado (contexto inicial)', check: 'hasGiven' },
    { id: 'when', label: 'Tem exatamente um Quando', check: 'hasOneWhen' },
    { id: 'then', label: 'Tem um Então (resultado verificável)', check: 'hasThen' },
    { id: 'numbers', label: 'Usa valores concretos (números)', check: 'hasNumbers' }
  ],
  successMessage: 'Cenário bem formado. Esse texto agora vira step definitions e entra no ciclo Red → Green → Refactor. Você fez BDD. 🎯'
}
