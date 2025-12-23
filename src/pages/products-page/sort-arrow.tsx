import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import downArrow from "../../assets/down-arrow.svg";

type SortArrowProps = {
  column: "price" | "weight" | "id";
  searchParams: URLSearchParams;
};

export const SortArrow: FC<SortArrowProps> = ({ column, searchParams }) => {
  if (!searchParams.get(column)) return;

  return (
    <img
      src={downArrow}
      className={twMerge("size-4", searchParams.get(column) === "asc" && "rotate-180")}
      alt=""
    />
  );
};
