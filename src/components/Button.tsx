import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

type ButtonVariants = VariantProps<typeof buttonStyles>

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: ReactNode
}

const buttonStyles = tv({
  base: 'rounded-lg transition-colors cursor-pointer',
  variants: {
    state: {
      primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      outline: 'hover:bg-blue-50 border border-blue-600 text-blue-700',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none',
    },
  },
  defaultVariants: {
    state: 'primary',
    size: 'md',
    disabled: false,
  },
})

export const Button = ({
  children,
  className,
  state,
  size,
  disabled,
  ...props
}: ButtonProps) => {
  const stylesButton = buttonStyles({ state, size, disabled })

  return (
    <button {...props} className={twMerge(stylesButton, className)}>
      {children}
    </button>
  )
}
