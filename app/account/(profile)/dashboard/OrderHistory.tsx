'use client';

import CustomTable from '@/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import CustomLink from '@/components/CustomLink';

interface Order {
  _id: string;
  createdAt: string;
  total: string;
  status: string;
}

interface OrderHistoryProps {
  orders: Order[];
  loading?: boolean;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  loading = false,
  orders,
}) => {
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <div className="text-foreground">
          {dayjs(new Date(row.original.createdAt)).format('YYYY/MM/DD h:mm A')}
        </div>
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
      cell: () => <div className="text-foreground">Completed</div>,
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="w-full flex justify-end items-center">
          <CustomLink
            href={`/account/order-history/${row.original._id}`}
            className="ursor-pointer text-center font-medium text-body-medium text-primary"
          >
            View Details
          </CustomLink>
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      loading={loading}
      columns={columns}
      data={orders}
      headerClassName="bg-gray-50"
    />
  );
};

export default OrderHistory;
