import { Metadata } from 'next';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'EZTicket | Promotions',
  description: 'Special offers and promotions on events across Sri Lanka. Get the best deals on tickets with EZTicket.',
  keywords: 'promotions, deals, offers, discounts, tickets, events, Sri Lanka, EZTicket',
};

export default function Promotions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Special Promotions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get amazing deals and offers on your favorite events
          </p>
        </div>
        {/* Promotions content will go here */}
        <div className="text-center text-white/80">
          <p className="text-lg">Promotions page coming soon...</p>
        </div>
      </div>
    </div>
  );
} 