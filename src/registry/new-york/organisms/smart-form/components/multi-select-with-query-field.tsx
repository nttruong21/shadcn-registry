import React from 'react'
import { MultiSelect } from '@/components/molecules/multi-select'
import type { Option } from '@/types/base'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const MultiSelectWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Todo: fetch query and extract options

  // Memos
  const options = React.useMemo<Option[]>(() => {
    return []
  }, [])

  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <MultiSelect
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

export default MultiSelectWithQueryField
