import React from "react";
import Banner from "../../components/Banner/Banner";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";

// import Header from "../../components/Header/Header";
// import NavBar from "../../components/Header/Navbar";
// import NavBar_res from "../../components/Header/NavBar_res";
// import Services from "../../components/Services/services";

const Home = () => {
  return (
    <div className="container">
      <Banner />
      <ReviewSlider/>
    </div>
  );
};

export default Home;
