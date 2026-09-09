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

export const JoggersProducts: Product[] = [

]