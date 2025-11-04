import React from 'react'
import { YearPicker, type YearPickerProps } from '@/components/molecules/year-picker'

// Component
export const YearPickerDemo = () => {
  // States
  const [value, setValue] = React.useState<YearPickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <YearPicker value={value} placeholder='Select year' onValueChange={setValue} />
    </div>
  )
}
