/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import { QueryProps } from '@/types/global';

export const Query = async ({
  api,
  revalidate = 0,
}: QueryProps): Promise<{ data: any | null; error: any | null }> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${process.env.BE_BASE_URL}/${api}`, {
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
    return { data: null, error: err?.message || 'Network error' };
  }
};

export default Query;
