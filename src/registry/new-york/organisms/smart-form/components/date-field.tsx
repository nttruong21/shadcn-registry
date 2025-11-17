import { DatePicker } from '@/components/ui/date-picker'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const DateField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <DatePicker
          {...field}
          id={fieldData.code}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
          isDisabled={disabledFields?.[fieldData.code]}
          onValueChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default DateField
