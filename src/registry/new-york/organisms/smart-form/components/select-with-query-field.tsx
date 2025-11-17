import React from 'react'
import { Combobox } from '@/components/ui/combobox'
import type { Option } from '@/types/base'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const SelectWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Todo: fetch query and extract options

  // Memos
  const options = React.useMemo<Option[]>(() => {
    return []
  }, [])

  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <Combobox
          {...field}
          options={options}
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

export default SelectWithQueryField
