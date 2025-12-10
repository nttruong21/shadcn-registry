import React from 'react'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import type { Option } from '@/types/base'

// Constants
const options: Option[] = [
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
export function ComboboxLoading() {
  // States
  const [value, setValue] = React.useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        value={value}
        options={options}
        placeholder='Select framework'
        buttonTriggerProps={{ isLoading: true }}
        onValueChange={setValue}
      />
    </div>
  )
}
