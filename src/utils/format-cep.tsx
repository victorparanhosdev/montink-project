export const formatCep = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 8)
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
}
