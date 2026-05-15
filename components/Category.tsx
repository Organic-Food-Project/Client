import Image from 'next/image';
import Vig2 from '@/assets/Vig2.webp';
import { BackendImage } from '@/components/BackendImage';
import CustomLink from './CustomLink';

interface CategoryProps {
  name: string;
  id: string;
  products: string[];
  image?: string | null;
}

const Category = ({ name, image, id, products }: CategoryProps) => {
  const CategoryData = {
    imgAlt: name,
    title: name,
    count: products.length,
  };
  const hasRemoteImage = typeof image === 'string' && image.trim().length > 0;

  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <CustomLink
        href={`/shop?filter[category]=${id}&sort=-rate`}
        className="flex flex-col items-center justify-center gap-5 pt-4"
      >
        {hasRemoteImage ? (
          <BackendImage
            src={image}
            width={80}
            height={80}
            alt={CategoryData.imgAlt}
            className="aspect-square"
          />
        ) : (
          <Image
            src={Vig2}
            width={80}
            height={80}
            alt={CategoryData.imgAlt}
            className="aspect-square"
          />
        )}
        <div className="text-center space-y-[6px] pb-5">
          <p className="text-gray-700 text-body-small line-clamp-1">
            {CategoryData.title}
          </p>
          <p className="text-body-medium font-semibold">
            {CategoryData.count} Products
          </p>
        </div>
      </CustomLink>
    </div>
  );
};

export const LoadingCategory = () => {
  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <CustomLink
        href={`/shop`}
        className="flex flex-col items-center justify-center gap-5 pt-4"
      >
        <div className="size-[80px] aspect-square bg-gray-100 animate-pulse rounded-[8px]" />
        <div className="text-center space-y-[6px] pb-5 w-full flex flex-col items-center">
          <span className="bg-gray-100 animate-pulse block w-[50%] h-[21px]" />
          <span className="bg-gray-100 animate-pulse block w-[70%] h-[24px]" />
        </div>
      </CustomLink>
    </div>
  );
};

export default Category;
