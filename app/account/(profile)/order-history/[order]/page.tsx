import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import OrderDetails from './OrderDetails';
import OrderLoading from './OrderLoading';
import Query from '@/lib/Query';
import dayjs from 'dayjs';

export const metadata: Metadata = {
  title: {
    default: 'Order Details',
    template: '%s | EcoFila',
  },
  description:
    'Manage your EcoFila account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

interface ProductPageProps {
  params: { order: string };
}
const Order = async ({ params }: ProductPageProps) => {
  const orderId = params.order.replace('-', ' ');
  return (
    <Suspense fallback={<OrderLoading />}>
      <OrderFetch orderId={orderId} />
    </Suspense>
  );
};

const OrderFetch = async ({ orderId }: { orderId: string }) => {
  const order = await Query({
    api: `v1/users/${orderId}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products = order?.data?.data?.products?.map((el: any) => ({
    product: {
      name: el?.productID?.name,
      image: el?.productID?.images?.[0] ?? '',
    },
    price: el?.productID?.price,
    quantity: el.quantity,
    subtotal: el?.productID?.price * el.quantity,
  }));
  const orderDetails = {
    date: dayjs(new Date(order?.data?.data?.createdAt)).format('MMMM D, YYYY'),
    productCount: order?.data?.data?.products.length,
    paymentMethod: order?.data?.data?.paymentMethod ?? 'Card',
    subtotal: order?.data?.data?.total,
    total: order?.data?.data?.total,
  };
  return <OrderDetails products={products} orderDetails={orderDetails} />;
};

export default Order;
