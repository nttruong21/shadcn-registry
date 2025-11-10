import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SHADCN_URL } from '@/constants/base'
import { cn } from '@/utils/ui'

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
