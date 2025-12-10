import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/utils/ui'

// Dropdown menu
export const DropdownMenu = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => {
  // Template
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}

// Dropdown menu portal
export const DropdownMenuPortal = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) => {
  // Template
  return <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
}

// Dropdown menu trigger
export const DropdownMenuTrigger = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => {
  // Template
  return <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
}

// Dropdown menu content
export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) => {
  // Template
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

// Dropdown menu group
export const DropdownMenuGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) => {
  // Template
  return <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
}

// Dropdown menu item
export const DropdownMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) => {
  // Template
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
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

// Dropdown menu checkbox item
export const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => {
  // Template
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot='dropdown-menu-checkbox-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

// Dropdown menu radio group
export const DropdownMenuRadioGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => {
  // Template
  return <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
}

// Dropdown menu radio item
export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => {
  // Template
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot='dropdown-menu-radio-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

// Dropdown menu label
export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) => {
  // Template
  return (
    <DropdownMenuPrimitive.Label
      data-slot='dropdown-menu-label'
      data-inset={inset}
      className={cn('px-2 py-1.5 font-medium text-sm data-inset:pl-8', className)}
      {...props}
    />
  )
}

// Dropdown menu separator
export const DropdownMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => {
  // Template
  return (
    <DropdownMenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

// Dropdown menu shortcut
export const DropdownMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  // Template
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  )
}

// Dropdown menu sub
export const DropdownMenuSub = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) => {
  // Template
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
}

// Dropdown menu sub trigger
export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) => {
  // Template
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot='dropdown-menu-sub-trigger'
      data-inset={inset}
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-inset:pl-8 data-[state=open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

// Dropdown menu sub content
export const DropdownMenuSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => {
  // Template
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot='dropdown-menu-sub-content'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  )
}
