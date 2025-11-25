import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Redo, Undo } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const HistoryButtons = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isUndoDisabled: !editor?.can().undo(),
        isRedoDisabled: !editor?.can().redo()
      }
    }
  })

  // Template
  return (
    <div className='flex gap-1'>
      <TooltipButton
        Icon={Undo}
        label='Undo'
        kbd='Ctrl Z'
        disabled={editorState?.isUndoDisabled}
        onClick={() => editor?.chain().focus().undo().run()}
      />

      <TooltipButton
        Icon={Redo}
        label='Redo'
        kbd='Ctrl Y'
        disabled={editorState?.isRedoDisabled}
        onClick={() => editor?.chain().focus().redo().run()}
      />
    </div>
  )
})

HistoryButtons.displayName = 'HistoryButtons'
export default HistoryButtons
