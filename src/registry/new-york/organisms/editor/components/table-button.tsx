import { useCurrentEditor } from '@tiptap/react'
import { Table } from 'lucide-react'
import { memo } from 'react'
import TooltipButton from './tooltip-button'

// Component
const TableButton = memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // Template
  return (
    <TooltipButton
      Icon={Table}
      label='Table'
      onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
    />
  )
})

TableButton.displayName = 'TableButton'
export default TableButton
