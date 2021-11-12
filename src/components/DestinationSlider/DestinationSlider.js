import Slider from "react-slick";
// import card2 from "../../assets/card2.png";
import "./destinationSlider.css";

const DestinationSlider = ({ sliderRef }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="des-slider-container mb-5 destination container ">
      <Slider {...settings} ref={sliderRef} className="">
        <div className="des-slider card " key={1}>
         
          <h1>name</h1>
        </div>
        <div className="des-slider  card" key={2}>
          <img
            src="https://i.ibb.co/37365Yf/popular-5.jpg"
            className="img-fluid "
            alt="..."
          />
          <div class="des-center text-white fs-3 font-bold">
            Venice Tour - Italy
          </div>
        </div>
        <div className="des-slider  card " key={3}>
          <img
            src="https://i.ibb.co/ZHV5q3m/popular-4.jpg"
            className="img-fluid "
            alt="..."
          />
          <div class="des-center text-white fs-3 font-bold">
            Beauty Of Tajmahal
          </div>
        </div>
        <div className="des-slider  card " key={3}>
          <img
            src="https://i.ibb.co/WV8Brz1/popular-2.jpg"
            className="img-fluid "
            alt="..."
          />
          <div class="des-center text-white fs-3 font-bold">
            Glacier Walk Combo
          </div>
        </div>
        <div className="des-slider  card " key={3}>
          <img
            src="https://i.ibb.co/cvVgp8k/popular-3.jpg"
            className="img-fluid "
            alt="..."
          />
          <div class="des-center text-white fs-3 font-bold">
            Great Britain Travel
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default DestinationSlider;
