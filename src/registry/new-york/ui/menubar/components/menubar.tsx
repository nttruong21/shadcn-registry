import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/utils/ui'

// Menubar
export const Menubar = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) => {
  // Template
  return (
    <MenubarPrimitive.Root
      data-slot='menubar'
      className={cn('flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs', className)}
      {...props}
    />
  )
}

// Menubar menu
export const MenubarMenu = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) => {
  // Template
  return <MenubarPrimitive.Menu data-slot='menubar-menu' {...props} />
}

// Menubar group
export const MenubarGroup = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) => {
  // Template
  return <MenubarPrimitive.Group data-slot='menubar-group' {...props} />
}

// Menubar portal
export const MenubarPortal = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) => {
  // Template
  return <MenubarPrimitive.Portal data-slot='menubar-portal' {...props} />
}

// Menubar radio group
export const MenubarRadioGroup = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) => {
  // Template
  return <MenubarPrimitive.RadioGroup data-slot='menubar-radio-group' {...props} />
}

// Menubar trigger
export const MenubarTrigger = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) => {
  // Template
  return (
    <MenubarPrimitive.Trigger
      data-slot='menubar-trigger'
      className={cn(
        'flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        className
      )}
      {...props}
    />
  )
}

// Menubar content
export const MenubarContent = ({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) => {
  // Template
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot='menubar-content'
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in',
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

// Menubar item
export const MenubarItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) => {
  // Template
  return (
    <MenubarPrimitive.Item
      data-slot='menubar-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

// Menubar checkbox item
export const MenubarCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) => {
  // Template
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot='menubar-checkbox-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

// Menubar radio item
export const MenubarRadioItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) => {
  // Template
  return (
    <MenubarPrimitive.RadioItem
      data-slot='menubar-radio-item'
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

// Menubar label
export const MenubarLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) => {
  // Template
  return (
    <MenubarPrimitive.Label
      data-slot='menubar-label'
      data-inset={inset}
      className={cn('px-2 py-1.5 font-medium text-sm data-[inset]:pl-8', className)}
      {...props}
    />
  )
}

// Menubar separator
export const MenubarSeparator = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) => {
  // Template
  return (
    <MenubarPrimitive.Separator
      data-slot='menubar-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

// Menubar shortcut
export const MenubarShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  // Template
  return (
    <span
      data-slot='menubar-shortcut'
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  )
}

// Menubar sub
export const MenubarSub = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) => {
  // Template
  return <MenubarPrimitive.Sub data-slot='menubar-sub' {...props} />
}

// Menubar sub trigger
export const MenubarSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) => {
  // Template
  return (
    <MenubarPrimitive.SubTrigger
      data-slot='menubar-sub-trigger'
      data-inset={inset}
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto h-4 w-4' />
    </MenubarPrimitive.SubTrigger>
  )
}

// Menubar sub content
export const MenubarSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) => {
  // Template
  return (
    <MenubarPrimitive.SubContent
      data-slot='menubar-sub-content'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  )
}
