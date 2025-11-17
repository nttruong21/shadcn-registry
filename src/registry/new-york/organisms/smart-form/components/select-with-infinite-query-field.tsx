import React from 'react'
import { Combobox } from '@/components/ui/combobox'
import type { Option } from '@/types/base'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const SelectWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Todo: fetch infinite query and extract options

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

export default SelectWithInfiniteQueryField
