import React from "react";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
// import DestinationSlider from "../../components/DestinationSlider/DestinationSlider";
import Products from "../../components/Products/Products";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <Products />
      <ReviewSlider />
      <NewsLetter/>
    </div>
  );
};

export default Home;
