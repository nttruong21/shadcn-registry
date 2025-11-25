import { useCurrentEditor, useEditorState } from '@tiptap/react'
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
import type { CallbackRef, SetExtensions } from './editor'
import { ALIGNMENTS } from './lib'

// Component
const TextAlignButton = React.memo<{
  setExtensions: SetExtensions
  callbackRef: CallbackRef
}>(({ callbackRef, setExtensions }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: {
          left: editor?.isActive({ textAlign: 'left' }),
          center: editor?.isActive({ textAlign: 'center' }),
          right: editor?.isActive({ textAlign: 'right' }),
          justify: editor?.isActive({ textAlign: 'justify' })
        }
      }
    }
  })
  const [isPending, startTransition] = React.useTransition()

  // Refs
  const isExtensionLoadedRef = React.useRef(false)

  // Template
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='gap-1' isLoading={isPending}>
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
              'bg-accent text-accent-foreground': editorState?.isActive[alignment.value]
            })}
            onClick={() => {
              const callback: CallbackRef['current'] = (editor) => {
                editor?.chain().focus().setTextAlign(alignment.value).run()
              }

              if (isExtensionLoadedRef.current) {
                return callback(editor)
              }

              // Load extension
              startTransition(async () => {
                try {
                  const extension = await import('@tiptap/extension-text-align')

                  callbackRef.current = callback

                  setExtensions((prev) => [
                    ...prev,
                    extension.default.configure({
                      types: ['heading', 'paragraph']
                    })
                  ])

                  isExtensionLoadedRef.current = true
                } catch (error) {
                  console.error('An error occurred when load the TextAlign extension', error)
                }
              })
            }}
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
