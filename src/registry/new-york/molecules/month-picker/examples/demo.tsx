import React from 'react'
import { MonthPicker, type MonthPickerProps } from '@/components/molecules/month-picker'

// Component
export const MonthPickerDemo = () => {
  // States
  const [value, setValue] = React.useState<MonthPickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <MonthPicker value={value} placeholder='Select month' onValueChange={setValue} />
    </div>
  )
}
