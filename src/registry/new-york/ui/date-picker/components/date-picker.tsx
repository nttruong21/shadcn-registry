import { format, toDate } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, type CalendarProps } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Date picker
export interface DatePickerProps {
  value: Date | string | null | undefined
  isCanRemoveValue?: boolean
  className?: string
  isDisabled?: boolean
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: Date | null | undefined) => void
}

export const DatePicker = ({
  value,
  isCanRemoveValue = true,
  className,
  isDisabled,
  calendarProps,
  onValueChange
}: DatePickerProps) => {
  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Memos
  // Selected date
  const selectedDate = React.useMemo(() => {
    return value ? toDate(value) : undefined
  }, [value])

  // Template
  return (
    <div className={className}>
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            data-empty={!value}
            aria-expanded={isOpenPopover}
            disabled={isDisabled}
            className='w-full data-[empty=true]:text-muted-foreground  justify-start [&_svg]:pointer-events-auto font-normal'
          >
            <span>{value ? format(value, 'dd/MM/yyyy') : 'Pick a date'}</span>

            {isCanRemoveValue && value ? (
              <X
                className='text-muted-foreground ml-auto size-4 shrink-0 transition-transform hover:scale-125'
                onClick={(e) => {
                  e.stopPropagation()
                  onValueChange(null)
                }}
              />
            ) : (
              <CalendarIcon className='text-muted-foreground ml-auto size-4 shrink-0' />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0 overflow-hidden'>
          <Calendar
            mode='single'
            selected={selectedDate}
            captionLayout='dropdown'
            required
            onSelect={(date) => {
              onValueChange(date)
              setIsOpenPopover(false)
            }}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
