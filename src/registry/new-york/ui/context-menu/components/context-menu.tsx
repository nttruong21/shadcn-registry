import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/utils/ui'

// Context menu
export const ContextMenu = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>) => {
  // Template
  return <ContextMenuPrimitive.Root data-slot='context-menu' {...props} />
}

// Context menu trigger
export const ContextMenuTrigger = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) => {
  // Template
  return <ContextMenuPrimitive.Trigger data-slot='context-menu-trigger' {...props} />
}

// Context menu group
export const ContextMenuGroup = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>) => {
  // Template
  return <ContextMenuPrimitive.Group data-slot='context-menu-group' {...props} />
}

// Context menu portal
export const ContextMenuPortal = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) => {
  // Template
  return <ContextMenuPrimitive.Portal data-slot='context-menu-portal' {...props} />
}

// Context menu sub
export const ContextMenuSub = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) => {
  // Template
  return <ContextMenuPrimitive.Sub data-slot='context-menu-sub' {...props} />
}

// Context menu radio group
export const ContextMenuRadioGroup = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) => {
  // Template
  return <ContextMenuPrimitive.RadioGroup data-slot='context-menu-radio-group' {...props} />
}

// Context menu sub trigger
export const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) => {
  // Template
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot='context-menu-sub-trigger'
      data-inset={inset}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-inset:pl-8 data-[state=open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </ContextMenuPrimitive.SubTrigger>
  )
}

// Context menu sub content
export const ContextMenuSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) => {
  // Template
  return (
    <ContextMenuPrimitive.SubContent
      data-slot='context-menu-sub-content'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  )
}

// Context menu content
export const ContextMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) => {
  // Template
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot='context-menu-content'
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

// Context menu item
export const ContextMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) => {
  // Template
  return (
    <ContextMenuPrimitive.Item
      data-slot='context-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

// Context menu checkbox item
export const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => {
  // Template
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot='context-menu-checkbox-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

// Context menu radio item
export const ContextMenuRadioItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) => {
  // Template
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot='context-menu-radio-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

// Context menu label
export const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) => {
  // Template
  return (
    <ContextMenuPrimitive.Label
      data-slot='context-menu-label'
      data-inset={inset}
      className={cn('px-2 py-1.5 font-medium text-foreground text-sm data-inset:pl-8', className)}
      {...props}
    />
  )
}

// Context menu separator
export const ContextMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) => {
  // Template
  return (
    <ContextMenuPrimitive.Separator
      data-slot='context-menu-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

// Context menu shortcut
export const ContextMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  // Template
  return (
    <span
      data-slot='context-menu-shortcut'
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  )
}
