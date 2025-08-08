import { Metadata } from 'next';
import OrganizerDashboard from '../components/OrganizerDashboard';

export const metadata: Metadata = {
  title: 'Organizer Dashboard | EZTicket',
  description: 'Manage your events, track sales, and create promotions with EZTicket organizer dashboard.',
  keywords: 'organizer dashboard, event management, ticket sales, analytics, promotions, EZTicket',
};

export default function Dashboard() {
  return <OrganizerDashboard />;
} 