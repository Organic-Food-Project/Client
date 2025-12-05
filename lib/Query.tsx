/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { QueryProps } from '@/types/global';

interface ExtendedQueryProps extends QueryProps {
  filters?: Record<string, string | string[]>;
}

export const Query = async ({
  api,
  filters = {},
}: ExtendedQueryProps): Promise<{ data: any | null; error: any | null }> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const queryParams = new URLSearchParams();
    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    }

    const url = `${process.env.BE_BASE_URL}/${api}${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    const response = await axios.get(url, { headers });

    return { data: response.data, error: null };
  } catch (err: any) {
    if (err?.response?.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete('token');
      redirect('/account/login');
    }

    const errorMsg =
      err?.response?.data?.message ||
      err?.response?.data ||
      err?.response ||
      err?.message ||
      'Network error';

    return { data: null, error: errorMsg };
  }
};

export default Query;
