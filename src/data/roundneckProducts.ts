export interface Product {
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
}

export const RoundneckProducts: Product[] = [
    {
        id: "fg-8-roundneck-shirt",
        handle: "fg-8-roundneck-shirt",
        title: "Classic Black Roundneck Shirt",
        price: 29.99,
        featuredImage: "https://example.com/roundneck-shirt.jpg"
    }
]