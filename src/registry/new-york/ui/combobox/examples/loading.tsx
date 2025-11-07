import React from 'react'
import { Combobox, type ComboboxProps, type Option } from '@/components/ui/combobox'

// Constants
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
export function ComboboxLoading() {
  // States
  const [value, setValue] = React.useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        value={value}
        options={OPTIONS}
        placeholder='Select framework'
        buttonTriggerProps={{ isLoading: true }}
        onValueChange={setValue}
      />
    </div>
  )
}
