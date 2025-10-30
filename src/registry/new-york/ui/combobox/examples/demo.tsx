import * as React from 'react'
import { Combobox, type Option } from '@/components/ui/combobox'

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
export const ComboboxDemo = () => {
  // States
  const [value, setValue] = React.useState<string | null>(null)

  // Template
  return (
    <Combobox
      value={value}
      options={OPTIONS}
      placeholder='Select framework'
      className='w-xs'
      onValueChange={setValue}
    />
  )
}
