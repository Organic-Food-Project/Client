/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { QueryProps } from '@/types/global';

interface ExtendedQueryProps extends QueryProps {
  filters?: Record<string, string | string[]>;
}
interface ApiError {
  message?: string;
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
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        redirect('/account/login');
      }

      const errorMsg =
        (err.response?.data as ApiError)?.message ||
        err.message ||
        'Network error';
      console.log({ error: err.response });

      return { data: null, error: errorMsg };
    }

    if (err instanceof Error) {
      return { data: null, error: err.message };
    }

    return { data: null, error: 'Unknown error' };
  }
};

export default Query;
