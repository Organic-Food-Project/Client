'use client';
import { BackendImage } from '@/components/BackendImage';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import CustomTable from '@/components/ui/CustomTable';
import CustomLink from '@/components/CustomLink';
import { slugify } from '@/lib/utils';

interface Product {
  product: {
    _id: string;
    name: string;
    image: string;
  };
  price: number;
  quantity: number;
  subtotal: number;
}

interface OrderDetailsProps {
  products: Product[];
  orderDetails: {
    date: string;
    productCount: number;
    paymentMethod: string;
    subtotal: number;
    total: number;
  };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  products,
  orderDetails,
}) => {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <BackendImage
            src={row.original.product.image}
            alt={row.original.product.name}
            width={70}
            height={70}
            className="object-cover"
          />
          <p className="text-body-small">{row.original.product.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <div className="text-body-small">${row.original.price}</div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className="text-body-small">{row.original.quantity}</div>
      ),
    },
    {
      accessorKey: 'subtotal',
      header: 'Subtotal',
      cell: ({ row }) => (
        <div className="text-body-small">{row.original.subtotal}</div>
      ),
    },
    {
      accessorKey: 'subtotal',
      header: '',
      cell: ({ row }) => (
        <CustomLink
          href={`/shop/${slugify(row.original.product.name)}`}
          className="ursor-pointer text-center font-medium text-body-medium text-primary"
        >
          View Product
        </CustomLink>
      ),
    },
  ];
  return (
    <div className="space-y-8">
      {/* Billing and Shipping Addresses */}
      <div className="border border-gray-100">
        <div className="flex justify-between items-center border-b-1 border-gray-100 p-6">
          <h1 className="text-body-xl font-medium text-gray-900">
            Order Details{' '}
            <span className="text-gray-500 text-body-small">
              • {orderDetails.date} • {orderDetails.productCount} Products
            </span>
          </h1>
          <CustomLink
            href="/account/order-history"
            className="ursor-pointer text-center pt-3 font-medium text-body-medium text-primary"
          >
            Back to List
          </CustomLink>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6">
          {/* Right Column - Order Summary */}
          <div className="border-1 border-gray-100">
            <div className="">
              {/* Order ID and Payment */}
              <div className="grid grid-cols-2 gap-4 border-b-1 border-gray-100 pb-3 py-[20px] pl-[20px] pr-[10px]">
                <p className="font-medium text-gray-400 uppercase">
                  Payment Method:
                </p>
                <p className="font-medium text-gray-900">
                  {orderDetails.paymentMethod}
                </p>
              </div>
              <div>
                {/* Pricing Breakdown */}
                <div className="py-[20px] pl-[20px] pr-[10px]">
                  <div className="flex justify-between pb-3 border-b-1 border-gray-100">
                    <span className="text-gray-900">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      {orderDetails.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b-1 border-gray-100">
                    <span className="text-gray-900">Discount</span>
                    <span className="font-medium text-gray-900">0%</span>
                  </div>
                  <div className="flex justify-between py-3 border-b-1 border-gray-100">
                    <span className="text-gray-900">Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 py-[20px] pl-[20px] pr-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium text-body-large">
                      Total
                    </span>
                    <span className="text-body-large font-bold text-green-600">
                      {orderDetails.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={products}
        headerClassName="bg-gray-50"
      />
    </div>
  );
};

export default OrderDetails;
