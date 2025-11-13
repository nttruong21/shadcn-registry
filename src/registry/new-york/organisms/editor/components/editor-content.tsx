import type { Content } from '@tiptap/react'
import parse from 'html-react-parser'

// Editor content
export const EditorContent = ({ content }: { content: Content }) => {
  // Template
  if (typeof content === 'string') {
    return <div className='tiptap'>{parse(content)}</div>
  }
  return null
}
