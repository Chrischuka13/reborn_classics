import {type Products } from "../data/shirtsProducts";

export interface Product {
  _id?: string,
  id: string;
  handle: string;
  title: string;
  price: number | string;
  compareAtPrice?: string;
  featuredImage: string;
  hoverImage?: string;
  images?: string[]; // Gallery array (falls back to featuredImage/hoverImage if empty)
  description?: string;
  status?: string;
  material?: string;
  careInstructions?: string;
  sizes?: string[];
  fit?: string;
  section?: string;
  category?: string;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
}

export interface CategorySummary {
  _id: string;
  category: string;
  image: string;
  totalProducts: number;
}

export interface CartItem extends Products {
  size: string;
  quantity: number;
  name?: string; // Optional alias for legacy components expecting .name
}
export interface CartContextType {
  cartItems: CartItem[];
  // addToCart accepts a item without requiring 'quantity' upfront (defaults to 1)
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
}