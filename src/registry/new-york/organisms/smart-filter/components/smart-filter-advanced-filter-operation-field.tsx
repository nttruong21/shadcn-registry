import React from 'react'
import { type ControllerRenderProps, useFormContext, useWatch } from 'react-hook-form'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import {
  DEFAULT_VALUE_PER_OPERATION,
  OPERATIONS_PER_TYPE,
  type SmartFilterFormInput,
  type SmartFilterFormOutput,
  type SmartFilterOperation,
  SmartFilterType
} from './lib'
import { useSmartFilterContext } from './smart-filter'

const OPERATION_LABELS: Record<string, Record<string, string | undefined> | undefined> = {
  base: {
    equalsTo: 'Equals to',
    doesNotEqualTo: 'Does not equal to',
    contains: 'Contains',
    isBetween: 'Is between',
    hasAnyOf: 'Has any of',
    hasAllOf: 'Has all of'
  },
  [SmartFilterType.Number]: {
    isLessThan: 'Is less than',
    isLessThanOrEqualTo: 'Is less than or equal to',
    isGreaterThan: 'Is greater than',
    isGreaterThanOrEqualTo: 'Is greater than or equal to'
  },
  [SmartFilterType.Date]: {
    isLessThan: 'Is before',
    isLessThanOrEqualTo: 'Is before or equal to',
    isGreaterThan: 'Is after',
    isGreaterThanOrEqualTo: 'Is after or equal to'
  }
}

// Component
const SmartFilterAdvancedFilterOperationField = ({
  index,
  field
}: {
  index: number
  field: ControllerRenderProps<SmartFilterFormInput, `filters.${number}.operation`>
}) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()
  const formFilterName = useWatch({
    name: `filters.${index}.name`,
    control: form.control
  })

  // Methods
  const changeValue: ComboboxProps['onValueChange'] = (value) => {
    if (!value) return
    form.setValue(`filters.${index}.value`, DEFAULT_VALUE_PER_OPERATION[value as SmartFilterOperation])
    field.onChange(value)
  }

  // Memos
  const options = React.useMemo<ComboboxProps['options']>(() => {
    const type = filters.find((filter) => filter.name === formFilterName)?.type
    return type
      ? OPERATIONS_PER_TYPE[type].map((operation) => ({
          value: operation,
          label: OPERATION_LABELS[type]?.[operation] ?? OPERATION_LABELS.base?.[operation] ?? ''
        }))
      : []
  }, [filters, formFilterName])

  // Template
  return <Combobox value={field.value} options={options} isCanRemoveValue={false} onValueChange={changeValue} />
}

export default SmartFilterAdvancedFilterOperationField
