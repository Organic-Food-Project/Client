'use client';
import CustomTable from '@/components/ui/CustomTable';
import React from 'react';

const OrderLoading = () => {
  const columns = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: () => <div></div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: () => <div></div>,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: () => <div></div>,
    },
    {
      accessorKey: 'subtotal',
      header: 'Subtotal',
      cell: () => <div></div>,
    },
  ];
  return (
    <div className="space-y-8">
      {/* Billing and Shipping Addresses */}
      <div className="border border-gray-100 animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-center border-b-1 border-gray-100 p-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-40 bg-gray-200 rounded-md" />
            <div className="h-4 w-48 bg-gray-200 rounded-md" />
          </div>

          <div className="h-4 w-24 bg-gray-200 rounded-md" />
        </div>

        <div className="grid grid-cols-1 gap-6 p-6">
          {/* Right Column - Order Summary */}
          <div className="border-1 border-gray-100">
            {/* Order ID & Payment */}
            <div className="grid grid-cols-2 gap-4 border-b-1 border-gray-100 pb-3 py-[20px] pl-[20px] pr-[10px]">
              <div className="border-r-1 border-gray-100">
                <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
              </div>

              <div>
                <div className="h-3 w-28 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="py-[20px] pl-[20px] pr-[10px]">
              <div className="flex justify-between pb-3 border-b-1 border-gray-100">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>

              <div className="flex justify-between py-3 border-b-1 border-gray-100">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-10 bg-gray-200 rounded" />
              </div>

              <div className="flex justify-between py-3 border-b-1 border-gray-100">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-14 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 py-[20px] pl-[20px] pr-[10px]">
              <div className="flex justify-between items-center">
                <div className="h-5 w-16 bg-gray-200 rounded" />
                <div className="h-6 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomTable
        loading
        columns={columns}
        data={[]}
        headerClassName="bg-gray-50"
      />
    </div>
  );
};

export default OrderLoading;
