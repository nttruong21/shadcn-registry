import { CircleCheckBig, ListFilter, Plus, RefreshCw, TrashIcon } from 'lucide-react'
import React from 'react'
import { Controller, type UseFieldArrayReturn, useFormContext, useWatch } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DEFAULT_SMART_FILTER_FORM_VALUE,
  type Filter,
  type SmartFilterFormInput,
  type SmartFilterFormOutput
} from './lib'
import { type SmartFilterProps, useSmartFilterContext } from './smart-filter'
import SmartFilterAdvancedFilterNameField from './smart-filter-advanced-filter-name-field'
import SmartFilterAdvancedFilterOperationField from './smart-filter-advanced-filter-operation-field'
import SmartFilterAdvancedFilterValueField from './smart-filter-advanced-filter-value-field'

// Component
const SmartFilterAdvancedFilter = ({
  formFilters,
  addFilter,
  setFilters
}: Pick<SmartFilterProps, 'setFilters'> & {
  formFilters: UseFieldArrayReturn<SmartFilterFormInput, 'filters'>
  addFilter: (filter: Filter) => void
}) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()
  const formFiltersWatcher = useWatch({
    control: form.control,
    name: 'filters'
  })

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)
  const [totalFilterApplied, setTotalFilterApplied] = React.useState(form.formState.defaultValues?.filters?.length ?? 0)

  // Methods
  const executeLogicOnOpenPopover = () => {
    if (formFilters.fields.length === 0) {
      addFilter(filters[0])
    }
  }

  const clickAddingButton = () => {
    const selectedFilters = formFiltersWatcher.map((field) => field.name)
    const unSelectFilters = filters.filter((filter) => !selectedFilters.includes(filter.name))
    if (unSelectFilters.length > 0) {
      addFilter(unSelectFilters[0])
    }
  }

  const resetFilter = () => {
    formFilters.remove()
    setTotalFilterApplied(0)
    setFilters(DEFAULT_SMART_FILTER_FORM_VALUE)
    if (filters.length > 0) {
      addFilter(filters[0])
    }
  }

  const applyFilter = (fieldValues: SmartFilterFormOutput) => {
    setFilters(fieldValues)
    setTotalFilterApplied(fieldValues.filters.length)
    setIsOpenPopover(false)
  }

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <span>Filters</span>
          <ListFilter />
          {totalFilterApplied > 0 && (
            <Badge variant='secondary' className='flex size-5 items-center justify-center rounded-sm p-0 leading-none'>
              {totalFilterApplied}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='w-(--radix-popper-available-width) xl:w-auto'
        onOpenAutoFocus={executeLogicOnOpenPopover}
      >
        <h3 className='typography-h3'>Filters</h3>
        <div className='-mx-1 my-5 max-h-72 space-y-4 overflow-y-auto px-1 py-1'>
          {/* Filters */}
          {formFilters.fields.map((field, index) => (
            <div key={field.id} className='flex gap-4'>
              <div className='flex w-full grow flex-col gap-4 xl:w-auto xl:flex-row'>
                {/* Name */}
                <Controller
                  name={`filters.${index}.name`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className='min-w-60'>
                      <SmartFilterAdvancedFilterNameField
                        index={index}
                        field={field}
                        formFiltersWatcher={formFiltersWatcher}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Operation */}
                <Controller
                  name={`filters.${index}.operation`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className='min-w-60'>
                      <SmartFilterAdvancedFilterOperationField index={index} field={field} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Value */}
                <div className='min-w-60 grow'>
                  <SmartFilterAdvancedFilterValueField index={index} />
                </div>
              </div>

              {/* Remove button */}
              {formFilters.fields.length > 1 && (
                <Button variant='outline' size='icon' className='shrink-0' onClick={() => formFilters.remove(index)}>
                  <TrashIcon className='h-4 w-4' />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className='flex items-center justify-end gap-4'>
          {formFilters.fields.length < filters.length && (
            <Button variant='outline' onClick={clickAddingButton}>
              <Plus />
              <span>Add</span>
            </Button>
          )}

          <Button variant='secondary' onClick={resetFilter}>
            <RefreshCw />
            <span>Reset</span>
          </Button>

          <Button type='submit' onClick={form.handleSubmit(applyFilter)}>
            <CircleCheckBig />
            <span>Apply</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SmartFilterAdvancedFilter
