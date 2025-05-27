import type { InputHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../utils/twMerge'

const inputTextStyles = tv({
  base: 'flex-1 rounded-lg border px-3 py-2 focus:outline-none transition-colors',
  variants: {
    state: {
      default: 'border-gray-300 focus:ring-2 focus:ring-blue-500',
      negative: 'border-red-500 focus:ring-2 focus:ring-red-500',
    },
    disabled: {
      true: 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 focus:ring-0',
      false: '',
    },
  },
  defaultVariants: {
    state: 'default',
    disabled: false,
  },
})

type InputTextProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputTextStyles>

export function InputText({
  state,
  disabled,
  className,
  ...props
}: InputTextProps) {
  const styles = inputTextStyles({ state, disabled })
  return (
    <input
      className={cn(styles, className)}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  )
}
