import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Customer } from "../types";
import CustomerModal from "./CustomerModal";
import ConfirmCartOrder from "./ConfirmCartOrder";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    cartOpen,
    closeCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
  });

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        {/* Slide-over Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold tracking-wide text-gray-900 uppercase">
              Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemImage =
                  item.featuredImage ||
                  (Array.isArray(item.images) ? item.images[0] : item.images) ||
                  "/placeholder.jpg";

                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 pb-6 border-b border-gray-100 last:border-none"
                  >
                    <img
                      src={itemImage}
                      alt={item.title || item.name}
                      className="w-20 h-24 object-cover bg-gray-100 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-gray-900 leading-snug">
                            {item.title || item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-gray-400 hover:text-red-600 text-xs transition-colors ml-2"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: <span className="font-semibold text-black">{item.size}</span>
                        </p>
                        <p className="text-xs font-semibold text-gray-900 mt-1">
                          ₦{Number(item.price).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => decreaseQty(item.id, item.size)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.id, item.size)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>

              <button
                onClick={() => setShowCustomerModal(true)}
                className="w-full bg-black text-white py-3 text-sm uppercase tracking-widest font-medium hover:bg-neutral-800 transition"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-2 text-xs text-gray-500 hover:text-black py-2 tracking-wider uppercase transition"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Info Modal */}
      {showCustomerModal && (
        <CustomerModal
          customer={customer}
          setCustomer={setCustomer}
          onClose={() => setShowCustomerModal(false)}
          onContinue={() => {
            setShowCustomerModal(false);
            setShowConfirmModal(true);
          }}
        />
      )}

      {/* Multi-item Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmCartOrder
          cartItems={cartItems}
          cartTotal={cartTotal}
          customer={customer}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            clearCart();
            setShowConfirmModal(false);
            closeCart();
          }}
        />
      )}
    </div>
  );
};

export default CartDrawer;