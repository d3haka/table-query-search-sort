import { useState, type FC } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { useProducts } from "../../queries/product";
import { SortArrow } from "./sort-arrow";
import { Pagination } from "../../components/pagination";

export const ProductsPage: FC = () => {
  const ITEMS_PER_PAGE = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useProducts();
  let products = data?.data.products;
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  if (!products)
    return (
      <main className="flex h-screen w-screen items-center justify-center">lodaing...</main>
    );

  //search filtering
  if (searchParams.get("search")) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchParams.get("search")!.toLowerCase()),
    );
  }

  //price sorting
  if (searchParams.has("price")) {
    products = products.sort((a, b) => a.price - b.price);
    if (searchParams.get("price") === "desc") products.reverse();
  }
  //weight sorting
  if (searchParams.has("weight")) {
    products = products.sort((a, b) => a.weight - b.weight);
    if (searchParams.get("weight") === "desc") products.reverse();
  }
  //id sorting
  if (searchParams.has("id")) {
    products = products.sort((a, b) => a.id - b.id);
    if (searchParams.get("id") === "desc") products.reverse();
  }

  const pageCount = Math.max(Math.ceil(products.length / ITEMS_PER_PAGE), 1);
  //pagination filtering
  products = products.filter((_, idx) => {
    if (idx >= (page - 1) * ITEMS_PER_PAGE && idx < page * ITEMS_PER_PAGE) return true;
    return false;
  });

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(prevParams => {
      prevParams.set("page", "1");

      if (value) prevParams.set("search", value);
      else prevParams.delete("search");

      return prevParams;
    });
    if (page !== 1) setPage(1);
  };

  const handleSortQuery = (coloum: "price" | "weight" | "id") => {
    setSearchParams(prevParams => {
      if (coloum !== "price") prevParams.delete("price");
      if (coloum !== "weight") prevParams.delete("weight");
      if (coloum !== "id") prevParams.delete("id");

      const quryVal = prevParams.get(coloum);
      if (quryVal === null || quryVal === "desc") prevParams.set(coloum, "asc");
      else if (quryVal === "asc") prevParams.set(coloum, "desc");

      return prevParams;
    });
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center gap-2.5 px-52 pt-6">
      <div className="flex w-full items-center justify-between">
        <input
          type="text"
          value={searchParams.get("search") || ""}
          onChange={handleSearchQuery}
          placeholder="Search..."
          className="rounded border p-1.5"
        />
        <p className="text-2xl font-bold">محصولات</p>
      </div>

      <div className="min-h-56.25 w-full rounded border">
        <table className="w-full text-center">
          <thead>
            <tr className="font-bold">
              <th onClick={() => handleSortQuery("weight")}>
                <div className="flex cursor-pointer items-center justify-center hover:bg-slate-200">
                  <span className="pr-1">وزن</span>
                  <SortArrow column="weight" searchParams={searchParams} />
                </div>
              </th>
              <th onClick={() => handleSortQuery("price")}>
                <div className="flex cursor-pointer items-center justify-center hover:bg-slate-200">
                  <span className="pr-1">قیمت</span>
                  <SortArrow column="price" searchParams={searchParams} />
                </div>
              </th>
              <th onClick={() => handleSortQuery("id")}>
                <div className="flex cursor-pointer items-center justify-center hover:bg-slate-200">
                  <span className="pr-1">ای‌دی</span>
                  <SortArrow column="id" searchParams={searchParams} />
                </div>
              </th>
              <th>اسم</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr className={twMerge(idx % 2 === 0 && "bg-slate-200")} key={p.id}>
                <td className="w-1/5">{p.weight}</td>
                <td className="w-1/5">{p.price}</td>
                <td className="w-1/5">{p.id}</td>
                <td className="w-2/5">{p.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </main>
  );
};
