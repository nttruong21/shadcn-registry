import { Checkbox } from '@/components/ui/checkbox'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const CheckboxField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <Checkbox
          id={fieldData.code}
          checked={field.value}
          disabled={disabledFields?.[fieldData.code]}
          onCheckedChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default CheckboxField
