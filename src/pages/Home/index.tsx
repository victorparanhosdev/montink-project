import { useEffect } from 'react'
import { Actions } from './_components/Actions'
import { ButtonFav } from './_components/ButtonFav'
import { Garantia } from './_components/Garantia'
import { ImagePreview } from './_components/ImagemPreview'
import { MenuNav } from './_components/MenuNav'
import { Prices } from './_components/Prices'
import { SelectColors } from './_components/SelectColors'
import { SeletorTamanho } from './_components/SeletorTamanho'
import { VerificadorCEP } from './_components/VerificadorCEP'
import { useStore } from '../../store'
import { TitleWithRatings } from './_components/TitleWithRatings'

export default function Home() {
  const load = useStore((store) => store.load)

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <MenuNav />
        <ButtonFav />

        <main className="montink:grid montink:grid-cols-[35%_1fr] mt-4 gap-12">
          <ImagePreview />

          <div className="space-y-6">
            <TitleWithRatings />
            <Prices />
            <SelectColors />
            <SeletorTamanho />
            <Actions />
            <VerificadorCEP />
            <Garantia />
          </div>
        </main>
      </div>
    </div>
  )
}
