import { ProductData } from '@/types/global';
import React from 'react';

interface FeedBackProps {
  productData: ProductData;
}

const FeedBack: React.FC<FeedBackProps> = ({ productData }) => {
  return <div>FeedBack</div>;
};

export default FeedBack;
