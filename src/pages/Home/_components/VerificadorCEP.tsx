import { LoaderCircle, MapPin, Package, Truck } from 'lucide-react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useStore } from '../../../store'
import { formatCep } from '../../../utils/format-cep'
import { useEffect } from 'react'
import { InputText } from '../../../components/InputText'
import { Button } from '../../../components/Button'

export const SchemaSearchCep = z.object({
  cep: z
    .string()
    .nonempty('Para consultar, é necessário digitar um CEP')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => /^\d{8}$/.test(val), {
      message: 'CEP deve conter exatamente 8 números',
    }),
})

type SchemaSearchCepProps = z.infer<typeof SchemaSearchCep>

export const VerificadorCEP = () => {
  const getCep = useStore((store) => store.getCep)
  const dataCep = useStore((store) => store.dataCep)
  const isLoading = useStore((store) => store.isLoading)
  const errorCep = useStore((store) => store.errorCep)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaSearchCepProps>({
    resolver: zodResolver(SchemaSearchCep),
    defaultValues: {
      cep: '',
    },
  })

  async function handleSearchCep({ cep }: SchemaSearchCepProps) {
    await getCep(cep)
  }

  const msgErrorForm = errors.cep?.message
  const isErrorForm = !!msgErrorForm

  useEffect(() => {
    if (errorCep) {
      alert(errorCep)
    }
  }, [errorCep])

  return (
    <div className="rounded-lg border-t-2 border-gray-100 bg-white p-4 shadow-md">
      <h3 className="mb-3 flex items-center gap-2 font-semibold">
        <Truck size={20} />
        Consulte o frete e prazo de entrega
      </h3>

      <form
        onSubmit={handleSubmit(handleSearchCep)}
        className="mb-3 flex flex-col gap-2 sm:flex-row"
      >
        <InputText
          type="text"
          placeholder="Digite seu CEP"
          maxLength={8}
          state={isErrorForm ? 'negative' : 'default'}
          {...register('cep')}
        />
        <Button
          size="sm"
          type="submit"
          className="flex min-w-[93.22px] items-center justify-center"
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : 'Consultar'}
        </Button>
      </form>

      {isErrorForm && (
        <span className="mb-3 text-sm text-red-600">{msgErrorForm}</span>
      )}

      {dataCep && !errorCep && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-green-600" />
            <div className="text-sm">
              <div className="font-semibold text-green-800">
                Endereço encontrado:
              </div>
              <div className="text-green-700">
                {dataCep.logradouro && `${dataCep.logradouro}, `}
                {dataCep.bairro} - {dataCep.localidade}/{dataCep.uf}
              </div>
              <div className="text-green-600">
                CEP: {formatCep(dataCep.cep)}
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-green-700">
                  <Package size={14} />
                  <span className="text-xs">
                    Entrega padrão: 3-5 dias úteis - Grátis
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Truck size={14} />
                  <span className="text-xs">
                    Entrega expressa: 1-2 dias úteis - R$ 15,90
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
