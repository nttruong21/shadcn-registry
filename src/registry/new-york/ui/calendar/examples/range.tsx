// Core
import * as React from 'react'
import { type DateRange } from 'react-day-picker'

// App
import { Calendar } from '@/components/ui/calendar'

// Component
export const CalendarRange = () => {
  // States
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15)
  })

  // Template
  return (
    <Calendar
      mode='range'
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      className='rounded-lg border shadow-sm'
    />
  )
}
