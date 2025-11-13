import { useCurrentEditor } from '@tiptap/react'
import { Italic } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const ItalicButton = React.memo(() => {
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
            'bg-accent text-accent-foreground': editor?.isActive('italic')
          })}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <span>Italic</span>
        <Kbd>Ctrl I</Kbd>
      </TooltipContent>
    </Tooltip>
  )
})

ItalicButton.displayName = 'ItalicButton'
export default ItalicButton
