import type { PropsWithChildren } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/ui'

// Loading overlay
export const LoadingOverlay = ({
  className,
  isLoading,
  children
}: PropsWithChildren & {
  className?: string
  isLoading?: boolean
}) => {
  // Template
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
      <div
        className={cn(
          `absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-muted/60 transition-[visibility]`,
          isLoading ? 'visible' : 'invisible'
        )}
      >
        <Spinner className='size-6' />
      </div>
    </div>
  )
}
