import OnlyWomen from "./OnlyWomen";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { fetchProductsBySection } from "../api/products";


const OnlyWomenPage = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products", "section", "Women"],
    queryFn: () => fetchProductsBySection("Women"),
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
      <OnlyWomen products={products} />
    </main>
  );
};

export default OnlyWomenPage;