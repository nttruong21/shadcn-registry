import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import type * as React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Alert dialog
export const AlertDialog = (props: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => {
  // Template
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />
}

// Alert dialog trigger
export const AlertDialogTrigger = (props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) => {
  // Template
  return <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
}

// AlertDialogPortal
export const AlertDialogPortal = (props: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) => {
  // Template
  return <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
}

// Alert dialog overlay
export const AlertDialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) => {
  // Template
  return (
    <AlertDialogPrimitive.Overlay
      data-slot='alert-dialog-overlay'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  )
}

// Alert dialog content
export const AlertDialogContent = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) => {
  // Template
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

// Alert dialog header
export const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return (
    <div
      data-slot='alert-dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

// Alert dialog footer
export const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

// Alert dialog title
export const AlertDialogTitle = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => {
  // Template
  return (
    <AlertDialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn('font-semibold text-lg', className)}
      {...props}
    />
  )
}

// Alert dialog description
export const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => {
  // Template
  return (
    <AlertDialogPrimitive.Description
      data-slot='alert-dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// Alert dialog action
export const AlertDialogAction = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) => {
  // Template
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />
}

// Alert dialog cancel
export const AlertDialogCancel = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) => {
  // Template
  return <AlertDialogPrimitive.Cancel className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
}
