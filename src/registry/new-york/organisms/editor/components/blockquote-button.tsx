import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Quote } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const BlockquoteButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('blockquote')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={Quote}
      label='Blockquote'
      isActive={editorState?.isActive}
      kbd='Ctrl Shift B'
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
    />
  )
})

BlockquoteButton.displayName = 'BlockquoteButton'
export default BlockquoteButton
