import { useState } from "react";

function Pagination({ page, setPage }) {
  const HandleNextBtn = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };
  const HandlePrevBtn = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  return (
    <div className="pagination">
      <button onClick={HandlePrevBtn} className={page === 1 ? "disabled" : ""}>
        Previous
      </button>
      <p className={page === 1 ? "selected" : ""}>1</p>
      <p className={page === 2 ? "selected" : ""}>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
          <p className="selected">{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 9 ? "selected" : ""}>9</p>
      <p className={page === 10 ? "selected" : ""}>10</p>
      <button onClick={HandleNextBtn} className={page === 10 ? "disabled" : ""}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
