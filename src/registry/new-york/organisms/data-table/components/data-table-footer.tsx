import { flexRender, type RowData } from '@tanstack/react-table'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import type { DataTableProps } from './data-table'

// Component
const DataTableFooter = <TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & {
  className?: string
}) => {
  // Template
  return (
    <TableFooter className={className}>
      {/* Row */}
      {table.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  )
}

export default DataTableFooter
