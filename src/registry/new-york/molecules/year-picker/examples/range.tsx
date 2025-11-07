import React from 'react'
import { YearRangePicker, type YearRangePickerProps } from '@/components/molecules/year-picker'

// Component
export const YearPickerRange = () => {
  // States
  const [value, setValue] = React.useState<YearRangePickerProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <YearRangePicker value={value} placeholder='Select year' onValueChange={setValue} />
    </div>
  )
}
