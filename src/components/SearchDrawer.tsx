import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { fetchProducts } from "../api/products";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /*
   * Fetch products
   *
   * No section is passed, so this searches the entire catalog.
   */
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products", "search"],
    queryFn:  fetchProducts,
    staleTime: 5 * 60 * 1000,
    select: (data: any) => (Array.isArray(data) ? data : data?.products || []),
  });

  /*
   * Focus input when drawer opens
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }

    document.body.style.overflow = "auto";
    setQuery("");

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /*
   * ESC closes drawer
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  /*
   * Filter products based on title/name/handle
   */
  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return products.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const handle = product.handle?.toLowerCase() || "";

      return (
        title.includes(search) ||
        handle.includes(search)
      );
    });
  }, [products, query]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="flex w-screen max-w-md flex-col bg-white shadow-2xl">

          {/* Header */}
          <div className="border-b border-gray-200 p-6">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Search Catalog
              </h2>

              <button
                onClick={onClose}
                className="p-1 text-gray-400 transition-colors hover:text-black"
                aria-label="Close search"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex items-center">
              <svg
                className="pointer-events-none absolute left-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-gray-100 py-3 pl-10 pr-16 text-sm font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-xs uppercase tracking-wider text-gray-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-6">

            {/* Loading */}
            {isLoading && (
              <div className="py-12 text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Loading products...
                </p>
              </div>
            )}

            {/* API Error */}
            {isError && (
              <div className="py-12 text-center">
                <p className="text-sm text-red-500">
                  Unable to load products.
                </p>
              </div>
            )}

            {/* Empty search */}
            {!isLoading && !isError && !query.trim() && (
              <div className="py-12 text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Type to search items...
                </p>
              </div>
            )}

            {/* No results */}
            {!isLoading &&
              !isError &&
              query.trim() &&
              filteredProducts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-gray-500">
                    No results found for "{query}"
                  </p>
                </div>
              )}

            {/* Results */}
            {!isLoading &&
              !isError &&
              filteredProducts.length > 0 && (
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Found ({filteredProducts.length})
                  </p>

                  <div className="space-y-4">
                    {filteredProducts.map((product) => {
                      const itemImage =
                        product.featuredImage ||
                        (Array.isArray(product.images)
                          ? product.images[0]
                          : product.images) ||
                        "/placeholder.jpg";

                      return (
                        <Link
                          key={product.id}
                          to={`/en-ng/collections/apparel/${product.handle || product.id}`}
                          onClick={onClose}
                          className="group -mx-2 flex items-center gap-4 rounded p-2 transition hover:bg-gray-50"
                        >
                          <img
                            src={itemImage}
                            alt={product.title || product.handle}
                            className="h-16 w-14 shrink-0 bg-gray-100 object-cover"
                          />

                          <div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:underline">
                              {product.title}
                            </h4>

                            <p className="mt-1 text-xs font-semibold text-gray-500">
                              ₦
                              {Number(product.price).toLocaleString("en-NG")}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
