import { Heart } from 'lucide-react'
import { useState } from 'react'

export const ButtonFav = () => {
  const [isToggleFav, setToggleFav] = useState(false)

  return (
    <button
      onClick={() => setToggleFav((prev) => !prev)}
      className={`absolute top-6 right-6 cursor-pointer rounded-full p-2 shadow-md ring-1 ring-red-100 transition-transform hover:scale-110 ${
        isToggleFav ? 'bg-red-600 text-white' : 'bg-white text-red-600'
      }`}
      title={isToggleFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        size={20}
        fill={isToggleFav ? 'currentColor' : 'none'}
        stroke="currentColor"
      />
    </button>
  )
}
