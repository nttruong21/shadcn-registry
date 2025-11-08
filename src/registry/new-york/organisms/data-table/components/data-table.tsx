import {
  type Column,
  flexRender,
  getCoreRowModel,
  type Table as ReactTable,
  type Row,
  type RowData,
  type TableOptions,
  useReactTable
} from '@tanstack/react-table'
import debounce from 'lodash.debounce'
import { ChevronDown, CircleChevronLeft, CircleChevronRight, EllipsisVertical, ListChecks, X } from 'lucide-react'
import React from 'react'
import type { NumberFormatValues } from 'react-number-format'
import { LoadingOverlay } from '@/components/molecules/loading-overlay'
import { NumberInput } from '@/components/molecules/number-input'
import { Pagination } from '@/components/molecules/pagination'
import { Button } from '@/components/ui/button'
import { Checkbox, type CheckboxProps } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const getCommonPinningStyles = <TData extends RowData>(column: Column<TData>): React.CSSProperties => {
  const pinningPosition = column.getIsPinned()
  const isLastLeftPinnedColumn = pinningPosition === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = pinningPosition === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-2px 0 2px -2px gray inset'
      : isFirstRightPinnedColumn
        ? '2px 0 2px -2px gray inset'
        : undefined,
    left: pinningPosition === 'left' ? `${column.getStart('left')}px` : undefined,
    right: pinningPosition === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: pinningPosition ? 'sticky' : 'relative',
    minWidth: column.getSize(),
    zIndex: pinningPosition ? 1 : 0
  }
}

export const useDataTable = <TData extends RowData>(options: Omit<TableOptions<TData>, 'getCoreRowModel'>) => {
  // Options
  const { enableColumnPinning = false, ...restOptions } = options

  return useReactTable<TData>({
    enableColumnPinning,
    getRowId: (row: TData, index: number) =>
      typeof row === 'object' && row && 'id' in row ? String(row.id) : String(index),
    ...restOptions,
    getCoreRowModel: getCoreRowModel()
  })
}

// Data table
export interface DataTableProps<TData extends RowData> {
  id?: string
  table: ReactTable<TData>
  isLoading?: boolean
  isError?: boolean
  isDisplayFooter?: boolean
  isDisplayPagination?: boolean
  className?: {
    container?: string
    table?: string
    tableHeader?: string
    tableBody?: string
    tableFooter?: string
    tablePagination?: string
  }
  onRenderSubComponent?: (row: Row<TData>) => React.ReactNode
  onRenderAdditionalRow?: (table: ReactTable<TData>) => React.ReactNode
}

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

const DataTableHeader = <TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & { className?: string }) => {
  const isGroupColumn = table.getAllColumns().length < table.getAllFlatColumns().length

  // Template
  return (
    <TableHeader className={cn('sticky top-0 z-20', className)}>
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
                className={cn('relative space-y-1 bg-inherit py-2', header.column.columnDef.meta?.className, {
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
                  <div className='flex justify-center gap-2'>
                    {pinningPosition !== 'left' && (
                      <Button
                        className='size-fit p-0'
                        onClick={() => {
                          header.column.pin('left')
                        }}
                      >
                        <CircleChevronLeft />
                      </Button>
                    )}

                    {pinningPosition && (
                      <Button
                        className='size-fit p-0'
                        onClick={() => {
                          header.column.pin(false)
                        }}
                      >
                        <X />
                      </Button>
                    )}

                    {pinningPosition !== 'right' && (
                      <Button
                        className='size-fit p-0'
                        onClick={() => {
                          header.column.pin('right')
                        }}
                      >
                        <CircleChevronRight />
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
                <TableCell key={cell.id} className='bg-inherit' style={{ ...getCommonPinningStyles(cell.column) }}>
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

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100]
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
        'flex w-full flex-col items-center justify-between gap-4 border-t bg-muted/40 p-4 text-sm xl:flex-row',
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

export const DataTable = <TData = unknown>({
  id,
  table,
  isLoading = false,
  isError = false,
  isDisplayFooter = false,
  isDisplayPagination = true,
  className,
  onRenderSubComponent,
  onRenderAdditionalRow
}: DataTableProps<TData>) => {
  return (
    // Template
    <div id={id} className={cn('relative overflow-hidden rounded-md border', className?.container)}>
      {/* Row selection */}
      <DataTableRowSelection table={table} />

      <Table className={cn('bg-background', className?.table)}>
        {/* Table header */}
        <DataTableHeader table={table} className={className?.tableHeader} />

        {/* Table body */}
        <DataTableBody
          table={table}
          className={className?.tableBody}
          onRenderSubComponent={onRenderSubComponent}
          onRenderAdditionalRow={onRenderAdditionalRow}
        />

        {/* Table footer */}
        {isDisplayFooter && <DataTableFooter table={table} className={className?.tableFooter} />}
      </Table>

      {/* Additional info */}
      <DataTableAdditionalInfo table={table} isError={isError} isLoading={isLoading} />

      {/* Pagination */}
      {isDisplayPagination && <DataTablePagination table={table} className={className?.tablePagination} />}

      {/* Loading overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  )
}

// Data table action cell
export const DataTableActionCell = ({
  menus,
  isLoading
}: {
  menus: Array<{
    id: string
    icon?: React.ReactNode
    label?: React.ReactNode
    slot?: React.ReactNode
    link?: string
    onClick?: () => void
  }>
  isLoading?: boolean
}) => {
  // Template
  if (menus.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' isLoading={isLoading}>
          <EllipsisVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {menus.map((menu) => {
          if (menu.slot) {
            return <React.Fragment key={menu.id}>{menu.slot}</React.Fragment>
          }

          if (menu.link) {
            return (
              <DropdownMenuItem key={menu.id} asChild>
                <a href={menu.link}>
                  {menu.icon}
                  {menu.label}
                </a>
              </DropdownMenuItem>
            )
          }

          return (
            <DropdownMenuItem key={menu.id} onClick={menu.onClick}>
              {menu.icon}
              {menu.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Data table checkbox header
export const DataTableCheckboxHeader = <TData extends RowData>({
  table,
  checkboxProps
}: {
  table: ReactTable<TData>
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

// Data table checkbox cell
export const DataTableCheckboxCell = <TData extends RowData>({
  table,
  row,
  checkboxProps
}: {
  table: ReactTable<TData>
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

// Data table column visibility selection
export const DataTableColumnVisibilitySelection = <TData extends RowData>({ table }: { table: ReactTable<TData> }) => {
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
