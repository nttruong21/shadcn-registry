import type { RowData, Table } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Component
export const DataTableColumnVisibilitySelection = <TData extends RowData>({ table }: { table: Table<TData> }) => {
  // Template
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className={cn('font-normal [&_svg]:pointer-events-auto')}>
          <span>Columns</span>
          <ChevronDown className='text-muted-foreground' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='min-w-(--radix-popover-trigger-width) p-0'>
        <Command>
          <div className='flex items-center gap-2 border-input border-b px-3'>
            <Checkbox
              checked={table.getIsAllColumnsVisible() || (table.getIsSomeColumnsVisible() && 'indeterminate')}
              onCheckedChange={(checked) => {
                table.toggleAllColumnsVisible(checked as boolean)
              }}
            />
            <div className='[&>div]:flex-1 [&>div]:border-b-0 [&>div]:border-b-none [&>div]:px-0'>
              <CommandInput placeholder='Search' />
            </div>
          </div>

          <CommandList className='scrollbar'>
            <CommandEmpty>No column found.</CommandEmpty>
            <CommandGroup>
              {table.getAllLeafColumns().map((column) => {
                if (typeof column.columnDef.header !== 'string' || !column.getCanHide()) {
                  return null
                }

                const isSelected = column.getIsVisible()
                const label = column.columnDef.header

                return (
                  <CommandItem key={column.id} value={label} onSelect={() => column.toggleVisibility(!isSelected)}>
                    <Checkbox checked={isSelected} />
                    <span>{label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
