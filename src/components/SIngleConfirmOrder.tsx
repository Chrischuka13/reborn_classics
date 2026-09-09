import React, { useState } from "react";

export interface SingleConfirmOrderProps {
  apparel: {
    id: string | number;
    title?: string;
    name?: string;
    price: number | string;
    featuredImage?: string;
    images?: string[] | string;
  };
  size: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  onClose: () => void;
  onConfirm: () => void;
}

export const SingleConfirmOrder: React.FC<SingleConfirmOrderProps> = ({
  apparel,
  size,
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

  const productName = apparel.title || apparel.name || "Product";
  const productImage =
    apparel.featuredImage ||
    (Array.isArray(apparel.images) ? apparel.images[0] : apparel.images) ||
    "/placeholder.jpg";

  const numericPrice =
    typeof apparel.price === "number"
      ? apparel.price
      : parseFloat(String(apparel.price).replace(/[^0-9.-]+/g, "")) || 0;

  const sendToWhatsApp = () => {
    const phoneNumber = "2347087990133";
    const message = `🛒 *NEW ORDER #${orderId}*\n\n👕 *Product:* ${productName}\n📏 *Size:* ${size}\n💰 *Price:* ₦${numericPrice.toLocaleString()}\n\n👤 *Customer:* ${customer.name}\n📞 *Phone:* ${customer.phone}\n📍 *Address:* ${customer.address}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleConfirm = () => {
    sendToWhatsApp();
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Outside Click Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">
              Order #{orderId}
            </span>
            <h2 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
              Confirm Order Summary
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Item Preview Card */}
          <div className="flex gap-4 p-3 bg-gray-50 rounded-none border border-gray-100">
            <img
              src={productImage}
              alt={productName}
              className="w-16 h-20 object-cover bg-gray-200 shrink-0"
            />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                {productName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-medium bg-gray-200 text-gray-800 px-2 py-0.5 rounded-none uppercase">
                  Size: {size}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 mt-2">
                ₦{numericPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="space-y-3 pt-1">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Delivery Details
            </h4>
            
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between pb-1.5 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Customer</span>
                <span className="font-semibold text-gray-900">{customer.name}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Phone Number</span>
                <span className="font-semibold text-gray-900">{customer.phone}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Address</span>
                <span className="font-semibold text-gray-900 text-right max-w-50 truncate">
                  {customer.address}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-[11px] text-gray-400">
                <span>Date</span>
                <span>{orderDate}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Redirect Notice */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 text-xs border border-emerald-100">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>You will be redirected to WhatsApp to complete order routing.</span>
          </div>

        </div>

        {/* Modal Actions */}
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
            <span>Confirm Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SingleConfirmOrder;