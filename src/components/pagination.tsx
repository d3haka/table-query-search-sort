// import { type Dispatch, type SetStateAction, type FC } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import next from "../assets/next-arrow.svg";
import type { FC } from "react";

export const Pagination: FC<{ pageCount: number }> = ({ pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const handlePageChange = (pageNumber: number) => {
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
            className="flex size-8 cursor-pointer items-center justify-center rounded border disabled:opacity-50"
          >
            <img src={next} alt="" className="size-4 rotate-180" />
          </button>
        </li>
        {Array.from({ length: pageCount }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => handlePageChange(i + 1)}
              className={twMerge(
                "size-8 cursor-pointer rounded border",
                page === i + 1 && "bg-slate-400 text-white",
              )}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextClick}
            disabled={page === pageCount}
            className="flex size-8 cursor-pointer items-center justify-center rounded border disabled:opacity-50"
          >
            <img src={next} alt="" className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
