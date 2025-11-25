import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Strikethrough } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const StrikeButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('strike')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={Strikethrough}
      label='Strike'
      isActive={editorState?.isActive}
      kbd='Ctrl Shift S'
      onClick={() => editor?.chain().focus().toggleStrike().run()}
    />
  )
})

StrikeButton.displayName = 'StrikeButton'
export default StrikeButton
