// Core
import { ArrowUpRight } from 'lucide-react'

// App
import { cn } from '@/lib/utils'
import { SHADCN_URL } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'

// Internal
import type { ModuleProps } from './lib'

// Component
export const ShadcnLinkButton = ({ registryName, className }: ModuleProps) => {
  // Template
  return (
    <Badge asChild variant='secondary' className={cn('mb-10 no-underline', className)}>
      <a href={`${SHADCN_URL}/${registryName}`} target='_blank' rel='noreferrer'>
        <span>Docs</span>
        <ArrowUpRight />
      </a>
    </Badge>
  )
}
