import { Bell, RefreshCcwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

// Component
export const EmptyBackground = () => {
  // Template
  return (
    <Empty className='h-full bg-gradient-to-b from-30% from-muted/50 to-background'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up. New notifications will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' size='sm'>
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
