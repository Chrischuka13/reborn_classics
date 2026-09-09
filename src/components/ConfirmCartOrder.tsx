import React, { useState } from "react";
import type { Customer } from "../types";

export interface CartItem {
  id: string | number;
  title?: string;
  name?: string;
  price: number | string;
  size: string;
  quantity: number;
  featuredImage?: string;
  images?: string[] | string;
}

interface ConfirmCartOrderProps {
  cartItems: CartItem[];
  cartTotal: number;
  customer: Customer;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmCartOrder: React.FC<ConfirmCartOrderProps> = ({
  cartItems,
  cartTotal,
  customer,
  onClose,
  onConfirm,
}) => {
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const orderDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const sendToWhatsApp = () => {
    const phoneNumber = "2347087990133";

    const itemsSummary = cartItems
      .map((item) => {
        const title = item.title || item.name || "Product";
        const price = Number(item.price).toLocaleString();
        return `• *${title}* (Size: ${item.size}, Qty: ${item.quantity}) - ₦${price}`;
      })
      .join("\n");

    const message = `🛒 *NEW CART ORDER #${orderId}*\n\n📦 *Items Ordered:*\n${itemsSummary}\n\n💰 *Total Amount:* ₦${cartTotal.toLocaleString()}\n\n👤 *Customer:* ${customer.name}\n📞 *Phone:* ${customer.phone}\n📍 *Address:* ${customer.address}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleConfirm = () => {
    sendToWhatsApp(); 
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">
              Order #{orderId}
            </span>
            <h2 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
              Confirm Cart Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Items Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
          </h4>

          {/* Cart Items List */}
          <div className="space-y-3">
            {cartItems.map((item) => {
              const image =
                item.featuredImage ||
                (Array.isArray(item.images) ? item.images[0] : item.images) ||
                "/placeholder.jpg";
              return (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 p-2 bg-gray-50 border border-gray-100 items-center">
                  <img src={image} alt={item.title || item.name} className="w-12 h-14 object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {item.title || item.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Size: <span className="font-semibold text-black">{item.size}</span> | Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-bold text-gray-900">
                      ₦{(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-2 border-t border-b border-gray-100 font-bold text-sm">
            <span>Total:</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>

          {/* Customer Details */}
          <div className="space-y-2 text-xs text-gray-600 pt-1">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Delivery Details
            </h4>
            <div className="flex justify-between pb-1 border-b border-gray-100">
              <span className="text-gray-400">Customer</span>
              <span className="font-semibold text-gray-900">{customer.name}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-gray-100">
              <span className="text-gray-400">Phone</span>
              <span className="font-semibold text-gray-900">{customer.phone}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-gray-100">
              <span className="text-gray-400">Address</span>
              <span className="font-semibold text-gray-900 truncate max-w-45">
                {customer.address}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-[11px] text-gray-400">
              <span>Date</span>
              <span>{orderDate}</span>
            </div>
          </div>

          {/* WhatsApp Notice */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 text-xs border border-emerald-100">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>You will be redirected to WhatsApp to complete order routing.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-1/2 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition flex items-center justify-center gap-1.5"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCartOrder;