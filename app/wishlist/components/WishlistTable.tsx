'use client';
import CustomTable from '@/components/ui/CustomTable';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import type { MetaData } from '@/types/global';
import Image from 'next/image';
import { currencyFormated } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState, useTransition } from 'react';
import Toast from '@/components/ui/Toast';
import { addToCartAction } from '@/lib/actions/Cart';
import { deleteFromWishlistAction } from '@/lib/actions/Wishlist';
import { useRouter } from 'next/navigation';

interface List {
  _id: string;
  img: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface WishlistTableProps {
  loading?: boolean;
  data: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    quantity: number;
  }[];
  metaData?: MetaData;
}

const WishlistTable: React.FC<WishlistTableProps> = ({
  loading = false,
  data,
  metaData,
}) => {
  const [wishlistData, setWishlistData] = useState(data ?? []);
  const [isPendingAddToCart, startAddToCart] = useTransition();
  const [isPendingAddToWishlist, startAddToWishlist] = useTransition();
  const router = useRouter();

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
      cell: ({ row }) => (
        <div className="w-full flex justify-end items-center gap-6">
          <Button
            onClick={() => handleAddToCart(row?.original?._id, 1)}
            disabled={!row.original.inStock || isPendingAddToCart}
            className="px-[32px]"
          >
            {isPendingAddToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
          <button
            onClick={() => handleRemoveFromWishlist(row?.original?._id)}
            disabled={isPendingAddToWishlist}
            aria-label="Delete"
            className="cursor-pointer rounded-full border border-gray-20 size-[32px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>
      ),
    },
  ];

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

  const handleRemoveFromWishlist = async (id: string) => {
    startAddToWishlist(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = await deleteFromWishlistAction({ _id: id });
        if (res.success) {
          Toast({
            Message: 'Removed from wishlist!',
            type: 'success',
          });
          setWishlistData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );
        } else {
          handleError(res.errors, 'remove from wishlist');
        }
      } catch (error) {
        handleError(
          { form: 'An unexpected error occurred' },
          'remove from wishlist'
        );
        console.error('Wishlist error:', error);
      }
    });
  };

  const handleAddToCart = async (_id: string, quantity: number) => {
    startAddToCart(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = await addToCartAction({ _id, quantity });
        if (res.success) {
          Toast({
            Message: `Added ${quantity} item(s) to cart!`,
            type: 'success',
          });
          router.push('/cart');
        } else {
          handleError(res.errors, 'add to cart');
        }
      } catch (error) {
        handleError({ form: 'An unexpected error occurred' }, 'add to cart');
        console.error('Cart error:', error);
      }
    });
  };

  return (
    <CustomTable
      columns={columns}
      loading={loading}
      data={
        wishlistData?.map((el) => ({
          _id: el?._id,
          img: el.images?.[0],
          name: el.name,
          price: el.price,
          inStock: el.quantity > 0,
        })) ?? []
      }
      metaData={metaData}
    />
  );
};

export default WishlistTable;
