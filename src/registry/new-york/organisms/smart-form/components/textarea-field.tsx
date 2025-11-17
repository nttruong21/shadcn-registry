import { Textarea } from '@/components/ui/textarea'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const TextareaField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <Textarea
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

export default TextareaField
