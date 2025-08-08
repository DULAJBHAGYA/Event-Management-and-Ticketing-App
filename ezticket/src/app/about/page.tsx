import { Metadata } from 'next';
import AboutPage from '../components/AboutPage';

export const metadata: Metadata = {
  title: 'EZTicket | About Us',
  description: 'Learn about EZTicket - Sri Lanka\'s premier event management and ticketing platform. Our mission, vision, and commitment to connecting people through amazing events.',
  keywords: 'about us, EZTicket, mission, vision, Sri Lanka, event management, ticketing platform',
};

export default function About() {
  return <AboutPage />;
} 