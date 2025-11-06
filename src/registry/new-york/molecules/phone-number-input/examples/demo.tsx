import React from 'react'
import { PhoneNumberInput } from '@/components/molecules/phone-number-input'

// Component
export const PhoneNUmberInput = () => {
  // States
  const [value, setValue] = React.useState('')

  // Template
  return <PhoneNumberInput value={value} onValueChange={setValue} />
}
