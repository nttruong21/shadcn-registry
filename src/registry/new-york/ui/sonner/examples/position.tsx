import React from 'react'
import { type ToasterProps, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Position = NonNullable<ToasterProps['position']>
const positions: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center']

// Component
export const SonnerPosition = () => {
  // States
  const [position, setPosition] = React.useState<Position>('top-left')

  // Template
  return (
    <div className='flex items-center gap-2'>
      <Select value={position} onValueChange={(value) => setPosition(value as Position)}>
        <SelectTrigger className='w-xs'>
          <SelectValue placeholder='Position' />
        </SelectTrigger>
        <SelectContent>
          {positions.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant='outline'
        onClick={() =>
          toast('Event has been created', {
            position
          })
        }
      >
        Show Toast
      </Button>
    </div>
  )
}
