import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { ColorOption, Endereco, Product, SizeOption } from '../@types'
import productData from '../../data.json'

export interface StoreProps {
  isLoading: boolean
  dataCep: Endereco | null
  getCep: (cep: string) => Promise<void>
  errorCep: string | undefined
  selectedSize: SizeOption
  setSelectedSize: (size: SizeOption) => void
  productData: Product | null
  setSelectedImage: (index: number) => void
  selectedImage: number
  isLoadingProduct: boolean
  load: () => Promise<void>
  setQuantity: (value: number) => void
  quantity: number
  setSelectedColor: (color: ColorOption) => void
  selectedColor: ColorOption
  clearStorage: () => void
}

const TEMPO_EXPIRACAO = 15 * 60 * 1000 //15 minutos
const TEMPO_VERIFICACAO = 5 * 60 * 1000 // 5 minutos

const STORAGE_CONFIG = {
  key: 'product-store',
  expirationTime: TEMPO_EXPIRACAO,
  version: 1,
}

type StorageFields =
  | 'selectedColor'
  | 'selectedSize'
  | 'selectedImage'
  | 'quantity'
type StorageData = Pick<StoreProps, StorageFields>

interface StorageWrapper {
  version: number
  timestamp: number
  expiresAt: number
  data: Partial<StorageData>
}

const storage = {
  load: (): Partial<StorageData> => {
    try {
      const stored = localStorage.getItem(STORAGE_CONFIG.key)
      if (!stored) return {}

      const parsed: StorageWrapper = JSON.parse(stored)
      const now = Date.now()

      if (now > parsed.expiresAt) {
        storage.clear()
        return {}
      }

      if (parsed.version !== STORAGE_CONFIG.version) {
        console.warn('Versão do localStorage incompatível, limpando dados...')
        storage.clear()
        return {}
      }

      return parsed.data || {}
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error)
      storage.clear()
      return {}
    }
  },

  save: (data: Partial<StorageData>) => {
    try {
      const now = Date.now()
      const existing = storage.load()
      const updated = { ...existing, ...data }

      const toSave: StorageWrapper = {
        version: STORAGE_CONFIG.version,
        timestamp: now,
        expiresAt: now + STORAGE_CONFIG.expirationTime,
        data: updated,
      }

      localStorage.setItem(STORAGE_CONFIG.key, JSON.stringify(toSave))
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error)
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_CONFIG.key)
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error)
    }
  },

  renewExpiration: () => {
    try {
      const stored = localStorage.getItem(STORAGE_CONFIG.key)
      if (!stored) return

      const parsed: StorageWrapper = JSON.parse(stored)
      const now = Date.now()

      if (now < parsed.expiresAt) {
        parsed.timestamp = now
        parsed.expiresAt = now + STORAGE_CONFIG.expirationTime
        localStorage.setItem(STORAGE_CONFIG.key, JSON.stringify(parsed))
      }
    } catch (error) {
      console.error('Erro ao renovar expiração:', error)
    }
  },
}

export const useStore = create<StoreProps>()(
  subscribeWithSelector((set) => {
    const storedData = storage.load()

    return {
      isLoading: false,
      dataCep: null,
      errorCep: undefined,
      selectedSize: storedData.selectedSize || { name: '', price: 0, stock: 0 },
      productData: null,
      selectedImage: storedData.selectedImage || 0,
      isLoadingProduct: false,
      quantity: storedData.quantity || 1,
      selectedColor: storedData.selectedColor || {
        name: '',
        stock: 0,
        value: '',
      },

      setSelectedColor: (color) => {
        set({ selectedColor: color, quantity: 1 })

        storage.renewExpiration()
      },

      setQuantity: (value) => {
        set({ quantity: value })
        storage.renewExpiration()
      },

      setSelectedImage: (index: number) => {
        set({ selectedImage: index })
        storage.renewExpiration()
      },

      setSelectedSize: (size: SizeOption) => {
        set({ selectedSize: size, quantity: 1 })
        storage.renewExpiration()
      },

      load: async () => {
        set({ isLoadingProduct: true })
        await new Promise((resolve) => setTimeout(resolve, 700))

        const storedData = storage.load()

        const defaultSize = storedData.selectedSize?.name
          ? storedData.selectedSize
          : productData.sizes[0]

        const defaultColor = storedData.selectedColor?.name
          ? storedData.selectedColor
          : productData.colors[0]

        set({
          productData: productData,
          isLoadingProduct: false,
          selectedSize: defaultSize,
          selectedColor: defaultColor,
        })
      },

      clearStorage: () => {
        storage.clear()
        set({
          selectedColor: { name: '', stock: 0, value: '' },
          selectedSize: { name: '', price: 0, stock: 0 },
          selectedImage: 0,
          quantity: 1,
        })
      },

      getCep: async (cep: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
          const data = await response.json()

          if (data.erro) {
            return set({
              dataCep: null,
              isLoading: false,
              errorCep: 'Erro ao buscar o CEP, por favor insira um CEP válido.',
            })
          }

          set({ dataCep: data, isLoading: false, errorCep: undefined })
        } catch (error) {
          set({ dataCep: null, isLoading: false, errorCep: `Error: ${error}` })
        }
      },
    }
  }),
)

useStore.subscribe(
  (state) => ({
    selectedColor: state.selectedColor,
    selectedSize: state.selectedSize,
    selectedImage: state.selectedImage,
    quantity: state.quantity,
  }),
  (selectedState) => {
    const hasValidData = Object.entries(selectedState).some(([key, value]) => {
      if (key === 'selectedImage' || key === 'quantity') {
        return typeof value === 'number' && value >= 0
      }
      return value && typeof value === 'object' && value.name !== ''
    })

    if (hasValidData) {
      storage.save(selectedState)
    }
  },
  {
    equalityFn: (a, b) =>
      a.selectedColor.name === b.selectedColor.name &&
      a.selectedSize.name === b.selectedSize.name &&
      a.selectedImage === b.selectedImage &&
      a.quantity === b.quantity,
  },
)
let expirationIntervalId: number | null = null

if (typeof window !== 'undefined' && expirationIntervalId === null) {
  expirationIntervalId = window.setInterval(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CONFIG.key)
      if (!stored) return

      const parsed: StorageWrapper = JSON.parse(stored)
      const now = Date.now()

      if (now > parsed.expiresAt) {
        storage.clear()

        clearInterval(expirationIntervalId!)
        expirationIntervalId = null
      }
    } catch (error) {
      console.error('Erro ao verificar expiração do localStorage:', error)
    }
  }, TEMPO_VERIFICACAO)
}
