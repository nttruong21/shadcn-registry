import { flexRender, type RowData } from '@tanstack/react-table'
import React from 'react'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { DataTableProps } from './data-table'
import { getCommonPinningStyles } from './lib'

const DataTableBody = <TData extends RowData>({
  table,
  className,
  onRenderSubComponent,
  onRenderAdditionalRow
}: Pick<DataTableProps<TData>, 'table' | 'onRenderSubComponent' | 'onRenderAdditionalRow'> & {
  className?: string
}) => {
  const rows = table.getRowModel().rows

  // Template
  return (
    <TableBody className={cn('relative', className)}>
      {rows.map((row) => {
        const isExpanded = row.getIsExpanded()
        const rowClassName: string =
          (typeof row.original === 'object' && row.original && 'className' in row.original
            ? (row.original.className as string)
            : '') ?? ''

        return (
          <React.Fragment key={row.id}>
            <TableRow
              data-state={row.getIsSelected() && 'selected'}
              className={cn('bg-background', isExpanded && 'border-b-0', rowClassName)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className='bg-background' style={{ ...getCommonPinningStyles(cell.column) }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>

            {/* Sub component */}
            {onRenderSubComponent && (
              <TableRow
                className={cn('hidden', {
                  'table-row': isExpanded
                })}
              >
                <TableCell colSpan={row.getVisibleCells().length}>{onRenderSubComponent(row)}</TableCell>
              </TableRow>
            )}
          </React.Fragment>
        )
      })}

      {onRenderAdditionalRow && (
        <TableRow>
          <TableCell colSpan={table.getAllFlatColumns().length}>{onRenderAdditionalRow(table)}</TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
