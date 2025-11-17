import { Autocomplete } from '@/components/molecules/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const AutocompleteWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <Autocomplete
          {...field}
          options={fieldData.config?.options ?? []}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
          inputProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code],
            'aria-invalid': fieldState.invalid
          }}
          onValueChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default AutocompleteWithOptionsField
