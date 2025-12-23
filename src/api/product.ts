import axios from "axios";
import type { Product } from "../types/product";

type ProductsData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export function getProducts() {
  return axios.get<ProductsData>("https://dummyjson.com/products");
}
