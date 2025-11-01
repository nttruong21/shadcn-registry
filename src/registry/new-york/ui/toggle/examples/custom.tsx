import { BookmarkIcon } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

// Component
export const ToggleDemo = () => {
  // Template
  return (
    <Toggle
      variant='outline'
      className='data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500'
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}
