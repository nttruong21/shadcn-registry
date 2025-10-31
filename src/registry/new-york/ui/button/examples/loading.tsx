import { GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Component
export const ButtonLoading = () => {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-2 md:flex-row'>
      <Button isLoading>Button</Button>

      <Button isLoading>
        <GitBranch />
        <span>Button</span>
      </Button>

      <Button isLoading size='icon'>
        <GitBranch />
      </Button>
    </div>
  )
}
