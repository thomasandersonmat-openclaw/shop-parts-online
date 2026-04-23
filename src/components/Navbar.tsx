"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-gray-200/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-black tracking-tight">
              Ekam
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium transition-colors">About</Link>
            <Link href="/services" className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium transition-colors">Services</Link>
            <Link href="/demos" className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium transition-colors">Demos</Link>
            <Link href="/contact" className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium transition-colors">Contact</Link>
          </div>
          {/* Mobile Menu Button (Visible on Small Screens) */}
          <div className="sm:hidden flex items-center">
            <Link href="/" className="text-gray-500 hover:text-black px-3 py-2 text-sm font-medium transition-colors">Back Home</Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
