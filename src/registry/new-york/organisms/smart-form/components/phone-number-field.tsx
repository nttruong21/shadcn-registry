import { PhoneNumberInput } from '@/components/molecules/phone-number-input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const PhoneNumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <PhoneNumberInput
          {...field}
          id={fieldData.code}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
          disabled={disabledFields?.[fieldData.code]}
          aria-invalid={fieldState.invalid}
          onValueChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default PhoneNumberField
