import { Combobox, type ComboboxProps } from '@/components/ui/combobox'

// Month picker
export type MonthPickerProps = Omit<ComboboxProps, 'options'>

export const MONTH_OPTIONS: ComboboxProps['options'] = Array.from({ length: 12 }).map((_, index) => {
  const optionValue = `${index + 1 < 10 ? '0' : ''}${index + 1}`
  return {
    value: optionValue,
    label: optionValue
  }
})

export const MonthPicker = (props: MonthPickerProps) => {
  // Template
  return <Combobox {...props} options={MONTH_OPTIONS} />
}
