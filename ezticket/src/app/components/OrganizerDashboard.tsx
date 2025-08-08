'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrganizerNavbar from './OrganizerNavbar';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  totalTickets: number;
  soldTickets: number;
  revenue: number;
  status: 'active' | 'upcoming' | 'completed' | 'draft';
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Colombo Music Festival 2024',
    category: 'Music',
    date: '2024-12-15',
    totalTickets: 1000,
    soldTickets: 750,
    revenue: 1875000,
    status: 'active'
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    category: 'Conference',
    date: '2024-11-20',
    totalTickets: 500,
    soldTickets: 320,
    revenue: 800000,
    status: 'active'
  },
  {
    id: '3',
    title: 'Drama Night - Romeo & Juliet',
    category: 'Drama',
    date: '2024-10-30',
    totalTickets: 300,
    soldTickets: 300,
    revenue: 450000,
    status: 'completed'
  },
  {
    id: '4',
    title: 'Adventure Trek - Ella',
    category: 'Adventure',
    date: '2024-12-05',
    totalTickets: 50,
    soldTickets: 15,
    revenue: 75000,
    status: 'upcoming'
  }
];

export default function OrganizerDashboard() {

  const router = useRouter();

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

  const totalRevenue = sampleEvents.reduce((sum, event) => sum + event.revenue, 0);
  const totalTickets = sampleEvents.reduce((sum, event) => sum + event.totalTickets, 0);
  const soldTickets = sampleEvents.reduce((sum, event) => sum + event.soldTickets, 0);
  const activeEvents = sampleEvents.filter(event => event.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <OrganizerNavbar />
      
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-white/80 text-lg">
            Here&apos;s what&apos;s happening with your events today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-white/70 text-sm">Active Events</p>
                <p className="text-2xl font-bold text-white">{activeEvents}</p>
                <p className="text-white/60 text-sm">Currently running</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">{((soldTickets / totalTickets) * 100).toFixed(1)}%</p>
                <p className="text-white/60 text-sm">Ticket sales</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => router.push('/dashboard/add-event')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create New Event</h3>
            <p className="text-white/70">Add a new event and start selling tickets</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/promotions')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Manage Promotions</h3>
            <p className="text-white/70">Create discounts and special offers</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/analytics')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">View Analytics</h3>
            <p className="text-white/70">Detailed insights and performance data</p>
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">View Public Site</h3>
            <p className="text-white/70">See how customers view your events</p>
          </button>
        </div>

        {/* Recent Events */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Events</h2>
            <button
              onClick={() => router.push('/dashboard/events')}
              className="text-orange-400 hover:text-orange-300 transition-colors font-semibold"
            >
              View All Events
            </button>
          </div>

          <div className="space-y-4">
            {sampleEvents.map((event) => (
              <div key={event.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-white/70 text-sm">
                      <span>{event.category}</span>
                      <span>{formatDate(event.date)}</span>
                      <span>{event.soldTickets}/{event.totalTickets} tickets sold</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{formatCurrency(event.revenue)}</p>
                    <p className="text-white/60 text-sm">
                      {((event.soldTickets / event.totalTickets) * 100).toFixed(1)}% sold
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => router.push(`/dashboard/events/${event.id}`)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors"
                  >
                    View Details
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 