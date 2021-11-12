import React from "react";
import "./Banner.css";
import "animate.css";
const Banner = () => {
  return (
    <div className="banner-container container">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://template.hasthemes.com/garcia/garcia/assets/images/slider/slider-3.jpg"
              className="d-block w-100 img-fluid"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block animate__animated animate__fadeInUp animate__delay-2s">
              <h5 className="fs-1 ">
                Capture Your
                <br /> Beautiful moments
              </h5>
              <button className="btn rounded-pill bg-info px-4">Buy Now</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://template.hasthemes.com/garcia/garcia/assets/images/slider/slider-3.jpg"
              className="d-block w-100 img-fluid"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block animate__animated animate__fadeInUp animate__delay-2s">
              <h5 className="fs-1 ">
                Capture Your
                <br /> Beautiful moments
              </h5>
              <button className="btn rounded-pill bg-info px-4">Buy Now</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://template.hasthemes.com/garcia/garcia/assets/images/slider/slider-4.jpg"
              className="d-block w-100 img-fluid"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block animate__animated animate__fadeInUp animate__delay-2s">
              <h5 className="fs-1 ">
                Capture Your
                <br /> Beautiful moments
              </h5>
              <button className="btn rounded-pill bg-info px-4">Buy Now</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
