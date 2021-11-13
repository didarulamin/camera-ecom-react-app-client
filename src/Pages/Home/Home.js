import React from "react";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

import Products from "../../components/Products/Products";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";
import { Helmet } from "react-helmet";

//home component
const Home = () => {
  return (
    <div>
      {/* home page title */}
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
