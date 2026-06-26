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

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="h-10 rounded-[0.35rem] border border-amber-400/60 bg-amber-400 text-slate-950 hover:bg-amber-300"
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
              className={pageNumber === safePage ? 'h-10 min-w-10 rounded-[0.35rem] border border-amber-400 bg-amber-400 text-slate-950 hover:bg-amber-300' : 'h-10 min-w-10 rounded-[0.35rem] border border-amber-400/60 bg-slate-900 text-amber-100 hover:bg-amber-200 hover:text-slate-950'}
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
            className="h-10 rounded-[0.35rem] border border-amber-400/60 bg-amber-400 text-slate-950 hover:bg-amber-300"
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
