import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Bold } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const BoldButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('bold')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={Bold}
      label='Bold'
      isActive={editorState?.isActive}
      kbd='Ctrl B'
      onClick={() => editor?.chain().focus().toggleBold().run()}
    />
  )
})

BoldButton.displayName = 'BoldButton'
export default BoldButton
