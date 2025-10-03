import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Order history',
    template: '%s | Organic Food',
  },
  description:
    'View and track your past orders, check delivery status, and manage your purchase history on Organic Food.',
};

const Orders = () => {
  return <div>Order history</div>;
};

export default Orders;
