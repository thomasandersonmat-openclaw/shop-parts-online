/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/product/ProductCard';
import { Search } from 'lucide-react';

function CategoryContent() {
  const params = useParams();
  const rawCategory = params.category as string;
  // Convert URL friendly "engine-parts" to "Engine Parts"
  const formattedCategory = rawCategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      // Basic match for category
      // In a real app we'd need exact matching or mapping
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('category', `%${formattedCategory.split(' ')[0]}%`); // Simple matching for demo
      
      if (error) {
        console.error('Error fetching products by category:', error);
      } else {
        setProducts(data || []);
      }
      
      setLoading(false);
    }

    if (formattedCategory) {
      fetchProducts();
    }
  }, [formattedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {formattedCategory}
        </h1>
        <p className="text-gray-500 mt-2">
          {loading ? 'Loading category...' : `Showing ${products.length} parts in this category`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white border border-gray-200 rounded-3xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No parts found</h2>
          <p className="text-gray-500">We don&apos;t have any parts in this category right now.</p>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}