import { EllipsisVertical } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Component
export const DataTableActionCell = ({
  menus,
  isLoading
}: {
  menus: Array<{
    id: string
    icon?: React.ReactNode
    label?: React.ReactNode
    slot?: React.ReactNode
    link?: string
    onClick?: () => void
  }>
  isLoading?: boolean
}) => {
  // Template
  if (menus.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' isLoading={isLoading}>
          <EllipsisVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {menus.map((menu) => {
          if (menu.slot) {
            return <React.Fragment key={menu.id}>{menu.slot}</React.Fragment>
          }

          if (menu.link) {
            return (
              <DropdownMenuItem key={menu.id} asChild>
                <a href={menu.link}>
                  {menu.icon}
                  {menu.label}
                </a>
              </DropdownMenuItem>
            )
          }

          return (
            <DropdownMenuItem key={menu.id} onClick={menu.onClick}>
              {menu.icon}
              {menu.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
