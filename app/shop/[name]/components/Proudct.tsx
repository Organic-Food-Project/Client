'use client';
import type React from 'react';
import { useState, useTransition } from 'react';
import Toast from '@/components/ui/Toast';
import { addToCartAction } from '@/lib/actions/Cart';
import {
  addToWishlistAction,
  deleteFromWishlistAction,
} from '@/lib/actions/Wishlist';
import ProductInfo from '@/components/ProductInfo';
import type { ProductData } from '@/types/global';
import { useRouter } from 'next/navigation';

interface ProductProps {
  productData: ProductData;
}

const Product: React.FC<ProductProps> = ({ productData }) => {
  const [isPendingAddToCart, startAddToCart] = useTransition();
  const [isPendingAddToWishlist, startAddToWishlist] = useTransition();
  const [isWishlisted, setIsWishlisted] = useState<boolean>(
    productData?.inWishlist ?? false
  );
  const router = useRouter();

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

  const handleAddToWishlist = async (id: string) => {
    startAddToWishlist(async () => {
      try {
        const res: {
          errors: { form: string } | null;
          success: boolean;
          status: number;
        } = !isWishlisted
          ? await addToWishlistAction({ _id: id })
          : await deleteFromWishlistAction({ _id: id });
        if (res.status === 401) {
          router.push('/account/login');
        }
        if (res.success) {
          Toast({
            Message: !isWishlisted
              ? 'Added to wishlist!'
              : 'Removed from wishlist!',
            type: 'success',
          });
          setIsWishlisted((prev) => !prev);
        } else {
          handleError(
            res.errors,
            !isWishlisted ? 'add to wishlist' : 'remove from wishlist'
          );
        }
      } catch (error) {
        handleError(
          { form: 'An unexpected error occurred' },
          !isWishlisted ? 'add to wishlist' : 'remove from wishlist'
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
        if (res.status === 401) {
          router.push('/account/login');
        }
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
    <ProductInfo
      isWishlisted={isWishlisted}
      isPendingAddToCart={isPendingAddToCart}
      isPendingAddToWishlist={isPendingAddToWishlist}
      handleAddToWishlist={handleAddToWishlist}
      handleAddToCart={handleAddToCart}
      productData={productData}
    />
  );
};

export default Product;
