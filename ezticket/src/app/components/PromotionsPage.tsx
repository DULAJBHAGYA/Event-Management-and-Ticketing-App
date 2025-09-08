'use client';

import { useState } from 'react';
import OrganizerNavbar from './OrganizerNavbar';

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
    originalPrice: 4500,
    discountedPrice: 2250,
    validUntil: '2024-11-20',
    applicableEvents: ['Colombo Music Festival 2024'],
    code: 'FLASH50',
    image: '/assets/images/promotions/flash-sale.jpg',
    featured: true,
    isActive: true,
    usageCount: 23,
    maxUsage: 50
  },
  {
    id: '3',
    title: 'Bundle Deal - Buy 2 Get 1 Free',
    description: 'Purchase 2 tickets and get 1 ticket absolutely free',
    type: 'bundle',
    originalPrice: 7500,
    discountedPrice: 5000,
    validUntil: '2024-12-15',
    applicableEvents: ['Drama Night - Romeo & Juliet'],
    code: 'BUNDLE3',
    image: '/assets/images/promotions/bundle.jpg',
    featured: false,
    isActive: true,
    usageCount: 12,
    maxUsage: 30
  },
  {
    id: '4',
    title: 'VIP Upgrade Discount',
    description: 'Upgrade to VIP tickets with 15% discount',
    type: 'vip',
    discountPercentage: 15,
    originalPrice: 8500,
    discountedPrice: 7225,
    validUntil: '2024-12-10',
    applicableEvents: ['Colombo Music Festival 2024'],
    code: 'VIP15',
    image: '/assets/images/promotions/vip.jpg',
    featured: false,
    isActive: true,
    usageCount: 8,
    maxUsage: 20
  },
  {
    id: '5',
    title: 'Student Discount',
    description: 'Special 25% discount for students with valid ID',
    type: 'discount',
    discountPercentage: 25,
    originalPrice: 2000,
    discountedPrice: 1500,
    validUntil: '2024-12-25',
    applicableEvents: ['Tech Conference 2024', 'Adventure Trek - Ella'],
    code: 'STUDENT25',
    image: '/assets/images/promotions/student.jpg',
    featured: false,
    isActive: false,
    usageCount: 67,
    maxUsage: 200
  }
];

export default function PromotionsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'early-bird': return 'bg-green-500';
      case 'flash-sale': return 'bg-red-500';
      case 'bundle': return 'bg-blue-500';
      case 'vip': return 'bg-purple-500';
      case 'discount': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'early-bird': return 'Early Bird';
      case 'flash-sale': return 'Flash Sale';
      case 'bundle': return 'Bundle Deal';
      case 'vip': return 'VIP Upgrade';
      case 'discount': return 'Discount';
      default: return type;
    }
  };



  const filteredPromotions = samplePromotions.filter(promotion => {
    const matchesType = selectedType === 'all' || promotion.type === selectedType;
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const activePromotions = samplePromotions.filter(p => p.isActive).length;
  const totalUsage = samplePromotions.reduce((sum, p) => sum + p.usageCount, 0);
  const totalRevenue = samplePromotions.reduce((sum, p) => {
    if (p.originalPrice && p.discountedPrice) {
      return sum + (p.originalPrice - p.discountedPrice) * p.usageCount;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <OrganizerNavbar />
      
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Manage Promotions
          </h1>
          <p className="text-white/80 text-lg">
            Create and manage discounts, offers, and special deals for your events
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Active Promotions</p>
                <p className="text-2xl font-bold text-white">{activePromotions}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Usage</p>
                <p className="text-2xl font-bold text-white">{totalUsage}</p>
                <p className="text-white/60 text-sm">Times used</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Revenue Impact</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
                <p className="text-white/60 text-sm">Discounts given</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
              >
                <option value="all">All Types</option>
                <option value="early-bird">Early Bird</option>
                <option value="flash-sale">Flash Sale</option>
                <option value="bundle">Bundle Deal</option>
                <option value="vip">VIP Upgrade</option>
                <option value="discount">Discount</option>
              </select>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
              >
                Create Promotion
              </button>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        <div className="space-y-6">
          {filteredPromotions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/80 text-xl">No promotions found matching your criteria.</p>
            </div>
          ) : (
            filteredPromotions.map((promotion) => (
              <div key={promotion.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Promotion Image */}
                  <div className="lg:w-48 lg:h-32 flex-shrink-0">
                    <div className="w-full h-32 lg:h-full bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Promotion Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{promotion.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getTypeColor(promotion.type)}`}>
                            {getTypeName(promotion.type)}
                          </span>
                          {promotion.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-yellow-500">
                              FEATURED
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${promotion.isActive ? 'bg-green-500' : 'bg-gray-500'}`}>
                            {promotion.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm mb-3">{promotion.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Valid until {formatDate(promotion.validUntil)}
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            {promotion.usageCount} used
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {promotion.applicableEvents.length} events
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {promotion.discountPercentage && (
                          <p className="text-2xl font-bold text-green-400">-{promotion.discountPercentage}%</p>
                        )}
                        {promotion.originalPrice && promotion.discountedPrice && (
                          <p className="text-white/60 text-sm">
                            {formatCurrency(promotion.originalPrice)} → {formatCurrency(promotion.discountedPrice)}
                          </p>
                        )}
                        {promotion.code && (
                          <p className="text-orange-400 font-mono text-sm mt-1">{promotion.code}</p>
                        )}
                      </div>
                    </div>

                    {/* Applicable Events */}
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Applicable Events:</h4>
                      <div className="flex flex-wrap gap-2">
                        {promotion.applicableEvents.map((event, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm">
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => alert('Edit promotion functionality coming soon!')}
                        className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg text-orange-400 font-semibold transition-colors"
                      >
                        Edit Promotion
                      </button>
                      <button
                        onClick={() => alert('View analytics functionality coming soon!')}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 font-semibold transition-colors"
                      >
                        View Analytics
                      </button>
                      <button
                        onClick={() => alert('Toggle active status functionality coming soon!')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          promotion.isActive 
                            ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                            : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                        }`}
                      >
                        {promotion.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => alert('Delete promotion functionality coming soon!')}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Promotion Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Promotion</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Promotion Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Enter promotion title"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Describe your promotion"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Promotion Type</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors">
                      <option value="">Select type</option>
                      <option value="early-bird">Early Bird</option>
                      <option value="flash-sale">Flash Sale</option>
                      <option value="bundle">Bundle Deal</option>
                      <option value="vip">VIP Upgrade</option>
                      <option value="discount">Discount</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Discount Percentage</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="20"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Valid Until</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Promotion Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="EARLY20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Applicable Events</label>
                  <select multiple className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors">
                    <option value="event1">Colombo Music Festival 2024</option>
                    <option value="event2">Tech Conference 2024</option>
                    <option value="event3">Drama Night - Romeo & Juliet</option>
                    <option value="event4">Adventure Trek - Ella</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={() => {
                      alert('Promotion created successfully!');
                      setShowCreateForm(false);
                    }}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300"
                  >
                    Create Promotion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 