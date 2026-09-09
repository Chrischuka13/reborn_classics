import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import ForMen from "./ForMen";
import { fetchProductsBySection } from "../api/products";

const ForMenPage = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products", "section", "Men"],
    queryFn: () => fetchProductsBySection("Men"),
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="loader">
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Error loading products: {(error as Error).message}
      </div>
    );
  }

  return (
    <main>
      <ForMen products={products} />
    </main>
  );
};

export default ForMenPage;