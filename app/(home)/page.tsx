import TopRatedProducts from './components/TopRatedProducts';
import TopCategories from './components/TopCategories';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <section className="relative py-[80px]">
        <TopRatedProducts />
      </section>
      <section className="relative">
        <TopCategories />
        <WhyChooseUs />
      </section>
    </main>
  );
};

export default Home;
