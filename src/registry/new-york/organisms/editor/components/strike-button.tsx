import { useCurrentEditor } from '@tiptap/react'
import { Strikethrough } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const StrikeButton = React.memo(() => {
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
            'bg-accent text-accent-foreground': editor?.isActive('strike')
          })}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Strike</span>
        <Kbd>Ctrl Shift S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
})

StrikeButton.displayName = 'StrikeButton'
export default StrikeButton
