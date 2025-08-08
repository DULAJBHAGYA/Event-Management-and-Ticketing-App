import { Metadata } from 'next';
import PromotionsPage from '../../components/PromotionsPage';

export const metadata: Metadata = {
  title: 'Manage Promotions | Organizer Dashboard | EZTicket',
  description: 'Create and manage discounts, offers, and special deals for your events with EZTicket organizer dashboard.',
  keywords: 'manage promotions, discounts, offers, special deals, event management, organizer dashboard, EZTicket',
};

export default function DashboardPromotions() {
  return <PromotionsPage />;
} 