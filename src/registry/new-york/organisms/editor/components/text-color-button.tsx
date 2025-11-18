import { useCurrentEditor } from '@tiptap/react'
import type { ColorInstance } from 'color'
import { Baseline, Check, ChevronDown, CircleSlash } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const ColorPickerButton = React.lazy(() => import('./color-picker-button'))

// [C] Colors
const COLORS: string[] = [
  'oklch(0.27 0.01 34)',
  'oklch(0.27 0.01 286)',
  'oklch(0.28 0.04 260)',
  'oklch(0.44 0.16 27)',
  'oklch(0.47 0.14 37)',
  'oklch(0.47 0.12 46)',
  'oklch(0.48 0.1 62)',
  'oklch(0.45 0.11 131)',
  'oklch(0.45 0.11 151)',
  'oklch(0.43 0.09 167)',
  'oklch(0.44 0.07 188)',
  'oklch(0.45 0.08 224)',
  'oklch(0.44 0.1 241)',
  'oklch(0.42 0.18 266)',
  'oklch(0.4 0.18 277)',
  'oklch(0.43 0.21 293)',
  'oklch(0.44 0.2 304)',
  'oklch(0.45 0.19 325)',
  'oklch(0.46 0.17 4)',
  'oklch(0.45 0.17 14)'
]

// Component
const TextColorButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // States
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null)

  // Methods
  const setColor = (color: string) => {
    setSelectedColor(color)
    editor?.chain().focus().setColor(color).run()
  }

  const changeColorFromPicker = (color: ColorInstance) => {
    setSelectedColor(null)
    editor?.chain().setColor(color.hex()).run()
  }

  const clearColor = () => {
    setSelectedColor(null)
    editor?.chain().focus().unsetColor().run()
  }

  // Template
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant='ghost' className='gap-1'>
              <Baseline />
              <ChevronDown />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Text color</TooltipContent>
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
              {selectedColor === color && <Check className='text-background' />}
            </Button>
          ))}
        </div>

        <div className='flex justify-end gap-2'>
          <React.Suspense fallback={<Button size='icon' variant='outline' className='animate-pulse bg-muted' />}>
            <ColorPickerButton onValueChange={changeColorFromPicker} />
          </React.Suspense>

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

TextColorButton.displayName = 'TextColorButton'
export default TextColorButton
