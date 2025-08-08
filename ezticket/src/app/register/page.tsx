import { Metadata } from 'next';
import RegisterPage from '../components/RegisterPage';

export const metadata: Metadata = {
  title: 'EZTicket | Register',
  description: 'Create your EZTicket account to start discovering and booking amazing events across Sri Lanka.',
  keywords: 'register, sign up, create account, EZTicket, events, tickets, Sri Lanka',
};

export default function Register() {
  return <RegisterPage />;
} 