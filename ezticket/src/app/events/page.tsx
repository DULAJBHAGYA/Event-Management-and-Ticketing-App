import { Metadata } from 'next';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'EZTicket | Events',
  description: 'Discover amazing events across Sri Lanka. Browse concerts, conferences, sports, cultural events and more with EZTicket.',
  keywords: 'events, concerts, conferences, sports, cultural events, Sri Lanka, EZTicket, ticketing',
};

export default function Events() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Find the perfect event for you across beautiful Sri Lanka
          </p>
        </div>
        {/* Events content will go here */}
        <div className="text-center text-white/80">
          <p className="text-lg">Events page coming soon...</p>
        </div>
      </div>
    </div>
  );
} 