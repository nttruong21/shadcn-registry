import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { DataTable, DataTableColumnVisibilitySelection, useDataTable } from '@/components/organisms/data-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScrollableContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface Row {
  id: string
  firstName: string
  lastName: string
  age: number
}

const COLUMNS: ColumnDef<Row>[] = [
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
export const DataTableColumnVisibility = () => {
  // Hooks
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    initialState: {
      columnVisibility: {}
    },
    getPaginationRowModel: getPaginationRowModel()
  })

  // Template
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Data table</DialogTitle>
          <DialogDescription>Column visibility</DialogDescription>
        </DialogHeader>

        <DialogScrollableContent>
          <div className='space-y-4'>
            <div className='flex justify-end'>
              <DataTableColumnVisibilitySelection table={table} />
            </div>
            <DataTable table={table} />
          </div>
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
