import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Pagination(props) {
  return (
    <>
      <div className="items-center flex-wrap justify-center gap-40 custom-pagination">
        <div className="flex items-center gap-10 p-no-margin">
          <BsChevronLeft
            className="cursor-pointer"
            onClick={() => props.previousPage()}
            size={14}
          />
          <p>Page</p>
          <b>{props.page}</b>
          <BsChevronRight
            className="cursor-pointer"
            onClick={() => props.nextPage()}
            size={14}
          />
        </div>
      </div>
    </>
  );
}

export default Pagination;
