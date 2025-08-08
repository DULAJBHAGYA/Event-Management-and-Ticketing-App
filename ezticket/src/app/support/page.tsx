import { Metadata } from 'next';
import SupportPage from '../components/SupportPage';

export const metadata: Metadata = {
  title: 'EZTicket | Support',
  description: 'Get help and support with EZTicket. Find answers to frequently asked questions, contact customer service, and get assistance with your bookings.',
  keywords: 'support, help, customer service, FAQ, EZTicket, Sri Lanka, event management, ticketing',
};

export default function Support() {
  return <SupportPage />;
} 