import type { RowData } from '@tanstack/react-table'
import { ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
    <div className='fade-in slide-in-from-bottom-40 fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit animate-in flex-wrap items-center justify-center gap-4 rounded-md border bg-background p-4 text-foreground shadow'>
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
