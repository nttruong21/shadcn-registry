import { useCurrentEditor } from '@tiptap/react'
import { Underline } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const UnderlineButton = React.memo(() => {
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
            'bg-accent text-accent-foreground': editor?.isActive('underline')
          })}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <Underline />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Underline</span>
        <Kbd>Ctrl U</Kbd>
      </TooltipContent>
    </Tooltip>
  )
})

UnderlineButton.displayName = 'UnderlineButton'
export default UnderlineButton
