import { Minus, Plus } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

// Component
export const DrawerDemo = () => {
  // States
  const [goal, setGoal] = React.useState(350)

  // Methods
  // Click
  const click = (adjustment: number) => {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <div className='flex items-center justify-center space-x-2'>
              <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => click(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className='sr-only'>Decrease</span>
              </Button>
              <div className='flex-1 text-center'>
                <div className='font-bold text-7xl tracking-tighter'>{goal}</div>
                <div className='text-[0.70rem] text-muted-foreground uppercase'>Calories/day</div>
              </div>
              <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => click(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className='sr-only'>Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
