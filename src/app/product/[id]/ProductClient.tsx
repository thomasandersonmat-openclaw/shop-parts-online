'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cart';
import { ShoppingCart, Check, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

export function ProductClient({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link href="/search" className="text-blue-600 hover:underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <Link href="/search" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="lg:w-1/2">
          <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
            {product.images && product.images[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-sm font-mono text-gray-500">SKU: {product.sku}</span>
            {product.condition === 'New' && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW OEM</span>
            )}
            {product.condition === 'Rebuilt' && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">REBUILT</span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">{product.name}</h1>
          
          <div className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-3 h-3 rounded-full ${product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-semibold text-gray-900">
                {product.stock_quantity > 0 ? `${product.stock_quantity} available in warehouse` : 'Out of Stock'}
              </span>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${
                added 
                  ? 'bg-green-500 text-white' 
                  : product.stock_quantity === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {added ? (
                <><Check className="w-6 h-6" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="w-6 h-6" /> Add to Cart</>
              )}
            </button>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="bg-gray-50 px-4 py-3 rounded-lg flex justify-between">
                  <dt className="text-gray-500 font-medium">{key}</dt>
                  <dd className="text-gray-900 font-semibold text-right">{String(val)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Fast Freight Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}