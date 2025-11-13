import { useCurrentEditor } from '@tiptap/react'
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
            'bg-accent': editor?.isActive('bulletList')
          })}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List />
          <span>Bullet list</span>
          <DropdownMenuShortcut>Ctrl Shift 8</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Order list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent': editor?.isActive('orderList')
          })}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
          <span>Order list</span>
          <DropdownMenuShortcut>Ctrl Shift 7</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Task list */}
        <DropdownMenuItem
          className={cn({
            'bg-accent': editor?.isActive('taskList')
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
