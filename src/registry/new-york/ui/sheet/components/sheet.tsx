import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

// Sheet
export const Sheet = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) => {
  // Template
  return <SheetPrimitive.Root data-slot='sheet' {...props} />
}

// Sheet trigger
export const SheetTrigger = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) => {
  // Template
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}

// Sheet close
export const SheetClose = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) => {
  // Template
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />
}

// Sheet portal
export const SheetPortal = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) => {
  // Template
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
}

// Sheet overlay
export const SheetOverlay = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) => {
  // Template
  return (
    <SheetPrimitive.Overlay
      data-slot='sheet-overlay'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  )
}

// Sheet content
export const SheetContent = ({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
  // Template
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={cn(
          'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className='absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

// Sheet header
export const SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return <div data-slot='sheet-header' className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
}

// Sheet footer
export const SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return <div data-slot='sheet-footer' className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
}

// Sheet title
export const SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => {
  // Template
  return (
    <SheetPrimitive.Title
      data-slot='sheet-title'
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  )
}

// Sheet description
export const SheetDescription = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) => {
  // Template
  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}
