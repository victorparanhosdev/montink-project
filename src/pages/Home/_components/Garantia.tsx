import { Shield } from 'lucide-react'

export const Garantia = () => {
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Shield size={20} className="text-green-600" />
        <span className="font-semibold">Garantias e Benefícios</span>
      </div>
      <ul className="space-y-1 text-sm text-gray-700">
        <li>• Garantia oficial Samsung de 12 meses</li>
        <li>• 7 dias para troca ou devolução</li>
        <li>• Produto 100% original</li>
        <li>• Entrega com seguro</li>
      </ul>
    </div>
  )
}
