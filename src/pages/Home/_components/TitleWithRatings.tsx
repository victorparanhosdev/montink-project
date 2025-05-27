import { Star } from 'lucide-react'
import { useStore } from '../../../store'

const SkeletonTitleWithRatings = () => {
  return (
    <div className="min-h-[60px]">
      <div className="my-4 h-8 w-2/3 animate-pulse rounded bg-gray-200 lg:mb-2" />

      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  )
}

export const TitleWithRatings = () => {
  const productData = useStore((store) => store.productData)

  if (!productData) {
    return <SkeletonTitleWithRatings />
  }

  return (
    <div>
      <h1 className="my-4 w-full text-2xl font-bold text-gray-900 lg:mb-2">
        {productData.title}
      </h1>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.floor(productData.rating)
                  ? 'fill-current text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {productData.rating} ({productData.reviews} avaliações)
        </span>
      </div>
    </div>
  )
}
