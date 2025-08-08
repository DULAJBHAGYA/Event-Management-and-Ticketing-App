'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  location: string;
  date: string;
  time: string;
  price: number;
  originalPrice?: number;
  availableTickets: number;
  totalTickets: number;
  organizer: string;
  featured?: boolean;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Colombo Music Festival 2024',
    description: 'Experience the biggest music festival in Sri Lanka with international and local artists.',
    category: 'Music',
    image: '/assets/images/events/music-festival.jpg',
    location: 'Galle Face Green, Colombo',
    date: '2024-12-15',
    time: '18:00',
    price: 2500,
    originalPrice: 3000,
    availableTickets: 150,
    totalTickets: 500,
    organizer: 'Colombo Events Ltd',
    featured: true
  },
  {
    id: '2',
    title: 'Traditional Kandyan Dance Show',
    description: 'Witness the beautiful traditional Kandyan dance performances with live music.',
    category: 'Cultural',
    image: '/assets/images/events/kandyan-dance.jpg',
    location: 'Kandy Cultural Center',
    date: '2024-11-20',
    time: '19:30',
    price: 1200,
    availableTickets: 80,
    totalTickets: 200,
    organizer: 'Cultural Heritage Foundation'
  },
  {
    id: '3',
    title: 'White Water Rafting Adventure',
    description: 'Thrilling white water rafting experience in the beautiful Kitulgala region.',
    category: 'Adventure',
    image: '/assets/images/events/rafting.jpg',
    location: 'Kitulgala, Sri Lanka',
    date: '2024-12-10',
    time: '08:00',
    price: 3500,
    availableTickets: 25,
    totalTickets: 50,
    organizer: 'Adventure Lanka Tours'
  },
  {
    id: '4',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring industry leaders and innovators.',
    category: 'Conference',
    image: '/assets/images/events/tech-conference.jpg',
    location: 'BMICH, Colombo',
    date: '2024-12-05',
    time: '09:00',
    price: 5000,
    originalPrice: 6000,
    availableTickets: 200,
    totalTickets: 500,
    organizer: 'Sri Lanka Tech Association'
  },
  {
    id: '5',
    title: 'Shakespeare in the Park',
    description: 'Outdoor theater performance of Shakespeare classics under the stars.',
    category: 'Drama',
    image: '/assets/images/events/shakespeare.jpg',
    location: 'Viharamahadevi Park, Colombo',
    date: '2024-11-25',
    time: '19:00',
    price: 1800,
    availableTickets: 120,
    totalTickets: 300,
    organizer: 'Colombo Theater Group'
  },
  {
    id: '6',
    title: 'Sinhala New Year Celebrations',
    description: 'Traditional Sinhala New Year celebrations with games, music, and food.',
    category: 'Cultural',
    image: '/assets/images/events/new-year.jpg',
    location: 'Independence Square, Colombo',
    date: '2024-04-14',
    time: '16:00',
    price: 800,
    availableTickets: 300,
    totalTickets: 1000,
    organizer: 'Cultural Events Sri Lanka'
  },
  {
    id: '7',
    title: 'Mountain Hiking Expedition',
    description: 'Guided hiking tour through the beautiful Knuckles mountain range.',
    category: 'Adventure',
    image: '/assets/images/events/hiking.jpg',
    location: 'Knuckles Mountain Range',
    date: '2024-12-20',
    time: '06:00',
    price: 2800,
    availableTickets: 15,
    totalTickets: 30,
    organizer: 'Mountain Adventures Lanka'
  },
  {
    id: '8',
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch their ideas to investors and experts.',
    category: 'Conference',
    image: '/assets/images/events/startup-pitch.jpg',
    location: 'Cinnamon Grand, Colombo',
    date: '2024-12-08',
    time: '14:00',
    price: 2000,
    availableTickets: 150,
    totalTickets: 300,
    organizer: 'Startup Lanka'
  }
];

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Music', value: 'Music' },
  { name: 'Cultural', value: 'Cultural' },
  { name: 'Adventure', value: 'Adventure' },
  { name: 'Conference', value: 'Conference' },
  { name: 'Drama', value: 'Drama' }
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = events.filter(event => event.featured);


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

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto">
              Find the perfect event for you across beautiful Sri Lanka
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
                    placeholder="Search events, locations, or organizers..."
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
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCategory === category.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Events Section */}
          {featuredEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Featured Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
                  <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      {event.originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{getDiscountPercentage(event.originalPrice, event.price)}% OFF
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        FEATURED
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                          {event.category}
                        </span>
                        <span className="text-white/70 text-sm">
                          {event.availableTickets} tickets left
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-white/90 text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(event.date)} at {event.time}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {event.originalPrice ? (
                            <>
                              <span className="text-white/50 line-through text-sm">
                                {formatPrice(event.originalPrice)}
                              </span>
                              <span className="text-2xl font-bold text-white">
                                {formatPrice(event.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-white">
                              {formatPrice(event.price)}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => router.push(`/events/${event.id}`)}
                          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Events Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {selectedCategory === 'all' ? 'All Events' : `${selectedCategory} Events`}
            </h2>
            
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/80 text-xl">No events found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      {event.originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{getDiscountPercentage(event.originalPrice, event.price)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                          {event.category}
                        </span>
                        <span className="text-white/70 text-sm">
                          {event.availableTickets} tickets left
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-white/90 text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(event.date)} at {event.time}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {event.originalPrice ? (
                            <>
                              <span className="text-white/50 line-through text-sm">
                                {formatPrice(event.originalPrice)}
                              </span>
                              <span className="text-2xl font-bold text-white">
                                {formatPrice(event.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-white">
                              {formatPrice(event.price)}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => router.push(`/events/${event.id}`)}
                          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 