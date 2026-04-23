'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems());
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-600 hover:text-black">
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold tracking-tighter text-black">ShopParts</span>
              <span className="text-2xl font-light text-blue-600">Online</span>
            </Link>
          </div>

          {/* Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors"
                placeholder="Search by Part #, Make, Model, or Keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute inset-y-1 right-1 px-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                Find Parts
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <Link href="/account" className="hidden sm:flex flex-col items-center text-gray-500 hover:text-black transition">
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Sign In</span>
            </Link>
            
            <Link href="/cart" className="flex flex-col items-center text-gray-500 hover:text-black transition relative group">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 mb-1" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Only visible on small screens) */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white sm:text-sm"
            placeholder="Search parts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="hidden md:block border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12 items-center text-sm font-medium text-gray-600">
            <Link href="/categories/construction" className="hover:text-black transition">Construction</Link>
            <Link href="/categories/agriculture" className="hover:text-black transition">Agriculture</Link>
            <Link href="/categories/material-handling" className="hover:text-black transition">Material Handling</Link>
            <Link href="/categories/forestry" className="hover:text-black transition">Forestry</Link>
            <Link href="/categories/mining" className="hover:text-black transition">Mining</Link>
            <span className="text-gray-300">|</span>
            <Link href="/search" className="hover:text-black transition text-blue-600">View All Parts</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}