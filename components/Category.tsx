import TempCategory from '@/assets/Vig2.svg';
import Image from 'next/image';
import Link from 'next/link';

const Category = () => {
  const CategoryData = {
    imgSrc: TempCategory,
    imgAlt: 'Category',
    title: 'Vegetables',
    count: 165,
  };
  return (
    <div className="relative group border rounded-[8px] border-gray-100 hover:border-hard-primary hover:shadow hover:shadow-soft-primary p-4 bg-white">
      <Link
        href="/shop/1"
        className="flex flex-col items-center justify-center gap-5 pt-4"
      >
        <Image
          src={CategoryData.imgSrc}
          width={80}
          height={80}
          alt={CategoryData.imgAlt}
        />
        <div className="text-center space-[6px] pb-5">
          <p className="text-gray-700 text-body-small">{CategoryData.title}</p>
          <p className="text-body-medium font-semibold">
            {CategoryData.count} Products
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Category;
