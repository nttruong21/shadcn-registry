import React from 'react'
import { MultiSelect, type MultiSelectProps, type Option } from '@/components/molecules/multi-select'

const OPTIONS: Option[] = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]

// Component
export const ComboboxLoading = () => {
  // States
  const [value, setValue] = React.useState<MultiSelectProps['value']>([])

  // Template
  return (
    <div className='w-full max-w-xs'>
      <MultiSelect
        value={value}
        options={OPTIONS}
        placeholder='Select framework'
        buttonTriggerProps={{
          isLoading: true
        }}
        onValueChange={setValue}
      />
    </div>
  )
}
