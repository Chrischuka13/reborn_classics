import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products';

export const AddProductForm: React.FC = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  // Setup mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch the product list cache automatically
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // Reset form
      setTitle('');
      setPrice('');
      setFeaturedImage('');
      alert('Product created successfully!');
    },
    onError: (error: Error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !featuredImage) return;

    createMutation.mutate({
      handle: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      price: Number(price),
      featuredImage,
      sizes: ['S', 'M', 'L'],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 border rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Cloudinary Image URL"
        value={featuredImage}
        onChange={(e) => setFeaturedImage(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="w-full bg-black text-white py-2 rounded font-medium disabled:bg-gray-400"
      >
        {createMutation.isPending ? 'Creating Product...' : 'Add Product'}
      </button>
    </form>
  );
};