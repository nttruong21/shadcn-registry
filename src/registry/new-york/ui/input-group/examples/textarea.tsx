import { Code, Copy, CornerDownLeft, RefreshCcw } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea
} from '@/components/ui/input-group'

// Component
export const InputGroupTextareaExample = () => {
  // Template
  return (
    <div className='grid w-full max-w-md gap-4'>
      <InputGroup>
        <InputGroupTextarea
          id='textarea-code-32'
          placeholder="console.log('Hello, world!');"
          className='min-h-[200px]'
        />
        <InputGroupAddon align='block-end' className='border-t'>
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size='sm' className='ml-auto' variant='default'>
            Run <CornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align='block-start' className='border-b'>
          <InputGroupText className='font-medium font-mono'>
            <Code />
            script.js
          </InputGroupText>
          <InputGroupButton className='ml-auto' size='icon-xs'>
            <RefreshCcw />
          </InputGroupButton>
          <InputGroupButton variant='ghost' size='icon-xs'>
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
