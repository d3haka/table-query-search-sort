import { useState, type FC } from "react";
import { useProducts } from "../queries/product";
import { useSearchParams } from "react-router";
import { Pagination } from "../components/pagination";
import { twMerge } from "tailwind-merge";
import { SortArrow } from "../components/sort-arrow";

export const ProductsPage: FC = () => {
  const ITEMS_PER_PAGE = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useProducts();
  let products = data?.data.products;
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  if (!products)
    return <main className="flex items-center justify-center">lodaing...</main>;

  //search filtering
  if (searchParams.get("search")) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchParams.get("search")!.toLowerCase()),
    );
  }

  //price sorting
  let priceQueryParam = searchParams.get("price");
  if (priceQueryParam === "asc") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (priceQueryParam === "desc") {
    products = products.sort((a, b) => b.price - a.price);
  }
  //weight sorting
  priceQueryParam = searchParams.get("weight");
  if (priceQueryParam === "asc") {
    products = products.sort((a, b) => a.weight - b.weight);
  } else if (priceQueryParam === "desc") {
    products = products.sort((a, b) => b.weight - a.weight);
  }
  //id sorting
  priceQueryParam = searchParams.get("id");
  if (priceQueryParam === "asc") {
    products = products.sort((a, b) => a.id - b.id);
  } else if (priceQueryParam === "desc") {
    products = products.sort((a, b) => b.id - a.id);
  }

  const pageCount = Math.max(Math.ceil(products.length / ITEMS_PER_PAGE), 1);
  //pagination filtering
  products = products.filter((_, idx) => {
    if (idx >= (page - 1) * ITEMS_PER_PAGE && idx < page * ITEMS_PER_PAGE) return true;
    return false;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(prevParams => {
      prevParams.set("page", "1");

      if (value) prevParams.set("search", value);
      else prevParams.delete("search");

      return prevParams;
    });
    if (page !== 1) setPage(1);
  };

  const handleSort = (coloum: "price" | "weight" | "id") => {
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
          onChange={handleSearchChange}
          placeholder="Search..."
          className="rounded-md border p-1.5"
        />
        <p className="text-2xl font-bold">محصولات</p>
      </div>

      <div className="min-h-56.25 w-full rounded-lg border">
        <table className="w-full text-center">
          <thead>
            <tr className="font-bold">
              <th onClick={() => handleSort("weight")}>
                <div className="flex items-center justify-center">
                  وزن
                  <SortArrow column="weight" searchParams={searchParams} />
                </div>
              </th>
              <th onClick={() => handleSort("price")}>
                <div className="flex items-center justify-center">
                  قیمت
                  <SortArrow column="price" searchParams={searchParams} />
                </div>
              </th>
              <th onClick={() => handleSort("id")}>
                <div className="flex items-center justify-center">
                  ای‌دی
                  <SortArrow column="id" searchParams={searchParams} />
                </div>
              </th>
              <th>اسم</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr className={twMerge(idx % 2 === 0 && "bg-gray-200")} key={p.id}>
                <td>{p.weight}</td>
                <td>{p.price}</td>
                <td>{p.id}</td>
                <td>{p.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </main>
  );
};
