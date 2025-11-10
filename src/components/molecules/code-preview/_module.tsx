import { LoaderCircle } from 'lucide-react'
import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/ui'

import { getComponent, type ModuleProps } from './lib'

// Component
export const CodePreviewModule = ({ path, className, children }: ModuleProps) => {
  const Component = getComponent(path)

  // Template
  return (
    <Card className={cn('not-content overflow-hidden p-0', className)}>
      <CardContent className='p-0'>
        <div className='border-b bg-background text-foreground'>
          <div className='component-container flex min-h-96 items-center justify-center p-8'>
            <React.Suspense fallback={<LoaderCircle className='mx-auto animate-spin' />}>
              <Component />
            </React.Suspense>
          </div>
        </div>
        <div className='max-h-96 overflow-auto'>{children}</div>
      </CardContent>
    </Card>
  )
}
