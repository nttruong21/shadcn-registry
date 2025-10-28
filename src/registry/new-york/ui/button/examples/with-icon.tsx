import { GitBranch } from 'lucide-react'

// App
import { Button } from '@/components/ui/button'

export const ButtonWithIcon = () => {
  // Template
  return (
    <Button variant='outline' size='sm'>
      <GitBranch />
      <span>New Branch</span>
    </Button>
  )
}
