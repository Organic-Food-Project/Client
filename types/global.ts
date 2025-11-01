/* eslint-disable @typescript-eslint/no-explicit-any */
export type MetaData = {
  total: number;
  limit: number;
};

export type ProductData = {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
  quantity: number;
  rate: number;
  price: number;
  feddBack: string[];
  inWishlist: boolean;
};

export interface MutationProps {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  api: string;
  body?: any;
}

export interface QueryProps {
  api: string;
  revalidate?: number;
}
