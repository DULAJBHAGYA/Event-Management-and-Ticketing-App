import { Metadata } from 'next';
import PromotionsPage from '../components/PromotionsPage';

export const metadata: Metadata = {
  title: 'EZTicket | Promotions',
  description: 'Special offers and promotions on events across Sri Lanka. Get the best deals on tickets with EZTicket.',
  keywords: 'promotions, deals, offers, discounts, tickets, events, Sri Lanka, EZTicket',
};

export default function Promotions() {
  return <PromotionsPage />;
} 