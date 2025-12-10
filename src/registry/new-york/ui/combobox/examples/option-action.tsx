import { Trash } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
export function ComboboxCommandInputAction() {
  // States
  const [value, setValue] = React.useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        value={value}
        options={options}
        placeholder='Select framework'
        commandItemPrefix={(option) => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon-sm' className='size-6 shrink-0'>
                <Trash />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete option {option.label}</DialogTitle>
                <DialogDescription>
                  This action can not be undone. Are you sure that you want to delete this option.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button>Submit</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        onValueChange={setValue}
      />
    </div>
  )
}
