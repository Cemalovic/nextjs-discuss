'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

interface FormButtonProps {
  color?:
    | 'warning'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | undefined
  children: React.ReactNode
}

const FormButton = ({ color, children }: FormButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' isLoading={pending} color={color}>
      {children}
    </Button>
  )
}

export default FormButton
