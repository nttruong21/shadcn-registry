import { ChevronDown, Globe } from 'lucide-react'
import React from 'react'
import RPNInput, {
  type Country,
  type FlagProps,
  getCountries,
  getCountryCallingCode,
  type Props
} from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import en from 'react-phone-number-input/locale/en.json'
import { Combobox, type Option } from '@/components/ui/combobox'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/ui'

// Phone number input
export type PhoneNumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> &
  Omit<Props<typeof RPNInput>, 'onChange'> & {
    onValueChange: (value: string) => void
  }

const FlagComponent = ({ country, countryName }: FlagProps) => {
  // Memos
  // Flag
  const Flag = React.useMemo(() => {
    return flags[country]
  }, [country])

  // Template
  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm [&_svg]:size-full'>
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

const CountrySelectionComponent = ({
  disabled,
  value,
  onChange
}: {
  disabled?: boolean
  value: Country | undefined
  onChange: (value: Country | undefined) => void
}) => {
  // States
  const [options] = React.useState<Option[]>(() =>
    getCountries().map((country) => ({
      value: country,
      label: en[country]
    }))
  )

  // Template
  return (
    <Combobox
      value={value}
      options={options}
      isCanRemoveValue={false}
      buttonTriggerProps={{
        disabled,
        className: 'rounded-e-none w-fit border-r-0 hello',
        children: (
          <React.Fragment>
            {value ? <FlagComponent country={value} countryName={value} /> : <Globe />}
            <ChevronDown className='ml-auto size-4 shrink-0 text-muted-foreground' />
          </React.Fragment>
        )
      }}
      commandItemProps={{
        children: (option) => {
          const value = option.value ? (option.value as Country) : undefined
          return (
            <React.Fragment>
              {value ? (
                <FlagComponent country={value} countryName={option.label as string} />
              ) : (
                <div className='w-6'>
                  <Globe className='mx-auto' />
                </div>
              )}
              <span className='flex-1 text-sm'>{option.label as string}</span>
              {value && <span className='text-muted-foreground text-sm'>{`+${getCountryCallingCode(value)}`}</span>}
            </React.Fragment>
          )
        }
      }}
      onValueChange={(value) => onChange(value as Country | undefined)}
    />
  )
}

const InputComponent = ({ className, ...props }: InputProps) => {
  // Template
  return <Input className={cn('z-10 rounded-s-none', className)} {...props} />
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
      onChange={(value) => onValueChange((value ?? '') as string)}
      {...props}
    />
  )
}
