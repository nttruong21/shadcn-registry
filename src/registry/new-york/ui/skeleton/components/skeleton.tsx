import { cn } from '@/lib/utils'

// Skeleton
export const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return <div data-slot='skeleton' className={cn('animate-pulse rounded-md bg-accent', className)} {...props} />
}
