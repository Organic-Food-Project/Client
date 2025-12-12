import React from 'react';
import type { Metadata } from 'next';
import UserSettings from './UserSettings';
import OrderHistory from './OrderHistory';
import Query from '@/lib/Query';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | EcoFila',
  },
  description:
    'Manage your EcoFila account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Dashboard = async () => {
  const userData = await Query({
    api: 'v1/users',
  });
  const orders = await Query({
    api: 'v1/users/orderhistory',
  });
  return (
    <div className="flex flex-col gap-[24px]">
      <UserSettings user={userData?.data?.data} />
      <OrderHistory orders={[]} />
    </div>
  );
};

export default Dashboard;
