'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrganizerNavbar from './OrganizerNavbar';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  totalTickets: number;
  soldTickets: number;
  revenue: number;
  status: 'active' | 'upcoming' | 'completed' | 'draft';
  image: string;
  description: string;
  organizer: string;
  ticketTypes: {
    name: string;
    price: number;
    sold: number;
    available: number;
  }[];
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Colombo Music Festival 2024',
    category: 'Music',
    date: '2024-12-15',
    time: '18:00',
    location: 'Galle Face Green, Colombo',
    totalTickets: 1000,
    soldTickets: 750,
    revenue: 1875000,
    status: 'active',
    image: '/assets/images/events/music-festival.jpg',
    description: 'Experience the biggest music festival in Sri Lanka with international and local artists.',
    organizer: 'Colombo Events Ltd',
    ticketTypes: [
      { name: 'General Admission', price: 2500, sold: 500, available: 200 },
      { name: 'Premium Seating', price: 4500, sold: 200, available: 50 },
      { name: 'VIP Experience', price: 8500, sold: 50, available: 0 }
    ]
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    category: 'Conference',
    date: '2024-11-20',
    time: '09:00',
    location: 'Cinnamon Grand, Colombo',
    totalTickets: 500,
    soldTickets: 320,
    revenue: 800000,
    status: 'active',
    image: '/assets/images/events/tech-conference.jpg',
    description: 'Join industry leaders for the most comprehensive tech conference in Sri Lanka.',
    organizer: 'Colombo Events Ltd',
    ticketTypes: [
      { name: 'Early Bird', price: 1500, sold: 150, available: 50 },
      { name: 'Regular', price: 2000, sold: 120, available: 80 },
      { name: 'VIP', price: 3500, sold: 50, available: 30 }
    ]
  },
  {
    id: '3',
    title: 'Drama Night - Romeo & Juliet',
    category: 'Drama',
    date: '2024-10-30',
    time: '19:30',
    location: 'Lionel Wendt Theatre, Colombo',
    totalTickets: 300,
    soldTickets: 300,
    revenue: 450000,
    status: 'completed',
    image: '/assets/images/events/drama.jpg',
    description: 'A classic Shakespearean tragedy performed by the National Theatre Company.',
    organizer: 'Colombo Events Ltd',
    ticketTypes: [
      { name: 'Standard', price: 1500, sold: 200, available: 0 },
      { name: 'Premium', price: 2500, sold: 100, available: 0 }
    ]
  },
  {
    id: '4',
    title: 'Adventure Trek - Ella',
    category: 'Adventure',
    date: '2024-12-05',
    time: '07:00',
    location: 'Ella, Sri Lanka',
    totalTickets: 50,
    soldTickets: 15,
    revenue: 75000,
    status: 'upcoming',
    image: '/assets/images/events/adventure.jpg',
    description: 'Explore the beautiful trails of Ella with experienced guides.',
    organizer: 'Colombo Events Ltd',
    ticketTypes: [
      { name: 'Standard Trek', price: 5000, sold: 10, available: 25 },
      { name: 'Premium Trek', price: 7500, sold: 5, available: 10 }
    ]
  },
  {
    id: '5',
    title: 'Comedy Night - Stand Up Sri Lanka',
    category: 'Comedy',
    date: '2024-12-25',
    time: '20:00',
    location: 'Comedy Club, Colombo',
    totalTickets: 200,
    soldTickets: 0,
    revenue: 0,
    status: 'draft',
    image: '/assets/images/events/comedy.jpg',
    description: 'Laugh your heart out with the best comedians in Sri Lanka.',
    organizer: 'Colombo Events Ltd',
    ticketTypes: [
      { name: 'General Admission', price: 1000, sold: 0, available: 150 },
      { name: 'VIP Seating', price: 2000, sold: 0, available: 50 }
    ]
  }
];

export default function MyEventsPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const filteredEvents = sampleEvents.filter(event => {
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = sampleEvents.reduce((sum, event) => sum + event.revenue, 0);
  const totalEvents = sampleEvents.length;
  const activeEvents = sampleEvents.filter(event => event.status === 'active').length;
  const totalTickets = sampleEvents.reduce((sum, event) => sum + event.totalTickets, 0);
  const soldTickets = sampleEvents.reduce((sum, event) => sum + event.soldTickets, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <OrganizerNavbar />
      
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My Events
          </h1>
          <p className="text-white/80 text-lg">
            Manage all your events, track sales, and monitor performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-white">{totalEvents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Active Events</p>
                <p className="text-2xl font-bold text-white">{activeEvents}</p>
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
                <p className="text-white/70 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Tickets Sold</p>
                <p className="text-2xl font-bold text-white">{soldTickets.toLocaleString()}</p>
                <p className="text-white/60 text-sm">of {totalTickets.toLocaleString()} total</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
              >
                <option value="all">All Events</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={() => router.push('/dashboard/add-event')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/80 text-xl">No events found matching your criteria.</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Event Image */}
                  <div className="lg:w-48 lg:h-32 flex-shrink-0">
                    <div className="w-full h-32 lg:h-full bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(event.status)}`}>
                            {getStatusText(event.status)}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm mb-3">{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(event.date)} at {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            {event.soldTickets}/{event.totalTickets} tickets sold
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{formatCurrency(event.revenue)}</p>
                        <p className="text-white/60 text-sm">
                          {((event.soldTickets / event.totalTickets) * 100).toFixed(1)}% sold
                        </p>
                      </div>
                    </div>

                    {/* Ticket Types Summary */}
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Ticket Types:</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.ticketTypes.map((ticket, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm">
                            {ticket.name}: {ticket.sold}/{ticket.sold + ticket.available} sold
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => router.push(`/events/${event.id}`)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors"
                      >
                        View Public Page
                      </button>
                      <button
                        onClick={() => router.push(`/dashboard/events/${event.id}/edit`)}
                        className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg text-orange-400 font-semibold transition-colors"
                      >
                        Edit Event
                      </button>
                      <button
                        onClick={() => router.push(`/dashboard/events/${event.id}/promotions`)}
                        className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 font-semibold transition-colors"
                      >
                        Manage Promotions
                      </button>
                      <button
                        onClick={() => router.push(`/dashboard/events/${event.id}/analytics`)}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 font-semibold transition-colors"
                      >
                        View Analytics
                      </button>
                      {event.status === 'draft' && (
                        <button
                          onClick={() => alert('Publish event functionality coming soon!')}
                          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 font-semibold transition-colors"
                        >
                          Publish Event
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 