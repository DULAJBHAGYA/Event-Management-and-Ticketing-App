import { Metadata } from 'next';
import MyEventsPage from '../../components/MyEventsPage';

export const metadata: Metadata = {
  title: 'My Events | Organizer Dashboard | EZTicket',
  description: 'Manage all your events, track sales, and monitor performance with EZTicket organizer dashboard.',
  keywords: 'my events, event management, organizer dashboard, ticket sales, analytics, EZTicket',
};

export default function DashboardEvents() {
  return <MyEventsPage />;
} 