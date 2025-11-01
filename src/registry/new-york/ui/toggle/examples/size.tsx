import { Italic } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

// Component
export const ToggleSize = () => {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Toggle size='sm' variant='outline'>
        <Italic />
        <span>Small</span>
      </Toggle>

      <Toggle variant='outline'>
        <Italic />
        <span>Default</span>
      </Toggle>

      <Toggle size='lg' variant='outline'>
        <Italic />
        <span>Large</span>
      </Toggle>
    </div>
  )
}
