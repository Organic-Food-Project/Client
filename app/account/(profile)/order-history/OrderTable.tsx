'use client';
import CustomTable from '@/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import type { Metadata } from 'next';
import dayjs from 'dayjs';
import CustomLink from '@/components/CustomLink';

export const metadata: Metadata = {
  title: {
    default: 'Order Details',
    template: '%s | EcoFila',
  },
  description:
    'Manage your EcoFila account with ease. Track your orders, update your profile, and explore fresh, healthy products all in one place.',
};

interface Order {
  _id: string;
  createdAt: string;
  total: string;
  status: string;
}

interface OrderProps {
  orders: Order[];
  loading?: boolean;
  metaData: {
    total: number;
    limit: number;
  };
}

const OrderTable: React.FC<OrderProps> = ({
  loading = false,
  orders,
  metaData,
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
    <div>
      <div className="flex justify-between items-center p-[24px] border-t-1 border-r-1 border-l-1 border-gray-100">
        <p className="text-body-xl font-medium ">Order History</p>
      </div>
      <CustomTable
        loading={loading}
        columns={columns}
        data={orders}
        metaData={metaData}
        headerClassName="bg-gray-50"
      />
    </div>
  );
};

export default OrderTable;
