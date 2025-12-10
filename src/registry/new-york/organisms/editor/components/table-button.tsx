import { useCurrentEditor } from '@tiptap/react'
import { Table } from 'lucide-react'
import React from 'react'
import type { CallbackRef, SetExtensions } from './editor'
import TooltipButton from './tooltip-button'

// Component
const TableButton = React.memo<{
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}>(({ callbackRef, setExtensions }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const [isPending, startTransition] = React.useTransition()

  // Refs
  const isExtensionLoadedRef = React.useRef(false)

  // Template
  return (
    <TooltipButton
      Icon={Table}
      label='Table'
      isLoading={isPending}
      onClick={() => {
        const callback: CallbackRef['current'] = (editor) => {
          editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }

        if (isExtensionLoadedRef.current) {
          return callback(editor)
        }

        // Load extension
        startTransition(async () => {
          try {
            const { TableKit } = await import('@tiptap/extension-table')
            callbackRef.current = callback
            setExtensions((prev) => [
              ...prev,
              TableKit.configure({
                table: { resizable: true, allowTableNodeSelection: true }
              })
            ])
            isExtensionLoadedRef.current = true
          } catch (error) {
            console.error('An error occurred when load the TableKit extension', error)
          }
        })
      }}
    />
  )
})

TableButton.displayName = 'TableButton'
export default TableButton
