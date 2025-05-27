import { type ButtonHTMLAttributes } from 'react'
import productData from '../../../../data.json'
import { cn } from '../../../utils/twMerge'
import { useStore } from '../../../store'

interface ButtonSelectSizesProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean
  name: string
  price: number
  stock: number
}
export const ButtonSelectSizes = ({
  className,
  name,
  price,
  stock,
  isSelected = false,
  ...props
}: ButtonSelectSizesProps) => {
  return (
    <button
      {...props}
      data-selected={isSelected}
      className={cn(
        'cursor-pointer rounded-lg border border-gray-300 p-3 text-center hover:border-gray-400 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-700',
        className,
      )}
    >
      <h2 className="font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">
        R${' '}
        {price.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
      <span className="text-xs text-gray-500">Estoque: {stock}</span>
    </button>
  )
}

export const SkeletonSeletorTamanho = () => {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Capacidade de Armazenamento:</h3>
      <div className="grid animate-pulse grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-[94px] flex-col items-center space-y-2 rounded-lg border border-gray-200 p-3"
          >
            <div className="h-5 w-2/6 rounded bg-gray-300" />
            <div className="h-4 w-2/5 rounded bg-gray-200" />
            <div className="h-[13px] w-2/12 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

export const SeletorTamanho = () => {
  const setSelectedSize = useStore((store) => store.setSelectedSize)
  const selectedSize = useStore((store) => store.selectedSize)
  const isLoadingProduct = useStore((store) => store.isLoadingProduct)

  if (isLoadingProduct) {
    return <SkeletonSeletorTamanho />
  }

  return (
    <div>
      <h3 className="mb-3 font-semibold">Capacidade de Armazenamento:</h3>
      <div className="grid grid-cols-2 gap-2">
        {productData.sizes.map((size) => (
          <ButtonSelectSizes
            key={size.name}
            name={size.name}
            price={size.price}
            stock={size.stock}
            onClick={() => setSelectedSize(size)}
            isSelected={selectedSize.name === size.name}
          />
        ))}
      </div>
    </div>
  )
}
