import React from "react";
import { Link } from "react-router";
import type { Product } from "../../types";

export type { Product };

export interface ProductGridProps {
  products: Product[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const productUrl = `/en-ng/collections/apparel/${product.handle}`;

  return (
    <div className="group relative flex flex-col gap-0 border-none bg-transparent md:py-10">
      {/* Product Image Wrapper */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 ">
        <Link to={productUrl} className="block h-full w-full">
          <img
            onContextMenu={(e) => e.preventDefault()}
            src={product.featuredImage}
            alt={product.title}
            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            loading="lazy"
          />
          {product.hoverImage && (
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={product.hoverImage}
              alt={`${product.title} alternate view`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-col pt-2.5 font-['room',sans-serif]">
        <Link to={productUrl} className="">
          <h3 className="text-[1.25rem] leading-relaxed tracking-tight text-foreground ">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-1 text-[1rem] tracking-widest text-foreground font-medium">
          {product.compareAtPrice ? (
            <div className="flex gap-2">
              <span className="text-red-600">₦{product.price.toLocaleString()}</span>
              <span className="line-through opacity-50">₦{product.compareAtPrice.toLocaleString()}</span>
            </div>
          ) : (
            <span>₦{product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products = [] }) => {
  const productList = Array.isArray(products)
    ? products
    : (products as any)?.products || (products as any)?.data || [];

  if (!productList || productList.length === 0) {
    return (
      <section className="w-full px-10 py-12 text-center text-gray-500">
        <p>No products available.</p>
      </section>
    );
  }

  return (
    <section className="w-full px-10 py-12">
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {productList.map((product: Product) => (
          <ProductCard
            key={product._id || product.id || product.handle}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;