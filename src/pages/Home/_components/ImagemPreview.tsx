import { useStore } from '../../../store'

const SkeletonImagePreview = () => {
  return (
    <div className="animate-pulse lg:w-full">
      <div className="mb-4 min-h-80 rounded-lg bg-gray-200 p-4 shadow-sm lg:h-[35%]">
        <div className="h-full w-full rounded-lg bg-gray-300" />
      </div>

      <div className="flex gap-2 overflow-x-auto p-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-18 w-18 flex-shrink-0 rounded-lg bg-gray-300 ring-2 ring-gray-200"
          />
        ))}
      </div>
    </div>
  )
}

export const ImagePreview = () => {
  const setSelectedImage = useStore((store) => store.setSelectedImage)
  const selectedImage = useStore((store) => store.selectedImage)
  const productData = useStore((store) => store.productData)

  if (!productData) {
    return <SkeletonImagePreview />
  }

  return (
    <div className="lg:w-full">
      <div className="mb-4 h-[35%] rounded-lg bg-white p-4 shadow-sm">
        <img
          src={productData.images[selectedImage]}
          alt={productData.title}
          aria-label="Imagem principal do produto"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto p-2">
        {productData.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`h-18 w-18 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg ring-2 ${
              selectedImage === index
                ? 'shadow-md ring-blue-500'
                : 'ring-gray-200'
            }`}
          >
            <img
              src={image}
              alt={`Imagem ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
