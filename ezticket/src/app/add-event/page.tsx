import { Metadata } from 'next';
import AddEventPage from '../components/AddEventPage';

export const metadata: Metadata = {
  title: 'Add Event | EZTicket',
  description: 'Create and manage your events with EZTicket. Add new events, set ticket prices, and reach your audience.',
  keywords: 'add event, create event, event management, event organizer, EZTicket',
};

export default function AddEvent() {
  return <AddEventPage />;
} 