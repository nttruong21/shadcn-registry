import { ChevronDown, Globe } from 'lucide-react'
import React from 'react'
import RPNInput, { type Country, type FlagProps, getCountryCallingCode, type Props } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { Combobox } from '@/components/ui/combobox'
import { Input, type InputProps } from '@/components/ui/input'
import type { Option } from '@/types/base'
import { cn } from '@/utils/ui'

// Phone number input
const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country]

  // Template
  return (
    <div className='flex h-4 w-6 overflow-hidden rounded-sm [&_svg]:size-full!'>
      {Flag && <Flag title={countryName} />}
    </div>
  )
}

const CountrySelectionComponent = ({
  disabled,
  value,
  options,
  onChange,
  ...props
}: {
  disabled?: boolean
  value: Country | undefined
  options: Option[]
  onChange: (value: Country | undefined) => void
}) => {
  // Template
  return (
    <Combobox
      value={value}
      options={options}
      isCanRemoveValue={false}
      buttonTriggerProps={{
        disabled,
        className: 'rounded-e-none w-fit border-r-0',
        children: (
          <React.Fragment>
            {value ? <FlagComponent country={value} countryName={value} /> : <Globe />}
            <ChevronDown className='ml-auto size-4 shrink-0 text-muted-foreground' />
          </React.Fragment>
        )
      }}
      commandItemProps={{
        children: (option) => {
          return option.value ? (
            <React.Fragment>
              <FlagComponent country={option.value as Country} countryName={option.label as string} />
              <span className='flex-1 text-sm'>{option.label as string}</span>
              <span className='text-muted-foreground text-sm'>{`+${getCountryCallingCode(option.value as Country)}`}</span>
            </React.Fragment>
          ) : null
        }
      }}
      onValueChange={(value) => onChange(value as Country | undefined)}
      {...props}
    />
  )
}

const InputComponent = ({ className, ...props }: InputProps) => {
  // Template
  return <Input className={cn('z-10 rounded-s-none', className)} {...props} />
}

export type PhoneNumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> &
  Omit<Props<typeof RPNInput>, 'onChange'> & {
    onValueChange: (value: string) => void
  }

export const PhoneNumberInput = ({ className, onValueChange, ...props }: PhoneNumberInputProps) => {
  // Template
  return (
    <RPNInput
      international
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelectionComponent}
      inputComponent={InputComponent}
      smartCaret={false}
      {...props}
      onChange={(value) => {
        onValueChange(value ?? '')
      }}
    />
  )
}
