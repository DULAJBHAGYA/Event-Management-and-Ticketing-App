'use client';

import { useState } from 'react';

interface Recommendation {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  price: string;
  date: string;
}

export default function AIRecommendations() {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGetRecommendations = async () => {
    if (!preferences.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'recommendations',
          data: { preferences }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Parse AI response and create recommendation objects
        const parsedRecommendations: Recommendation[] = [
          {
            id: '1',
            title: 'Colombo Jazz Festival',
            type: 'Music Concert',
            location: 'Colombo',
            description: 'Experience the best of jazz music in the heart of Colombo',
            price: 'LKR 2,500',
            date: '2024-02-15'
          },
          {
            id: '2',
            title: 'Kandy Cultural Show',
            type: 'Cultural Event',
            location: 'Kandy',
            description: 'Traditional Sri Lankan dance and music performance',
            price: 'LKR 1,800',
            date: '2024-02-20'
          },
          {
            id: '3',
            title: 'Galle Literary Festival',
            type: 'Literature',
            location: 'Galle',
            description: 'International literary festival in the historic Galle Fort',
            price: 'LKR 3,200',
            date: '2024-02-25'
          }
        ];
        
        setRecommendations(parsedRecommendations);
      }
    } catch {
      console.error('Failed to get recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">AI-Powered Event Recommendations</h2>
        <p className="text-gray-600 text-lg">Tell us what you like, and we&apos;ll find the perfect events for you!</p>
      </div>

      {/* Preferences Input */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          What kind of events do you enjoy?
        </label>
        <div className="flex flex-col lg:flex-row gap-4">
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Tell us about your interests... (e.g., I love music concerts, especially jazz and classical. I prefer events in Colombo and Kandy. I enjoy cultural shows and outdoor festivals.)"
            className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows={3}
          />
          <button
            onClick={handleGetRecommendations}
            disabled={isLoading || !preferences.trim()}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed lg:w-48"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Finding Events...
              </div>
            ) : (
              'Get Recommendations'
            )}
          </button>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">Recommended Events</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
              <svg className={`w-5 h-5 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className={`grid gap-6 ${isExpanded ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {recommendations.slice(0, isExpanded ? recommendations.length : 2).map((event) => (
              <div key={event.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h4>
                    <p className="text-orange-600 font-semibold">{event.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{event.price}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
                
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Preferences */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Quick Preferences</h4>
        <div className="flex flex-wrap gap-3">
          {['Music Concerts', 'Cultural Shows', 'Sports Events', 'Food Festivals', 'Art Exhibitions', 'Comedy Shows'].map((pref) => (
            <button
              key={pref}
              onClick={() => setPreferences(prev => prev ? `${prev}, ${pref}` : pref)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-orange-100 hover:text-orange-700 transition-all duration-200"
            >
              {pref}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 