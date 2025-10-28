// Core
import { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

// App
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

// Internal
import { getComponent, type ModuleProps } from './lib'

// Component
export const CodePreviewModule = ({ path, className, children }: ModuleProps) => {
  const Component = getComponent(path)

  // Template
  return (
    <Card className={cn('not-content overflow-hidden p-0', className)}>
      <CardContent className='p-0'>
        <div className='bg-background text-foreground border-b'>
          <div className='component-container flex min-h-96 items-center justify-center p-8'>
            <Suspense fallback={<LoaderCircle className='mx-auto animate-spin' />}>
              {/* eslint-disable-next-line react-hooks/static-components */}
              <Component />
            </Suspense>
          </div>
        </div>
        <div className='max-h-96 overflow-auto'>{children}</div>
      </CardContent>
    </Card>
  )
}
