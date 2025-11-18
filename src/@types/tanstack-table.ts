import type { Dispatch, SetStateAction } from 'react'

declare module '@tanstack/react-table' {
  // @ts-expect-error
  interface TableMeta {
    isSelectAllRows?: boolean
    onSetIsSelectAllRows?: Dispatch<SetStateAction<boolean>>
  }

  // @ts-expect-error
  interface ColumnMeta {
    className?: string
  }
}
