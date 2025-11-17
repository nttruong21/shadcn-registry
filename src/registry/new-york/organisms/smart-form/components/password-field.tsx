import { PasswordInput } from '@/components/molecules/password-input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const PasswordField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <PasswordInput
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

export default PasswordField
