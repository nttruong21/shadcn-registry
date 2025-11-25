import {
  type Content,
  type Extensions,
  EditorContext as TiptapEditorContext,
  type UseEditorOptions,
  useEditor
} from '@tiptap/react'
import throttle from 'lodash.throttle'
import React from 'react'
import { Spinner } from '@/components/ui/spinner'
import BlockquoteButton from './blockquote-button'
import BoldButton from './bold-button'
import FileButton from './file-button'
import HighlightButton from './highlight-button'
import HistoryButtons from './history-buttons'
import ImageButton from './image-button'
import InternalEditorContent from './internal-editor-content'
import ItalicButton from './italic-button'
import { EXTENSIONS, getEditorValue } from './lib'
import LinkButton from './link-button'
import ListButton from './list-button'
import PreviewButton from './preview-button'
import StrikeButton from './strike-button'
import TableButton from './table-button'
import TextAlignButton from './text-align-button'
import TextColorButton from './text-color-button'
import TextStyleButton from './text-style-button'
import ToolbarSeparator from './toolbar-separator'
import UnderlineButton from './underline-button'
import YoutubeButton from './youtube-button'
import ZoomButton from './zoom-button'

// Editor
export type EditorProps = UseEditorOptions & {
  value: Content
  onValueChange: (value: Content) => void
}

export type CallbackRef = React.RefObject<((editor: ReturnType<typeof useEditor> | null) => void) | null>

export type SetExtensions = React.Dispatch<React.SetStateAction<Extensions>>

export const Editor = ({ value, onValueChange, ...props }: EditorProps) => {
  // Hooks
  const id = React.useId()

  // Refs
  const callbackRef = React.useRef<CallbackRef['current']>(null)

  // States
  const [extensions, setExtensions] = React.useState<Extensions>(EXTENSIONS)

  // Hooks
  const editor = useEditor(
    {
      extensions,
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off'
        }
      },
      immediatelyRender: false,
      onUpdate: React.useMemo(() => {
        return throttle(
          ({ editor }) => {
            onValueChange(getEditorValue(editor, 'html'))
          },
          1000,
          {
            trailing: false
          }
        )
      }, [onValueChange]),
      onCreate: ({ editor }) => {
        if (value && editor.isEmpty) {
          editor.commands.setContent(value)
        }
        callbackRef.current?.(editor)
        callbackRef.current = null
      },
      onBlur: ({ editor }) => {
        onValueChange(getEditorValue(editor, 'html'))
      },
      ...props
    },
    [extensions]
  )

  // Template
  if (!editor) {
    return <Spinner className='mx-auto size-6' />
  }

  return (
    <TiptapEditorContext value={{ editor }}>
      <div
        id={`editor-${id}`}
        className='w-full transition-all [&_.tiptap]:max-h-[500px] [&_.tiptap]:min-h-64 [&_.tiptap]:overflow-auto [&_.tiptap]:border-none [&_.tiptap]:p-6 [&_.tiptap]:outline-none'
      >
        <div className='text rounded-md border border-input text-foreground ring-offset-background transition-[color,box-shadow] placeholder:text-muted-foreground has-[.ProseMirror-focused]:border-ring has-[.ProseMirror-focused]:ring-[3px] has-[.ProseMirror-focused]:ring-ring/50 group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:ring-destructive/20 group-data-[invalid=true]/field:has-[.ProseMirror-focused]:border-destructive group-data-[invalid=true]/field:dark:ring-destructive/40'>
          <div className='flex flex-wrap items-center gap-1 border-input border-b p-4'>
            <HistoryButtons />
            <ToolbarSeparator />

            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <StrikeButton />
            <BlockquoteButton />
            <ToolbarSeparator />

            <TextStyleButton />
            <TextAlignButton callbackRef={callbackRef} setExtensions={setExtensions} />
            <TextColorButton />
            <HighlightButton />
            <ToolbarSeparator />

            <LinkButton id={id} />
            <ListButton />
            <TableButton callbackRef={callbackRef} setExtensions={setExtensions} />
            <YoutubeButton id={id} callbackRef={callbackRef} setExtensions={setExtensions} />
            <ImageButton id={id} />
            <FileButton id={id} />
            <ToolbarSeparator />

            <ZoomButton id={id} />
            <PreviewButton value={value} />
          </div>

          <InternalEditorContent />
        </div>
      </div>
    </TiptapEditorContext>
  )
}
