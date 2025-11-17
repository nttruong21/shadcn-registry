import { Combobox } from '@/components/ui/combobox'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const SelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <Combobox
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

export default SelectWithOptionsField
