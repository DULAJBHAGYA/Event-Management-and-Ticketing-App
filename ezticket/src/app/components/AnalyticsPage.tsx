'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrganizerNavbar from './OrganizerNavbar';

interface AnalyticsData {
  totalRevenue: number;
  totalTickets: number;
  soldTickets: number;
  conversionRate: number;
  averageTicketPrice: number;
  topPerformingEvent: string;
  monthlyRevenue: number[];
  monthlyTickets: number[];
  categoryBreakdown: {
    category: string;
    revenue: number;
    tickets: number;
    percentage: number;
  }[];
  recentSales: {
    event: string;
    tickets: number;
    revenue: number;
    date: string;
  }[];
  topEvents: {
    title: string;
    revenue: number;
    tickets: number;
    conversion: number;
  }[];
}

const analyticsData: AnalyticsData = {
  totalRevenue: 3175000,
  totalTickets: 1850,
  soldTickets: 1385,
  conversionRate: 74.9,
  averageTicketPrice: 2292,
  topPerformingEvent: 'Colombo Music Festival 2024',
  monthlyRevenue: [450000, 800000, 1200000, 725000],
  monthlyTickets: [300, 320, 450, 315],
  categoryBreakdown: [
    { category: 'Music', revenue: 1875000, tickets: 750, percentage: 59.1 },
    { category: 'Conference', revenue: 800000, tickets: 320, percentage: 25.2 },
    { category: 'Drama', revenue: 450000, tickets: 300, percentage: 14.2 },
    { category: 'Adventure', revenue: 50000, tickets: 15, percentage: 1.5 }
  ],
  recentSales: [
    { event: 'Colombo Music Festival 2024', tickets: 25, revenue: 62500, date: '2024-11-15' },
    { event: 'Tech Conference 2024', tickets: 15, revenue: 30000, date: '2024-11-14' },
    { event: 'Adventure Trek - Ella', tickets: 5, revenue: 25000, date: '2024-11-13' },
    { event: 'Colombo Music Festival 2024', tickets: 30, revenue: 75000, date: '2024-11-12' },
    { event: 'Tech Conference 2024', tickets: 10, revenue: 20000, date: '2024-11-11' }
  ],
  topEvents: [
    { title: 'Colombo Music Festival 2024', revenue: 1875000, tickets: 750, conversion: 75.0 },
    { title: 'Tech Conference 2024', revenue: 800000, tickets: 320, conversion: 64.0 },
    { title: 'Drama Night - Romeo & Juliet', revenue: 450000, tickets: 300, conversion: 100.0 },
    { title: 'Adventure Trek - Ella', revenue: 75000, tickets: 15, conversion: 30.0 }
  ]
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRevenueGrowth = () => {
    const current = analyticsData.monthlyRevenue[analyticsData.monthlyRevenue.length - 1];
    const previous = analyticsData.monthlyRevenue[analyticsData.monthlyRevenue.length - 2];
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getTicketGrowth = () => {
    const current = analyticsData.monthlyTickets[analyticsData.monthlyTickets.length - 1];
    const previous = analyticsData.monthlyTickets[analyticsData.monthlyTickets.length - 2];
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <OrganizerNavbar />
      
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-white/80 text-lg">
            Track your performance, revenue, and ticket sales insights
          </p>
        </div>

        {/* Period Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Time Period</h2>
            <div className="flex gap-2">
              {['week', 'month', 'quarter', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedPeriod === period
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(analyticsData.totalRevenue)}</p>
                <p className="text-green-400 text-sm">+{getRevenueGrowth()}% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm">Tickets Sold</p>
                <p className="text-2xl font-bold text-white">{analyticsData.soldTickets.toLocaleString()}</p>
                <p className="text-blue-400 text-sm">+{getTicketGrowth()}% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">{analyticsData.conversionRate}%</p>
                <p className="text-white/60 text-sm">Ticket sales success</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm">Avg. Ticket Price</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(analyticsData.averageTicketPrice)}</p>
                <p className="text-white/60 text-sm">Per ticket sold</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Revenue Trend */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Revenue Trend</h3>
            <div className="space-y-4">
              {analyticsData.monthlyRevenue.map((revenue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Month {index + 1}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${(revenue / Math.max(...analyticsData.monthlyRevenue)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold">{formatCurrency(revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Revenue by Category</h3>
            <div className="space-y-4">
              {analyticsData.categoryBreakdown.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="text-white font-semibold">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(category.revenue)}</p>
                    <p className="text-white/60 text-sm">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Events */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Top Performing Events</h3>
          <div className="space-y-4">
            {analyticsData.topEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{event.title}</h4>
                    <p className="text-white/60 text-sm">{event.tickets} tickets sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formatCurrency(event.revenue)}</p>
                  <p className="text-white/60 text-sm">{event.conversion}% conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Sales</h3>
          <div className="space-y-4">
            {analyticsData.recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h4 className="text-white font-semibold">{sale.event}</h4>
                  <p className="text-white/60 text-sm">{sale.tickets} tickets • {formatDate(sale.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formatCurrency(sale.revenue)}</p>
                  <p className="text-green-400 text-sm">+{sale.tickets} tickets</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/dashboard/events')}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">View All Events</h3>
            <p className="text-white/70">Manage your events and track performance</p>
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
            <p className="text-white/70">Create discounts and boost sales</p>
          </button>

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
            <p className="text-white/70">Add events and start selling tickets</p>
          </button>
        </div>
      </div>
    </div>
  );
} 