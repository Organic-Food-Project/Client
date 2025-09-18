/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig } from 'axios';
import { MutationProps } from '@/types/global';

const Mutation = async ({
  method,
  api,
  body,
}: MutationProps): Promise<{ data: any | null; error: any | null }> => {
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

    return { data: res.data, error: null };
  } catch (err: any) {
    if (err.response) {
      return {
        data: null,
        error:
          err.response.data?.message || err.response.data || 'Unknown error',
      };
    }

    return { data: null, error: err?.message || 'Network error' };
  }
};
  
export default Mutation;
