import { useCurrentEditor } from '@tiptap/react'
import { Maximize2, Minimize2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'
import { useEditorContext } from './editor'

// Component
const ZoomButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { setContainerClassName } = useEditorContext()

  // States
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Methods
  const toggleZoom = () => {
    setContainerClassName(
      isZoomed
        ? ''
        : 'bg-background fixed inset-0 z-50 p-6 [&_.tiptap]:max-h-[unset] [&_.tiptap]:min-h-[unset] [&_.tiptap]:h-full [&_.editor-content]:grow [&>div]:h-full [&>div]:flex [&>div]:flex-col [&_.editor-content]:overflow-auto'
    )
    setIsZoomed((prev) => !prev)
  }

  // Template
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className={cn({
            'bg-accent text-accent-foreground': editor?.isActive('italic')
          })}
          onClick={toggleZoom}
        >
          {isZoomed ? <Minimize2 /> : <Maximize2 />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>{isZoomed ? 'Zoom out' : 'Zoom in'}</TooltipContent>
    </Tooltip>
  )
})

ZoomButton.displayName = 'ZoomButton'
export default ZoomButton
