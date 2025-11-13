import { useCurrentEditor } from '@tiptap/react'
import { Bold } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const BoldButton = React.memo(() => {
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
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Bold</span>
        <Kbd>Ctrl B</Kbd>
      </TooltipContent>
    </Tooltip>
  )
})

BoldButton.displayName = 'BoldButton'
export default BoldButton
