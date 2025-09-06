import FeaturedProducts from '@/components/HomeComponents/FeaturedProducts';
import TopCategories from '@/components/HomeComponents/TopCategories';
import HeroSection from '@/components/HomeComponents/HeroSection';
import WhyChooseUs from '@/components/HomeComponents/WhyChooseUs';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <section className="relative py-[80px]">
        <FeaturedProducts />
      </section>
      <section className="relative">
        <TopCategories />
        <WhyChooseUs />
      </section>
    </main>
  );
};

export default Home;
