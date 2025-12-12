/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
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

    if (!(body instanceof FormData) && body) {
      config.headers!['Content-Type'] = 'application/json';
    }

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.request(config);

    console.log({ res });
    return { data: res.data, error: null, status: res.status };
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

    console.log({ errorMsg });
    return {
      data: null,
      error: errorMsg,
      status: err.response?.status || 400,
    };
  }
};

export default Mutation;
