import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Banner, Order } from "@/components/index";
import { scrollToCartSection } from "@/utils/scrollToCart";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToCart || location.hash === "#cart") {
      requestAnimationFrame(() => scrollToCartSection());
    }
  }, [location.state, location.hash]);

  return (
    <div>
      <Banner />
      <Order />
    </div>
  );
};
export default Home;
