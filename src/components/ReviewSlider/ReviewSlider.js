import React from "react";
import "./reviewslider.css";
import Slider from "react-slick";
import "animate.css";

const ReviewSlider = () => {
  return (
    <div>
      <h2> Single Item</h2>
      <Slider>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default ReviewSlider;
