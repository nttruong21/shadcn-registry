import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type * as React from 'react'
import { cn } from '@/lib/utils'

// Tooltip provider
export const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => {
  // Template
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />
}

// Tooltip
export const Tooltip = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => {
  // Template
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  )
}

// Tooltip trigger
export const TooltipTrigger = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => {
  // Template
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
}

// Tooltip content
export const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => {
  // Template
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=closed]:animate-out',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className='z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
