import FeaturedProducts from '@/components/HomeComponents/FeaturedProducts';
import TopCategories from '@/components/HomeComponents/TopCategories';
import HeroSection from '@/components/HomeComponents/HeroSection';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <section className="relative py-[80px]">
        <FeaturedProducts />
      </section>
      <section className="relative py-[80px] bg-green-50">
        <TopCategories />
      </section>
    </main>
  );
};

export default Home;
