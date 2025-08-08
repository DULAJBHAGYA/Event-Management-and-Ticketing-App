'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function OrganizerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="cursor-pointer">
              <Image
                src="/assets/images/Logo.png"
                alt="EZTicket Logo"
                width={200}
                height={60}
                className="h-12 w-auto hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <span className="text-white text-lg font-semibold">Dashboard</span>
            <span className="text-white text-lg font-semibold">My Events</span>
            <span className="text-white text-lg font-semibold">Add Event</span>
            <span className="text-white text-lg font-semibold">Analytics</span>
            <span className="text-white text-lg font-semibold">Promotions</span>
            <span className="text-orange-400 text-lg font-semibold">Public Site</span>
          </div>
          
          {/* Desktop User Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-white text-lg font-semibold">John Organizer</span>
            <span className="text-white text-lg font-semibold">Logout</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="cursor-pointer">
            <Image
              src="/assets/images/Logo.png"
              alt="EZTicket Logo"
              width={200}
              height={60}
              className="h-12 w-auto hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/dashboard" className="text-white hover:text-white/80 transition-colors text-lg font-semibold">
            Dashboard
          </Link>
          <Link href="/dashboard/events" className="text-white hover:text-white/80 transition-colors text-lg font-semibold">
            My Events
          </Link>
          <Link href="/dashboard/add-event" className="text-white hover:text-white/80 transition-colors text-lg font-semibold">
            Add Event
          </Link>
          <Link href="/dashboard/analytics" className="text-white hover:text-white/80 transition-colors text-lg font-semibold">
            Analytics
          </Link>
          <Link href="/dashboard/promotions" className="text-white hover:text-white/80 transition-colors text-lg font-semibold">
            Promotions
          </Link>
          <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors text-lg font-semibold">
            Public Site
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

        {/* Desktop User Menu */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="text-white font-semibold">John Organizer</span>
          </div>
          <button className="text-white/80 hover:text-white transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-8 space-y-6">
            <Link 
              href="/dashboard" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/events" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              My Events
            </Link>
            <Link 
              href="/dashboard/add-event" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Event
            </Link>
            <Link 
              href="/dashboard/analytics" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link 
              href="/dashboard/promotions" 
              className="block text-white hover:text-white/80 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Promotions
            </Link>
            <Link 
              href="/" 
              className="block text-orange-400 hover:text-orange-300 transition-colors py-3 text-xl font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Public Site
            </Link>
            <div className="border-t border-white/20 pt-4 mt-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <span className="text-white font-semibold">John Organizer</span>
              </div>
              <button className="block w-full text-white/80 hover:text-white transition-colors py-3 text-xl font-semibold text-left">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 