import type { FC } from "react";
import { useProducts } from "../queries/product";

export const ProductsPage: FC = () => {
  const { data } = useProducts();
  if (!data) return <main className="flex items-center justify-center"></main>;
  const products = data.data.products;

  return (
    <main className="">
      {products.map((p) => (
        <li>{p.title}</li>
      ))}
    </main>
  );
};
