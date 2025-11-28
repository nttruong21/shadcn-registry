import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { FilePenLine, Search, Trash } from 'lucide-react'
import { DataTable, DataTableActionCell, useDataTable } from '@/components/organisms/data-table'
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
    header: 'First name'
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name'
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: 'Age'
  },
  {
    id: 'action',
    size: 112,
    header: 'Action',
    cell: () => (
      <DataTableActionCell
        menus={[
          {
            id: 'search',
            icon: <Search />,
            label: 'View'
          },
          {
            id: 'update',
            icon: <FilePenLine />,
            label: 'Update'
          },
          {
            id: 'delete',
            icon: <Trash />,
            label: 'Delete'
          }
        ]}
      />
    )
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
export const DataTableActionCellDemo = () => {
  // Hooks
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
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
          <DialogDescription>Action column</DialogDescription>
        </DialogHeader>

        <DialogScrollableContent>
          <DataTable table={table} />
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
