'use client';
import CustomTable from '@/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import {
  type Dispatch,
  type SetStateAction,
  useTransition,
  useCallback,
  useRef,
} from 'react';
import Image from 'next/image';
import { currencyFormated } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';
import { updateCartAction, deleteFromCartAction } from '@/lib/actions/Cart';
import Toast from '@/components/ui/Toast';

interface List {
  _id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  product_quantity: number;
}

interface Data {
  _id: string;
  name: string;
  price: number;
  product_quantity: number;
  images: string[];
  quantity: number;
}

interface CartTableProps {
  loading?: boolean;
  myData: Data[];
  setMyData?: Dispatch<SetStateAction<Data[]>>;
}

const CartTable: React.FC<CartTableProps> = ({
  loading = false,
  myData,
  setMyData,
}) => {
  const [isPendingUpdate, startUpdate] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();

  const debounceTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const handleError = (
    errors: { form?: string } | null,
    actionName: string
  ) => {
    const errorMessage = errors?.form || `Failed to ${actionName}`;

    Toast({
      Message: errorMessage,
      type: 'error',
    });
  };

  const handleQuantityChange = useCallback(
    (_id: string, newQuantity: number, max: number) => {
      // Validate limits: minimum 1, maximum max
      if (newQuantity < 1 || newQuantity > max) return;

      // Clear existing timer for this product
      if (debounceTimers.current[_id]) {
        clearTimeout(debounceTimers.current[_id]);
      }

      // Update UI immediately
      setMyData?.((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, quantity: newQuantity } : item
        )
      );

      // Set debounce timer (300ms)
      debounceTimers.current[_id] = setTimeout(() => {
        startUpdate(async () => {
          try {
            const res: {
              errors: { form: string } | null;
              success: boolean;
              status: number;
            } = await updateCartAction({ _id, quantity: newQuantity });
            if (res.success) {
              Toast({
                Message: `Quantity changed successfully!`,
                type: 'success',
              });
              setMyData?.((prevData) =>
                prevData.map((item) =>
                  item._id === _id ? { ...item, quantity: newQuantity } : item
                )
              );
            } else {
              handleError(res.errors, 'edit quantity');
            }
          } catch (error) {
            handleError(
              { form: 'An unexpected error occurred' },
              'edit quantity'
            );
            console.error('Cart error:', error);
          }
        });
      }, 300);
    },
    [setMyData]
  );

  const handleDeleteFromCart = (_id: string) => {
    startDelete(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = await deleteFromCartAction({ _id });
        if (res.success) {
          Toast({
            Message: `Removed from cart successfully!`,
            type: 'success',
          });
          setMyData?.((prevData) =>
            prevData.filter((item) => item._id !== _id)
          );
        } else {
          handleError(res.errors, 'removed from cart');
        }
      } catch (error) {
        handleError(
          { form: 'An unexpected error occurred' },
          'removed from cart'
        );
        console.error('Cart error:', error);
      }
    });
  };

  const columns: ColumnDef<List>[] = [
    {
      accessorKey: '_id',
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex gap-[20px] items-center">
          <Image
            src={row.original.img || '/placeholder.svg'}
            width={100}
            height={100}
            alt={row.original.name}
            className="max-h-[100px]"
            title={row.original.name}
          />
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
            onClick={() =>
              handleQuantityChange(
                row.original._id,
                row.original.quantity - 1,
                row.original.product_quantity
              )
            }
            disabled={isPendingUpdate || row.original.quantity <= 1}
            aria-label="Minus"
            className="cursor-pointer bg-gray-50 rounded-full flex items-center justify-center size-[34px] text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={15} />
          </button>
          <span className="text-center flex-grow">{row.original.quantity}</span>
          <button
            onClick={() =>
              handleQuantityChange(
                row.original._id,
                row.original.quantity + 1,
                row.original.product_quantity
              )
            }
            disabled={
              isPendingUpdate ||
              row.original.quantity >= row.original.product_quantity
            }
            aria-label="Plus"
            className="cursor-pointer bg-gray-50 rounded-full flex items-center justify-center size-[34px] text-black disabled:opacity-50 disabled:cursor-not-allowed"
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
      cell: ({ row }) => (
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => handleDeleteFromCart(row.original._id)}
            disabled={isPendingDelete}
            aria-label="Delete"
            className="cursor-pointer rounded-full border border-gray-20 size-[32px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      loading={loading}
      columns={columns}
      data={
        myData?.map((el) => ({
          _id: el?._id,
          img: el.images?.[0],
          name: el.name,
          price: el.price,
          quantity: el.quantity,
          product_quantity: el.product_quantity,
        })) ?? []
      }
    />
  );
};

export default CartTable;
