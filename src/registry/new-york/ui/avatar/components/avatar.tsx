import * as AvatarPrimitive from '@radix-ui/react-avatar'
import type * as React from 'react'
import { cn } from '@/lib/utils'

// Avatar
export const Avatar = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) => {
  // Template
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
}

// Avatar image
export const AvatarImage = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
  // Template
  return (
    <AvatarPrimitive.Image data-slot='avatar-image' className={cn('aspect-square size-full', className)} {...props} />
  )
}

// Avatar fallback
export const AvatarFallback = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  // Template
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn('flex size-full items-center justify-center rounded-full bg-muted', className)}
      {...props}
    />
  )
}
