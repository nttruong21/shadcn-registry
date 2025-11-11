import { format, toDate } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar, type CalendarProps } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Date picker
export interface DatePickerProps {
  value: Date | string | null | undefined
  isCanRemoveValue?: boolean
  className?: string
  isDisabled?: boolean
  placeholder?: string
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: Date | null | undefined) => void
}

export const DatePicker = ({
  value,
  isCanRemoveValue = true,
  className,
  isDisabled,
  placeholder,
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
            className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto'
          >
            <span className='line-clamp-1 text-ellipsis'>{value ? format(value, 'dd/MM/yyyy') : placeholder}</span>

            {isCanRemoveValue && value ? (
              <X
                className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                onClick={(e) => {
                  e.stopPropagation()
                  onValueChange(null)
                }}
              />
            ) : (
              <CalendarIcon className='ml-auto size-4 shrink-0 text-muted-foreground' />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto overflow-hidden p-0'>
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

// Date range picker
export interface DateRangePickerProps {
  value?: DateRange
  isCanRemoveValue?: boolean
  className?: string
  isDisabled?: boolean
  placeholder?: string
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'required' | 'onSelect'>
  onValueChange: (value: DateRange) => void
}

export const DateRangePicker = ({
  value,
  isCanRemoveValue = true,
  className,
  isDisabled,
  placeholder,
  calendarProps,
  onValueChange
}: DateRangePickerProps) => {
  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Template
  return (
    <div className={className}>
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            data-empty={!value?.from || !value?.to}
            aria-expanded={isOpenPopover}
            disabled={isDisabled}
            className='w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto'
          >
            <span className='line-clamp-1 text-ellipsis'>
              {value?.from && value?.to
                ? `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`
                : placeholder}
            </span>

            {isCanRemoveValue && value?.from && value?.to ? (
              <X
                className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                onClick={(e) => {
                  e.stopPropagation()
                  onValueChange({ from: undefined, to: undefined })
                }}
              />
            ) : (
              <CalendarIcon className='ml-auto size-4 shrink-0 text-muted-foreground' />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto overflow-hidden p-0'>
          <Calendar
            mode='range'
            selected={value}
            captionLayout='dropdown'
            required
            onSelect={onValueChange}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
