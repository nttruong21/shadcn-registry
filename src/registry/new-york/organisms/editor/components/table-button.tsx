import { useCurrentEditor } from '@tiptap/react'
import { Table } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const TableButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // Template
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className={cn({
            'bg-accent text-accent-foreground': editor?.isActive('bold')
          })}
          onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <Table />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Table</TooltipContent>
    </Tooltip>
  )
})

TableButton.displayName = 'TableButton'
export default TableButton
