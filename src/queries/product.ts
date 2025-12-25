import { useSuspenseQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProducts } from "../api/product";

export const useProducts = (
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProducts>>>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    ...options,
  });
