import React, { useState, type MouseEvent, type ChangeEvent } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../context/CartContext.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import toast from "react-hot-toast";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Product, Customer } from "../../types";
import SingleConfirmOrder from "../../components/SIngleConfirmOrder.tsx";
import { fetchProductByHandle } from "../../api/products";

// ==========================================
// API FETCH FUNCTION
// ==========================================

const sendToWhatsApp = ({
  product,
  size,
  customer,
}: {
  product: Product;
  size: string;
  customer: Customer;
}) => {
  const message = `Order Request:\nItem: ${product.title}\nSize: ${size}\nPrice: ₦${product.price.toLocaleString()}\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
};

// ==========================================
// SUB-COMPONENT 1: IMAGE GALLERY & ZOOM
// ==========================================
const ProductGallery: React.FC<{ images: string[]; title: string }> = ({
  images,
  title,
}) => {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [showZoom, setShowZoom] = useState<boolean>(false);



  const handleMouseMove = (e: MouseEvent<HTMLImageElement>, img: string) => {
    const target = e.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${img})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  return (
    <>
      {/* Mobile Swiper */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-125"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Images Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 space-y-2 space-x-2">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`${title} view ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition duration-500 ease-in-out cursor-crosshair tracking-tight"
                onMouseMove={(e) => handleMouseMove(e, img)}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Zoom Lens Overlay */}
      {showZoom && (
        <div
          className="hidden lg:block fixed top-1/2 -right-40 z-50 w-125 h-125 -translate-x-1/2 -translate-y-1/2 bg-no-repeat bg-cover shadow-xl rounded-lg pointer-events-none"
          style={zoomStyle}
        />
      )}
    </>
  );
};

