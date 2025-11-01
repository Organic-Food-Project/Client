/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';
import Mutation from '@/lib/Mutation';

const addToWishlistAction = async (formData: {
  _id: string;
}): Promise<{
  data: any;
  errors: { form: string } | null;
  status: number;
  success: boolean;
}> => {
  const Cookies = await cookies();
  if (!Cookies.get('token')) {
    return {
      data: null,
      errors: { form: 'Something went wrong' },
      status: 401,
      success: false,
    };
  }

  const { data, error, status } = await Mutation({
    api: 'v1/wishlist',
    method: 'POST',
    body: {
      productID: formData._id,
    },
  });
  if (error) {
    console.log({ error });
    return {
      data: null,
      errors: {
        form: error?.data ?? error ?? 'Something went wrong',
      },
      status,
      success: false,
    };
  } else {
    return { data, errors: null, status, success: true };
  }
};

const deleteFromWishlistAction = async (formData: {
  _id: string;
}): Promise<{
  data: any;
  errors: { form: string } | null;
  status: number;
  success: boolean;
}> => {
  const Cookies = await cookies();
  if (!Cookies.get('token')) {
    return {
      data: null,
      errors: { form: 'Something went wrong' },
      status: 401,
      success: false,
    };
  }

  const { data, error, status } = await Mutation({
    api: 'v1/wishlist',
    method: 'DELETE',
    body: {
      productID: formData._id,
    },
  });
  if (error) {
    console.log({ error });
    return {
      data: null,
      errors: {
        form: error?.data ?? error ?? 'Something went wrong',
      },
      status,
      success: false,
    };
  } else {
    return { data, errors: null, status, success: true };
  }
};

export { addToWishlistAction, deleteFromWishlistAction };
