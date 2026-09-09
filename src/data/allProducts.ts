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

export const AllProducts: Product[] = [
  { 
    id: "fg-8-button-shirt", 
    handle: "fg-8-button-shirt", 
    title: "Autumn Blue Button Shirt", 
    price: 2500, 
    compareAtPrice: "2800",
    featuredImage: "/images/download (38).jpg", 
    hoverImage: "/images/download (31).jpg",
    images: [
      "/images/download (38).jpg",
      "/images/download (31).jpg",
      "/images/pexels-ali-drabo-10956272-13903588.jpg"

    ],
    description: "A stylish blue button shirt perfect for autumn wear.",
    status: "In Stock",
    material: "Cotton Blend",
    careInstructions: "Machine wash cold, tumble dry low.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Regular Fit",
    section: "Men",
  },

  { 
    id: "fg-10-button-shirt", 
    handle: "fg-10-button-shirt", 
    title: "Autumn Red Button Shirt", 
    price: 3000, 
    compareAtPrice: "2800",
    featuredImage: "/images/download (38).jpg", 
    hoverImage: "/images/download (31).jpg",
    images: [
      "/images/download (38).jpg",
      "/images/download (31).jpg",
      "/images/pexels-ali-drabo-10956272-13903588.jpg"

    ],
    description: "A stylish blue button shirt perfect for autumn wear.",
    status: "In Stock",
    material: "Cotton Blend",
    careInstructions: "Machine wash cold, tumble dry low.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Regular Fit",
    section: "Men",
  },

  { 
    id: "fg-12-button-shirt", 
    handle: "fg-12-button-shirt", 
    title: "Autumn White Button Shirt", 
    price: 2500, 
    compareAtPrice: "3000",
    featuredImage: "/images/download (38).jpg", 
    hoverImage: "/images/download (31).jpg",
    images: [
      "/images/download (38).jpg",
      "/images/download (31).jpg",
      "/images/pexels-ali-drabo-10956272-13903588.jpg"

    ],
    description: "A stylish blue button shirt perfect for autumn wear.",
    status: "In Stock",
    material: "Cotton Blend",
    careInstructions: "Machine wash cold, tumble dry low.",
    sizes: ["S", "M", "L", "XL"],
    fit: "Regular Fit",
    section: "Women",
  },
]