import { useCurrentEditor } from '@tiptap/react'
import { Plus, TableCellsMerge, TableCellsSplit, Trash } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { useEditorContext } from './editor'

// Component
const TableDropdownMenu = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { tableDropdownMenu, setTableDropdownMenu } = useEditorContext()

  // Template
  return (
    <DropdownMenu
      open={tableDropdownMenu.open}
      onOpenChange={(open) => setTableDropdownMenu((prev) => ({ ...prev, open }))}
    >
      <DropdownMenuContent
        side='right'
        align='start'
        style={{
          position: 'fixed',
          left: tableDropdownMenu.x,
          top: tableDropdownMenu.y
        }}
      >
        <DropdownMenuItem onClick={() => editor?.chain().focus().addColumnBefore().run()}>
          <Plus />
          <span className='whitespace-nowrap'>Add column before</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor?.chain().focus().addColumnAfter().run()}>
          <Plus />
          <span className='whitespace-nowrap'>Add column before</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor?.chain().focus().addRowBefore().run()}>
          <Plus />
          <span className='whitespace-nowrap'>Add row above</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor?.chain().focus().addRowAfter().run()}>
          <Plus />
          <span className='whitespace-nowrap'>Add row belo</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => editor?.chain().focus().deleteTable().run()}>
          <Trash />
          <span className='whitespace-nowrap'>Delete table</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor?.chain().focus().deleteColumn().run()}>
          <Trash />
          <span className='whitespace-nowrap'>Delete column</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor?.chain().focus().deleteRow().run()}>
          <Trash />
          <span className='whitespace-nowrap'>Delete row</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => editor?.chain().focus().mergeCells().run()}>
          <TableCellsMerge />
          <span className='whitespace-nowrap'>Merge cell</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => editor?.chain().focus().splitCell().run()}>
          <TableCellsSplit />
          <span className='whitespace-nowrap'>Split cell</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

TableDropdownMenu.displayName = 'TableDropdownMenu'
export default TableDropdownMenu
