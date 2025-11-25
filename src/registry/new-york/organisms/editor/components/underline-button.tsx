import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Underline } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const UnderlineButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isActive: editor?.isActive('underline')
      }
    }
  })

  // Template
  return (
    <TooltipButton
      name='underline'
      Icon={Underline}
      label='Underline'
      kbd='Ctrl U'
      isActive={editorState?.isActive}
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
    />
  )
})

UnderlineButton.displayName = 'UnderlineButton'
export default UnderlineButton
