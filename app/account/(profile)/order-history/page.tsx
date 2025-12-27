/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Orders = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  const filters = await searchParams;

  const ordersPromise: Promise<{ data: any | null; error: any | null }> = Query(
    {
      api: 'v1/users/orderhistory',
      filters: {
        ...filters,
        limit: '10',
      },
    }
  );
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
      <OrderHistoryFetch promise={ordersPromise} />
    </Suspense>
  );
};

const OrderHistoryFetch = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const orders = await promise;
  if (orders?.error) return orders.error;
  return (
    <OrderTable
      orders={orders?.data?.data ?? []}
      metaData={orders?.data?.meta}
    />
  );
};

export default Orders;
