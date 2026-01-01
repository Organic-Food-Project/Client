/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import UserSettings from './UserSettings';
import OrderHistory from './OrderHistory';
import Query from '@/lib/Query';
import CustomLink from '@/components/CustomLink';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | EcoFila',
  },
  description:
    'Manage your EcoFila account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  const userDataPromise: Promise<{ data: any | null; error: any | null }> =
    Query({
      api: 'v1/users',
    });

  const filters = await searchParams;

  const ordersPromise: Promise<{ data: any | null; error: any | null }> = Query(
    {
      api: 'v1/users/orderhistory',
      filters: {
        ...filters,
        limit: '4',
      },
    }
  );

  return (
    <div className="flex flex-col gap-[24px]">
      <Suspense fallback={<UserSettingsLoading />}>
        <UserSettingsFetch promise={userDataPromise} />
      </Suspense>
      <div>
        <div className="flex justify-between items-center p-[24px] border-t-1 border-r-1 border-l-1 border-gray-100">
          <p className="text-body-xl font-medium ">Recet Order History</p>
          <CustomLink
            href="/account/order-history"
            className="ursor-pointer text-center font-medium text-body-medium text-primary"
          >
            View All
          </CustomLink>
        </div>
        <Suspense fallback={<OrderHistory loading orders={[]} />}>
          <OrderHistoryFetch promise={ordersPromise} />
        </Suspense>
      </div>
    </div>
  );
};

const UserSettingsFetch = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const userData = await promise;
  return <UserSettings user={userData?.data?.data} />;
};

const UserSettingsLoading = () => {
  return (
    <div className="border-1 border-gray-100 h-[278px] w-full p-8 flex flex-col items-center justify-center text-center animate-pulse">
      <div className="rounded-full min-h-[120px] min-w-[120px] w-[120px] h-[120px] bg-gray-200" />

      <div className="mt-4 h-5 w-40 rounded-md bg-gray-200" />

      <div className="mt-2 h-4 w-24 rounded-md bg-gray-200" />

      <div className="mt-2 pt-3 h-4 w-20 rounded-md bg-gray-200" />
    </div>
  );
};

const OrderHistoryFetch = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const orders = await promise;
  return <OrderHistory orders={orders?.data?.data ?? []} />;
};

export default Dashboard;
