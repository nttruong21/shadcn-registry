import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Spinner
export const Spinner = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  // Template
  return <Loader2Icon role='status' aria-label='Loading' className={cn('size-4 animate-spin', className)} {...props} />
}
