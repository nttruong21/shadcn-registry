import { Spinner } from '@/components/ui/spinner'

// Component
export const SpinnerSize = () => {
  // Template
  return (
    <div className='flex items-center gap-6'>
      <Spinner className='size-4' />
      <Spinner className='size-6' />
      <Spinner className='size-8' />
    </div>
  )
}
