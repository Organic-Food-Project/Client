/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import TempProduct from '@/assets/TempProduct.webp';
import CustomTable from '@/app/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { MetaData } from '@/types/global';
import Image from 'next/image';
import { currencyFormated } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';

interface List {
  id: number;
  img: any;
  name: string;
  price: number;
  quantity: number;
}

interface CartTableProps {
  metaData: MetaData;
}

const CartTable: React.FC<CartTableProps> = ({ metaData }) => {
  const columns: ColumnDef<List>[] = [
    {
      accessorKey: 'id',
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex gap-[20px] items-center">
          <Image
            src={row.original.img}
            width={100}
            height={100}
            alt={row.original.name}
          />
          <p className="text-body-medium">{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <div className="text-body-medium font-semibold">
          ${currencyFormated(row.original.price)}
        </div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className="text-body-medium font-semibold flex rounded-full border border-gray-100 w-fit px-2 h-[50px] items-center min-w-[124px]">
          <button
            aria-label="Minus"
            className="cursor-pointer bg-gray-50 rounded-full flex items-center justify-center size-[34px] text-black"
          >
            <Minus size={15} />
          </button>
          <span className="text-center flex-grow">{row.original.quantity}</span>
          <button
            aria-label="Plus"
            className="cursor-pointer bg-gray-50 rounded-full flex items-center justify-center size-[34px] text-black"
          >
            <Plus size={15} />
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'subtotal',
      header: 'Subtotal',
      cell: ({ row }) => (
        <div>
          <div className="text-body-medium font-semibold">
            ${currencyFormated(row.original.price * row.original.quantity)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: () => (
        <div className="w-full flex justify-end items-center">
          <button
            aria-label="Delete"
            className="cursor-pointer rounded-full border border-gray-20 size-[32px] flex justify-center items-center"
          >
            <X size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={[
        {
          id: 1,
          img: TempProduct,
          name: 'Chinese Cabbage',
          price: 45,
          quantity: 5,
        },
        {
          id: 1,
          img: TempProduct,
          name: 'Chinese Cabbage',
          price: 45,
          quantity: 5,
        },
        {
          id: 1,
          img: TempProduct,
          name: 'Chinese Cabbage',
          price: 45,
          quantity: 5,
        },
      ]}
    />
  );
};

export default CartTable;
