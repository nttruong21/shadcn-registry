// Core
import * as React from 'react'

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
      className='rounded-md border shadow-sm'
      onSelect={setDate}
    />
  )
}
