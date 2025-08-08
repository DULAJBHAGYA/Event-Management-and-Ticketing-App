'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

interface FAQCategory {
  title: string;
  count: number;
  articles: string[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Ticket Booking Queries",
    count: 14,
    articles: [
      "Connectivity/Something is not working",
      "Advance booking on EZTicket",
      "Booking tickets without a Credit Card",
      "Choose the preferred Seats",
      "Cut Off Time for Booking Tickets",
      "Age Limit for Events",
      "Bulk bookings",
      "Maximum tickets to book in a transaction",
      "Convenience fee for online booking",
      "Sold Out Events",
      "Payment methods accepted",
      "Booking confirmation process",
      "Ticket transfer options",
      "Group booking discounts"
    ]
  },
  {
    title: "Event Cancellations",
    count: 3,
    articles: [
      "Refund for cancelled shows",
      "Event postponement policy",
      "Notification of cancellations"
    ]
  },
  {
    title: "Confirmation Related",
    count: 5,
    articles: [
      "Resend Confirmation Feature",
      "Email confirmation not received",
      "SMS confirmation issues",
      "Confirmation details",
      "Print tickets at home"
    ]
  },
  {
    title: "Refund & Cancellation",
    count: 6,
    articles: [
      "Refund for a failed transaction",
      "Cancellation policy",
      "Partial refunds",
      "Refund processing time",
      "Refund to original payment method",
      "Emergency cancellation"
    ]
  },
  {
    title: "Account & Profile",
    count: 4,
    articles: [
      "Create new account",
      "Reset password",
      "Update profile information",
      "Account security"
    ]
  },
  {
    title: "Technical Support",
    count: 3,
    articles: [
      "App not working",
      "Website loading issues",
      "Payment gateway problems"
    ]
  }
];

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => 
      article.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How can we help you today?
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Find answers to common questions or create a new support ticket
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your search term here..."
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
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 text-lg">
                SEARCH
              </button>
              <button className="px-6 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New support ticket
              </button>
            </div>
          </div>

          {/* Knowledge Base Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Knowledge Base
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 border-b-2 border-red-500 pb-2 inline-block">
                FAQ&apos;s Sri Lanka
              </h3>
            </div>

            {/* FAQ Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCategories.map((category, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-2xl font-bold text-white">
                      {category.title}
                    </h4>
                    <span className="text-white/70 text-base">
                      ({category.count})
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {category.articles.slice(0, 5).map((article, articleIndex) => (
                      <div key={articleIndex} className="flex items-start gap-3 group cursor-pointer">
                        <svg className="w-4 h-4 text-white/50 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-white/90 group-hover:text-white transition-colors duration-200 text-lg">
                          {article}
                        </span>
                      </div>
                    ))}
                    
                    {category.articles.length > 5 && (
                      <div className="pt-2">
                        <span className="text-orange-400 hover:text-orange-300 cursor-pointer font-medium text-lg">
                          &gt;&gt; See all {category.count} articles
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Section */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Still need help?
              </h3>
              <p className="text-white/90 mb-6 text-xl">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href="/contact" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-all duration-300 text-center text-lg">
                   Contact Support
                 </Link>
                 <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 text-lg">
                   Live Chat
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 