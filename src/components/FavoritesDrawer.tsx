import React from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const { favorites, removeFromFavorites, addToCart } = useCart();

  if (!isOpen) return null;

  const handleMoveToCart = (product: any) => {
    // Uses the first available size or defaults to 'M'
    const defaultSize = product.sizes?.[0] || "M";
    
    addToCart({
      ...product,
      size: defaultSize,
    });
    
    // Remove from favorites once moved to cart
    removeFromFavorites(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold tracking-wide text-gray-900 uppercase">
              Wishlist ({favorites.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Close wishlist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Favorites List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-gray-500 text-sm mb-4">Your wishlist is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest font-medium"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              favorites.map((product) => {
                const itemImage =
                  product.featuredImage ||
                  (Array.isArray(product.images) ? product.images[0] : product.images) ||
                  "/placeholder.jpg";

                const productUrl = `/en-ng/collections/button-shirts/${product.handle || product.id}`;

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 pb-6 border-b border-gray-100 last:border-none"
                  >
                    {/* Product Image */}
                    <Link to={productUrl} onClick={onClose}>
                      <img
                        src={itemImage}
                        alt={product.title || product.name}
                        className="w-20 h-24 object-cover bg-gray-100 flex-shrink-0"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link to={productUrl} onClick={onClose} className="hover:underline">
                            <h3 className="text-sm font-medium text-gray-900 leading-snug">
                              {product.title || product.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeFromFavorites(product.id)}
                            className="text-gray-400 hover:text-red-600 text-xs transition-colors ml-2"
                            title="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs font-semibold text-gray-900 mt-1">
                          ₦{Number(product.price).toLocaleString()}
                        </p>
                      </div>

                      {/* Quick Move to Cart */}
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="mt-3 w-full bg-black text-white py-1.5 text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FavoritesDrawer;