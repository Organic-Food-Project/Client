import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import OrderDetails from './OrderDetails';
import TempProduct from '@/assets/TempProduct.webp';
import CustomTable from '@/components/ui/CustomTable';
import OrderLoading from './OrderLoading';
import Query from '@/lib/Query';
import { ProductData } from '@/types/global';
import dayjs from 'dayjs';

export const metadata: Metadata = {
  title: {
    default: 'Order Details',
    template: '%s | EcoFila',
  },
  description:
    'Manage your EcoFila account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Order = () => {
  return (
    <Suspense fallback={<OrderLoading />}>
      <OrderFetch />
    </Suspense>
  );
};

const OrderFetch = async () => {
  const order = await Query({
    api: 'v1/users/691d9204412b37d426906993',
  });
  // const products = order?.data?.data?.products?.map((el: ProductData) => ({
  //   product: {
  //     name: el.name,
  //     image: el.images?.[0] ?? '',
  //   },
  //   price: el.price,
  //   quantity: el.quantity,
  //   subtotal: el.price * el.quantity,
  // }));
  // const orderDetails = {
  //   date: dayjs(new Date(order?.data?.data?.createdAt)).format('MMMM D, YYYY'),
  //   productCount: order?.data?.data?.products.length,
  //   paymentMethod: order?.data?.data?.paymentMethod ?? 'Paypal',
  //   subtotal: order?.data?.data?.total,
  //   total: order?.data?.data?.total,
  // };
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
    // ORDER_INFO
    date: 'April 24, 2021',
    productCount: 3,
    paymentMethod: 'Paypal',
    subtotal: 365.0,
    total: 84.0,
  };
  return <OrderDetails products={products} orderDetails={orderDetails} />;
};

export default Order;
