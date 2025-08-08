import { Metadata } from 'next';
import AnalyticsPage from '../../components/AnalyticsPage';

export const metadata: Metadata = {
  title: 'Analytics | Organizer Dashboard | EZTicket',
  description: 'Track your performance, revenue, and ticket sales insights with EZTicket analytics dashboard.',
  keywords: 'analytics, performance tracking, revenue insights, ticket sales, organizer dashboard, EZTicket',
};

export default function DashboardAnalytics() {
  return <AnalyticsPage />;
} 