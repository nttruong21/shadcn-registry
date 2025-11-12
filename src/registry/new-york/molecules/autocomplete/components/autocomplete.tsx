import { Command as CommandPrimitive } from 'cmdk'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  type CommandListProps,
  type CommandProps
} from '@/components/ui/command'
import type { InputProps } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/ui'

// Autocomplete
export interface Option {
  value: string
  label: string
}

export interface AutocompleteProps {
  value: string
  options: Option[]
  placeholder?: string
  isValueAsLabel?: boolean
  isLoading?: boolean
  commandProps?: CommandProps
  inputProps?: InputProps
  commandListProps?: CommandListProps
  commandGroupSlot?: React.ReactNode
  onValueChange: (value: string) => void
}

export const Autocomplete = ({
  value,
  options,
  placeholder,
  isValueAsLabel = true,
  isLoading = false,
  commandProps,
  inputProps,
  commandGroupSlot,
  commandListProps,
  onValueChange
}: AutocompleteProps) => {
  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Methods
  const downKey = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      close()
    }
  }, [])

  const openAuto = React.useCallback((event: Event) => {
    event.preventDefault()
  }, [])

  const interactOutside = React.useCallback((event: Event) => {
    const { target, preventDefault } = event
    if (target instanceof Element && target.hasAttribute('cmdk-input')) {
      preventDefault()
    }
  }, [])

  // Template
  return (
    <div>
      <Popover open={isOpenPopover} modal onOpenChange={setIsOpenPopover}>
        <Command {...commandProps} className={cn('overflow-visible', commandProps?.className)}>
          <PopoverAnchor>
            <div>
              <PopoverTrigger asChild onClick={() => setIsOpenPopover(true)}>
                <CommandPrimitive.Input asChild value={value} onKeyDown={downKey} onValueChange={onValueChange}>
                  <InputGroup>
                    <InputGroupInput
                      value={value}
                      placeholder={placeholder}
                      onChange={({ target: { value } }) => onValueChange(value)}
                      {...inputProps}
                    />
                    <InputGroupAddon align='inline-end'>{isLoading ? <Spinner /> : <ChevronDown />}</InputGroupAddon>
                  </InputGroup>
                </CommandPrimitive.Input>
              </PopoverTrigger>
            </div>
          </PopoverAnchor>

          <PopoverContent
            align='start'
            className={cn('min-w-(--radix-popover-trigger-width) p-0')}
            onOpenAutoFocus={openAuto}
            onInteractOutside={interactOutside}
          >
            {isOpenPopover ? (
              isLoading ? (
                <div className='p-4'>
                  <Spinner className='mx-auto' />
                </div>
              ) : (
                <CommandList {...commandListProps}>
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const optionValue = isValueAsLabel ? option.label : option.value
                      const isSelected = optionValue === value

                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          className='group/selected'
                          onSelect={() => onValueChange(optionValue)}
                        >
                          {option.label}
                          <Check className={cn('ml-auto size-4', isSelected ? 'visible' : 'invisible')} />
                        </CommandItem>
                      )
                    })}

                    {commandGroupSlot && commandGroupSlot}
                  </CommandGroup>
                </CommandList>
              )
            ) : null}
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
