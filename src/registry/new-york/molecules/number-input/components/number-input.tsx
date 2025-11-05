import { ChevronDown, ChevronUp } from 'lucide-react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input, type InputProps } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'

// Number input
export type NumberInputProps = NumericFormatProps<InputProps> & {
  isDisplayStepper?: boolean
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  // biome-ignore lint/suspicious/noExplicitAny: ignore
  onFieldChange?: (...event: any[]) => void
}

export const NumberInput = ({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  decimalScale = 3,
  allowNegative = true,
  thousandSeparator = '.',
  decimalSeparator = ',',
  valueIsNumericString = true,
  className,
  isDisplayStepper = true,
  disabled,
  prefixNode,
  suffixNode,
  onFieldChange,
  ...props
}: NumberInputProps) => {
  // Methods
  const increment = () => {
    // Using == for checking both null or undefined
    if (value == null) {
      return
    }
    onFieldChange?.(+value + +step)
  }

  const decrement = () => {
    // Using == for checking both null or undefined
    if (value == null) {
      return
    }
    onFieldChange?.(+value - +step)
  }

  const blur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    props.onBlur?.(e)

    // Using == for checking both null or undefined
    if (value == null) return
    if (value < min) {
      return onFieldChange?.(min)
    }
    if (value > max) {
      return onFieldChange?.(max)
    }
  }

  // Template
  return (
    <ButtonGroup>
      <Button
        aria-label='Decrease value'
        variant='outline'
        size='icon'
        onClick={decrement}
        disabled={disabled || (value != null && +value <= +min)}
      >
        <ChevronDown />
      </Button>

      <InputGroup>
        <NumericFormat
          value={value}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          valueIsNumericString={valueIsNumericString}
          decimalScale={decimalScale}
          customInput={Input}
          allowNegative={allowNegative}
          step={step}
          min={min}
          max={max}
          className='rounded-none border-none'
          disabled={disabled}
          {...props}
          onBlur={blur}
        />
      </InputGroup>

      <Button
        aria-label='Increase value'
        size='icon'
        variant='outline'
        onClick={increment}
        disabled={disabled || (value != null && +value >= +max)}
      >
        <ChevronUp />
      </Button>
    </ButtonGroup>
  )
}
