import type { RowData } from '@tanstack/react-table'
import type { DataTableProps } from './data-table'

// Component
const DataTableAdditionalInfo = <TData extends RowData>({
  table,
  isLoading,
  isError
}: Pick<DataTableProps<TData>, 'table' | 'isError' | 'isLoading'>) => {
  const rowLength = table.getRowModel().rows.length
  const isEmpty = !rowLength && !isLoading

  // Template
  if (isError) {
    return <div className='flex items-center justify-center p-4'>An error occurred, please reload the page</div>
  }

  if (isEmpty) {
    return <div className='flex items-center justify-center p-4'>No data available</div>
  }

  return null
}

export default DataTableAdditionalInfo
