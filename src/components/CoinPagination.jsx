import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

export default function CoinPagination({ totalPages, currentPage, onPageChange }) {
  const safePage = Math.min(currentPage, totalPages)
  const activeClass = 'h-10 min-w-10 rounded-[0.35rem] border border-amber-400 bg-amber-400 text-slate-950 hover:bg-amber-400 hover:text-slate-950'
  const inactiveClass = 'h-10 min-w-10 rounded-[0.35rem] border border-zinc-700 bg-zinc-800/90 text-zinc-100 hover:bg-amber-400 hover:text-slate-950'
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={`${inactiveClass}`}
            onClick={(event) => {
              event.preventDefault()
              onPageChange(Math.max(1, safePage - 1))
            }}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={pageNumber === safePage}
              className={pageNumber === safePage ? activeClass : inactiveClass}
              onClick={(event) => {
                event.preventDefault()
                onPageChange(pageNumber)
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={`${inactiveClass}`}
            onClick={(event) => {
              event.preventDefault()
              onPageChange(Math.min(totalPages, safePage + 1))
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
