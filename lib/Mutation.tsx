/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig } from 'axios';
import { MutationProps } from '@/types/global';

const Mutation = async ({
  method,
  api,
  body,
}: MutationProps): Promise<{
  data: any | null;
  error: any | null;
  status: number;
}> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const config: AxiosRequestConfig = {
      method,
      url: `${process.env.BE_BASE_URL}/${api}`,
      headers: {},
      data: body,
      withCredentials: true,
    };

    // Detect body type
    if (body instanceof FormData) {
      // axios بيتعامل مع FormData أوتوماتيك
    } else if (body) {
      config.headers!['Content-Type'] = 'application/json';
    }

    // Add token if exists
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.request(config);

    return { data: res.data, error: null, status: res.status };
  } catch (err: any) {
    if (err.response.status === 401) {
      cookieStore.delete('token');
    }
    if (err.response) {
      return {
        data: null,
        error:
          err.response.data?.message || err.response.data || 'Unknown error',
        status: err.response.status,
      };
    }

    return {
      data: null,
      error: err?.message || 'Network error',
      status: 400,
    };
  }
};

export default Mutation;
