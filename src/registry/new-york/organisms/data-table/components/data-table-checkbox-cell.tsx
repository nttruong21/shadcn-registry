import type { Row, RowData, Table } from '@tanstack/react-table'
import { Checkbox, type CheckboxProps } from '@/components/ui/checkbox'

// Component
export const DataTableCheckboxCell = <TData extends RowData>({
  table,
  row,
  checkboxProps
}: {
  table: Table<TData>
  row: Row<TData>
  checkboxProps?: CheckboxProps
}) => {
  // Template
  return (
    <div className='flex h-full items-center justify-center'>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value as boolean)
          table?.options.meta?.onSetIsSelectAllRows?.(false)
        }}
        {...checkboxProps}
      />
    </div>
  )
}
