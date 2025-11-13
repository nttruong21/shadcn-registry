import { useCurrentEditor } from '@tiptap/react'
import { AlignLeft, ChevronDown } from 'lucide-react'
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
import { ALIGNMENTS } from './lib'

// Component
const TextAlignButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // Template
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='gap-1'>
              <AlignLeft />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>Text alignment</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {ALIGNMENTS.map((alignment) => (
          <DropdownMenuItem
            key={alignment.value}
            className={cn({
              'bg-accent': editor?.isActive({ textAlign: alignment.value })
            })}
            onClick={() => editor?.chain().focus().setTextAlign(alignment.value).run()}
          >
            <alignment.icon />
            <span>{alignment.label}</span>
            <DropdownMenuShortcut>{alignment.shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

TextAlignButton.displayName = 'TextAlignButton'
export default TextAlignButton
