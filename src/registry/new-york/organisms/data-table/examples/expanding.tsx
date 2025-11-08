import { type ColumnDef, getExpandedRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'
import { DataTable, useDataTable } from '@/components/organisms/data-table'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Row = {
  id: string
  firstName: string
  lastName: string
  age: number
} & {
  subRows: Row[]
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    id: 'expanding',
    size: 64,
    cell: ({ row }) => {
      if (row.getCanExpand()) {
        const style = {
          marginLeft: `${row.depth * 16}px`
        }

        return (
          <Button
            variant='ghost'
            className={cn('gap-1 p-0 [&>svg]:transition-transform', {
              '[&>svg]:rotate-90': row.getIsExpanded()
            })}
            style={style}
            onClick={row.getToggleExpandedHandler()}
          >
            <ChevronRight />
          </Button>
        )
      }

      return null
    }
  },
  {
    id: 'no',
    header: 'No',
    size: 64,
    cell: ({ row }) => {
      const parentRowIndexes = row.getParentRows().map((parentRow) => parentRow.index + 1)
      const index = [...parentRowIndexes, row.index + 1].join('.')
      return index
    }
  },
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name',
    size: 112,
    cell: (info) => info.getValue()
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name',
    size: 112,
    cell: (info) => info.getValue()
  },
  {
    id: 'age',
    size: 112,
    accessorKey: 'age',
    header: () => 'Age'
  }
]

const DATA: Row[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    subRows: [
      {
        id: '1.1',
        firstName: 'Jane',
        lastName: 'test',
        age: 5,
        subRows: [
          {
            id: '1.1.1',
            firstName: 'third',
            lastName: 'child',
            age: 0,
            subRows: []
          },
          {
            id: '1.1.2',
            firstName: 'test 1',
            lastName: 'test 2',
            age: 0,
            subRows: [
              {
                id: '1.1.2.1',
                firstName: 'test 3',
                lastName: 'test 4',
                age: 0,
                subRows: []
              },
              {
                id: '1.1.2.2',
                firstName: 'test 5',
                lastName: 'test 6',
                age: 0,
                subRows: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    subRows: [{ id: '2.1', firstName: 'Jim', lastName: 'test', age: 10, subRows: [] }]
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    subRows: []
  }
]

// Component
export const DataTableExpanding = () => {
  // Hooks
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // Need getSubRows for expanding
    getSubRows: (row) => row.subRows,
    autoResetExpanded: false,
    // Not reset page automatically when expanding
    autoResetPageIndex: false
  })

  // Template
  return <DataTable table={table} />
}
