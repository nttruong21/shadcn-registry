import * as React from 'react'
import { Progress } from '@/components/ui/progress'

// Component
export const ProgressDemo = () => {
  // States
  const [progress, setProgress] = React.useState(13)

  // Effects
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  // Template
  return <Progress value={progress} className='w-[60%]' />
}
