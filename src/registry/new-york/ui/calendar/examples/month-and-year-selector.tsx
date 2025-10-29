// Core
import * as React from 'react'
import { add, endOfYear } from 'date-fns'

// App
import { Calendar } from '@/components/ui/calendar'

// Component
export const CalendarWithMonthAndYearSelector = () => {
  // States
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Template
  return (
    <Calendar
      mode='single'
      selected={date}
      captionLayout='dropdown'
      startMonth={new Date('1900-01-01')}
      endMonth={endOfYear(add(new Date(), { years: 100 }))}
      className='rounded-md border shadow-sm'
      onSelect={setDate}
    />
  )
}
