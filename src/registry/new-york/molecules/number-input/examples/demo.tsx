import React from 'react'
import { NumberInput, type NumberInputProps } from '@/components/molecules/number-input'

// Component
export const NumberInputDemo = () => {
  // States
  const [value, setValue] = React.useState<NumberInputProps['value']>('')

  // Template
  return (
    <NumberInput
      value={value}
      placeholder='Enter number'
      className='w-xs'
      onFieldChange={setValue}
      onValueChange={({ value }) => setValue(value)}
    />
  )
}
