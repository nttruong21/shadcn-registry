import { memo } from 'react'
import { Separator } from '@/components/ui/separator'

// Component
const ToolbarSeparator = memo(() => {
  // Template
  return <Separator orientation='vertical' className='mx-2 h-9!' />
})

ToolbarSeparator.displayName = 'ToolbarSeparator'
export default ToolbarSeparator
