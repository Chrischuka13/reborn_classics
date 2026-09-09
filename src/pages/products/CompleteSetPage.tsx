import ProductGrid, { type Product } from "./ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByCategory } from "../../api/products";


const CompleteSetPage = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products", "category", "Complete-Set"],
    queryFn: () => fetchProductByCategory("Complete-Set"),
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
      <ProductGrid products={products} />
    </main>
  );
};

export default CompleteSetPage;