import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

// Component
export const SonnerRichColor = () => {
  // Template
  return (
    <div className='flex flex-wrap gap-2'>
      {/* Success */}
      <Button
        variant='outline'
        onClick={() =>
          toast.success('Event has been created', {
            richColors: true
          })
        }
      >
        Success
      </Button>

      {/* Info */}
      <Button
        variant='outline'
        onClick={() =>
          toast.info('Be at the area 10 minutes before the event time', {
            richColors: true
          })
        }
      >
        Info
      </Button>

      {/* Warning */}
      <Button
        variant='outline'
        onClick={() =>
          toast.warning('Event start time cannot be earlier than 8am', {
            richColors: true
          })
        }
      >
        Warning
      </Button>

      {/* Error */}
      <Button
        variant='outline'
        onClick={() =>
          toast.error('Event has not been created', {
            richColors: true
          })
        }
      >
        Error
      </Button>

      {/* Success button */}
      <Button
        variant='outline'
        onClick={() =>
          toast.success('Event has been created', {
            richColors: true,
            closeButton: true
          })
        }
      >
        Close Button
      </Button>
    </div>
  )
}
