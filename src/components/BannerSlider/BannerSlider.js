import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "animate.css";
import Typical from "react-typical";
import "./bannerslider.css";

//banner slider component
//
const BannerSlider = () => {
  return (
    <div className="container">
      <Carousel autoPlay showThumbs={false} infiniteLoop>
        <div className="slider-container">
          <img
            src="https://template.hasthemes.com/garcia/garcia/assets/images/slider/slider-3.jpg"
            alt=""
          />

          <div className="center d-none d-sm-block">
            <h1 className="fs-1 text-white  ">
              Capture Your
              <br /> Beautiful moments{" "}
            </h1>
            <h5 className="fs-1 text-white  ">
              <h1 className="fs-5">Camera Brands</h1>
              <Typical
                steps={[
                  "Canon",
                  500,
                  "Fujifilm",
                  1000,
                  "GoPro",
                  1500,
                  "Nikon",
                  2000,
                  "Olympus",
                  2500,
                  "Panasonic",
                  3000,
                ]}
                loop={Infinity}
                wrapper="span"
              />
            </h5>

            <button className="btn rounded-pill bg-info px-4">Buy Now</button>
          </div>
        </div>
        <div className="slider-container">
          <img
            src="https://template.hasthemes.com/garcia/garcia/assets/images/slider/slider-4.jpg"
            alt=""
          />

          <div className="center d-none d-sm-block">
            <h1 className="fs-1 text-white  ">
              Capture Your
              <br /> Beautiful moments{" "}
            </h1>
            <h5 className="fs-1 text-white  ">
              <h1 className="fs-5">Camera Brands</h1>
              <Typical
                steps={[
                  "Canon",
                  500,
                  "Fujifilm",
                  1000,
                  "GoPro",
                  1500,
                  "Nikon",
                  2000,
                  "Olympus",
                  2500,
                  "Panasonic",
                  3000,
                ]}
                loop={Infinity}
                wrapper="span"
              />
            </h5>

            <button className="btn rounded-pill bg-info px-4">Buy Now</button>
          </div>
        </div>
        <div className="slider-container ">
          <img
            src="https://template.hasthemes.com/garcia/garcia/assets/images/slider/slider-1.jpg"
            alt=""
          />

          <div className=" d-none d-sm-block center ">
            <h1 className="fs-1  ">
              Capture Your
              <br /> Beautiful moments{" "}
            </h1>
            <h5 className="fs-1   ">
              <h1 className="fs-5">Camera Brands</h1>
              <Typical
                steps={[
                  "Canon",
                  500,
                  "Fujifilm",
                  1000,
                  "GoPro",
                  1500,
                  "Nikon",
                  2000,
                  "Olympus",
                  2500,
                  "Panasonic",
                  3000,
                ]}
                loop={Infinity}
                wrapper="span"
              />
            </h5>

            <button className="btn rounded-pill bg-info px-4">Buy Now</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
