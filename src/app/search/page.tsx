/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/product/ProductCard';
import { Search } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      let dbQuery = supabase.from('products').select('*');
      
      if (query) {
        // Search in both name and sku
        dbQuery = dbQuery.or(`name.ilike.%${query}%,sku.ilike.%${query}%`);
      }
      
      const { data, error } = await dbQuery;
      
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      
      setLoading(false);
    }

    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Search Results for "${query}"` : 'All Machine Parts'}
        </h1>
        <p className="text-gray-500 mt-2">
          {loading ? 'Searching inventory...' : `Showing ${products.length} results`}
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
          <p className="text-gray-500">We couldn&apos;t find any parts matching your search. Try different keywords or part numbers.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}