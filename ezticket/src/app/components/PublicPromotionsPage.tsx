'use client';

import { useState } from 'react';
import Navbar from './Navbar';

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'early-bird' | 'bundle' | 'flash-sale' | 'vip';
  discountPercentage?: number;
  originalPrice?: number;
  discountedPrice?: number;
  validUntil: string;
  applicableEvents: string[];
  code?: string;
  image: string;
  featured?: boolean;
  isActive: boolean;
  usageCount: number;
  maxUsage?: number;
  minTickets?: number;
  maxDiscount?: number;
}

const samplePromotions: Promotion[] = [
  {
    id: '1',
    title: 'Early Bird Special',
    description: 'Get 20% off when you book tickets 30 days in advance',
    type: 'early-bird',
    discountPercentage: 20,
    originalPrice: 2500,
    discountedPrice: 2000,
    validUntil: '2024-12-31',
    applicableEvents: ['Colombo Music Festival 2024', 'Tech Conference 2024'],
    code: 'EARLY20',
    image: '/assets/images/promotions/early-bird.jpg',
    featured: true,
    isActive: true,
    usageCount: 45,
    maxUsage: 100
  },
  {
    id: '2',
    title: 'Flash Sale - 50% Off',
    description: 'Limited time offer! 50% off all tickets for the next 24 hours',
    type: 'flash-sale',
    discountPercentage: 50,
    originalPrice: 5000,
    discountedPrice: 2500,
    validUntil: '2024-11-15',
    applicableEvents: ['Drama Night - Romeo & Juliet', 'Adventure Trek - Ella'],
    code: 'FLASH50',
    image: '/assets/images/promotions/flash-sale.jpg',
    featured: true,
    isActive: true,
    usageCount: 23,
    maxUsage: 50
  },
  {
    id: '3',
    title: 'Student Discount',
    description: 'Special 30% discount for students with valid ID',
    type: 'discount',
    discountPercentage: 30,
    originalPrice: 3000,
    discountedPrice: 2100,
    validUntil: '2024-12-31',
    applicableEvents: ['All Events'],
    code: 'STUDENT30',
    image: '/assets/images/promotions/student-discount.jpg',
    featured: false,
    isActive: true,
    usageCount: 78,
    maxUsage: 200
  },
  {
    id: '4',
    title: 'Bundle Deal - 3 Events',
    description: 'Buy tickets for 3 events and get 25% off total price',
    type: 'bundle',
    discountPercentage: 25,
    originalPrice: 9000,
    discountedPrice: 6750,
    validUntil: '2024-12-31',
    applicableEvents: ['Colombo Music Festival 2024', 'Tech Conference 2024', 'Drama Night - Romeo & Juliet'],
    code: 'BUNDLE25',
    image: '/assets/images/promotions/bundle-deal.jpg',
    featured: false,
    isActive: true,
    usageCount: 12,
    maxUsage: 30
  },
  {
    id: '5',
    title: 'VIP Experience Package',
    description: 'Premium VIP package with exclusive access and perks',
    type: 'vip',
    originalPrice: 15000,
    discountedPrice: 12000,
    validUntil: '2024-12-31',
    applicableEvents: ['Colombo Music Festival 2024'],
    code: 'VIP2024',
    image: '/assets/images/promotions/vip-package.jpg',
    featured: true,
    isActive: true,
    usageCount: 8,
    maxUsage: 20
  },
  {
    id: '6',
    title: 'Weekend Special',
    description: '15% off all weekend events',
    type: 'discount',
    discountPercentage: 15,
    originalPrice: 4000,
    discountedPrice: 3400,
    validUntil: '2024-12-31',
    applicableEvents: ['Weekend Events'],
    code: 'WEEKEND15',
    image: '/assets/images/promotions/weekend-special.jpg',
    featured: false,
    isActive: true,
    usageCount: 34,
    maxUsage: 100
  }
];

