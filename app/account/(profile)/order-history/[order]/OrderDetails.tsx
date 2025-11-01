'use client';
import Image from 'next/image';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import Link from 'next/link';
import CustomTable from '@/components/ui/CustomTable';

interface Product {
  product: {
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
    name: string;
    address: string;
    email: string;
    phone: string;
    orderId: string;
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
          <Image
            src={row.original.product.image || '/placeholder.svg'}
            alt={row.original.product.name}
            width={70}
            height={70}
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
          <Link
            href="/account/order-history"
            className="ursor-pointer text-center pt-3 font-medium text-body-medium text-primary"
          >
            Back to List
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Billing Address */}
          <div className="flex flex-col sm:flex-row max-sm:gap-6 col-span-2">
            <div className="border-t-1 border-l-1 border-b-1 border-gray-100 py-[20px]">
              <h3 className="text-base font-medium text-gray-400 uppercase tracking-wider pb-4 mb-4 border-b border-gray-100 pl-[20px] pr-[10px]">
                Billing Address
              </h3>
              <div className="space-y-2 pl-[20px] pr-[10px]">
                <p className="font-medium text-gray-900">{orderDetails.name}</p>
                <p className="text-sm text-gray-600">{orderDetails.address}</p>
                <div className="pt-8">
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">
                    Email
                  </p>
                  <p className="text-sm text-gray-900">{orderDetails.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">
                    Phone
                  </p>
                  <p className="text-sm text-gray-900">{orderDetails.phone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-1 border-gray-100 py-[20px]">
              <h3 className="text-base font-medium text-gray-400 uppercase tracking-wider pb-4 mb-4 border-b border-gray-100 pl-[20px] pr-[10px]">
                Shipping Address
              </h3>
              <div className="space-y-2 pl-[20px] pr-[10px]">
                <p className="font-medium text-gray-900">{orderDetails.name}</p>
                <p className="text-sm text-gray-600">{orderDetails.address}</p>
                <div className="pt-8">
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">
                    Email
                  </p>
                  <p className="text-sm text-gray-900">{orderDetails.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">
                    Phone
                  </p>
                  <p className="text-sm text-gray-900">{orderDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Order Summary */}
          <div className="border-1 border-gray-100">
            <div className="">
              {/* Order ID and Payment */}
              <div className="grid grid-cols-2 gap-4 border-b-1 border-gray-100 pb-3 py-[20px] pl-[20px] pr-[10px]">
                <div className="border-r-1 border-gray-100">
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">
                    Order ID:
                  </p>
                  <p className="font-medium text-gray-900">
                    {orderDetails.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">
                    Payment Method:
                  </p>
                  <p className="font-medium text-gray-900">
                    {orderDetails.paymentMethod}
                  </p>
                </div>
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
