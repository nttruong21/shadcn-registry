import type { Content } from '@tiptap/react'
import { Eye } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { EditorContent } from './editor-content'

// Component
const PreviewButton = React.memo<{ value: Content }>(({ value }) => {
  // Template
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Eye />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>Preview</TooltipContent>
      </Tooltip>

      <DialogContent aria-describedby={undefined} className='max-w-[calc(100dvw-3rem)]'>
        <DialogHeader>
          <DialogTitle>Preview the display content</DialogTitle>
        </DialogHeader>

        <main>
          <EditorContent content={value} />
        </main>
      </DialogContent>
    </Dialog>
  )
})

PreviewButton.displayName = 'PreviewButton'
export default PreviewButton
