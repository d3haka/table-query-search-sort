import React, { useState, useEffect } from "react";

interface PaginationProps {
  itemsCount: number;
  itemsPerPage?: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  itemsCount,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(itemsCount / itemsPerPage);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
    onPageChange(1);
  }, [itemsCount, onPageChange]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => handlePageChange(i + 1)}
              className={`rounded border px-3 py-1 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage >= totalPages}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
