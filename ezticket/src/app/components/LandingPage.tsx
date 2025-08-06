'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function LandingPage() {
  const [destination, setDestination] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [date, setDate] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/assets/images/background.jpg')",
          }}
        ></div>
        
        {/* Dark overlay for top section (navbar area) */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full text-center">
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                DISCOVER YOUR
                <br />
                DREAM EVENT IN
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  SRI LANKA
                </span>
              </h1>
                             <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-3xl mx-auto mb-8 sm:mb-12 px-4 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                 Discover the next generation event management app that
                 redefines how you experience events across beautiful Sri Lanka.
               </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/assets/images/background.jpg')",
        }}
      ></div>
      
      {/* Dark overlay for top section (navbar area) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent"></div>
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-teal-600/20 to-transparent"></div>
        


        {/* Dotted path - left side */}
        <div className="absolute top-40 left-20 w-64 h-32 sm:top-48 sm:left-48 sm:w-96 sm:h-48">
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 200">
            <path
              d="M 50 100 Q 200 50 350 100"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
          </svg>
        </div>

        {/* Dotted path - right side */}
        <div className="absolute top-60 right-20 w-64 h-32 sm:top-72 sm:right-48 sm:w-96 sm:h-48">
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 200">
            <path
              d="M 50 100 Q 200 150 350 100"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full text-center">
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              DISCOVER YOUR
              <br />
              DREAM EVENT IN
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                SRI LANKA
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-3xl mx-auto mb-8 sm:mb-12 px-4 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Discover the next generation event management app that
              redefines how you experience events across beautiful Sri Lanka.
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-5xl mx-auto mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
              {/* Event Location */}
              <div className="text-left">
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Event Location
                </label>
                <input
                  type="text"
                  placeholder="Colombo, Galle Face"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-base sm:text-lg font-semibold text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
                />
              </div>

              {/* Price Range */}
              <div className="text-left">
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Price Range
                </label>
                <input
                  type="text"
                  placeholder="LKR 2,500 - 25,000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full text-base sm:text-lg font-semibold text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
                />
              </div>

              {/* Date */}
              <div className="text-left">
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Date
                </label>
                <input
                  type="text"
                  placeholder="25 Dec 2024 ▼"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-base sm:text-lg font-semibold text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
                />
              </div>

              {/* Search Button */}
              <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl col-span-1 sm:col-span-2 lg:col-span-1">
                Search Events
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button className="w-full sm:w-auto bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Tickets
            </button>
          </div>
        </div>
      </div>

    </div>
  );
} 