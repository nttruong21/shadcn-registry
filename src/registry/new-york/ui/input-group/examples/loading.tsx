import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'

// Component
export const InputGroupSpinner = () => {
  // Template
  return (
    <div className='grid w-full max-w-sm gap-4'>
      <InputGroup data-disabled>
        <InputGroupInput placeholder='Searching...' disabled />
        <InputGroupAddon align='inline-end'>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder='Processing...' disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder='Saving changes...' disabled />
        <InputGroupAddon align='inline-end'>
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder='Refreshing data...' disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
        <InputGroupAddon align='inline-end'>
          <InputGroupText className='text-muted-foreground'>Please wait...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
