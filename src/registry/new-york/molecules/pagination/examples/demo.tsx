import React from 'react'
import { Pagination } from '@/components/molecules/pagination'

// Component
export const PaginationDemo = () => {
  // States
  const [page, setPage] = React.useState(1)

  // Template
  return <Pagination page={page} pageCount={10} onChangePage={setPage} />
}
