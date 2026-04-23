/* eslint-disable @next/next/no-img-element */
'use client';

import { useCartStore } from '@/store/cart';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you have not added any parts to your cart yet. Let&apos;s get your fleet back up and running.</p>
        <Link href="/search" className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition">
          Browse Parts Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              
              <div className="flex flex-col flex-grow justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-500 font-medium">Qty:</label>
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-200 rounded-l-lg transition"
                      >-</button>
                      <span className="px-3 py-1 text-sm font-semibold bg-white border-x border-gray-200 min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-200 rounded-r-lg transition"
                      >+</button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sticky top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${totalPrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-gray-500 text-sm">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="text-gray-500 text-sm">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Estimated Total</span>
                <span className="text-2xl font-bold text-gray-900">${totalPrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="mt-4 flex justify-center gap-2">
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=Visa" alt="Visa" className="rounded" />
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=MC" alt="Mastercard" className="rounded" />
              <img src="https://placehold.co/40x25/e2e8f0/64748b?text=Amex" alt="Amex" className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}