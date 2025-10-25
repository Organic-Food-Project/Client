/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import { QueryProps } from '@/types/global';

interface ExtendedQueryProps extends QueryProps {
  filters?: Record<string, string | string[]>;
}

export const Query = async ({
  api,
  revalidate = 0,
  filters = {},
}: ExtendedQueryProps): Promise<{ data: any | null; error: any | null }> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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

    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: {
        revalidate,
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        data: null,
        error: data?.message || data || 'Unknown error',
      };
    }

    return { data, error: null };
  } catch (err: any) {
    console.log(err);
    return { data: null, error: err?.message || 'Network error' };
  }
};

export default Query;
