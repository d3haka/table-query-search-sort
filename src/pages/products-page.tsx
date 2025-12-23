import { useState, type FC } from "react";
import { useProducts } from "../queries/product";
import { useSearchParams } from "react-router";
import { Pagination } from "../components/pagination";

export const ProductsPage: FC = () => {
  const ITEMS_PER_PAGE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useProducts();
  let products = data?.data.products;
  const [page, setPage] = useState(1);

  if (!products)
    return <main className="flex items-center justify-center">lodaing...</main>;

  //search filtering
  if (searchParams.get("search")) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchParams.get("search")!.toLowerCase()),
    );
  }

  //price sorting
  const priceQueryParam = searchParams.get("price");
  if (priceQueryParam === "asc") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (priceQueryParam === "desc") {
    products = products.sort((a, b) => b.price - a.price);
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
      if (value) prevParams.set("search", value);
      else prevParams.delete("search");

      return prevParams;
    });
  };

  const handleSort = () => {
    setSearchParams(prevParams => {
      const priceQueryParam = searchParams.get("price");
      if (priceQueryParam === null || priceQueryParam === "desc")
        prevParams.set("price", "asc");
      else if (prevParams.get("price") === "asc") prevParams.set("price", "desc");

      return prevParams;
    });
  };

  return (
    <main className="">
      <input
        type="text"
        value={searchParams.get("search") || ""}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="m-2 border p-1.5"
      />
      <button className="ml-4 border" onClick={handleSort}>
        sort
      </button>

      {products.map(p => (
        <li key={p.id}>
          {p.title}---{p.price}
        </li>
      ))}

      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </main>
  );
};
