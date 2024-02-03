import FeaturedProducts from "./FeaturedProducts";
import LatestProducts from "./LatestProducts";
import TrendingProducts from "./TrendingProducts";
import TopCategories from "./TopCategories";
import Hero from "../../components/Hero";
import Subscription from "../../components/Subscription";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <LatestProducts />
      <TrendingProducts />
      <TopCategories />
      <Subscription />
    </>
  );
};
export default HomePage;
