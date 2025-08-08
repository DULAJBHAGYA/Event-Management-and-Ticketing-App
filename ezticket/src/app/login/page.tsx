import { Metadata } from 'next';
import LoginPage from '../components/LoginPage';

export const metadata: Metadata = {
  title: 'EZTicket | Sign In',
  description: 'Sign in to your EZTicket account to access your events, tickets, and manage your bookings.',
  keywords: 'sign in, login, EZTicket, account, events, tickets, Sri Lanka',
};

export default function Login() {
  return <LoginPage />;
} 