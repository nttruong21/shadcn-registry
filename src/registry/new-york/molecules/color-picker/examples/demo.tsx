import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection
} from '@/components/molecules/color-picker'

// Component
export const ColorPickerDemo = () => {
  // Template
  return (
    <ColorPicker className='w-sm rounded-md border bg-background p-4 shadow-sm'>
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
  )
}
