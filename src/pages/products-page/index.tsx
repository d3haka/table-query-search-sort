import { type FC } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { useProducts } from "../../queries/product";
import { SortArrow } from "./sort-arrow";
import { Pagination } from "../../components/pagination";

export const ProductsPage: FC = () => {
  const ITEMS_PER_PAGE = 8;
  const { data } = useProducts();
  let products = data?.data.products;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  if (!products)
    return (
      <main className="flex h-screen w-screen items-center justify-center">lodaing...</main>
    );

  if (searchParams.has("search")) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchParams.get("search")!.toLowerCase()),
    );
  }

  if (searchParams.has("sort")) {
    const query = searchParams.get("sort") ?? "",
      column = query.split("-")[0],
      type = query.split("-")[1];

    if (column === "price") {
      products = products.sort((a, b) => a.price - b.price);
      if (type === "desc") products.reverse();
    } else if (column === "weight") {
      products = products.sort((a, b) => a.weight - b.weight);
      if (type === "desc") products.reverse();
    } else if (column === "id") {
      products = products.sort((a, b) => a.id - b.id);
      if (type === "desc") products.reverse();
    }
  }

  const pageCount = Math.max(Math.ceil(products.length / ITEMS_PER_PAGE), 1);
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
  };

  const handleSortQuery = (coloum: "price" | "weight" | "id") => {
    setSearchParams(prevParams => {
      const query = prevParams.get("sort") ?? "",
        queryCol = query.split("-")[0],
        type = query.split("-")[1];

      if (queryCol === coloum && type === "asc") prevParams.set("sort", `${coloum}-desc`);
      else prevParams.set("sort", `${coloum}-asc`);

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

      <div className="min-h-108 w-full rounded border">
        <table className="w-full text-center">
          <thead>
            <tr className="font-bold">
              <th onClick={() => handleSortQuery("weight")}>
                <div className="flex h-10 cursor-pointer items-center justify-center hover:bg-slate-200">
                  <span className="pr-1">وزن</span>
                  <SortArrow column="weight" searchParams={searchParams} />
                </div>
              </th>
              <th onClick={() => handleSortQuery("price")}>
                <div className="flex h-10 cursor-pointer items-center justify-center hover:bg-slate-200">
                  <span className="pr-1">قیمت</span>
                  <SortArrow column="price" searchParams={searchParams} />
                </div>
              </th>
              <th onClick={() => handleSortQuery("id")}>
                <div className="flex h-10 cursor-pointer items-center justify-center hover:bg-slate-200">
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
                <td className="w-1/5">
                  <div className="flex min-h-12 items-center justify-center">
                    {p.weight}
                  </div>
                </td>
                <td className="w-1/5">
                  <div className="flex min-h-12 items-center justify-center">{p.price}</div>
                </td>
                <td className="w-1/5">
                  <div className="flex min-h-12 items-center justify-center">{p.id}</div>
                </td>
                <td className="w-2/5">
                  <div className="flex min-h-12 items-center justify-center">{p.title}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pageCount={pageCount} />
    </main>
  );
};
