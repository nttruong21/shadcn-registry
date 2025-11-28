import type * as React from 'react'
import { cn } from '@/utils/ui'

// Table
export const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
  // Template
  return (
    <div data-slot='table-container' className='relative w-full overflow-x-auto'>
      <table data-slot='table' className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

// Table header
export const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => {
  // Template
  return <thead data-slot='table-header' className={cn('[&_tr]:border-b', className)} {...props} />
}

// Table body
export const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
  // Template
  return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

// Table footer
export const TableFooter = ({ className, ...props }: React.ComponentProps<'tfoot'>) => {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

// Table row
export const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
  // Template
  return (
    <tr
      data-slot='table-row'
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  )
}

// Table head
export const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
  // Template
  return (
    <th
      data-slot='table-head'
      className={cn(
        'whitespace-nowrap px-4 py-3 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    />
  )
}

// Table cell
export const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
  // Template
  return (
    <td
      data-slot='table-cell'
      className={cn(
        'whitespace-nowrap px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    />
  )
}

// Table caption
export const TableCaption = ({ className, ...props }: React.ComponentProps<'caption'>) => {
  // Template
  return (
    <caption data-slot='table-caption' className={cn('mt-4 text-muted-foreground text-sm', className)} {...props} />
  )
}
