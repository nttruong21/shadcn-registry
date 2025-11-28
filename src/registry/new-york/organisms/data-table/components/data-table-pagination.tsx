import type { RowData } from '@tanstack/react-table'
import debounce from 'lodash.debounce'
import type { NumberFormatValues } from 'react-number-format'
import { NumberInput } from '@/components/molecules/number-input'
import { Pagination } from '@/components/molecules/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utils/ui'
import type { DataTableProps } from './data-table'

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100]

// Component
const DataTablePagination = <TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & {
  className?: string
}) => {
  const pagination = table.getState().pagination
  const page = pagination.pageIndex + 1
  const pageSize = pagination.pageSize
  const pageCount = table.getPageCount()

  // Methods
  // Change number input value
  const changeNumberInputValue = debounce((values: NumberFormatValues) => {
    if (values.floatValue == null || values.floatValue < 1) {
      return
    }

    if (values.floatValue > pageCount) {
      return table.setPageIndex(pageCount - 1)
    }

    return table.setPageIndex(values.floatValue - 1)
  }, 400)

  // Template
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-4 border-t bg-muted/50 p-4 text-sm xl:flex-row',
        className
      )}
    >
      {/* Page input & page size */}
      <div className='flex flex-col items-center gap-4 xl:flex-row'>
        {/* Page input */}
        <div className='flex items-center gap-2'>
          <span>Move to page</span>
          <NumberInput
            className='w-14'
            placeholder=''
            isDisplayStepper={false}
            min={1}
            max={pageCount}
            defaultValue={page}
            onValueChange={changeNumberInputValue}
          />
        </div>

        {/* Page size selection */}
        <div className='flex items-center gap-2'>
          <span>Number of rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='w-fit gap-1'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent side='top'>
              {DEFAULT_PAGE_SIZE_OPTIONS.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Pagination
        page={page}
        pageCount={pageCount}
        isHasPreviousPage={table.getCanPreviousPage()}
        isHasNextPage={table.getCanNextPage()}
        onGoToPreviousPage={table.previousPage}
        onGoToNextPage={table.nextPage}
        onChangePage={(page) => table.setPageIndex(page - 1)}
      />
    </div>
  )
}

export default DataTablePagination
