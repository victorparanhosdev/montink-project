import { useStore } from '../../../store'
import productData from '../../../../data.json'

const SkeletonPrices = () => {
  return (
    <div className="min-h-24 animate-pulse space-y-2">
      <div className="flex items-center gap-3">
        <div className="h-8 w-32 rounded bg-gray-300" />
        <div className="h-6 w-12 rounded bg-red-300" />
      </div>

      <div className="h-5 w-28 rounded bg-gray-200" />

      <div className="h-4 w-40 rounded bg-gray-200" />
    </div>
  )
}

export const Prices = () => {
  const selectedSize = useStore((store) => store.selectedSize)
  const isLoadingProduct = useStore((store) => store.isLoadingProduct)

  const discount = Math.round(
    ((productData.originalPrice - selectedSize.price) /
      productData.originalPrice) *
      100,
  )

  if (isLoadingProduct) {
    return <SkeletonPrices />
  }

  return (
    <div className="min-h-24 space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-green-600">
          R${' '}
          {selectedSize.price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
        </span>
        {discount > 0 && (
          <span className="rounded bg-red-500 px-2 py-1 text-sm font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div>
      {discount > 0 && (
        <div className="text-gray-500 line-through">
          R${' '}
          {productData.originalPrice.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
        </div>
      )}
      <div className="text-sm text-gray-600">
        ou 12x de R${' '}
        {(selectedSize.price / 12).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}{' '}
        sem juros
      </div>
    </div>
  )
}
