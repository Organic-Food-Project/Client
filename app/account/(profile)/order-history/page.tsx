import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import OrderTable from './OrderTable';
import Query from '@/lib/Query';

export const metadata: Metadata = {
  title: {
    default: 'Order history',
    template: '%s | EcoFila',
  },
  description:
    'View and track your past orders, check delivery status, and manage your purchase history on EcoFila.',
};

const Orders = ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  return (
    <Suspense
      fallback={
        <OrderTable
          loading
          orders={[]}
          metaData={{
            total: 6,
            limit: 15,
          }}
        />
      }
    >
      <OrderHistoryFetch searchParams={searchParams} />
    </Suspense>
  );
};

const OrderHistoryFetch = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  const filters = await searchParams;
  const orders = await Query({
    api: 'v1/users/orderhistory',
    filters: {
      ...filters,
      limit: '10',
    },
  });
  return (
    <OrderTable
      orders={orders?.data?.data ?? []}
      metaData={orders?.data?.meta}
    />
  );
};

export default Orders;