// ==========================================
// SUB-COMPONENT 2: PRODUCT ACCORDIONS
// ==========================================
const ProductAccordions: React.FC<{ product: Product }> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(true);
  const [showDelivery, setShowDelivery] = useState(false);

  return (
    <div className="mt-12 border-t border-neutral-200 mb-8">
      {/* Product Details Section */}
      <div className="border-b border-neutral-200 cursor-pointer">
        <div
          onClick={() => setShowDescription(!showDescription)}
          className="w-full flex justify-between items-center py-6 group"
        >
          <span className="uppercase tracking-[0.2em] text-neutral-800 font-bold">
            Product Description
          </span>
          <span
            className={`text-3xl transition-transform duration-300 ${showDescription ? "rotate-180" : ""}`}
          >
            +
          </span>
        </div>

        {showDescription && (
          <div className="pb-6 space-y-6 text-sm leading-relaxed text-neutral-600">
            {product.description && (
              <p className="max-w-prose">{product.description}</p>
            )}

            <div className="border-t border-neutral-200" />
            <div className="space-y-2">
              <h4 className="uppercase tracking-[0.15em] text-neutral-900 font-semibold">
                Details & Construction
              </h4>
              {product.section && (
                <p>
                  Section:{" "}
                  <span className="font-medium text-black">
                    {product.section}
                  </span>
                </p>
              )}
              {product.status && (
                <p>
                  Status:{""}{" "}
                  <span
                    className={`font-medium ${product.status.toLowerCase() === "In Stock" ? "bg-green-800 text-white" : "text-black"}`}
                  >
                    {product.status}
                  </span>
                </p>
              )}
              {product.material && (
                <p>
                  Material:{" "}
                  <span className="font-medium text-black">
                    {product.material}
                  </span>
                </p>
              )}
              {product.careInstructions && (
                <p>
                  Care:{" "}
                  <span className="font-medium text-black">
                    {product.careInstructions}
                  </span>
                </p>
              )}
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <>
                <div className="border-t border-neutral-200" />
                <div className="space-y-2">
                  <h4 className="uppercase tracking-[0.15em] text-neutral-900 font-semibold">
                    Size & Fit
                  </h4>
                  <p>Available sizes: {product.sizes.join(", ")}</p>
                  {product.fit && <p>Fit: {product.fit}</p>}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Delivery & Returns Section */}
      <div className="border-b border-neutral-200 cursor-pointer">
        <div
          onClick={() => setShowDelivery(!showDelivery)}
          className="w-full flex justify-between items-center py-6 group"
        >
          <span className="uppercase tracking-[0.2em] text-neutral-800 font-bold">
            Delivery and returns
          </span>
          <span
            className={`text-3xl transition-transform duration-300 ${showDelivery ? "rotate-180" : ""}`}
          >
            +
          </span>
        </div>

        {showDelivery && (
          <div className="pb-6 space-y-4 text-sm leading-relaxed text-neutral-600">
            <h4 className="uppercase tracking-[0.15em] text-neutral-900 font-semibold">
              Free deliveries and returns worldwide
            </h4>
            <p>
              Packages will arrive within 5 business days after order
              confirmation.
            </p>
            <div className="border-t border-neutral-200" />
            <h4 className="uppercase tracking-[0.15em] text-neutral-900 font-semibold">
              Guaranteed returns within first 3 days
            </h4>
            <p>Return your desired item within 3 days of arrival.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT 3: CUSTOMER FORM MODAL
// ==========================================
const CustomerModal: React.FC<{
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  onClose: () => void;
  onContinue: () => void;
}> = ({ customer, setCustomer, onClose, onContinue }) => {
  const [errors, setErrors] = useState<Partial<Customer>>({});

  const validateForm = () => {
    const newErrors: Partial<Customer> = {};

    if (!customer.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(customer.phone)) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onContinue();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Order Details</h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className={`w-full border p-2 mb-1 rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          value={customer.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCustomer({
              ...customer,
              name: e.target.value,
            });

            setErrors({
              ...errors,
              name: undefined,
            });
          }}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>
        )}

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone Number"
          maxLength={11}
          className={`w-full border p-2 mb-1 rounded ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          value={customer.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // Only allow numbers
            const value = e.target.value.replace(/\D/g, "");

            setCustomer({
              ...customer,
              phone: value,
            });

            setErrors({
              ...errors,
              phone: undefined,
            });
          }}
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mb-3">{errors.phone}</p>
        )}

        {/* Address */}
        <input
          type="text"
          placeholder="Delivery Address"
          className={`w-full border p-2 mb-1 rounded ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          value={customer.address}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCustomer({
              ...customer,
              address: e.target.value,
            });

            setErrors({
              ...errors,
              address: undefined,
            });
          }}
        />

        {errors.address && (
          <p className="text-red-500 text-sm mb-3">{errors.address}</p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={validateForm}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const ProductDetails: React.FC = () => {
  const { addToCart } = useCart();
  const { slug } = useParams<{ slug: string }>();

  // Fetch product from MongoDB via TanStack Query
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductByHandle(slug || ""),
    enabled: !!slug,
  });

  const [size, setSize] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
  });
  const { toggleFavorite, isFavorite } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto py-24 text-center">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  // Deduplicate and assemble gallery images from DB fields
  const galleryImages = Array.from(
    new Set(
      [
        product.featuredImage,
        product.hoverImage,
        ...(product.images || []),
      ].filter(Boolean) as string[],
    ),
  );

  const availableSizes = product.sizes || [];

  const handleBookNow = () => {
    if (!size) return toast.error("Please select a size");
    setShowForm(true);
  };

  const handleAddToCart = () => {
    if (!size) return toast.error("Please select a size");
    if (addToCart) addToCart({ ...product, size });
    toast.success("Added to cart");
  };

  return (
    <main>
      <section className="w-11/12 container mx-auto py-24">
        <div className="lg:grid grid-cols-2 gap-10 relative">
          {/* Gallery Sub-Component */}
          <ProductGallery images={galleryImages} title={product.title} />

          {/* Product Details & Purchase Actions */}
          <div>
            <div className="sticky top-20 mt-6 lg:mt-0">
              {product.status && (
                <div className="inline-block bg-black text-white rounded-full px-4 mb-4 text-xs py-1">
                  {product.status}
                </div>
              )}

              <h2 className="text-2xl mb-2 font-semibold uppercase">
                {product.title}
              </h2>

              {/* Price Display (supports compareAtPrice) */}
              <div className="flex items-center gap-3 mb-4">
                <p className="font-medium text-2xl">
                  ₦{Number(product.price).toLocaleString()}
                </p>
                {product.compareAtPrice &&
                  Number(product.compareAtPrice) > Number(product.price) && (
                    <p className="text-neutral-400 line-through text-lg">
                      ₦{Number(product.compareAtPrice).toLocaleString()}
                    </p>
                  )}
              </div>

              {/* Size Selector */}
              {availableSizes.length > 0 && (
                <div className="mb-6">
                  <select
                    className=" border p-3 rounded"
                    value={size}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setSize(e.target.value)
                    }
                  >
                    <option value="">
                      {size ? `Selected: ${size}` : "Choose a size"}
                    </option>
                    {availableSizes.map((s, index) => (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFavorite(product)}
                aria-label={
                  isFavorite(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="absolute right-3 top-3 z-10"
              >
                <svg
                  className={`h-6 w-6 ${
                    isFavorite(product.id)
                      ? "fill-red-600 text-black"
                      : "fill-none text-black"
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                  />
                </svg>
              </button>

              {/* Accordions Sub-Component */}
              <ProductAccordions product={product} />

              {/* Action Buttons */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black font-medium text-white hover:opacity-90 transition mb-3 py-3 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBookNow}
                className="w-full bg-white font-medium text-black border border-neutral-300 hover:bg-neutral-50 transition py-3 rounded"
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>

        {/* Customer Form Modal */}
        {showForm && (
          <CustomerModal
            customer={customer}
            setCustomer={setCustomer}
            onClose={() => setShowForm(false)}
            onContinue={() => {
              if (!customer.name || !customer.phone || !customer.address) {
                return toast.error("Please fill all fields");
              }
              setShowForm(false);
              setShowSummary(true);
            }}
          />
        )}

        {/* Order Confirmation Modal */}
        {showSummary && (
          <SingleConfirmOrder
            apparel={product as any}
            size={size}
            customer={customer}
            onClose={() => setShowSummary(false)}
            onConfirm={() => {
              sendToWhatsApp({ product, size, customer });
              if (addToCart) addToCart({ ...product, size });
              setShowSummary(false);
              setCustomer({ name: "", phone: "", address: "" });
            }}
          />
        )}
      </section>
    </main>
  );
};

export default ProductDetails;
