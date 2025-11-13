import { useCurrentEditor } from '@tiptap/react'
import { Check, ChevronDown, CircleSlash, Highlighter } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// [C] Colors
const COLORS: string[] = [
  'oklch(0.72 0.01 56)',
  'oklch(0.71 0.01 286)',
  'oklch(0.71 0.04 257)',
  'oklch(0.71 0.17 22)',
  'oklch(0.76 0.16 56)',
  'oklch(0.84 0.16 84)',
  'oklch(0.86 0.17 92)',
  'oklch(0.85 0.21 129)',
  'oklch(0.8 0.18 152)',
  'oklch(0.77 0.15 163)',
  'oklch(0.78 0.13 182)',
  'oklch(0.8 0.13 212)',
  'oklch(0.75 0.14 233)',
  'oklch(0.71 0.14 255)',
  'oklch(0.68 0.16 277)',
  'oklch(0.71 0.16 294)',
  'oklch(0.72 0.18 306)',
  'oklch(0.75 0.21 322)',
  'oklch(0.73 0.18 350)',
  'oklch(0.72 0.17 13)'
]

// Component
const HighlightButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // States
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null)

  // Methods
  const setColor = (color: string) => {
    setSelectedColor(color)
    editor?.chain().focus().setHighlight({ color }).run()
  }

  // Clear color
  const clearColor = () => {
    setSelectedColor(null)
    editor?.chain().focus().unsetHighlight().run()
  }

  // Template
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant='ghost' className='gap-1'>
              <Highlighter />
              <ChevronDown />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Highlight</TooltipContent>
      </Tooltip>

      <PopoverContent className='space-y-2'>
        <div className='grid grid-cols-5 gap-2'>
          {COLORS.map((color) => (
            <Button
              key={color}
              size='icon'
              style={{
                backgroundColor: color
              }}
              onClick={() => setColor(color)}
            >
              {selectedColor === color && <Check className='text-foreground' />}
            </Button>
          ))}

          {/* <ColorPickerButton onSubmit={handleSetColor} /> */}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' onClick={clearColor}>
                <CircleSlash />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Clear color</TooltipContent>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  )
})

HighlightButton.displayName = 'HighlightButton'
export default HighlightButton
