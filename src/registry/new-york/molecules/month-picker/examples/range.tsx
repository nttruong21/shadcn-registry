import React from 'react'
import { MonthRangePicker, type MonthRangePickerProps } from '@/components/molecules/month-picker'

// Component
export const MonthPickerRange = () => {
  // States
  const [value, setValue] = React.useState<MonthRangePickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <MonthRangePicker value={value} placeholder='Select month' onValueChange={setValue} />
    </div>
  )
}
