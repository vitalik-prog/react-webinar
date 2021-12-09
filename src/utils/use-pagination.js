import {useMemo} from "react";
import {
  DEFAULT_ACTIVE_PAGE_NUMBER,
  DEFAULT_ITEMS_LIMIT,
  DEFAULT_INCREASE_PAGINATION_PAGES_COUNT,
  DEFAULT_TOTAL_ITEMS_COUNT,
  DEFAULT_DECREASE_PAGINATION_PAGES_COUNT, DEFAULT_PAGES_SKIP
} from "../constants";

export const usePagination = (
  totalItemsCount = DEFAULT_TOTAL_ITEMS_COUNT,
  activePage = DEFAULT_ACTIVE_PAGE_NUMBER
) => {
  let pages = []

  useMemo(() => {
    const totalPagesCount = totalItemsCount / DEFAULT_ITEMS_LIMIT
    let reachedEndOfPagination = false
    let lastPage = activePage + DEFAULT_INCREASE_PAGINATION_PAGES_COUNT
    if (lastPage < totalPagesCount && activePage !== DEFAULT_ACTIVE_PAGE_NUMBER) {
      lastPage = lastPage - DEFAULT_DECREASE_PAGINATION_PAGES_COUNT
    }
    if (lastPage >= totalPagesCount) {
      lastPage = totalPagesCount
      reachedEndOfPagination = true
    }

    let startPage = lastPage - DEFAULT_INCREASE_PAGINATION_PAGES_COUNT
    if (startPage === 0) {
      startPage = activePage
    }

    if (lastPage - DEFAULT_INCREASE_PAGINATION_PAGES_COUNT === activePage && reachedEndOfPagination) {
      startPage = activePage - DEFAULT_PAGES_SKIP
      lastPage = lastPage -  DEFAULT_PAGES_SKIP
    }

    for (let i = startPage; i <= lastPage; i++) {
      pages.push(i)
    }
  }, [totalItemsCount, activePage])

  return pages
}
