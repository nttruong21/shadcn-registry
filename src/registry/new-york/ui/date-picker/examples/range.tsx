import React from 'react'
import { DateRangePicker, type DateRangePickerProps } from '@/components/ui/date-picker'

// Component
export const DatePickerRange = () => {
  // States
  const [value, setValue] = React.useState<DateRangePickerProps['value']>({ from: undefined, to: undefined })

  // Template
  return <DateRangePicker value={value} className='w-xs' onValueChange={setValue} />
}
