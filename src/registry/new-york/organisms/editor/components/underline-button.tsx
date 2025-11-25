import { useCurrentEditor } from '@tiptap/react'
import { Underline } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

// Component
const UnderlineButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // Template
  return (
    <TooltipButton
      name='underline'
      Icon={Underline}
      label='Underline'
      kbd='Ctrl U'
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
    />
  )
})

UnderlineButton.displayName = 'UnderlineButton'
export default UnderlineButton
