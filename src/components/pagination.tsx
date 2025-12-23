import { type Dispatch, type SetStateAction, type FC } from "react";
import type { SetURLSearchParams } from "react-router";

interface PaginationProps {
  page: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  pageCount,
  setPage,
  searchParams,
  setSearchParams,
}) => {
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    searchParams.set("page", String(pageNumber));
    setSearchParams(searchParams);
  };

  const handlePrevClick = () => {
    if (page > 1) handlePageChange(page - 1);
  };

  const handleNextClick = () => {
    if (page < pageCount) handlePageChange(page + 1);
  };

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={handlePrevClick}
            disabled={page === 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
        </li>
        {Array.from({ length: pageCount }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => handlePageChange(i + 1)}
              className={`rounded border px-3 py-1 ${
                page === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextClick}
            disabled={page === pageCount}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
