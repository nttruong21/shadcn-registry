import { Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Component
export const ToggleGroupSpacing = () => {
  // Template
  return (
    <ToggleGroup type='multiple' variant='outline' spacing={2}>
      <ToggleGroupItem value='bold' aria-label='Toggle bold'>
        <Bold className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle italic'>
        <Italic className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
        <Underline className='h-4 w-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
