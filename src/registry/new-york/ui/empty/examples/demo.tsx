import { ArrowUpRightIcon, FolderCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

// Component
export const EmptyDemo = () => {
  // Template
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <FolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className='flex gap-2'>
          <Button>Create Project</Button>
          <Button variant='outline'>Import Project</Button>
        </div>

        <Button asChild variant='link' className='text-muted-foreground' size='sm'>
          {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
          <a href='#'>
            <span>Learn More</span>
            <ArrowUpRightIcon />
          </a>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
