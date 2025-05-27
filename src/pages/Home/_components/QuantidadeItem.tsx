import { useStore } from '../../../store'

export const QuantidadeItem = () => {
  const quantity = useStore((store) => store.quantity)
  const setQuantity = useStore((store) => store.setQuantity)
  const selectedColor = useStore((store) => store.selectedColor)
  const selectedSize = useStore((store) => store.selectedSize)

  const maxStock = Math.min(selectedColor.stock, selectedSize.stock)

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    setQuantity(Math.max(1, quantity - 1))
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold">Quantidade:</span>
      <div className="flex items-center rounded-lg border border-gray-300">
        <button
          onClick={handleDecrement}
          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
        >
          -
        </button>
        <span className="border-x border-gray-300 px-4 py-2">{quantity}</span>
        <button
          onClick={handleIncrement}
          className={`px-3 py-2 ${
            quantity >= maxStock
              ? 'cursor-default opacity-50'
              : 'cursor-pointer hover:bg-gray-100'
          }`}
          disabled={quantity >= maxStock}
        >
          +
        </button>
      </div>
      <span className="text-sm text-gray-600">({maxStock} disponíveis)</span>
    </div>
  )
}
