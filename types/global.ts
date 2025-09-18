/* eslint-disable @typescript-eslint/no-explicit-any */
export type MetaData = {
  total: number;
  limit: number;
};

export interface MutationProps {
  method: 'POST' | 'GET' | 'PUT' | 'PATH' | 'DELETE';
  api: string;
  body?: any;
}

export interface QueryProps {
  api: string;
  revalidate?: number;
}
