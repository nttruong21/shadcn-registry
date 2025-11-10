import React from 'react'
import { DatePicker, type DatePickerProps } from '@/components/ui/date-picker'

// Component
export const DatePickerDemo = () => {
  // States
  const [value, setValue] = React.useState<DatePickerProps['value']>(null)

  // Template
  return <DatePicker value={value} className='w-xs' placeholder='Select date' onValueChange={setValue} />
}
