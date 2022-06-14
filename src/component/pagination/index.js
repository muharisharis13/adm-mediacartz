import React from 'react'
import { ChevronCompactLeft, ChevronCompactRight } from "@styled-icons/bootstrap"
import ReactPaginate from 'react-paginate';

export const Pagination = ({ totalPage = 5,  handleOnChange,page }) => {
 
  return (
    <ReactPaginate
      previousLabel={<ChevronCompactLeft style={{ width: "20px" }} />}
      nextLabel={< ChevronCompactRight style={{ width: "20px" }} />}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handleOnChange}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination__link"}
      nextLinkClassName={"pagination__link"}
      disabledClassName={"pagination__link--disabled"}
      activeClassName={"pagination__link--active"}
      forcePage={page -1}
    />

  )
}
