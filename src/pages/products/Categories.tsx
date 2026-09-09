// import React from "react";
// import { Link } from "react-router";
// import type { Product } from "../../types";

// export {type Product}

// export interface CategoryProps {
//   products?: Product[];
// }


// // const categories: Category[] = [
// //   { 
// //     id: 1, 
// //     name: "Button-Shirts", 
// //     count: "4 items",
// //     imageUrl: "/images/Short Sleeve Shirts.jpg", 
// //     bgColor: "bg-[#e6e3dc]", 
// //     link: "/en-ng/collections/button-shirts" // 2. Added navigation paths
// //   },
// // ];

// const ProductCard: React.FC<{product: Product}> = ({product}) => {
//   return (
//     <section className="w-full py-20 px-8 max-w-350 mx-auto bg-neutral-100">
//       {/* Header Area */}
//       <div className="flex justify-between items-end mb-8">
//         <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
//           Shop by Category
//         </h2>
//         <Link 
//           to="/collections" 
//           className="text-sm font-medium underline underline-offset-4 hover:text-gray-600"
//         >
//           View All
//         </Link>
//       </div>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
//         <Link
//           to={`/en-ng/collections/${product.handle}`}
//           className="group relative flex flex-col gap-0 border-none bg-transparent"
//         >
//           <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
//             <img
//               src={product.featuredImage}
//               alt={product.title}
//               className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
//             />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mt-2">
//             {product.title}
//           </h3>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export const Categories: React.FC<CategoryProps> = ({ products = [] }) => {
//   const productList = Array.isArray(products)
//     ? products
//     : (products as any)?.products || (products as any)?.data || [];

//   if (!productList || productList.length === 0) {
//     return (
//       <section className="w-full px-10 py-12 text-center text-gray-500">
//         <p>No products available.</p>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full px-10 py-12">
//       <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
//           {productList.map((product: Product) => (
//           <ProductCard
//             key={product._id || product.id || product.handle}
//             product={product}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Categories;

import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../api/products';
import type { CategorySummary } from '../../types';

export const CollectionsPage: React.FC = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery<CategorySummary[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div className="loader">

    </div>;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500 font-medium">
        {error instanceof Error ? error.message : 'Failed to load categories'}
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-16 md:py-24">
      <h1 className="text-3xl tracking-tight text-gray-900 mb-8 text-center md:text-left">
        Shop by Collections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((item) => (
          <Link
            key={item._id}
            to={`/en-ng/collections/${encodeURIComponent(item.category.toLowerCase())}`}
            className="group relative block overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-200 md:group-hover:scale-105">
              <img
                src={item.image}
                alt={item.category}
                className="h-full w-full object-cover object-center md:group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity " />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold capitalize">{item.category}</h2>
              <p className="text-sm font-medium text-gray-200 mt-1">
                {item.totalProducts} {item.totalProducts === 1 ? 'Product' : 'Products'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;