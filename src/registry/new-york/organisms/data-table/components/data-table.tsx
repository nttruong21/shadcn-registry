import type { Table as ReactTable, Row, RowData } from '@tanstack/react-table'
import type React from 'react'
import { LoadingOverlay } from '@/components/molecules/loading-overlay'
import { Table } from '@/components/ui/table'
import { cn } from '@/utils/ui'
import DataTableAdditionalInfo from './data-table-additional-info'
import DataTableBody from './data-table-body'
import DataTableFooter from './data-table-footer'
import DataTableHeader from './data-table-header'
import DataTablePagination from './data-table-pagination'
import DataTableRowSelection from './data-table-row-selection'

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

export const DataTable = <TData extends RowData>({
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
    <div
      id={id}
      // **:data-[slot=table-container]:max-h-96
      className={cn('w-full overflow-hidden rounded-md border', className?.container)}
    >
      <Table className={className?.table}>
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

      {/* Row selection */}
      <DataTableRowSelection table={table} />

      {/* Pagination */}
      {isDisplayPagination && <DataTablePagination table={table} className={className?.tablePagination} />}

      {/* Loading overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  )
}
