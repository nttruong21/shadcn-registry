import { flexRender, type RowData } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/utils/ui'
import type { DataTableProps } from './data-table'
import { getCommonPinningStyles } from './lib'

// Component
const DataTableHeader = <TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & { className?: string }) => {
  const isGroupColumn = table.getAllColumns().length < table.getAllFlatColumns().length

  // Template
  return (
    <TableHeader className={cn('sticky top-0 z-20 bg-background', className)}>
      {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, headerIndex) => {
            const pinningPosition = header.column.getIsPinned()

            const columnRelativeDepth = header.depth - header.column.depth
            if (columnRelativeDepth > 1) {
              return null
            }

            let rowSpan = 1
            if (header.isPlaceholder) {
              const leafs = header.getLeafHeaders()
              rowSpan = leafs[leafs.length - 1].depth - header.depth
            }

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                rowSpan={rowSpan}
                className={cn('relative space-y-1 bg-background py-2', header.column.columnDef.meta?.className, {
                  'border-l': isGroupColumn,
                  'first:border-l-0': headerGroupIndex === 0 && headerIndex === 0
                })}
                style={{
                  ...getCommonPinningStyles(header.column)
                }}
              >
                <div className='whitespace-nowrap'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>

                {header.column.getCanPin() && (
                  <div className='flex gap-2'>
                    {pinningPosition !== 'left' && (
                      <Button
                        variant='outline'
                        size='icon-sm'
                        onClick={() => {
                          header.column.pin('left')
                        }}
                      >
                        <ChevronLeft />
                      </Button>
                    )}

                    {pinningPosition && (
                      <Button
                        variant='outline'
                        size='icon-sm'
                        onClick={() => {
                          header.column.pin(false)
                        }}
                      >
                        <X />
                      </Button>
                    )}

                    {pinningPosition !== 'right' && (
                      <Button
                        variant='outline'
                        size='icon-sm'
                        onClick={() => {
                          header.column.pin('right')
                        }}
                      >
                        <ChevronRight />
                      </Button>
                    )}
                  </div>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
