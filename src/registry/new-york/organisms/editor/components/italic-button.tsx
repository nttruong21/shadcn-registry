import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Italic } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const ItalicButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('italic')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      Icon={Italic}
      label='Italic'
      isActive={editorState?.isActive}
      kbd='Ctrl I'
      onClick={() => editor?.chain().focus().toggleItalic().run()}
    />
  )
})

ItalicButton.displayName = 'ItalicButton'
export default ItalicButton
