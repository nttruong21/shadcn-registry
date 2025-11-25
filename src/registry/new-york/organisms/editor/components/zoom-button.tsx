import { Maximize2, Minimize2 } from 'lucide-react'
import React from 'react'
import TooltipButton from './tooltip-button'

const ZOOM_IN_CLASS_NAME =
  'bg-background fixed inset-0 z-50 p-6 [&_.tiptap]:max-h-[unset] [&_.tiptap]:min-h-[unset] [&_.tiptap]:h-full [&_.editor-content]:grow [&>div]:h-full [&>div]:flex [&>div]:flex-col [&_.editor-content]:overflow-auto'

// Component
const ZoomButton = React.memo<{
  editorRef: React.RefObject<HTMLDivElement | null>
}>(({ editorRef }) => {
  // States
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Methods
  const toggleZoom = () => {
    const newIsZoomed = !isZoomed
    editorRef.current?.classList[newIsZoomed ? 'add' : 'remove'](...ZOOM_IN_CLASS_NAME.split(' '))
    setIsZoomed(newIsZoomed)
  }

  // Template
  return (
    <TooltipButton
      Icon={isZoomed ? Minimize2 : Maximize2}
      label={isZoomed ? 'Zoom out' : 'Zoom in'}
      onClick={toggleZoom}
    />
  )
})

ZoomButton.displayName = 'ZoomButton'
export default ZoomButton
