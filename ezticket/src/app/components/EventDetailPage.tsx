'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  availableTickets: number;
  benefits: string[];
  popular?: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  location: string;
  address: string;
  date: string;
  time: string;
  duration: string;
  organizer: string;
  organizerContact: string;
  ticketTypes: TicketType[];
  highlights: string[];
  terms: string[];
  featured?: boolean;
}

const eventData: Event = {
  id: '1',
  title: 'Colombo Music Festival 2024',
  description: 'Experience the biggest music festival in Sri Lanka with international and local artists.',
  longDescription: 'Join us for the most spectacular music festival in Sri Lanka! This year\'s event features an incredible lineup of international and local artists, spanning multiple genres from rock and pop to traditional Sri Lankan music. Experience world-class performances under the stars at the beautiful Galle Face Green, with stunning ocean views and perfect weather. The festival includes multiple stages, food courts, art installations, and interactive experiences. Don\'t miss this unforgettable celebration of music and culture!',
  category: 'Music',
  image: '/assets/images/events/music-festival.jpg',
  location: 'Galle Face Green, Colombo',
  address: 'Galle Face Green, Colombo 03, Sri Lanka',
  date: '2024-12-15',
  time: '18:00',
  duration: '8 hours',
  organizer: 'Colombo Events Ltd',
  organizerContact: '+94 11 234 5678',
  ticketTypes: [
    {
      id: 'general',
      name: 'General Admission',
      description: 'Standard festival access with standing area',
      price: 2500,
      originalPrice: 3000,
      availableTickets: 500,
      benefits: ['Access to all stages', 'Food court access', 'Restroom facilities', 'Security services']
    },
    {
      id: 'premium',
      name: 'Premium Seating',
      description: 'Reserved seating with better views',
      price: 4500,
      originalPrice: 5500,
      availableTickets: 200,
      benefits: ['Reserved seating', 'Better stage views', 'Complimentary refreshments', 'Priority access', 'Dedicated restrooms'],
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      description: 'Exclusive VIP area with premium amenities',
      price: 8500,
      originalPrice: 10000,
      availableTickets: 50,
      benefits: ['Exclusive VIP area', 'Premium seating', 'Complimentary food & drinks', 'Meet & greet opportunities', 'Dedicated staff', 'Premium parking']
    }
  ],
  highlights: [
    'International and local artists',
    'Multiple stages and genres',
    'Food courts with local cuisine',
    'Art installations and interactive experiences',
    'Stunning ocean views',
    'Professional sound and lighting'
  ],
  terms: [
    'No outside food or beverages',
    'No professional cameras',
    'No smoking in designated areas',
    'Valid ID required for entry',
    'No refunds or exchanges',
    'Event subject to weather conditions'
  ],
  featured: true
};

export default function EventDetailPage() {
  const [selectedTicketType, setSelectedTicketType] = useState<string>('');
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const selectedTicket = eventData.ticketTypes.find(ticket => ticket.id === selectedTicketType);
  const totalPrice = selectedTicket ? selectedTicket.price * ticketQuantity : 0;
  const totalOriginalPrice = selectedTicket && selectedTicket.originalPrice ? selectedTicket.originalPrice * ticketQuantity : 0;
  const discount = totalOriginalPrice - totalPrice;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    return `LKR ${price.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    if (!selectedTicketType) {
      alert('Please select a ticket type');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Added to cart successfully!');
    }, 1000);
  };

  const handleCheckout = () => {
    if (!selectedTicketType) {
      alert('Please select a ticket type');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Redirecting to checkout...');
      // router.push('/checkout');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <div className="mb-6">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Events
            </button>
          </div>

          {/* Event Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side - Image */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <div className="w-full h-96 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              {/* Event Highlights */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Event Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {eventData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/90">
                      <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h3>
                <div className="space-y-2">
                  {eventData.terms.map((term, index) => (
                    <div key={index} className="flex items-start gap-3 text-white/80 text-sm">
                      <span className="text-orange-400 mt-1">•</span>
                      {term}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Event Info & Ticket Selection */}
            <div className="space-y-6">
              
              {/* Event Header */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                    {eventData.category}
                  </span>
                  {eventData.featured && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {eventData.title}
                </h1>
                
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {eventData.longDescription}
                </p>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold">{eventData.location}</div>
                      <div className="text-sm">{eventData.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold">{formatDate(eventData.date)}</div>
                      <div className="text-sm">{eventData.time} ({eventData.duration})</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Selection */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Select Your Tickets</h2>
                
                <div className="space-y-4 mb-6">
                  {eventData.ticketTypes.map((ticket) => (
                    <div 
                      key={ticket.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        selectedTicketType === ticket.id
                          ? 'border-orange-500 bg-white/20'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedTicketType(ticket.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{ticket.name}</h3>
                            {ticket.popular && (
                              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-white/80 text-sm mb-3">{ticket.description}</p>
                          
                          <div className="space-y-2">
                            {ticket.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-white/70 text-sm">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {ticket.originalPrice ? (
                            <div className="mb-1">
                              <span className="text-white/50 line-through text-sm">
                                {formatPrice(ticket.originalPrice)}
                              </span>
                            </div>
                          ) : null}
                          <div className="text-2xl font-bold text-white">
                            {formatPrice(ticket.price)}
                          </div>
                          <div className="text-white/70 text-sm">
                            {ticket.availableTickets} available
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity Selection */}
                {selectedTicketType && (
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-3">Number of Tickets</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                        {ticketQuantity}
                      </span>
                      
                      <button
                        onClick={() => setTicketQuantity(ticketQuantity + 1)}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Price Summary */}
                {selectedTicketType && (
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">Ticket Price:</span>
                      <span className="text-white font-semibold">
                        {formatPrice(selectedTicket!.price)} × {ticketQuantity}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex items-center justify-between mb-2 text-green-400">
                        <span>Discount:</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-lg">Total:</span>
                        <span className="text-white font-bold text-xl">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedTicketType || isLoading}
                    className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Adding...' : 'Add to Cart'}
                  </button>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={!selectedTicketType || isLoading}
                    className="flex-1 px-6 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : 'Checkout Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 