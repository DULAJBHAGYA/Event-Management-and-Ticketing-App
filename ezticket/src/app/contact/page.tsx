import { Metadata } from 'next';
import ContactPage from '../components/ContactPage';

export const metadata: Metadata = {
  title: 'EZTicket | Contact Us',
  description: 'Get in touch with EZTicket. Contact our team for support, inquiries, or feedback about our event management and ticketing platform.',
  keywords: 'contact, support, help, EZTicket, Sri Lanka, event management, customer service',
};

export default function Contact() {
  return <ContactPage />;
} 