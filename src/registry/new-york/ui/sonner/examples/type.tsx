import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

// Component
export const SonnerType = () => {
  // Template
  return (
    <div className=''>
      <div className='flex flex-wrap gap-2'>
        {/* Default */}
        <Button variant='outline' onClick={() => toast('Event has been created')}>
          Default
        </Button>

        {/* Description */}
        <Button
          variant='outline'
          onClick={() =>
            toast.message('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm'
            })
          }
        >
          Description
        </Button>

        {/* Success */}
        <Button variant='outline' onClick={() => toast.success('Event has been created')}>
          Success
        </Button>

        {/* Info */}
        <Button variant='outline' onClick={() => toast.info('Be at the area 10 minutes before the event time')}>
          Info
        </Button>

        {/* Warning */}
        <Button variant='outline' onClick={() => toast.warning('Event start time cannot be earlier than 8am')}>
          Warning
        </Button>

        {/* Error */}
        <Button variant='outline' onClick={() => toast.error('Event has not been created')}>
          Error
        </Button>

        {/* Promise */}
        <Button
          variant='outline'
          onClick={() => {
            toast.promise<{ name: string }>(
              () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Event' }), 2000)),
              {
                loading: 'Loading...',
                success: (data) => `${data.name} has been created`,
                error: 'Error'
              }
            )
          }}
        >
          Promise
        </Button>
      </div>
    </div>
  )
}
