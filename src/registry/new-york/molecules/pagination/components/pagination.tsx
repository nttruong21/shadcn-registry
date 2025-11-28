import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// Pagination
export interface PaginationProps {
  page: number
  pageCount: number
  isHasPreviousPage?: boolean
  isHasNextPage?: boolean
  neighborPageCount?: number
  jumpedPageCount?: number
  onGoToPreviousPage?: () => void
  onGoToNextPage?: () => void
  onChangePage: (page: number) => void
}

export const Pagination = ({
  page,
  pageCount,
  isHasPreviousPage,
  isHasNextPage,
  neighborPageCount = 1,
  jumpedPageCount = 5,
  onChangePage,
  onGoToPreviousPage,
  onGoToNextPage
}: PaginationProps) => {
  // Methods
  // Handle go to previous page
  const handleGoToPreviousPage = () => {
    if (onGoToPreviousPage) {
      return onGoToPreviousPage()
    }
    onChangePage(page - 1)
  }

  // Handle go to next page
  const handleGoToNextPage = () => {
    if (onGoToNextPage) {
      return onGoToNextPage()
    }
    onChangePage(page + 1)
  }

  // Handle jump previous pages
  const handleJumpPreviousPages = () => {
    const newPage = Math.max(1, page - jumpedPageCount)
    onChangePage(newPage)
  }

  // Handle jump next pages
  const handleJumpNextPages = () => {
    const newPage = Math.min(pageCount, page + jumpedPageCount)
    onChangePage(newPage)
  }

  // Memos
  // Displayed pages
  const displayedPages = React.useMemo(() => {
    const result: number[] = []

    if (pageCount <= 3 + neighborPageCount * 2) {
      if (pageCount === 0) {
        result.push(1)
      }

      for (let i = 1; i <= pageCount; i += 1) {
        result.push(i)
      }
    } else {
      let left = Math.max(1, page - neighborPageCount)
      let right = Math.min(page + neighborPageCount, pageCount)

      if (page - 1 <= neighborPageCount) {
        right = 1 + neighborPageCount * 2
      }

      if (pageCount - page <= neighborPageCount) {
        left = pageCount - neighborPageCount * 2
      }

      for (let i = left; i <= right; i += 1) {
        result.push(i)
      }

      if (page - 1 >= neighborPageCount * 2 && page !== 1 + 2) {
        result.unshift(-Infinity)
      }

      if (pageCount - page >= neighborPageCount * 2 && page !== pageCount - 2) {
        result.push(Infinity)
      }

      if (left !== 1) {
        result.unshift(1)
      }

      if (right !== pageCount) {
        result.push(pageCount)
      }
    }

    return result
  }, [neighborPageCount, page, pageCount])

  // Template
  return (
    <div className='flex select-none items-center gap-1'>
      {/* Previous */}
      <Button
        variant='ghost'
        size='icon'
        className='hidden xl:inline-flex'
        disabled={!(isHasPreviousPage || page > 1)}
        onClick={handleGoToPreviousPage}
      >
        <ChevronLeft />
      </Button>

      {displayedPages.map((displayedPage) => {
        // Previous jumping
        if (displayedPage === -Infinity) {
          return (
            <TooltipProvider key={displayedPage} delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' className='group' variant='ghost' onClick={handleJumpPreviousPages}>
                    <MoreHorizontal className='block group-hover:hidden' />
                    <ChevronsLeft className='hidden group-hover:block' />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>{jumpedPageCount} previous pages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        // Next jumping
        if (displayedPage === Infinity) {
          return (
            <TooltipProvider key={displayedPage} delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' className='group' variant='ghost' onClick={handleJumpNextPages}>
                    <MoreHorizontal className='block group-hover:hidden' />
                    <ChevronsRight className='hidden group-hover:block' />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>{jumpedPageCount} next pages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        const isActive = displayedPage === page

        // Page
        return (
          <Button
            key={displayedPage}
            variant={isActive ? 'default' : 'ghost'}
            size={displayedPage > 9999 ? 'default' : 'icon'}
            onClick={() => onChangePage(displayedPage)}
          >
            <span className={cn('z-10 tabular-nums', isActive && 'text-primary-foreground')}>{displayedPage}</span>
          </Button>
        )
      })}

      {/* Next */}
      <Button
        variant='ghost'
        size='icon'
        className='hidden xl:inline-flex'
        disabled={!(isHasNextPage || page < pageCount)}
        onClick={handleGoToNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
