import type { RowData, Table } from '@tanstack/react-table'
import { Checkbox, type CheckboxProps } from '@/components/ui/checkbox'

// Component
export const DataTableCheckboxHeader = <TData extends RowData>({
  table,
  checkboxProps
}: {
  table: Table<TData>
  checkboxProps?: CheckboxProps
}) => {
  // Template
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
          table.options.meta?.onSetIsSelectAllRows?.(false)
        }}
        {...checkboxProps}
      />
    </div>
  )
}
