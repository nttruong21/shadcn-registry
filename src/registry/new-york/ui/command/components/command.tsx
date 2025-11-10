import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import type * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/utils/ui'

// Command
export type CommandProps = React.ComponentProps<typeof CommandPrimitive>
export const Command = ({ className, ...props }: CommandProps) => {
  // Template
  return (
    <CommandPrimitive
      data-slot='command'
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      {...props}
    />
  )
}

// Command dialog
export const CommandDialog = ({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) => {
  // Template
  return (
    <Dialog {...props}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn('overflow-hidden p-0', className)} showCloseButton={showCloseButton}>
        <Command className='**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// Command input
export type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>
export const CommandInput = ({ className, children, ...props }: CommandInputProps) => {
  // Template
  return (
    <div data-slot='command-input-wrapper' className='flex h-9 items-center gap-2 border-b px-3'>
      <SearchIcon className='size-4 shrink-0 text-muted-foreground' />
      <CommandPrimitive.Input
        data-slot='command-input'
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {children}
    </div>
  )
}

// Command list
export type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>
export const CommandList = ({ className, ...props }: CommandListProps) => {
  // Template
  return (
    <CommandPrimitive.List
      data-slot='command-list'
      className={cn('max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  )
}

// Command empty
export const CommandEmpty = ({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  // Template
  return <CommandPrimitive.Empty data-slot='command-empty' className='py-6 text-center text-sm' {...props} />
}

// Command group
export const CommandGroup = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) => {
  // Template
  return (
    <CommandPrimitive.Group
      data-slot='command-group'
      className={cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs',
        className
      )}
      {...props}
    />
  )
}

// Command separator
export const CommandSeparator = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) => {
  // Template
  return (
    <CommandPrimitive.Separator
      data-slot='command-separator'
      className={cn('-mx-1 h-px bg-border', className)}
      {...props}
    />
  )
}

// Command item
export type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>
export const CommandItem = ({ className, ...props }: CommandItemProps) => {
  // Template
  return (
    <CommandPrimitive.Item
      data-slot='command-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

export const CommandShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  // Template
  return (
    <span
      data-slot='command-shortcut'
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  )
}
