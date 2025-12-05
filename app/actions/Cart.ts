/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';
import Mutation from '@/lib/Mutation';
import Query from '@/lib/Query';

const checkOutAction = async () => {
  const { data, error } = await Query({
    api: 'v1/checkout',
  });

  if (error) {
    return {
      data: null,
      error: error?.data ?? error ?? 'Something went wrong',
      success: false,
    };
  } else {
    return { data: data?.data, error: null, success: true };
  }
};

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
      errors: { form: 'You have to login first' },
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

const updateCartAction = async (formData: {
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
      errors: { form: 'You have to login first' },
      status: 401,
      success: false,
    };
  }

  const { data, error, status } = await Mutation({
    api: 'v1/cart',
    method: 'PATCH',
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

const deleteFromCartAction = async (formData: {
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
      errors: { form: 'You have to login first' },
      status: 401,
      success: false,
    };
  }

  const { data, error, status } = await Mutation({
    api: 'v1/cart',
    method: 'DELETE',
    body: {
      productID: formData._id,
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

export {
  checkOutAction,
  addToCartAction,
  updateCartAction,
  deleteFromCartAction,
};
