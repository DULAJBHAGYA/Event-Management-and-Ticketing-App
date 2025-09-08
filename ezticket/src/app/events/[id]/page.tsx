import { Metadata } from 'next';
import EventDetailPage from '../../components/EventDetailPage';

export const metadata: Metadata = {
  title: 'Event Details | EZTicket',
  description: 'View event details, select tickets, and book your spot for amazing events in Sri Lanka.',
  keywords: 'event details, ticket booking, events, Sri Lanka, EZTicket',
};


// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Generate static params for all possible event IDs
  // In a real app, this would fetch from your API/database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];
}

export default function EventPage() {
  return <EventDetailPage />;
} 