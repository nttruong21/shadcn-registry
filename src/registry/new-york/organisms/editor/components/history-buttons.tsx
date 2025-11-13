import { useCurrentEditor } from '@tiptap/react'
import { Redo, Undo } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Component
const HistoryButtons = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // Template
  return (
    <div className='flex gap-1'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            disabled={!editor?.can().undo()}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <Undo />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <span>Undo</span>
          <Kbd>Ctrl Z</Kbd>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            disabled={!editor?.can().redo()}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <Redo />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <span>Redo</span>
          <Kbd>Ctrl Y</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
})

HistoryButtons.displayName = 'HistoryButtons'
export default HistoryButtons
