import { ChevronDown, XIcon } from 'lucide-react'
import React from 'react'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  type CommandInputProps,
  CommandItem,
  type CommandItemProps,
  CommandList,
  type CommandListProps,
  type CommandProps
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
  type PopoverTriggerProps
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/ui'

// Multi select
export interface Option {
  value: string
  label: string
}

export interface MultiSelectProps {
  value: Array<Option['value']>
  options: Option[]
  placeholder?: string
  max?: number
  isServerSideSearching?: boolean
  popoverProps?: PopoverProps
  popoverTriggerProps?: PopoverTriggerProps
  popoverContentProps?: PopoverContentProps
  buttonTriggerProps?: ButtonProps
  selectedOptionBadgeProps?: Omit<BadgeProps, 'children'> & {
    children: (option: Option) => React.ReactNode
  }
  commandProps?: CommandProps
  commandInputProps?: CommandInputProps
  commandListProps?: CommandListProps
  commandItemProps?: Omit<CommandItemProps, 'children'> & {
    children: (option: Option) => React.ReactNode
  }
  commandGroupSlot?: React.ReactNode
  onValueChange: (value: MultiSelectProps['value']) => void
}

export const MultiSelect = ({
  value,
  options,
  placeholder,
  max = Infinity,
  isServerSideSearching,
  popoverProps,
  popoverTriggerProps,
  buttonTriggerProps,
  popoverContentProps,
  selectedOptionBadgeProps,
  commandProps,
  commandInputProps,
  commandListProps,
  commandItemProps,
  commandGroupSlot,
  onValueChange
}: MultiSelectProps) => {
  // Refs
  const valueContainerRef = React.useRef<HTMLDivElement>(null)
  const overflowBadgeRef = React.useRef<HTMLSpanElement>(null)

  // States
  const [overflowItemCount, setOverflowItemCount] = React.useState(0)

  // Methods
  const resize = React.useCallback((node: HTMLDivElement) => {
    valueContainerRef.current = node

    const checkOverflow = () => {
      const containerElement = valueContainerRef.current
      if (!containerElement) return

      const items = Array.from(
        containerElement.querySelectorAll<HTMLSpanElement>('span[data-slot="badge"][data-option="true"]')
      )

      items.forEach((item) => {
        item.style.removeProperty('display')
      })

      let overflowCount = 0
      for (let i = items.length - 1; i >= 0; i--) {
        if (containerElement.scrollWidth <= containerElement.clientWidth) break

        overflowCount++
        items[i].style.display = 'none'
        overflowBadgeRef.current?.style.removeProperty('display')
      }
      setOverflowItemCount(overflowCount)
    }

    const mutationObserver = new MutationObserver(checkOverflow)
    const resizeObserver = new ResizeObserver(checkOverflow)

    mutationObserver.observe(node, {
      childList: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })
    resizeObserver.observe(node)

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  const toggleOption = (option: Option['value']) => {
    const newSelectedValues = value.includes(option) ? value.filter((value) => value !== option) : [...value, option]
    onValueChange(newSelectedValues)
  }

  const deleteOption = (e: React.MouseEvent<HTMLSpanElement>, option: Option['value']) => {
    e.stopPropagation()
    toggleOption(option)
  }

  const deleteExtraOptions = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    const newSelectedValues = value.slice(0, value.length - overflowItemCount)
    onValueChange(newSelectedValues)
  }

  const deleteAllOptions = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    onValueChange([])
  }

  // Template
  return (
    <Popover {...popoverProps}>
      <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
        <Button
          {...buttonTriggerProps}
          variant='outline'
          data-empty={value.length === 0}
          className={cn(
            'w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto',
            buttonTriggerProps?.className
          )}
        >
          {value.length > 0 ? (
            <React.Fragment>
              <div ref={resize} className='flex grow items-center gap-2 overflow-hidden'>
                {value.map((value) => {
                  const option = options.find((option) => option.value === value)
                  return option ? (
                    <Badge
                      key={value}
                      variant='secondary'
                      data-option='true'
                      {...selectedOptionBadgeProps}
                      className={cn(
                        '[&>svg]:transition-transform hover:[&>svg]:scale-125',
                        selectedOptionBadgeProps?.className
                      )}
                      onClick={(e) => deleteOption(e, value)}
                    >
                      {option && selectedOptionBadgeProps?.children
                        ? selectedOptionBadgeProps.children(option)
                        : option.label}
                      <XIcon />
                    </Badge>
                  ) : null
                })}

                <Badge
                  ref={overflowBadgeRef}
                  variant='secondary'
                  {...selectedOptionBadgeProps}
                  className={cn(
                    '[&>svg]:transition-transform hover:[&>svg]:scale-125',
                    selectedOptionBadgeProps?.className
                  )}
                  style={{
                    display: overflowItemCount > 0 ? 'flex' : 'none'
                  }}
                  onClick={deleteExtraOptions}
                >
                  {`+ ${overflowItemCount}`}
                  <XIcon />
                </Badge>
              </div>

              <XIcon
                className='size-4 text-muted-foreground transition-transform hover:scale-125'
                onClick={deleteAllOptions}
              />

              <Separator orientation='vertical' className='flex h-full min-h-6' />
            </React.Fragment>
          ) : (
            <div className='grow text-left text-muted-foreground text-sm'>{placeholder}</div>
          )}

          <ChevronDown className='size-4 text-muted-foreground' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        {...popoverContentProps}
        align={popoverContentProps?.align ?? 'start'}
        className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
      >
        <Command {...commandProps}>
          <div className='flex items-center gap-2 border-input border-b px-3'>
            <Checkbox
              checked={value.length === options.length || (value.length > 0 && 'indeterminate')}
              onCheckedChange={(checked) => {
                onValueChange(checked ? options.map((option) => option.value) : [])
              }}
            />
            <div className='[&>div]:flex-1 [&>div]:border-b-0 [&>div]:border-b-none [&>div]:px-0'>
              <CommandInput placeholder='Search' {...commandInputProps}>
                {isServerSideSearching && <Spinner />}
              </CommandInput>
            </div>
          </div>

          <div className='relative'>
            <CommandList {...commandListProps} className={cn('scrollbar', commandListProps?.className)}>
              <CommandEmpty>No option found.</CommandEmpty>

              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value)
                  const isDisabled = !isSelected && value.length === max

                  return (
                    <CommandItem
                      disabled={isDisabled}
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option.value)}
                    >
                      <Checkbox checked={isSelected} />
                      {commandItemProps?.children ? commandItemProps.children(option) : option.label}
                    </CommandItem>
                  )
                })}

                {commandGroupSlot && commandGroupSlot}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
