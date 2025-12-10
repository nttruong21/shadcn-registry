import React from 'react'
import { type ControllerRenderProps, useFormContext } from 'react-hook-form'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import {
  defaultValuePerOperation,
  operationsPerType,
  type SmartFilterFormInput,
  type SmartFilterFormOutput
} from './lib'
import { useSmartFilterContext } from './smart-filter'

// Component
const AdvancedFilterNameField = ({
  index,
  field,
  formFiltersWatcher
}: {
  index: number
  field: ControllerRenderProps<SmartFilterFormInput, `filters.${number}.name`>
  formFiltersWatcher: SmartFilterFormInput['filters']
}) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()

  // Methods
  const changeValue: ComboboxProps['onValueChange'] = (value) => {
    if (!value) return

    const selectedFilter = filters.find((filter) => filter.name === value)
    if (!selectedFilter) return

    const operation = operationsPerType[selectedFilter.type][0]
    form.setValue(`filters.${index}.type`, selectedFilter.type)
    form.setValue(`filters.${index}.operation`, operation)
    form.setValue(`filters.${index}.value`, defaultValuePerOperation[operation])

    field.onChange(value)
  }

  // Memos
  const options = React.useMemo<ComboboxProps['options']>(() => {
    const selectedFilters = formFiltersWatcher.map((field) => field.name)
    return filters
      .filter((filter) => filter.name === field.value || !selectedFilters.includes(filter.name))
      .map((filter) => ({
        value: filter.name,
        label: filter.label
      }))
  }, [filters, formFiltersWatcher, field.value])

  // Template
  return <Combobox value={field.value} options={options} isCanRemoveValue={false} onValueChange={changeValue} />
}

export default AdvancedFilterNameField
