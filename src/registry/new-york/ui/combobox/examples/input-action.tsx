import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Combobox, type ComboboxProps, type Option } from '@/components/ui/combobox'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
export function ComboboxInputAction() {
  // States
  const [value, setValue] = React.useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        value={value}
        options={OPTIONS}
        placeholder='Select framework'
        commandInputProps={{
          children: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='ghost' size='icon-sm' className='-mr-2'>
                  <Plus />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new option</DialogTitle>
                  <DialogDescription>Fill all information below to create new option.</DialogDescription>
                </DialogHeader>

                <form className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label>Value</Label>
                    <Input placeholder='Enter value' />
                  </div>

                  <div className='space-y-2'>
                    <Label>Label</Label>
                    <Input placeholder='Enter label' />
                  </div>
                </form>

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
          )
        }}
        onValueChange={setValue}
      />
    </div>
  )
}
