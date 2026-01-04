'use client'

import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from '@/shared/ui/button'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/shared/lib'

type SubmitButtonProps = Omit<ButtonProps, 'type'> & {
  withoutLoader?: boolean
  isDisabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, withoutLoader, isDisabled, children, ...props }) => {
  const { pending } = useFormStatus()
  const isLoading = withoutLoader ? false : pending

  return (
    <Button
      type="submit"
      className={cn(className, 'relative')}
      disabled={isLoading || pending || isDisabled}
      {...props}
    >
      <div className={isLoading ? 'opacity-0 transition-opacity' : 'opacity-100 transition-opacity'}>{children}</div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <LoaderCircle className="w-5 h-5 animate-spin" />
        </div>
      )}
    </Button>
  )
}

export { SubmitButton }

