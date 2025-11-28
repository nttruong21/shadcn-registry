import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { DataTable, useDataTable } from '@/components/organisms/data-table'
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
  visits: number
  status: string
  progress: number
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    id: 'name',
    header: () => <div className='text-center'>Name</div>,
    size: 112,
    columns: [
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
      }
    ]
  },
  {
    id: 'info',
    header: () => <div className='text-center'>Info</div>,
    columns: [
      {
        id: 'age',
        accessorKey: 'age',
        header: () => 'Age',
        size: 64
      },
      {
        id: 'moreInfo',
        header: () => <div className='text-center'>More Info</div>,
        columns: [
          {
            id: 'visits',
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            size: 64
          },
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            size: 112
          },
          {
            id: 'progress',
            accessorKey: 'progress',
            header: 'Profile Progress',
            size: 112
          }
        ]
      }
    ]
  }
]

const DATA: Row[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10
  }
]

// Component
export const DataTableColumnSpanning = () => {
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
          <DialogDescription>Column spanning</DialogDescription>
        </DialogHeader>

        <DialogScrollableContent>
          <DataTable table={table} />
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
