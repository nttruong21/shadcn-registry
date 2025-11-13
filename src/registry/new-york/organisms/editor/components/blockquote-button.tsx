import { useCurrentEditor } from '@tiptap/react'
import { Quote } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const BlockquoteButton = React.memo(() => {
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
            'bg-accent text-accent-foreground': editor?.isActive('blockquote')
          })}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quote />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Blockquote</span>
        <Kbd>Ctrl Shift B</Kbd>
      </TooltipContent>
    </Tooltip>
  )
})

BlockquoteButton.displayName = 'BlockquoteButton'
export default BlockquoteButton
