import { Metadata } from 'next';
import LandingPage from './components/LandingPage';

export const metadata: Metadata = {
  title: 'EZTicket | Sri Lanka\'s Premier Ticketing and Event Management Platform',
  description: 'Discover and book amazing events across beautiful Sri Lanka. From concerts to conferences, sports to cultural events - find your perfect event with EZTicket.',
  keywords: 'events, ticketing, Sri Lanka, concerts, conferences, sports, cultural events, event management',
};

export default function Home() {
  return <LandingPage />;
}
