import { Check, ChevronDownIcon, X } from 'lucide-react'
import * as React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
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
import { cn } from '@/lib/utils'

// Combobox
export interface Option {
  value: string
  label: string
}

export interface ComboboxProps {
  value: Option['value'] | null
  options: Option[]
  isValueCanBeEmptyString?: boolean
  isCanRemoveValue?: boolean
  placeholder?: string
  className?: string
  popoverTriggerProps?: PopoverTriggerProps
  buttonTriggerProps?: ButtonProps
  popoverProps?: PopoverProps
  popoverContentProps?: PopoverContentProps
  commandProps?: CommandProps
  commandInputProps?: CommandInputProps
  commandListProps?: CommandListProps
  commandItemProps?: CommandItemProps
  commandItemPrefix?: (option: Option) => React.ReactNode
  commandGroupSlot?: React.ReactNode
  onValueChange: (value: Option['value'] | null) => void
}

export const useLabel = (args: Pick<ComboboxProps, 'value' | 'options' | 'isValueCanBeEmptyString'>) => {
  // Args
  const { value, options, isValueCanBeEmptyString } = args

  // States
  const [label, setLabel] = React.useState<string>()

  // Effects
  // Reset label
  React.useEffect(() => {
    if (value == null || (value === '' && !isValueCanBeEmptyString)) {
      return setLabel(undefined)
    }

    const selectedOption = options.find((option) => option.value === value)

    if (selectedOption) {
      setLabel(selectedOption.label)
    }
  }, [value, options, isValueCanBeEmptyString])

  return { label }
}

export const Combobox = ({
  value,
  options,
  isValueCanBeEmptyString = true,
  isCanRemoveValue = true,
  placeholder,
  className,
  popoverProps,
  popoverTriggerProps,
  buttonTriggerProps,
  popoverContentProps,
  commandProps,
  commandInputProps,
  commandListProps,
  commandItemProps,
  commandItemPrefix,
  commandGroupSlot,
  onValueChange
}: ComboboxProps) => {
  // Hooks
  const { label } = useLabel({
    value,
    options,
    isValueCanBeEmptyString
  })

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  return (
    <div className={className}>
      <Popover {...popoverProps} open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
          {popoverTriggerProps?.children ?? (
            <Button
              variant='outline'
              role='combobox'
              data-empty={value == null || (value === '' && !isValueCanBeEmptyString)}
              aria-expanded={isOpenPopover}
              {...buttonTriggerProps}
              className={cn(
                'w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto',
                buttonTriggerProps?.className
              )}
            >
              {buttonTriggerProps?.children ?? (
                <React.Fragment>
                  <span className='line-clamp-1 block text-ellipsis'> {label ?? placeholder}</span>

                  {isCanRemoveValue && value ? (
                    <X
                      className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
                      onClick={(e) => {
                        e.stopPropagation()
                        onValueChange(null)
                      }}
                    />
                  ) : (
                    <ChevronDownIcon className='ml-auto size-4 shrink-0 text-muted-foreground' />
                  )}
                </React.Fragment>
              )}
            </Button>
          )}
        </PopoverTrigger>

        <PopoverContent
          {...popoverContentProps}
          className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
        >
          <Command {...commandProps}>
            <CommandInput {...commandInputProps} />

            <CommandList {...commandListProps} className={cn('scrollbar', commandListProps?.className)}>
              <CommandEmpty>No option found.</CommandEmpty>

              <CommandGroup>
                {options.map((option) => (
                  <div
                    key={option.value}
                    className={cn('flex items-center gap-1', {
                      'pl-1': Boolean(commandItemPrefix)
                    })}
                  >
                    {commandItemPrefix?.(option)}

                    <CommandItem
                      value={option.label}
                      className='grow'
                      onSelect={() => {
                        onValueChange(option.value)
                        setIsOpenPopover(false)
                      }}
                      {...commandItemProps}
                    >
                      <span>{option.label}</span>
                      <Check className={cn('ml-auto size-4', option.value === value ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  </div>
                ))}

                {commandGroupSlot && commandGroupSlot}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
