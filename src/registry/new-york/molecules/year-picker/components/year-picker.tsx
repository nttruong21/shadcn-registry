import { Combobox, type ComboboxProps } from '@/components/ui/combobox'

// Year picker
export type YearPickerProps = Omit<ComboboxProps, 'options'>

export const START_YEAR_PERIOD = 1900
export const YEAR_OFFSET = 100
export const YEAR_OPTIONS: ComboboxProps['options'] = Array.from({
  length: new Date().getFullYear() - START_YEAR_PERIOD + YEAR_OFFSET + 1
}).map((_, index) => {
  const optionValue = `${index + START_YEAR_PERIOD}`
  return {
    value: optionValue,
    label: optionValue
  }
})

export const YearPicker = (props: YearPickerProps) => {
  // Template
  return <Combobox {...props} options={YEAR_OPTIONS} />
}
