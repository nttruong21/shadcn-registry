import type { LucideProps } from 'lucide-react'
import React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Component
const TooltipButton = React.memo(
  ({
    Icon,
    label,
    isActive,
    kbd,
    className,
    ...props
  }: {
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    label: string
    isActive?: boolean
    kbd?: string
  } & ButtonProps) => {
    // Template
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className={cn(
              {
                'bg-accent text-accent-foreground': isActive
              },
              className
            )}
            {...props}
          >
            <Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent className='flex items-center gap-1'>
          <span>{label}</span>
          {kbd && <Kbd>{kbd}</Kbd>}
        </TooltipContent>
      </Tooltip>
    )
  }
)

TooltipButton.displayName = 'TooltipButton'
export default TooltipButton
