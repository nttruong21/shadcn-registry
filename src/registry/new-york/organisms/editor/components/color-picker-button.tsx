import { Palette } from 'lucide-react'
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  type ColorPickerProps,
  ColorPickerSelection
} from '@/components/molecules/color-picker'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Component
const ColorPickerButton = (props: ColorPickerProps) => {
  // Template
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant='outline' size='icon'>
              <Palette />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Pick color</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-sm'>
        <ColorPicker {...props}>
          <ColorPickerSelection />
          <div className='flex items-center gap-2'>
            <ColorPickerEyeDropper />
            <div className='grow space-y-1'>
              <ColorPickerHue />
              <ColorPickerAlpha />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <ColorPickerFormat />
            <ColorPickerOutput />
          </div>
        </ColorPicker>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPickerButton
