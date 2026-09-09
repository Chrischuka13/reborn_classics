import type { CategorySummary,Product } from '../types';

export interface PaginatedProductsResponse {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
}

const BASE_URL = 'http://localhost:4000/api';


// Fetch paginated products from the API
export const fetchPaginatedProducts = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<PaginatedProductsResponse> => {
  const res = await fetch(`${BASE_URL}/products?page=${pageParam}&limit=8`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};


// Create Product
export const createProduct = async (newProduct: Omit<Product, 'id'>): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
};


// Update Product
export const updateProduct = async ({
  handle,
  data,
}: {
  handle: string;
  data: Partial<Product>;
}): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${handle}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
};


// Fetch distinct categories for Shop Collections page
export const fetchCategories = async (): Promise<CategorySummary[]> => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
};


//fetchbycategory
export const fetchProductsByCategory = async (
  category: string,
  page = 1,
  limit = 8
): Promise<PaginatedProductsResponse> => {
  const params = new URLSearchParams({
    category,
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${BASE_URL}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }

  return response.json();
};


//fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};
// export const fetchProducts = async (): Promise<Product[]> => {
//   const response = await fetch(`${BASE_URL}/products`);
//   const data = await response.json();
  
//   // Return the inner products array if paginated object, otherwise return data directly
//   return Array.isArray(data) ? data : data.products || [];
// };

// Fetch a single product by handle
export const fetchProductByHandle = async (handle: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${handle}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${handle}`);
  }
  return res.json();
};

// Fetch a single product by section
export const fetchProductsBySection = async (section?: string): Promise<Product[]> => {
  const url = section
    ? `${BASE_URL}/products?section=${encodeURIComponent(section)}`
    : `${BASE_URL}/products`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

// Fetch products by category
export const fetchProductByCategory = async (categoryName?: string): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products?category=${encodeURIComponent(categoryName)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};