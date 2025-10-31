import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Empty
export const Empty = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return (
    <div
      data-slot='empty'
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12',
        className
      )}
      {...props}
    />
  )
}

// Empty header
export const EmptyHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return (
    <div
      data-slot='empty-header'
      className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
      {...props}
    />
  )
}

// Empty media
const emptyMediaVariants = cva(
  'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export const EmptyMedia = ({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) => {
  // Template
  return (
    <div
      data-slot='empty-media'
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

// Empty title
export const EmptyTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return <div data-slot='empty-title' className={cn('font-medium text-lg tracking-tight', className)} {...props} />
}

// Empty description
export const EmptyDescription = ({ className, ...props }: React.ComponentProps<'p'>) => {
  // Template
  return (
    <div
      data-slot='empty-description'
      className={cn(
        'text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  )
}

// Empty content
export const EmptyContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return (
    <div
      data-slot='empty-content'
      className={cn('flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm', className)}
      {...props}
    />
  )
}
