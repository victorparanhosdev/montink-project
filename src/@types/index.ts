export type Product = {
  id: string
  title: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  images: string[]
  colors: ColorOption[]
  sizes: SizeOption[]
}

export type ColorOption = {
  name: string
  value: string
  stock: number
}

export type SizeOption = {
  name: string
  price: number
  stock: number
}

export interface Endereco {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
