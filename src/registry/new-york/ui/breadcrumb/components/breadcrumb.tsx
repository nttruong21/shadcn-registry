import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/utils/ui'

// Breadcrumb
export const Breadcrumb = ({ ...props }: React.ComponentProps<'nav'>) => {
  // Template
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

// Breadcrumb list
export const BreadcrumbList = ({ className, ...props }: React.ComponentProps<'ol'>) => {
  // Template
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5',
        className
      )}
      {...props}
    />
  )
}

// Breadcrumb item
export const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<'li'>) => {
  // Template
  return <li data-slot='breadcrumb-item' className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}

// Breadcrumb link
export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'a'

  // Template
  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn('cursor-pointer transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
}

// Breadcrumb page
export const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<'span'>) => {
  // Template
  return (
    <span
      data-slot='breadcrumb-page'
      aria-disabled='true'
      aria-current='page'
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  )
}

// Breadcrumb separator
export const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => {
  // Template
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

// Breadcrumb ellipsis
export const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}
