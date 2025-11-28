import type { RowData } from '@tanstack/react-table'
import { ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'
import type { DataTableProps } from './data-table'

// Component
const DataTableRowSelection = <TData extends RowData>({ table }: Pick<DataTableProps<TData>, 'table'>) => {
  const rowCount = table.getRowCount()
  const rowSelectionLength = Object.keys(table.getState().rowSelection).length
  const pageRowCount = table.getPreFilteredRowModel().rows.length
  const { isSelectAllRows, onSetIsSelectAllRows } = table.options.meta ?? {}

  // Methods
  // Handle toggle select all rows
  const handleToggleSelectAllRows = () => {
    onSetIsSelectAllRows?.((prev) => !prev)
    table.toggleAllPageRowsSelected(!isSelectAllRows)
  }

  // Template
  if (rowSelectionLength === 0) {
    return null
  }

  return (
    <div
      className={cn('w-full animate-in bg-muted/50 p-4 text-sm', {
        'fade-in slide-in-from-top-60': rowSelectionLength > 0
      })}
    >
      <span>
        {isSelectAllRows ? `All ${rowCount} rows selected` : `${rowSelectionLength}/${pageRowCount} rows selected`}
      </span>

      {pageRowCount < rowCount && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon-sm' onClick={handleToggleSelectAllRows}>
                <ListChecks />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              {isSelectAllRows ? `Unselect all ${rowCount} rows` : `Select all ${rowCount} rows`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export default DataTableRowSelection
