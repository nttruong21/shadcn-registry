import { toDate } from 'date-fns'
import { Minus } from 'lucide-react'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { MultiSelect } from '@/components/molecules/multi-select'
import { NumberInput } from '@/components/molecules/number-input'
import { Combobox } from '@/components/ui/combobox'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { type SmartFilterFormInput, type SmartFilterFormOutput, SmartFilterOperation, SmartFilterType } from './lib'
import { useSmartFilterContext } from './smart-filter'

// Component
const SmartFilterAdvancedFilterValueField = ({ index }: { index: number }) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()
  const [formFilterName, formFilterOperation] = useWatch({
    name: [`filters.${index}.name`, `filters.${index}.operation`],
    control: form.control
  })

  // Memos
  // Selected filter
  const selectedFilter = React.useMemo(() => {
    return filters.find((filter) => filter.name === formFilterName)
  }, [filters, formFilterName])

  // Template
  if (!selectedFilter) {
    return null
  }

  switch (selectedFilter.type) {
    // Number
    case SmartFilterType.Number: {
      // Is between
      if (formFilterOperation === SmartFilterOperation.IsBetween) {
        const valueAdditionalWatcher = form.watch(`filters.${index}.value.additional`)

        return (
          <div className='flex items-center gap-4'>
            <Controller
              name={`filters.${index}.value.additional.from`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='min-w-60'>
                  <NumberInput
                    value={field.value}
                    className='min-w-48'
                    placeholder='Enter value'
                    onFieldChange={field.onChange}
                    onValueChange={(event) => {
                      field.onChange(event.value)
                      if (+valueAdditionalWatcher.to < +event.value) {
                        form.setValue(`filters.${index}.value.additional.to`, event.value)
                      }
                    }}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Minus className='size-4 text-muted-foreground' />

            <Controller
              name={`filters.${index}.value.additional.to`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='min-w-60'>
                  <NumberInput
                    className='min-w-48'
                    value={field.value}
                    placeholder='Enter value'
                    min={valueAdditionalWatcher.from}
                    onFieldChange={field.onChange}
                    onValueChange={(event) => field.onChange(event.value)}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        )
      }

      // Others else
      return (
        <Controller
          name={`filters.${index}.value.default`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='min-w-60'>
              <NumberInput
                className='w-full'
                value={field.value as string}
                placeholder='Enter value'
                onFieldChange={field.onChange}
                onValueChange={(event) => field.onChange(event.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Date
    case SmartFilterType.Date: {
      if (formFilterOperation === SmartFilterOperation.IsBetween) {
        return (
          <Controller
            name={`filters.${index}.value.additional`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='min-w-60'>
                <DateRangePicker
                  value={{
                    from: field.value.from ? new Date(field.value.from) : undefined,
                    to: field.value.to ? new Date(field.value.to) : undefined
                  }}
                  placeholder='Select date range'
                  onValueChange={(value) => {
                    field.onChange({
                      from: value?.from?.toISOString() ?? '',
                      to: value?.to?.toISOString() ?? ''
                    })
                  }}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )
      }

      return (
        <Controller
          name={`filters.${index}.value.default`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='min-w-60'>
              <DatePicker
                value={field.value ? toDate(field.value as string) : null}
                placeholder='Select date'
                onValueChange={(value) => {
                  field.onChange(value?.toISOString() ?? '')
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Select
    case SmartFilterType.Select: {
      if (formFilterOperation === SmartFilterOperation.HasAnyOf) {
        return (
          <Controller
            name={`filters.${index}.value.default`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='min-w-60'>
                <MultiSelect
                  value={field.value as string[]}
                  options={selectedFilter.options ?? []}
                  buttonTriggerProps={{
                    isLoading: !selectedFilter.options
                  }}
                  placeholder='Select value'
                  onValueChange={field.onChange}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )
      }

      return (
        <Controller
          name={`filters.${index}.value.default`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='min-w-60'>
              <Combobox
                value={field.value as string}
                options={selectedFilter.options ?? []}
                buttonTriggerProps={{
                  isLoading: !selectedFilter.options
                }}
                placeholder='Select value'
                onValueChange={(value) => {
                  field.onChange(value ?? '')
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Select with infinite query
    case SmartFilterType.SelectWithInfiniteQuery: {
      return null
    }

    // Multi select
    case SmartFilterType.MultiSelect: {
      return (
        <Controller
          name={`filters.${index}.value.default`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='min-w-60'>
              <MultiSelect
                value={field.value as string[]}
                options={selectedFilter.options ?? []}
                buttonTriggerProps={{
                  isLoading: !selectedFilter.options
                }}
                placeholder='Select value'
                onValueChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Default
    default: {
      return (
        <Controller
          name={`filters.${index}.value.default`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='min-w-60'>
              <Input aria-invalid={fieldState.invalid} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }
  }
}

export default SmartFilterAdvancedFilterValueField
