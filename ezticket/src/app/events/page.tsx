import { Metadata } from 'next';
import EventsPage from '../components/EventsPage';

export const metadata: Metadata = {
  title: 'EZTicket | Events',
  description: 'Discover amazing events across Sri Lanka. Browse concerts, conferences, sports, cultural events and more with EZTicket.',
  keywords: 'events, concerts, conferences, sports, cultural events, Sri Lanka, EZTicket, ticketing',
};

export default function Events() {
  return <EventsPage />;
} 