import React from 'react';
import type { Metadata } from 'next';
import OrderDetails from './OrderDetails';
import TempProduct from '@/assets/TempProduct.webp';

export const metadata: Metadata = {
  title: {
    default: 'Order Details',
    template: '%s | EcoFila',
  },
  description:
    'Manage your EcoFila account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Order = () => {
  const products = [
    {
      product: {
        name: 'Red Capsicum',
        image: TempProduct as never,
      },
      price: 14.0,
      quantity: 5,
      subtotal: 70.0,
    },
    {
      product: {
        name: 'Green Capsicum',
        image: TempProduct as never,
      },
      price: 14.0,
      quantity: 2,
      subtotal: 28.0,
    },
    {
      product: {
        name: 'Green Chili',
        image: TempProduct as never,
      },
      price: 26.7,
      quantity: 10,
      subtotal: 267.0,
    },
  ];
  const orderDetails = {
    // BILLING_ADDRESS
    name: 'Dianne Russell',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'dianne.ressell@gmail.com',
    phone: '(671) 555-0110',
    // ORDER_INFO
    orderId: '#4152',
    date: 'April 24, 2021',
    productCount: 3,
    paymentMethod: 'Paypal',
    subtotal: 365.0,
    total: 84.0,
  };
  return <OrderDetails products={products} orderDetails={orderDetails} />;
};

export default Order;
