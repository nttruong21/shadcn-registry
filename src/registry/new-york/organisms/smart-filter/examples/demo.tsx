import React from 'react'
import {
  SmartFilter,
  type SmartFilterProps,
  SmartFilterType,
  useSmartFilterForm
} from '@/components/organisms/smart-filter'

// Component
export const SmartFilterDemo = () => {
  // Hooks
  const form = useSmartFilterForm()

  // Methods
  const setFilters: SmartFilterProps['setFilters'] = (formValue) => {
    console.log(formValue)
  }

  // Memos
  const filters = React.useMemo<SmartFilterProps['filters']>(() => {
    return [
      {
        name: 'fullName',
        label: 'Full name',
        type: SmartFilterType.Text
      },
      {
        name: 'age',
        label: 'Age',
        type: SmartFilterType.Number
      },
      {
        name: 'graduationDate',
        label: 'Graduation date',
        type: SmartFilterType.Date
      },
      {
        name: 'department',
        label: 'Department',
        type: SmartFilterType.Select,
        options: [
          { value: 'front-end', label: 'Front-end' },
          { value: 'back-end', label: 'Back-end' }
        ]
      },
      {
        name: 'technologies',
        label: 'Technologies',
        type: SmartFilterType.MultiSelect,
        options: [
          { value: 'react', label: 'React' },
          { value: 'tailwind-css', label: 'TailwindCSS' },
          { value: 'astro', label: 'Astro' },
          { value: 'ts', label: 'TypeScript' }
        ]
      }
    ]
  }, [])

  // Template
  return (
    <div className='w-sm'>
      <SmartFilter form={form} filters={filters} setFilters={setFilters} />
    </div>
  )
}
