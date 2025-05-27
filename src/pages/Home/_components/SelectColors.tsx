import { useStore } from '../../../store'

const SkeletonColors = () => {
  return (
    <div>
      <div className="mb-3 flex gap-1">
        <h3 className="font-semibold">Cor:</h3>
        <span className="h-6 w-28 animate-pulse rounded bg-gray-300" />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 animate-pulse rounded-full border-2 border-gray-300 bg-gray-300"
          />
        ))}
      </div>

      <div className="mt-1 h-5 w-32 animate-pulse rounded bg-gray-200" />
    </div>
  )
}

export const SelectColors = () => {
  const selectedColor = useStore((store) => store.selectedColor)
  const setSelectedColor = useStore((store) => store.setSelectedColor)
  const productData = useStore((store) => store.productData)

  if (!productData) {
    return <SkeletonColors />
  }

  return (
    <div>
      <h3 className="mb-3 font-semibold">
        Cor:{' '}
        <span className="font-normal text-gray-600">{selectedColor.name}</span>
      </h3>
      <div className="flex gap-2">
        {productData.colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color)}
            className={`h-10 w-10 cursor-pointer rounded-full border-2 ${
              selectedColor.name === color.name
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
      <div className="mt-1 text-sm text-gray-600">
        Estoque: {selectedColor.stock} unidades
      </div>
    </div>
  )
}
