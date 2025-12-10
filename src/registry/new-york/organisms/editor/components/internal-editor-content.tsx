import { EditorContent, useCurrentEditor } from '@tiptap/react'
import { Plus, TableCellsMerge, TableCellsSplit, Trash } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

interface TableDropdownMenu {
  open: boolean
  x: number
  y: number
}

// Component
const InternalEditorContent = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // States
  const [tableDropdownMenu, setTableDropdownMenu] = React.useState<TableDropdownMenu>({ open: false, x: 0, y: 0 })

  // Methods
  const clickContextMenu = React.useCallback((e: React.MouseEvent) => {
    const cell = (e.target as HTMLElement).closest('td, th')
    if (cell) {
      e.preventDefault()
      setTableDropdownMenu({
        open: true,
        x: e.clientX,
        y: e.clientY
      })
    }
  }, [])

  return (
    <React.Fragment>
      <EditorContent editor={editor} role='presentation' className='editor-content' onContextMenu={clickContextMenu} />

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
            <span className='whitespace-nowrap'>Add row below</span>
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
    </React.Fragment>
  )
})

InternalEditorContent.displayName = 'InternalEditorContent'
export default InternalEditorContent
