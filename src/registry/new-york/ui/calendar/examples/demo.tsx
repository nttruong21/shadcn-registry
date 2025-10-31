import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'

// Component
export const CalendarDemo = () => {
  // States
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Template
  return <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border shadow-sm' />
}
