'use client';

import CustomTable from '@/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.original.id}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="text-foreground">{row.original.date}</div>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => (
        <div className="text-foreground">{row.original.total}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="text-foreground">{row.original.status}</div>
      ),
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: () => (
        <div className="w-full flex justify-end items-center">
          <Link
            href="/account/order-history"
            className="ursor-pointer text-center font-medium text-body-medium text-primary"
          >
            View Details
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-[24px] border-t-1 border-r-1 border-l-1 border-gray-100">
        <p className="text-body-xl font-medium ">Recet Order History</p>
        <Link
          href="/account/order-history"
          className="ursor-pointer text-center font-medium text-body-medium text-primary"
        >
          View All
        </Link>
      </div>
      <CustomTable
        columns={columns}
        data={orders}
        headerClassName="bg-gray-50"
      />
    </div>
  );
};

export default OrderHistory;
