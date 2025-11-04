import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { InputProps } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

// Password input
export const PasswordInput = ({ className, ...props }: InputProps) => {
  // States
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  // Template
  return (
    <InputGroup>
      <InputGroupInput {...props} type={passwordVisibility ? 'text' : 'password'} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton size='icon-xs' onClick={() => setPasswordVisibility((prev) => !prev)}>
          {passwordVisibility ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
