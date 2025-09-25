/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import TempProduct from '@/assets/TempProduct.webp';
import CustomTable from '@/app/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { MetaData } from '@/types/global';
import Image from 'next/image';
import { currencyFormated } from '@/lib/utils';
import { Button } from '@/app/components/ui/button';
import { X } from 'lucide-react';

interface List {
  id: number;
  img: any;
  name: string;
  price: number;
  inStock: boolean;
}

interface WishlistTableProps {
  metaData: MetaData;
}

const WishlistTable: React.FC<WishlistTableProps> = ({ metaData }) => {
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
      accessorKey: 'inStock',
      header: 'Stock Status',
      cell: ({ row }) => (
        <div>
          {row.original.inStock ? (
            <span className="text-body-medium text-hard-primary rounded-[4px] bg-[#20B526]/20 px-2 py-1">
              In Stock
            </span>
          ) : (
            <span className="text-body-medium text-danger rounded-[4px] bg-[#EA4B48]/20 px-2 py-1">
              Out of Stock
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: () => (
        <div className="w-full flex justify-end items-center gap-6">
          <Button className="px-[32px]">Add to Cart</Button>
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
          inStock: true,
        },
        {
          id: 1,
          img: TempProduct,
          name: 'Chinese Cabbage',
          price: 45,
          inStock: true,
        },
        {
          id: 1,
          img: TempProduct,
          name: 'Chinese Cabbage',
          price: 45,
          inStock: false,
        },
      ]}
      metaData={metaData}
    />
  );
};

export default WishlistTable;
