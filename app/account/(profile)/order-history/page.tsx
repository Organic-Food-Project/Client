import React from 'react';
import type { Metadata } from 'next';
import OrderTable from './[order]/OrderTable';

export const metadata: Metadata = {
  title: {
    default: 'Order history',
    template: '%s | Organic Food',
  },
  description:
    'View and track your past orders, check delivery status, and manage your purchase history on Organic Food.',
};

const Orders = () => {
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
  const metaData = {
    total: 6,
    limit: 15,
  };
  return (
    <div>
      <OrderTable orders={orders} metaData={metaData} />
    </div>
  );
};

export default Orders;
