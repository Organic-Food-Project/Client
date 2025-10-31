import React from 'react';
import type { Metadata } from 'next';
import UserSettings from './UserSettings';
import OrderHistory from './OrderHistory';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Organic Food',
  },
  description:
    'Manage your Organic Food account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Dashboard = () => {
  const orders = [
    {
      id: '#738',
      date: '8 Sep, 2020',
      total: '$135.00 (5 Products)',
      status: 'Processing',
    },
    {
      id: '#703',
      date: '24 May, 2020',
      total: '$25.00 (1 Product)',
      status: 'on the way',
    },
    {
      id: '#130',
      date: '22 Oct, 2020',
      total: '$250.00 (4 Products)',
      status: 'Completed',
    },
    {
      id: '#561',
      date: '1 Feb, 2020',
      total: '$35.00 (1 Products)',
      status: 'Completed',
    },
    {
      id: '#536',
      date: '21 Sep, 2020',
      total: '$578.00 (13 Products)',
      status: 'Completed',
    },
    {
      id: '#492',
      date: '22 Oct, 2020',
      total: '$345.00 (7 Products)',
      status: 'Completed',
    },
  ];
  const customer = {
    name: 'Dianne Russell',
    email: 'dionne.russell@gmail.com',
    phone: '(671) 555-0110',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    avatar:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-profile-y1cvdWbhSPrGNX7LKZoIaQKKM355F3.png',
  };
  return (
    <div className="flex flex-col gap-[24px]">
      <UserSettings customer={customer} />
      <OrderHistory orders={orders} />
    </div>
  );
};

export default Dashboard;
