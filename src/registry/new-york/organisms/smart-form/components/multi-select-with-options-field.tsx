import { MultiSelect } from '@/components/molecules/multi-select'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const MultiSelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <MultiSelect
          {...field}
          options={fieldData.config?.options ?? []}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
          buttonTriggerProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code]
          }}
          onValueChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default MultiSelectWithOptionsField
