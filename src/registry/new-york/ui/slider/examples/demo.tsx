import { Slider } from '@/components/ui/slider'

// Component
export const SliderDemo = () => {
  // Template
  return <Slider defaultValue={[50]} max={100} step={1} className='max-w-xs' />
}
