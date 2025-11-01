import { Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Component
export const ToggleGroupSize = () => {
  // Template
  return (
    <div className='space-y-4'>
      <ToggleGroup type='multiple' variant='outline' size='sm'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          <Bold className='h-4 w-4' />
          <span>Small</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          <Italic className='h-4 w-4' />
          <span>Small</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
          <Underline className='h-4 w-4' />
          <span>Small</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type='multiple' variant='outline'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          <Bold className='h-4 w-4' />
          <span>Default</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          <Italic className='h-4 w-4' />
          <span>Default</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
          <Underline className='h-4 w-4' />
          <span>Default</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type='multiple' variant='outline' size='lg'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          <Bold className='h-4 w-4' />
          <span>Large</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          <Italic className='h-4 w-4' />
          <span>Large</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
          <Underline className='h-4 w-4' />
          <span>Large</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
