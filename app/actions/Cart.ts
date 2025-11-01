/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';
import Mutation from '@/lib/Mutation';

const addToCartAction = async (formData: {
  _id: string;
  quantity: number;
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
    api: 'v1/cart',
    method: 'POST',
    body: {
      productID: formData._id,
      number: formData.quantity,
    },
  });
  if (error) {
    return {
      data: null,
      errors: { form: error?.data ?? error ?? 'Something went wrong' },
      status,
      success: false,
    };
  } else {
    return { data, errors: null, status, success: true };
  }
};

const updateCartAction = async () => {};
const deleteFromCartAction = async () => {};

export { addToCartAction, updateCartAction, deleteFromCartAction };
