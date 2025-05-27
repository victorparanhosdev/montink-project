import { Button } from '../../../components/Button'
import { QuantidadeItem } from './QuantidadeItem'

export const Actions = () => {
  return (
    <div className="space-y-4">
      <QuantidadeItem />
      <div className="flex gap-3">
        <Button className="flex-1 font-semibold">Comprar Agora</Button>
        <Button state="outline" className="flex-1 font-semibold">
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  )
}
