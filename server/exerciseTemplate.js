export const bddExerciseContent = {
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

export const checkTypes = [
  { value: 'hasScenario', label: 'Tem título Cenário' },
  { value: 'hasGiven', label: 'Tem Dado/Given' },
  { value: 'hasOneWhen', label: 'Tem exatamente um Quando' },
  { value: 'hasThen', label: 'Tem Então/Then' },
  { value: 'hasNumbers', label: 'Usa números' },
  { value: 'hasKeyword', label: 'Contém palavra-chave' },
  { value: 'regex', label: 'Expressão regular' }
]
