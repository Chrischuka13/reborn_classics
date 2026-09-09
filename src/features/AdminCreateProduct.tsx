import React, { useState } from "react";

export interface NewProduct {
  title: string;
  price: number | string;
  category: string;
  description: string;
  sizes: string[];
  images: string[];
  featuredImage: string;
  inStock: boolean;
}

interface AdminCreateProductProps {
  onSave?: (product: NewProduct) => void | Promise<void>;
  onClose?: () => void;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"];

export const AdminCreateProduct: React.FC<AdminCreateProductProps> = ({
  onSave,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const [formData, setFormData] = useState<NewProduct>({
    title: "",
    price: "",
    category: CATEGORIES[0],
    description: "",
    sizes: ["S", "M", "L"],
    images: [],
    featuredImage: "",
    inStock: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
  };

  const addImage = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => {
      const updatedImages = [...prev.images, imageUrlInput.trim()];
      return {
        ...prev,
        images: updatedImages,
        featuredImage: prev.featuredImage || imageUrlInput.trim(),
      };
    });
    setImageUrlInput("");
  };

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const updated = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: updated,
        featuredImage: updated[0] || "",
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please provide at least a title and price.");
      return;
    }

    setLoading(true);
    try {
      if (onSave) {
        await onSave(formData);
      } else {
        // Example API Call:
        // await fetch('/api/products', { method: 'POST', body: JSON.stringify(formData) })
        console.log("Saving Product:", formData);
      }
      alert("Product created successfully!");
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to create product:", err);
      alert("Error saving product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100 pt-24">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">
            Admin Management
          </span>
          <h1 className="text-xl font-bold uppercase tracking-wide text-gray-900">
            Create New Product
          </h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
          {/* Title & Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Oversized Heavyweight Tee"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Price (₦) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="25000"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-black"
                />
                In Stock & Available
              </label>
            </div>
          </div>

          {/* Size Multi-Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 text-xs font-semibold border transition ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image URLs Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
              Product Images (URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition"
              >
                Add Image
              </button>
            </div>

            {/* Added Images List */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-16 h-20 border ${
                      formData.featuredImage === img ? "border-black ring-1 ring-black" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe fit, fabric weight, composition, and care instructions..."
              className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-gray-100 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition disabled:opacity-50"
            >
              {loading ? "Saving Product..." : "Create & Publish Product"}
            </button>
          </div>
        </form>

        {/* Right Column: Live Card Preview */}
        <div className="lg:col-span-5 bg-gray-50 p-6 border border-gray-100 rounded flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Live Storefront Preview
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border ${
                  formData.inStock
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {formData.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Product Card Component */}
            <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative aspect-3/4 bg-gray-100">
                {formData.featuredImage ? (
                  <img
                    src={formData.featuredImage}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs uppercase tracking-wider">
                    <svg
                      className="w-8 h-8 mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    No Image Added
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                  {formData.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                  {formData.title || "Product Title"}
                </h3>
                <p className="text-sm font-bold text-gray-900">
                  ₦{formData.price ? Number(formData.price).toLocaleString() : "0"}
                </p>

                {/* Available Sizes Indicator */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Sizes:</span>
                  <span className="font-semibold text-black">
                    {formData.sizes.length > 0 ? formData.sizes.join(", ") : "None"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Preview */}
            <div className="mt-4 p-3 bg-white border border-gray-200 rounded text-xs text-gray-600">
              <span className="font-semibold text-gray-900 block mb-1 uppercase text-[10px] tracking-wider">
                Description:
              </span>
              <p className="line-clamp-3 italic">
                {formData.description || "No description provided yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateProduct;