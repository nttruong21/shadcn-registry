import React from 'react'
import { Autocomplete, type AutocompleteProps, type Option } from '@/components/molecules/autocomplete'
import { Button } from '@/components/ui/button'

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
export const AutocompleteDemo = () => {
  // States
  const [value, setValue] = React.useState<AutocompleteProps['value']>('')
  const [options, setOptions] = React.useState<AutocompleteProps['options']>([])
  const [key, setKey] = React.useState(Date.now)

  // Effects
  // biome-ignore lint/correctness/useExhaustiveDependencies: to trigger effect when click toggle loading button
  React.useEffect(() => {
    setOptions([])
    const timer = setTimeout(() => {
      setOptions(OPTIONS)
    }, 2000)
    return () => clearTimeout(timer)
  }, [key])

  // Template
  return (
    <div className='w-full max-w-xs space-y-2'>
      <Button onClick={() => setKey(Date.now)}>Toggle Loading</Button>
      <Autocomplete
        value={value}
        inputProps={{
          placeholder: 'Select framework'
        }}
        onValueChange={setValue}
        options={options}
        isLoading={options.length === 0}
      />
    </div>
  )
}
