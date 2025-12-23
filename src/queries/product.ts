import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProducts } from "../api/product";

export const useProducts = (
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProducts>>>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    ...options,
  });
