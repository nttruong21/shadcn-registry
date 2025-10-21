// Core
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// App
import { cn } from '@/lib/utils'
import { Input, type InputProps } from '@/components/ui/input'

// Component
export const PasswordInput = ({ className, ...props }: InputProps) => {
  // States
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  // Template
  return (
    <div className='relative'>
      <Input
        type={passwordVisibility ? 'text' : 'password'}
        autoComplete='on'
        {...props}
        className={cn('pr-10', className)}
      />
      <div
        className='text-muted-foreground absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 py-2'
        onClick={() => setPasswordVisibility(!passwordVisibility)}
      >
        {passwordVisibility ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
      </div>
    </div>
  )
}
