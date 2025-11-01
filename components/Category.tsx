import TempCategory from '@/assets/Vig2.webp';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryProps {
  name: string;
  id: string;
  products: string[];
}

const Category = ({ name, id, products }: CategoryProps) => {
  const CategoryData = {
    imgSrc: TempCategory,
    imgAlt: name,
    title: name,
    count: products.length,
  };
  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <Link
        href={`/shop?filter[category]=${id}`}
        className="flex flex-col items-center justify-center gap-5 pt-4"
      >
        <Image
          src={CategoryData.imgSrc}
          width={80}
          height={80}
          alt={CategoryData.imgAlt}
          className="aspect-square"
        />
        <div className="text-center space-y-[6px] pb-5">
          <p className="text-gray-700 text-body-small line-clamp-1">
            {CategoryData.title}
          </p>
          <p className="text-body-medium font-semibold">
            {CategoryData.count} Products
          </p>
        </div>
      </Link>
    </div>
  );
};

export const LoadingCategory = () => {
  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <Link
        href={`/shop`}
        className="flex flex-col items-center justify-center gap-5 pt-4"
      >
        <div className="size-[80px] aspect-square bg-gray-100 animate-pulse rounded-[8px]" />
        <div className="text-center space-y-[6px] pb-5 w-full flex flex-col items-center">
          <span className="bg-gray-100 animate-pulse block w-[50%] h-[21px]" />
          <span className="bg-gray-100 animate-pulse block w-[70%] h-[24px]" />
        </div>
      </Link>
    </div>
  );
};

export default Category;
