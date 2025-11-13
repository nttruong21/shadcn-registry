import type { Content } from '@tiptap/react'
import React from 'react'
import { Editor } from '@/components/organisms/editor'

// Component
export const EditorDemo = () => {
  // States
  const [value, setValue] = React.useState<Content>('')

  // Template
  return <Editor value={value} onValueChange={setValue} />
}
