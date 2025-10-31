import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

// Component
export const LabelDemo = () => {
  // Template
  return (
    <div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='terms' />
        <Label htmlFor='terms'>Accept terms and conditions</Label>
      </div>
    </div>
  )
}
