import { NumberInput } from '@/components/molecules/number-input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const NumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <NumberInput
          {...field}
          {...fieldData.config?.numberInputProps}
          id={fieldData.code}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
          disabled={disabledFields?.[fieldData.code]}
          aria-invalid={fieldState.invalid}
          onFieldChange={field.onChange}
          onValueChange={(event) => field.onChange(event.value)}
        />
      )}
    </FieldContainer>
  )
}

export default NumberField
