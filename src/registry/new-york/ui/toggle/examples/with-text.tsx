import { Italic } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

// Component
export const ToggleWithText = () => {
  // Template
  return (
    <Toggle>
      <Italic />
      <span>Italic</span>
    </Toggle>
  )
}
