import axios from "axios";
import React, { useEffect } from "react";
import Rating from "react-rating";
import Slider from "react-slick";
import "./reviewSlider.css";
const ReviewSlider = () => {
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://murmuring-hollows-32072.herokuapp.com/api/reviews/all")
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className=" container">
      <h1 className="text-center">Testimonials</h1>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div className="p-2 m-2 card-group">
            <div className="d-flex justify-content-center flex-column align-items-center border p-3 card h-100">
              <div className="w-25 justify-content-center align-items-center d-flex flex-column">
                {review.photoURL ? (
                  <img
                    src={review.photoURL}
                    alt=""
                    className=" rounded-circle img-fluid"
                  />
                ) : (
                  <span className=" rounded-circle bg-info p-3 text-white fs-1">
                    {review.username.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="fs-5 my-1 ">{review?.username}</div>
              <Rating
                initialRating={review.rating}
                readonly
                emptySymbol={["fa fa-star-o  icon"]}
                fullSymbol={["fa fa-star  icon"]}
              />
              <p className="text-center">{review?.review.slice(0, 100)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
