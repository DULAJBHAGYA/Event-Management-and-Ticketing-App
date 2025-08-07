'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
                 <div className="max-w-7xl mx-auto flex items-center justify-between">
           {/* Logo */}
           <div className="flex items-center space-x-3">
             <Link href="/" className="cursor-pointer">
               <Image
                 src="/assets/images/Logo.png"
                 alt="EZTicket Logo"
                 width={240}
                 height={80}
                 className="h-16 w-auto hover:opacity-80 transition-opacity"
                 priority
               />
             </Link>
           </div>
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            <span className="text-white text-lg xl:text-xl font-semibold">Events</span>
            <span className="text-white text-lg xl:text-xl font-semibold">Venues</span>
            <span className="text-white text-lg xl:text-xl font-semibold">About Us</span>
            <span className="text-white text-lg xl:text-xl font-semibold">Contact</span>
          </div>
                     {/* Desktop Login Button */}
           <Link 
             href="/login"
             className="hidden sm:block border border-white/30 text-white px-6 sm:px-8 py-3 rounded-full text-lg xl:text-xl font-semibold text-center"
           >
             Login / Register
           </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/images/Logo.png"
              alt="EZTicket Logo"
              width={240}
              height={80}
              className="h-16 w-auto hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
          <Link href="/events" className="text-white hover:text-white/80 transition-colors text-lg xl:text-xl font-semibold">
            Events
          </Link>
          <Link href="/venues" className="text-white hover:text-white/80 transition-colors text-lg xl:text-xl font-semibold">
            Venues
          </Link>
          <Link href="/about" className="text-white hover:text-white/80 transition-colors text-lg xl:text-xl font-semibold">
            About Us
          </Link>
          <Link href="/contact" className="text-white hover:text-white/80 transition-colors text-lg xl:text-xl font-semibold">
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Login Button */}
        <Link 
          href="/login"
          className="hidden sm:block border border-white/30 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white/10 transition-colors text-lg xl:text-xl font-semibold text-center"
        >
          Login
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-8 space-y-6">
            <Link 
              href="/events" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/venues" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Venues
            </Link>
            <Link 
              href="/about" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/login"
              className="block w-full border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors mt-6 text-xl font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 