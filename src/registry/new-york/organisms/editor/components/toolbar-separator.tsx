import { memo } from 'react'
import { Separator } from '@/components/ui/separator'

// Component
const ToolbarSeparator = memo(() => {
  // Template
  return <Separator orientation='vertical' className='!h-9 mx-2' />
})

ToolbarSeparator.displayName = 'ToolbarSeparator'
export default ToolbarSeparator
