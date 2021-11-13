import React from "react";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

import Products from "../../components/Products/Products";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <BannerSlider />
      <Products />
      <ReviewSlider />
      <NewsLetter />
    </div>
  );
};

export default Home;
