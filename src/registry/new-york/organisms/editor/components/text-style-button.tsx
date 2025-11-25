import type { Level } from '@tiptap/extension-heading'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { ChevronDown, Type } from 'lucide-react'
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

// [C] Text styles
const TEXT_STYLES: Array<{
  label: string
  level: Level | null
  shortcut: string
}> = [
  {
    label: 'Normal text',
    level: null,
    shortcut: 'Ctrl Alt 0'
  },
  {
    label: 'Heading 1',
    level: 1,
    shortcut: 'Ctrl Alt 1'
  },
  {
    label: 'Heading 2',
    level: 2,
    shortcut: 'Ctrl Alt 2'
  },
  {
    label: 'Heading 3',
    level: 3,
    shortcut: 'Ctrl Alt 3'
  },
  {
    label: 'Heading 4',
    level: 4,
    shortcut: 'Ctrl Alt 4'
  }
]

// Component
const TextStyleButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: {
          null: editor?.isActive('paragraph'),
          1: editor?.isActive('heading', { level: 1 }),
          2: editor?.isActive('heading', { level: 2 }),
          3: editor?.isActive('heading', { level: 3 }),
          4: editor?.isActive('heading', { level: 4 }),
          5: editor?.isActive('heading', { level: 5 }),
          6: editor?.isActive('heading', { level: 6 })
        }
      }
    }
  })

  // Methods
  const changeTextStyle = (textStyle: (typeof TEXT_STYLES)[number]) => {
    const { level } = textStyle
    if (level) {
      editor?.chain().focus().toggleHeading({ level }).run()
    } else {
      editor?.chain().focus().setParagraph().run()
    }
  }

  // Template
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='gap-1'>
              <Type />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>Text style</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {TEXT_STYLES.map((textStyle) => (
          <DropdownMenuItem
            key={textStyle.level}
            className={cn({
              'bg-accent text-accent-foreground': editorState?.isActive[`${textStyle.level}`]
            })}
            onClick={() => changeTextStyle(textStyle)}
          >
            <span>{textStyle.label}</span>
            <DropdownMenuShortcut>{textStyle.shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

TextStyleButton.displayName = 'TextStyleButton'
export default TextStyleButton
