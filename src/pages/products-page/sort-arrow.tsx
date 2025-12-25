import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import downArrow from "../../assets/down-arrow.svg";

type SortArrowProps = {
  column: "price" | "weight" | "id";
  searchParams: URLSearchParams;
};

export const SortArrow: FC<SortArrowProps> = ({ column, searchParams }) => {
  const query = searchParams.get("sort") ?? "",
    queryCol = query.split("-")[0],
    type = query.split("-")[1];

  if (queryCol !== column) return;

  return (
    <img
      src={downArrow}
      className={twMerge("size-4", type === "asc" && "rotate-180")}
      alt=""
    />
  );
};
