import {
  type Content,
  EditorContent,
  EditorContext as TiptapEditorContext,
  type UseEditorOptions,
  useEditor
} from '@tiptap/react'
import React from 'react'
import { cn } from '@/utils/ui'
import FixedToolbar from './fixed-toolbar'
import { EXTENSIONS, getEditorValue } from './lib'
import TableDropdownMenu from './table-dropdown-menu'

// Editor
interface TTableDropdownMenu {
  open: boolean
  x: number
  y: number
}

interface EditorContext {
  value: Content
  containerClassName: string
  tableDropdownMenu: TTableDropdownMenu
  setContainerClassName: React.Dispatch<React.SetStateAction<string>>
  setTableDropdownMenu: React.Dispatch<React.SetStateAction<TTableDropdownMenu>>
}

export const useEditorContext = () => {
  const context = React.useContext(EDITOR_CONTEXT)
  if (!context) {
    throw new Error('useEditorContext must be used within the <Editor />')
  }
  return context
}

export const EDITOR_CONTEXT = React.createContext<EditorContext | null>(null)

const EditorProvider = ({ children, ...props }: EditorContext & React.PropsWithChildren) => {
  // Template
  return <EDITOR_CONTEXT.Provider value={props}>{children}</EDITOR_CONTEXT.Provider>
}

export type EditorProps = UseEditorOptions & {
  value: Content
  onValueChange: (value: Content) => void
}

export const Editor = ({ value, onValueChange, ...props }: EditorProps) => {
  // Hooks
  const editor = useEditor({
    extensions: EXTENSIONS,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off'
      }
    },
    immediatelyRender: false,
    // onUpdate: ({ editor }) => handleUpdate(editor),
    onCreate: ({ editor }) => {
      if (value && editor.isEmpty) {
        editor.commands.setContent(value)
      }
    },
    onBlur: ({ editor }) => {
      onValueChange(getEditorValue(editor, 'html'))
    },
    ...props
  })

  // States
  const [containerClassName, setContainerClassName] = React.useState('')
  const [tableDropdownMenu, setTableDropdownMenu] = React.useState<TTableDropdownMenu>({ open: false, x: 0, y: 0 })

  // Methods
  const clickContextMenu = React.useCallback((e: React.MouseEvent) => {
    const cell = (e.target as HTMLElement).closest('td, th')
    if (cell) {
      e.preventDefault()
      setTableDropdownMenu({
        open: true,
        x: e.clientX,
        y: e.clientY
      })
    } else {
      setTableDropdownMenu((prev) => ({ ...prev, open: false }))
    }
  }, [])

  // Template
  if (!editor) {
    return null
  }

  return (
    <TiptapEditorContext value={{ editor }}>
      <EditorProvider
        value={value}
        containerClassName={containerClassName}
        tableDropdownMenu={tableDropdownMenu}
        setContainerClassName={setContainerClassName}
        setTableDropdownMenu={setTableDropdownMenu}
      >
        <div
          className={cn(
            'transition-all [&_.tiptap]:max-h-[500px] [&_.tiptap]:min-h-64 [&_.tiptap]:overflow-auto [&_.tiptap]:border-none [&_.tiptap]:p-6 [&_.tiptap]:outline-none',
            containerClassName
          )}
        >
          <div className='text rounded-md border border-input text-foreground ring-offset-background transition-[color,box-shadow] placeholder:text-muted-foreground has-[.ProseMirror-focused]:border-ring has-[.ProseMirror-focused]:ring-[3px] has-[.ProseMirror-focused]:ring-ring/50 group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:ring-destructive/20 group-data-[invalid=true]/field:has-[.ProseMirror-focused]:border-destructive group-data-[invalid=true]/field:dark:ring-destructive/40'>
            <FixedToolbar />
            <EditorContent
              editor={editor}
              role='presentation'
              className='editor-content'
              onContextMenu={clickContextMenu}
            />
            <TableDropdownMenu />
          </div>
        </div>
      </EditorProvider>
    </TiptapEditorContext>
  )
}
