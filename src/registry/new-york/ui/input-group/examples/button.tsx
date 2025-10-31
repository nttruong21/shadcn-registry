import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Check, CircleAlert, Copy, Star } from 'lucide-react'
import * as React from 'react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Component
export function InputGroupButtonExample() {
  // Hooks
  const [copiedText, copyToClipboard] = useCopyToClipboard()

  // States
  const [isFavorite, setIsFavorite] = React.useState(false)

  const isCopied = Boolean(copiedText)

  // Template
  return (
    <div className='grid w-full max-w-sm gap-6'>
      <InputGroup>
        <InputGroupInput placeholder='https://x.com/shadcn' readOnly />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            aria-label={isCopied ? 'Copied' : 'Copy'}
            title={isCopied ? 'Copied' : 'Copy'}
            size='icon-xs'
            onClick={() => {
              copyToClipboard('https://x.com/shadcn')
            }}
          >
            {isCopied ? <Check /> : <Copy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton variant='secondary' size='icon-xs'>
                <CircleAlert />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent align='start' className='flex flex-col gap-1 rounded-xl text-sm'>
            <p className='font-medium'>Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        <InputGroupAddon className='pl-1.5 text-muted-foreground'>https://</InputGroupAddon>
        <InputGroupInput id='input-secure-19' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton onClick={() => setIsFavorite(!isFavorite)} size='icon-xs'>
            <Star
              data-favorite={isFavorite}
              className='data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600'
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder='Type to search...' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton variant='secondary'>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
