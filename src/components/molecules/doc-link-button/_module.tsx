import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/ui'
import type { ModuleProps } from './lib'

// Component
const DocLinkButton = ({ link, className }: ModuleProps) => {
  // Template
  return (
    <Badge asChild variant='secondary' className={cn('mb-10 no-underline', className)}>
      <a href={link} target='_blank' rel='noreferrer'>
        <span>Docs</span>
        <ArrowUpRight />
      </a>
    </Badge>
  )
}

export default DocLinkButton
