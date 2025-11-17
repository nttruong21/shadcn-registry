import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import type { SmartFilterFormInput, SmartFilterFormOutput } from './lib'
import type { SmartFilterProps } from './smart-filter'

// Component
const BasicSearch = ({ setFilters }: Pick<SmartFilterProps, 'setFilters'>) => {
  // Hooks
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()

  const formSearch = useWatch({
    name: 'search',
    control: form.control
  })

  const debouncedFormSearch = useDebounce<string>(formSearch.trim(), 400)

  // Effects
  React.useEffect(() => {
    setFilters({ search: debouncedFormSearch, filters: [] })
  }, [debouncedFormSearch, setFilters])

  // Template
  return (
    <Controller
      name='search'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputGroup>
            <InputGroupInput {...field} aria-invalid={fieldState.invalid} placeholder='Search' />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      )}
    />
  )
}

export default BasicSearch
