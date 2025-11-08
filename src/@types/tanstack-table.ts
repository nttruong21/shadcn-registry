import type { RowData } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: ignore
  interface TableMeta<TData extends RowData> {
    isSelectAllRows?: boolean
    onSetIsSelectAllRows?: Dispatch<SetStateAction<boolean>>
  }

  // biome-ignore lint/correctness/noUnusedVariables: ignore
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
  }
}
