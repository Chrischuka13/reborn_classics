import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Product {
  id: string | number;
  handle?: string;
  title: string;
  name?: string; // Backwards-compatibility alias
  price: number | string;
  compareAtPrice?: string;
  featuredImage?: string;
  hoverImage?: string;
  images?: string[] | string;
  description?: string;
  status?: string;
  material?: string;
  careInstructions?: string;
  sizes?: string[];
  fit?: string;
  section?: string;
}

export interface CartItem extends Product {
  size: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  favorites: Product[];
  totalItems: number;
  cartTotal: number;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string | number, size: string) => void;
  increaseQty: (id: string | number, size: string) => void;
  decreaseQty: (id: string | number, size: string) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  removeFromFavorites: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  // Favorites State
  const [favorites, setFavorites] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync Favorites to LocalStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Scroll lock when cart drawer is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartOpen]);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // Computed Values
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce((acc, item) => {
    const numericPrice =
      typeof item.price === "number"
        ? item.price
        : parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + (isNaN(numericPrice) ? 0 : numericPrice * item.quantity);
  }, 0);

  // Cart Functions
  const addToCart = (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = product.quantity || 1;
    const resolvedTitle = product.title || product.name || "Product";

    const itemToStore: Omit<CartItem, "quantity"> = {
      ...product,
      title: resolvedTitle,
      name: product.name || resolvedTitle,
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }

      return [...prevItems, { ...itemToStore, quantity: qtyToAdd }];
    });

    setCartOpen(true);
  };

  const increaseQty = (id: string | number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: string | number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id: string | number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Favorites Functions
  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (id: string | number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: string | number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        favorites,
        totalItems,
        cartTotal,
        setCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        toggleFavorite,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};