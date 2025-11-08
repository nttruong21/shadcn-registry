import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import {
  DataTable,
  DataTableCheckboxCell,
  DataTableCheckboxHeader,
  useDataTable
} from '@/components/organisms/data-table'

interface Row {
  id: string
  firstName: string
  lastName: string
  age: number
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    id: 'selection',
    size: 80,
    header: ({ table }) => <DataTableCheckboxHeader table={table} />,
    cell: ({ table, row }) => <DataTableCheckboxCell table={table} row={row} />
  },
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name',
    size: 112
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name',
    size: 112
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: 'Age',
    size: 112
  }
]

const DATA: Row[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45
  }
]

// Component
export const DataTableSelection = () => {
  // Hooks
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    initialState: {
      rowSelection: {}
    },
    getPaginationRowModel: getPaginationRowModel()
  })

  // Template
  return <DataTable table={table} />
}
