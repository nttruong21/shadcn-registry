import { Input } from '@/components/ui/input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const InputField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <Input
          {...field}
          id={fieldData.code}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
          disabled={disabledFields?.[fieldData.code]}
          aria-invalid={fieldState.invalid}
        />
      )}
    </FieldContainer>
  )
}

export default InputField