export default function PublicPromotionsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const promotionTypes = [
    { value: 'all', name: 'All Promotions', count: samplePromotions.length },
    { value: 'early-bird', name: 'Early Bird', count: samplePromotions.filter(p => p.type === 'early-bird').length },
    { value: 'flash-sale', name: 'Flash Sale', count: samplePromotions.filter(p => p.type === 'flash-sale').length },
    { value: 'discount', name: 'Discounts', count: samplePromotions.filter(p => p.type === 'discount').length },
    { value: 'bundle', name: 'Bundles', count: samplePromotions.filter(p => p.type === 'bundle').length },
    { value: 'vip', name: 'VIP', count: samplePromotions.filter(p => p.type === 'vip').length }
  ];

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount: number) => {
    try {
      if (typeof amount !== 'number' || isNaN(amount)) {
        return 'LKR 0';
      }
      return `LKR ${amount.toLocaleString()}`;
    } catch (error) {
      console.error('Error formatting currency:', error);
      return 'LKR 0';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'early-bird': return 'bg-green-500';
      case 'flash-sale': return 'bg-red-500';
      case 'discount': return 'bg-blue-500';
      case 'bundle': return 'bg-purple-500';
      case 'vip': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'early-bird': return 'Early Bird';
      case 'flash-sale': return 'Flash Sale';
      case 'discount': return 'Discount';
      case 'bundle': return 'Bundle';
      case 'vip': return 'VIP';
      default: return type;
    }
  };

  const filteredPromotions = samplePromotions.filter(promotion => {
    const matchesType = selectedType === 'all' || promotion.type === selectedType;
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.applicableEvents.some(event => 
                           event.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesType && matchesSearch && promotion.isActive;
  });

  const featuredPromotions = filteredPromotions.filter(p => p.featured);
  const regularPromotions = filteredPromotions.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Special Promotions
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto">
              Discover amazing deals and discounts on events across Sri Lanka
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 text-xl bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Type Filter */}
              <div className="flex flex-wrap gap-3">
                {promotionTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedType === type.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30'
                    }`}
                  >
                    {type.name} ({type.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Promotions */}
          {featuredPromotions.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Featured Promotions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPromotions.map((promotion) => (
                  <div key={promotion.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getTypeColor(promotion.type)}`}>
                          {getTypeText(promotion.type)}
                        </span>
                      </div>
                      {promotion.discountPercentage && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {promotion.discountPercentage}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                        {promotion.title}
                      </h3>
                      <p className="text-white/80 text-lg mb-4 leading-relaxed">
                        {promotion.description}
                      </p>
                      
                      {/* Pricing */}
                      <div className="flex items-center gap-3 mb-4">
                        {promotion.originalPrice && promotion.discountedPrice && (
                          <>
                            <span className="text-2xl font-bold text-white">
                              {formatCurrency(promotion.discountedPrice)}
                            </span>
                            <span className="text-lg text-white/60 line-through">
                              {formatCurrency(promotion.originalPrice)}
                            </span>
                          </>
                        )}
                        {promotion.originalPrice && !promotion.discountedPrice && (
                          <span className="text-2xl font-bold text-white">
                            {formatCurrency(promotion.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      {/* Code */}
                      {promotion.code && (
                        <div className="bg-white/10 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70 text-sm">Promo Code:</span>
                            <span className="text-white font-mono font-bold text-lg">{promotion.code}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Valid Until */}
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white/70 text-sm">
                          Valid until {formatDate(promotion.validUntil)}
                        </span>
                      </div>
                      
                      {/* Applicable Events */}
                      <div className="mb-6">
                        <p className="text-white/70 text-sm mb-2">Applicable Events:</p>
                        <div className="flex flex-wrap gap-2">
                          {promotion.applicableEvents.slice(0, 2).map((event, index) => (
                            <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                              {event}
                            </span>
                          ))}
                          {promotion.applicableEvents.length > 2 && (
                            <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                              +{promotion.applicableEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Usage Stats */}
                      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                        <span>{promotion.usageCount} used</span>
                        {promotion.maxUsage && (
                          <span>{promotion.maxUsage - promotion.usageCount} remaining</span>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Using promotion:', promotion.code || promotion.title);
                          // TODO: Implement promotion usage logic
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                      >
                        Use This Promotion
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Promotions */}
          {regularPromotions.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                All Promotions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPromotions.map((promotion) => (
                  <div key={promotion.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getTypeColor(promotion.type)}`}>
                          {getTypeText(promotion.type)}
                        </span>
                      </div>
                      {promotion.discountPercentage && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {promotion.discountPercentage}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                        {promotion.title}
                      </h3>
                      <p className="text-white/80 text-lg mb-4 leading-relaxed">
                        {promotion.description}
                      </p>
                      
                      {/* Pricing */}
                      <div className="flex items-center gap-3 mb-4">
                        {promotion.originalPrice && promotion.discountedPrice && (
                          <>
                            <span className="text-2xl font-bold text-white">
                              {formatCurrency(promotion.discountedPrice)}
                            </span>
                            <span className="text-lg text-white/60 line-through">
                              {formatCurrency(promotion.originalPrice)}
                            </span>
                          </>
                        )}
                        {promotion.originalPrice && !promotion.discountedPrice && (
                          <span className="text-2xl font-bold text-white">
                            {formatCurrency(promotion.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      {/* Code */}
                      {promotion.code && (
                        <div className="bg-white/10 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70 text-sm">Promo Code:</span>
                            <span className="text-white font-mono font-bold text-lg">{promotion.code}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Valid Until */}
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white/70 text-sm">
                          Valid until {formatDate(promotion.validUntil)}
                        </span>
                      </div>
                      
                      {/* Applicable Events */}
                      <div className="mb-6">
                        <p className="text-white/70 text-sm mb-2">Applicable Events:</p>
                        <div className="flex flex-wrap gap-2">
                          {promotion.applicableEvents.slice(0, 2).map((event, index) => (
                            <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                              {event}
                            </span>
                          ))}
                          {promotion.applicableEvents.length > 2 && (
                            <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                              +{promotion.applicableEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Usage Stats */}
                      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                        <span>{promotion.usageCount} used</span>
                        {promotion.maxUsage && (
                          <span>{promotion.maxUsage - promotion.usageCount} remaining</span>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Using promotion:', promotion.code || promotion.title);
                          // TODO: Implement promotion usage logic
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
                      >
                        Use This Promotion
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredPromotions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Promotions Found</h3>
              <p className="text-white/70 text-lg mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
