import { Metadata } from 'next';
import DashboardAddEventPage from '../../components/DashboardAddEventPage';

export const metadata: Metadata = {
  title: 'Add Event | Organizer Dashboard | EZTicket',
  description: 'Create and manage your events with EZTicket organizer dashboard.',
  keywords: 'add event, create event, event management, organizer dashboard, EZTicket',
};

export default function DashboardAddEvent() {
  return <DashboardAddEventPage />;
} 