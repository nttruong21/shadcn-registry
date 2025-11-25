import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { ChevronDown, List, ListOrdered, ListTodo } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const ListButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isBulletListActive: editor?.isActive('bulletList'),
        isOrderedListActive: editor?.isActive('orderedList'),
        isTaskListActive: editor?.isActive('taskList')
      }
    }
  })

  // Template
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='gap-1'>
              <List />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>List</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {/* Bullet list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent text-accent-foreground': editorState?.isBulletListActive
          })}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List />
          <span>Bullet list</span>
          <DropdownMenuShortcut>Ctrl Shift 8</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Ordered list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent text-accent-foreground': editorState?.isOrderedListActive
          })}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
          <span>Ordered list</span>
          <DropdownMenuShortcut>Ctrl Shift 7</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Task list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent text-accent-foreground': editorState?.isTaskListActive
          })}
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
        >
          <ListTodo />
          <span>Task list</span>
          <DropdownMenuShortcut>Ctrl Shift 9</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ListButton.displayName = 'ListButton'
export default ListButton
