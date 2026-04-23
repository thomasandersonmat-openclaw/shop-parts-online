/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCartStore } from '@/store/cart';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
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

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {product.images && product.images[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.condition === 'New' && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW OEM</span>
          )}
          {product.condition === 'Rebuilt' && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">REBUILT</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-2 font-mono">SKU: {product.sku}</div>
        <Link href={`/product/${product.id}`} className="text-lg font-semibold text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition">
          {product.name}
        </Link>
        
        {/* Specs snippet */}
        <div className="text-sm text-gray-500 mb-4 flex-grow">
          {Object.entries(product.specs || {}).slice(0, 2).map(([key, val]) => (
            <span key={key} className="inline-block mr-3 border-b border-gray-200 pb-0.5">
              <span className="text-gray-400">{key}:</span> {String(val)}
            </span>
          ))}
        </div>

        {/* Footer: Price & Add */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {product.stock_quantity > 0 ? (
              <div className="text-xs text-green-600 font-medium mt-1">In Stock ({product.stock_quantity})</div>
            ) : (
              <div className="text-xs text-red-600 font-medium mt-1">Out of Stock</div>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className={`p-3 rounded-xl transition flex items-center justify-center ${
              added 
                ? 'bg-green-500 text-white' 
                : product.stock_quantity === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-md'
            }`}
          >
            {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}